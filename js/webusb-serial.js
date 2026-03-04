/**
 * WebUSBSerial - 为 WebUSB 封装的 Web Serial API 类似接口
 * 在 Android 上通过 WebUSB 提供熟悉的串行通信接口
 *
 * 这使得在 Android 设备上可以工作，因为 Web Serial API 不可用但支持 WebUSB
 *
 * 重要提示：为了 Android 兼容性，本类使用较小的传输块大小
 * 以防止 SLIP 同步错误。maxTransferSize 设置为 64 字节
 * （如果端点数据包大小更小则使用该值）以确保 SLIP 帧不会被拆分。
 */
class WebUSBSerial {
    constructor(logger = null) {
        this.device = null;
        this.interfaceNumber = null;
        this.endpointIn = null;
        this.endpointOut = null;
        this.controlInterface = null;
        this.readableStream = null;
        this.writableStream = null;
        this._readLoopRunning = false;
        this._usbDisconnectHandler = null;
        this._eventListeners = {
            'close': [],
            'disconnect': []
        };
        // 针对 Android 上的 WebUSB 优化的传输块大小
        // 关键：blockSize = (maxTransferSize - 2) / 2
        // 设置为 64 字节以获得与所有 USB 串行适配器的最大兼容性
        // 使用 64 字节时：blockSize = (64-2)/2 = 每个 SLIP 数据包 31 字节
        this.maxTransferSize = 64;

        // 标志指示这是 WebUSB（esptool 使用它来调整块大小）
        this.isWebUSB = true;

        // 用于序列化控制传输的命令队列（对 CP2102 至关重要）
        this._commandQueue = Promise.resolve();

        // 跟踪当前 DTR/RTS 状态，以保持未指定的信号
        this._currentDTR = false;
        this._currentRTS = false;

        // 日志函数（如果未提供，默认为 console.log）
        this._log = logger || ((...args) => console.log(...args));
    }

    /**
     * 请求 USB 设备（模拟 navigator.serial.requestPort()）
     * @param {function|object} logger - 具有 log() 方法的日志函数或对象
     * @param {boolean} forceNew - 如果为 true，则强制选择新设备（忽略已配对的设备）
     */
    static async requestPort(logger = null, forceNew = false) {
        const filters = [
            { vendorId: 0x303A }, // 乐鑫
            { vendorId: 0x0403 }, // FTDI
            { vendorId: 0x1A86 }, // CH340
            { vendorId: 0x10C4 }, // CP210x
            { vendorId: 0x067B }  // PL2303
        ];

        // 调用日志的辅助函数（支持函数和具有 log() 方法的对象）
        const log = (msg) => {
            if (!logger) return;
            if (typeof logger === 'function') {
                logger(msg);
            } else if (typeof logger.log === 'function') {
                logger.log(msg);
            }
        };

        let device;

        // 如果 forceNew 为 false，尝试重用之前授权的设备
        if (!forceNew && navigator.usb && navigator.usb.getDevices) {
            try {
                const devices = await navigator.usb.getDevices();
                // 查找与我们的过滤器匹配的设备
                device = devices.find(d =>
                  filters.some(f => f.vendorId === d.vendorId)
                );

                if (device) {
                    log('[WebUSB] 重用之前授权的设备');
                }
            } catch (err) {
                // 在静态方法中不能使用 this._log，回退使用 console
                console.warn('[WebUSB] 获取之前授权的设备失败：', err);
            }
        }

        // 如果没有找到设备或 forceNew 为 true，请求新设备
        if (!device) {
            if (!navigator.usb) {
                throw new Error('WebUSB 不可用');
            }
            device = await navigator.usb.requestDevice({ filters });
        }

        const port = new WebUSBSerial(logger);
        port.device = device;
        return port;
    }

    /**
     * 打开 USB 设备（模拟 port.open()）
     */
    async open(options = {}) {
        if (!this.device) {
            throw new Error('未选择设备');
        }

        const baudRate = options.baudRate || 115200;

        // 如果设备已经打开，我们需要关闭并重新打开它
        // 这对 ESP32-S2 至关重要
        if (this.device.opened) {

            try {
                // 释放所有接口
                if (this.interfaceNumber !== null) {
                    try { await this.device.releaseInterface(this.interfaceNumber); } catch (e) {}
                }
                if (this.controlInterface !== null && this.controlInterface !== this.interfaceNumber) {
                    try { await this.device.releaseInterface(this.controlInterface); } catch (e) {}
                }

                // 关闭设备
                await this.device.close();

                // 重置接口编号以便重新扫描
                this.interfaceNumber = null;
                this.controlInterface = null;
                this.endpointIn = null;
                this.endpointOut = null;

                // 等待设备稳定
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (e) {
                this._log('[WebUSB] 关闭期间错误：', e.message);
            }
        }

        if (this.device.opened) {
            try { await this.device.close(); } catch (e) {
                this._log('[WebUSB] 关闭设备时错误：', e.message);
            }
        }

        try {
            if (this.device.reset) {
                await this.device.reset();
            }
        } catch (e) {
//            this._log('[WebUSB] 设备重置失败：', e.message);
        }

        const attemptOpenAndClaim = async () => {
            await this.device.open();
            try {
                const currentCfg = this.device.configuration ? this.device.configuration.configurationValue : null;
                if (!currentCfg || currentCfg !== 1) {
                    await this.device.selectConfiguration(1);
                }
            } catch (e) { }

            const config = this.device.configuration;

            // 首先尝试声明 CDC 控制接口（有助于 Android/CH34x）
            const preControlIface = config.interfaces.find(i => i.alternates && i.alternates[0] && i.alternates[0].interfaceClass === 0x02);
            if (preControlIface) {
                try {
                    await this.device.claimInterface(preControlIface.interfaceNumber);
                    try { await this.device.selectAlternateInterface(preControlIface.interfaceNumber, 0); } catch (e) { }
                    this.controlInterface = preControlIface.interfaceNumber;
                } catch (e) {
                    this._log(`[WebUSB] 无法预先声明 CDC 控制接口：${e.message}`);
                }
            }

            // 查找批量 IN/OUT 接口（首选 CDC 数据类）
            const candidates = [];
            for (const iface of config.interfaces) {
                // 检查所有备选，而不仅仅是 alternates[0]
                for (let altIndex = 0; altIndex < iface.alternates.length; altIndex++) {
                    const alt = iface.alternates[altIndex];
                    let hasIn = false, hasOut = false;
                    for (const ep of alt.endpoints) {
                        if (ep.type === 'bulk' && ep.direction === 'in') hasIn = true;
                        if (ep.type === 'bulk' && ep.direction === 'out') hasOut = true;
                    }
                    if (hasIn && hasOut) {
                        let score = 2;
                        if (alt.interfaceClass === 0x0a) score = 0; // CDC 数据优先
                        else if (alt.interfaceClass === 0xff) score = 1; // 供应商特定次之
                        candidates.push({ iface, altIndex, alt, score });
                        break; // 为此接口找到合适的备选
                    }
                }
            }

            if (!candidates.length) {
                throw new Error('未找到合适的 USB 接口');
            }

            candidates.sort((a, b) => a.score - b.score);
            let lastErr = null;
            for (const cand of candidates) {
                try {
                    // 根据 WebUSB 规范的正确顺序：先 claimInterface，然后 selectAlternateInterface
                    await this.device.claimInterface(cand.iface.interfaceNumber);
                    try {
                        await this.device.selectAlternateInterface(cand.iface.interfaceNumber, cand.altIndex);
                    } catch (e) {
                        this._log(`[WebUSB] selectAlternateInterface 失败：${e.message}`);
                    }
                    this.interfaceNumber = cand.iface.interfaceNumber;

                    // 使用找到的具有批量端点的备选
                    for (const ep of cand.alt.endpoints) {
                        if (ep.type === 'bulk' && ep.direction === 'in') {
                            this.endpointIn = ep.endpointNumber;
                        } else if (ep.type === 'bulk' && ep.direction === 'out') {
                            this.endpointOut = ep.endpointNumber;
                        }
                    }

                    // 验证是否找到两个端点
                    if (this.endpointIn == null || this.endpointOut == null) {
                        throw new Error(`缺少批量端点（in=${this.endpointIn}，out=${this.endpointOut}）`);
                    }

                    // 使用端点数据包大小作为传输长度（Android 偏好最大数据包）
                    try {
                        const inEp = cand.alt.endpoints.find(ep => ep.type === 'bulk' && ep.direction === 'in');
                        if (inEp && inEp.packetSize) {
                            // 不要用 packetSize 限制 - 使用我们优化的值
                        } else {
                            this._log(`[WebUSB] 未找到 packetSize，保持 maxTransferSize=${this.maxTransferSize}`);
                        }
                    } catch (e) {
                        // 抑制 packetSize 检查错误 - 不重要
                    }

                    return config;
                } catch (claimErr) {
                    lastErr = claimErr;
                    // 抑制声明失败消息 - 这在尝试多个接口时是预期的
                }
            }

            throw lastErr || new Error('无法声明任何 USB 接口');
        };

        let config;
        try {
            config = await attemptOpenAndClaim();
        } catch (err) {
            this._log('[WebUSB] 打开/声明失败，重置后重试：', err.message);
            try { if (this.device.reset) { await this.device.reset(); } } catch (e) { }
            try { await this.device.close(); } catch (e) { }
            try {
                config = await attemptOpenAndClaim();
            } catch (err2) {
                throw new Error(`无法声明 USB 接口：${err2.message}`);
            }
        }

        // 如果控制接口尚未声明，则声明它
        if (this.controlInterface == null) {
            const controlIface = config.interfaces.find(i =>
              i.alternates[0].interfaceClass === 0x02 &&
              i.interfaceNumber !== this.interfaceNumber
            );

            if (controlIface) {
                try {
                    await this.device.claimInterface(controlIface.interfaceNumber);
                    try { await this.device.selectAlternateInterface(controlIface.interfaceNumber, 0); } catch (e) { }
                    this.controlInterface = controlIface.interfaceNumber;
                } catch (e) {
                    this.controlInterface = this.interfaceNumber;
                }
            } else {
                this.controlInterface = this.interfaceNumber;
            }
        }

        // CP2102 特定的初始化序列（必须严格按照此顺序！）
        if (this.device.vendorId === 0x10c4) {
            try {
                // 步骤 1：启用 UART 接口
                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'device',
                    request: 0x00, // IFC_ENABLE
                    value: 0x01,   // UART_ENABLE
                    index: 0x00
                });

                // 步骤 2：设置线路控制（8N1：8 数据位，无奇偶校验，1 停止位）
                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'device',
                    request: 0x03, // SET_LINE_CTL
                    value: 0x0800, // 8 数据位，无奇偶校验，1 停止位
                    index: 0x00
                });

                // 步骤 3：设置 DTR/RTS 信号（CP2102 的供应商特定）
                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'device',
                    request: 0x07, // SET_MHS
                    value: 0x03 | 0x0100 | 0x0200, // DTR=1，RTS=1 带掩码
                    index: 0x00
                });

                // 步骤 4：设置波特率（CP2102 的供应商特定）
                // 使用 IFC_SET_BAUDRATE (0x1E) 直接传递 32 位波特率值
                const baudrateBuffer = new ArrayBuffer(4);
                const baudrateView = new DataView(baudrateBuffer);
                baudrateView.setUint32(0, baudRate, true); // 小端序

                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'interface',
                    request: 0x1E, // IFC_SET_BAUDRATE
                    value: 0,
                    index: 0
                }, baudrateBuffer);
            } catch (e) {
                this._log('[WebUSB CP2102] 初始化错误：', e.message);
            }
        }
        // FTDI 特定的初始化序列
        else if (this.device.vendorId === 0x0403) {
            try {
                // 步骤 1：重置设备
                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'device',
                    request: 0x00, // SIO_RESET
                    value: 0x00,   // 重置
                    index: 0x00
                });

                // 步骤 2：设置流控为无
                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'device',
                    request: 0x02, // SIO_SET_FLOW_CTRL
                    value: 0x00,   // 无流控
                    index: 0x00
                });

                // 步骤 3：设置数据特性（8N1）
                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'device',
                    request: 0x04, // SIO_SET_DATA
                    value: 0x0008, // 8 数据位，无奇偶校验，1 停止位
                    index: 0x00
                });

                // 步骤 4：设置波特率
                const baseClock = 3000000; // 48MHz / 16
                let divisor = baseClock / baudRate;
                const integerPart = Math.floor(divisor);
                const fractionalPart = divisor - integerPart;

                let subInteger;
                if (fractionalPart < 0.0625) subInteger = 0;
                else if (fractionalPart < 0.1875) subInteger = 1;
                else if (fractionalPart < 0.3125) subInteger = 2;
                else if (fractionalPart < 0.4375) subInteger = 3;
                else if (fractionalPart < 0.5625) subInteger = 4;
                else if (fractionalPart < 0.6875) subInteger = 5;
                else if (fractionalPart < 0.8125) subInteger = 6;
                else subInteger = 7;

                const value = (integerPart & 0xFF) | ((subInteger & 0x07) << 14) | (((integerPart >> 8) & 0x3F) << 8);
                const index = (integerPart >> 14) & 0x03;

                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'device',
                    request: 0x03, // SIO_SET_BAUD_RATE
                    value: value,
                    index: index
                });

                // 步骤 5：设置 DTR/RTS（调制解调器控制）
                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'device',
                    request: 0x01, // SIO_MODEM_CTRL
                    value: 0x0303, // DTR=1，RTS=1
                    index: 0x00
                });
            } catch (e) {
                this._log('[WebUSB FTDI] 初始化错误：', e.message);
            }
        }
        // CH340 特定的初始化（VID：0x1a86，但不是 CH343 PID：0x55d3）
        else if (this.device.vendorId === 0x1a86 && this.device.productId !== 0x55d3) {
            try {
                // 步骤 1：初始化 CH340
                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'device',
                    request: 0xA1, // CH340 初始化
                    value: 0x0000,
                    index: 0x0000
                });

                // 步骤 2：设置波特率
                const CH341_BAUDBASE_FACTOR = 1532620800;
                const CH341_BAUDBASE_DIVMAX = 3;

                let factor = Math.floor(CH341_BAUDBASE_FACTOR / baudRate);
                let divisor = CH341_BAUDBASE_DIVMAX;

                while (factor > 0xfff0 && divisor > 0) {
                    factor >>= 3;
                    divisor--;
                }

                if (factor > 0xfff0) {
                    throw new Error(`CH340 不支持波特率 ${baudRate}`);
                }

                factor = 0x10000 - factor;
                const a = (factor & 0xff00) | divisor;
                const b = factor & 0xff;

                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'device',
                    request: 0x9A,
                    value: 0x1312,
                    index: a
                });

                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'device',
                    request: 0x9A,
                    value: 0x0f2c,
                    index: b
                });

                // 步骤 3：设置握手（DTR/RTS）
                await this.device.controlTransferOut({
                    requestType: 'vendor',
                    recipient: 'device',
                    request: 0xA4, // CH340 设置握手
                    value: (~((1 << 5) | (1 << 6))) & 0xffff, // DTR=1，RTS=1（反向），掩码为 16 位
                    index: 0x0000
                });
            } catch (e) {
                this._log('[WebUSB CH340] 初始化错误：', e.message);
            }
        } else {
            // 其他芯片的标准 CDC/ACM 初始化
            try {
                const lineCoding = new Uint8Array([
                    baudRate & 0xFF,
                    (baudRate >> 8) & 0xFF,
                    (baudRate >> 16) & 0xFF,
                    (baudRate >> 24) & 0xFF,
                    0x00, // 1 停止位
                    0x00, // 无奇偶校验
                    0x08  // 8 数据位
                ]);

                await this.device.controlTransferOut({
                    requestType: 'class',
                    recipient: 'interface',
                    request: 0x20, // SET_LINE_CODING
                    value: 0,
                    index: this.controlInterface || 0
                }, lineCoding);
            } catch (e) {
                this._log('无法设置线路编码：', e.message);
            }

            // 将 DTR/RTS 初始化为空闲状态（两者均为 HIGH/有效）
            try {
                await this.device.controlTransferOut({
                    requestType: 'class',
                    recipient: 'interface',
                    request: 0x22, // SET_CONTROL_LINE_STATE
                    value: 0x03, // DTR=1，RTS=1（两者均有效）
                    index: this.controlInterface || 0
                });
            } catch (e) {
                this._log('无法设置控制线：', e.message);
            }
        }

        // 仅在尚不存在流时创建流
        if (!this.readableStream || !this.writableStream) {
            this._createStreams();
        } else {
            // 流存在，但确保读取循环正在运行
            if (!this._readLoopRunning) {
                this._readLoopRunning = true;
                // 注意：ReadableStream 无法重新启动，需要重新创建
                this._createStreams();
            }
        }

        // 仅设置一次断开处理程序
        if (!this._usbDisconnectHandler) {
            this._usbDisconnectHandler = (event) => {
                if (event.device === this.device) {
                    this._fireEvent('disconnect');
                    this._cleanup();
                }
            };
            navigator.usb.addEventListener('disconnect', this._usbDisconnectHandler);
        }
    }

    /**
     * 关闭设备（模拟 port.close()）
     */
    async close() {
        this._cleanup();
        if (this.device) {
            try {
                if (this.interfaceNumber !== null) {
                    await this.device.releaseInterface(this.interfaceNumber);
                }
                if (this.controlInterface !== null && this.controlInterface !== this.interfaceNumber) {
                    await this.device.releaseInterface(this.controlInterface);
                }
                await this.device.close();
            } catch (e) {
                if (!e.message || !e.message.includes('disconnected')) {
                    this._log('关闭设备时错误：', e.message || e);
                }
            }
            // 保留设备引用以备可能的重新配置
        }
    }

    /**
     * 断开连接并清除设备引用（用于最终清理）
     */
    async disconnect() {
        await this.close();
        this.device = null;
    }

    /**
     * 获取闪存读取操作的最佳块大小
     * (maxTransferSize - 2) / 2
     * 这考虑了 SLIP 开销和转义序列
     * @returns {number} 最佳块大小（字节）
     */
    getOptimalReadBlockSize() {
        // WebUSB 的公式：
        // blockSize = (maxTransferSize - 2) / 2
        // -2 用于 SLIP 帧定界符（开头和结尾的 0xC0）
        // /2 因为最坏情况下每个字节都可能被转义（0xDB 0xDC 或 0xDB 0xDD）
        return Math.floor((this.maxTransferSize - 2) / 2);
    }

    /**
     * 获取设备信息（模拟 port.getInfo()）
     */
    getInfo() {
        if (!this.device) {
            return {};
        }
        return {
            usbVendorId: this.device.vendorId,
            usbProductId: this.device.productId
        };
    }

    /**
     * 设置 DTR/RTS 信号（模拟 port.setSignals()）
     * 关键：通过队列序列化命令以实现 CP2102 兼容性
     * 支持 CDC/ACM（CH343）和供应商特定（CP2102，CH340）
     */
    async setSignals(signals) {
        // 通过队列序列化所有控制传输
        // 这对 CP2102 至关重要 - 并行命令会导致挂起
        this._commandQueue = this._commandQueue.then(async () => {
            if (!this.device) {
                throw new Error('设备未打开');
            }

            const vid = this.device.vendorId;
            const pid = this.device.productId;

            // 检测芯片类型并使用适当的控制请求
            // CP2102（Silicon Labs VID：0x10c4）
            if (vid === 0x10c4) {
                return await this._setSignalsCP2102(signals);
            }
            // CH340（WCH VID：0x1a86，但不是 CH343 PID：0x55d3）
            else if (vid === 0x1a86 && pid !== 0x55d3) {
                return await this._setSignalsCH340(signals);
            }
            // CDC/ACM（CH343，原生 USB 等）
            else {
                return await this._setSignalsCDC(signals);
            }
        }).catch(err => {
            this._log('[WebUSB] setSignals 错误：', err);
            throw err;
        });

        return this._commandQueue;
    }

    /**
     * 使用 CDC/ACM 标准设置信号（用于 CH343，原生 USB）
     */
    async _setSignalsCDC(signals) {
        // 保留未指定信号的当前状态（Web Serial 语义）
        const dtr = signals.dataTerminalReady !== undefined ? signals.dataTerminalReady : this._currentDTR;
        const rts = signals.requestToSend !== undefined ? signals.requestToSend : this._currentRTS;

        // 更新跟踪的状态
        this._currentDTR = dtr;
        this._currentRTS = rts;

        let value = 0;
        value |= dtr ? 1 : 0;
        value |= rts ? 2 : 0;

        try {
            const result = await this.device.controlTransferOut({
                requestType: 'class',
                recipient: 'interface',
                request: 0x22, // SET_CONTROL_LINE_STATE
                value: value,
                index: this.controlInterface || 0
            });

            await new Promise(resolve => setTimeout(resolve, 50));
            return result;
        } catch (e) {
            this._log(`[WebUSB CDC] 设置信号失败：${e.message}`);
            throw e;
        }
    }

    /**
     * 为 CP2102 设置信号（Silicon Labs 供应商特定）
     */
    async _setSignalsCP2102(signals) {
        // CP2102 使用供应商特定请求 0x07 (SET_MHS)
        // 位 0：DTR，位 1：RTS，位 8-9：DTR/RTS 掩码

        // 保留未指定信号的当前状态（Web Serial 语义）
        const dtr = signals.dataTerminalReady !== undefined ? signals.dataTerminalReady : this._currentDTR;
        const rts = signals.requestToSend !== undefined ? signals.requestToSend : this._currentRTS;

        // 更新跟踪的状态
        this._currentDTR = dtr;
        this._currentRTS = rts;

        // 为两个信号构建带掩码位的值
        let value = 0;
        value |= (dtr ? 1 : 0) | 0x100; // DTR + 掩码
        value |= (rts ? 2 : 0) | 0x200; // RTS + 掩码

        try {
            const result = await this.device.controlTransferOut({
                requestType: 'vendor',
                recipient: 'device',
                request: 0x07, // SET_MHS（调制解调器握手）
                value: value,
                index: 0x00  // CP2102 始终使用索引 0
            });

            await new Promise(resolve => setTimeout(resolve, 50));
            return result;
        } catch (e) {
            this._log(`[WebUSB CP2102] 设置信号失败：${e.message}`);
            throw e;
        }
    }

    /**
     * 为 CH340 设置信号（WCH 供应商特定）
     */
    async _setSignalsCH340(signals) {
        // 保留未指定信号的当前状态（Web Serial 语义）
        const dtr = signals.dataTerminalReady !== undefined ? signals.dataTerminalReady : this._currentDTR;
        const rts = signals.requestToSend !== undefined ? signals.requestToSend : this._currentRTS;

        // 更新跟踪的状态
        this._currentDTR = dtr;
        this._currentRTS = rts;

        // CH340 使用供应商特定请求 0xA4
        // 位 5：DTR，位 6：RTS（反向逻辑！）
        // 使用按位非并掩码为无符号 16 位来计算值
        const value = (~((dtr ? 1 << 5 : 0) | (rts ? 1 << 6 : 0))) & 0xffff;

        try {
            const result = await this.device.controlTransferOut({
                requestType: 'vendor',
                recipient: 'device',
                request: 0xA4, // CH340 控制请求
                value: value,
                index: 0
            });

            await new Promise(resolve => setTimeout(resolve, 50));
            return result;
        } catch (e) {
            this._log(`[WebUSB CH340] 设置信号失败：${e.message}`);
            throw e;
        }
    }

    /**
     * 端口打开后更改波特率
     * 这对于 ESP 存根加载器在上传存根后更改波特率是必需的
     * 注意：仅适用于供应商特定芯片（CP2102、CH340、FTDI）
     * CDC 设备（CH343、ESP32-S2/S3/C3 原生 USB）自动处理波特率
     */
    async setBaudRate(baudRate) {
        if (!this.device) {
            throw new Error('设备未打开');
        }

        const vid = this.device.vendorId;
        const pid = this.device.productId;

//        this._log(`[WebUSB] 将波特率更改为 ${baudRate}...`);

        // FTDI（VID：0x0403）
        if (vid === 0x0403) {
            // FTDI 波特率计算
            // 现代 FTDI 芯片（FT232R、FT2232 等）：BaseClock = 48MHz
            // BaudDivisor = (48000000 / 16) / BaudRate = 3000000 / BaudRate
            // 除数编码：带子整数除数支持的 16 位值
            // 子整数除数：0、0.125、0.25、0.375、0.5、0.625、0.75、0.875

            const baseClock = 3000000; // 48MHz / 16
            let divisor = baseClock / baudRate;

            // 提取整数和小数部分
            const integerPart = Math.floor(divisor);
            const fractionalPart = divisor - integerPart;

            // 编码子整数除数（0、0.125、0.25、0.375、0.5、0.625、0.75、0.875）
            let subInteger;
            if (fractionalPart < 0.0625) subInteger = 0;      // 0.0
            else if (fractionalPart < 0.1875) subInteger = 1; // 0.125
            else if (fractionalPart < 0.3125) subInteger = 2; // 0.25
            else if (fractionalPart < 0.4375) subInteger = 3; // 0.375
            else if (fractionalPart < 0.5625) subInteger = 4; // 0.5
            else if (fractionalPart < 0.6875) subInteger = 5; // 0.625
            else if (fractionalPart < 0.8125) subInteger = 6; // 0.75
            else subInteger = 7;                               // 0.875

            // 为 FTDI 编码除数值
            // 低字节：整数部分（位 0-7）
            // 高字节：（整数部分 >> 8）|（子整数 << 6）
            const value = (integerPart & 0xFF) | ((subInteger & 0x07) << 14) | (((integerPart >> 8) & 0x3F) << 8);
            const index = (integerPart >> 14) & 0x03; // 整数部分的高 2 位

//            this._log(`[WebUSB FTDI] 设置波特率 ${baudRate}（除数=${divisor.toFixed(3)}，value=0x${value.toString(16)}，index=0x${index.toString(16)}）...`);

            await this.device.controlTransferOut({
                requestType: 'vendor',
                recipient: 'device',
                request: 0x03, // SIO_SET_BAUD_RATE
                value: value,
                index: index
            });

//            this._log('[WebUSB FTDI] 波特率更改成功');
        }
        // CP2102（Silicon Labs VID：0x10c4）
        else if (vid === 0x10c4) {
            // CP210x 波特率编码（来自 Silicon Labs AN571）
            // 对于 CP2102/CP2103：使用直接的 32 位波特率值
            // 请求：IFC_SET_BAUDRATE (0x1E)

            // 将波特率编码为 32 位小端值
            const baudrateBuffer = new ArrayBuffer(4);
            const baudrateView = new DataView(baudrateBuffer);
            baudrateView.setUint32(0, baudRate, true); // 小端序

            await this.device.controlTransferOut({
                requestType: 'vendor',
                recipient: 'interface',
                request: 0x1E, // IFC_SET_BAUDRATE
                value: 0,
                index: 0
            }, baudrateBuffer);
        }
        // CH340（WCH VID：0x1a86，但不是 CH343 PID：0x55d3）
        else if (vid === 0x1a86 && pid !== 0x55d3) {
            // CH340 波特率计算（来自 Linux 内核驱动程序）
            const CH341_BAUDBASE_FACTOR = 1532620800;
            const CH341_BAUDBASE_DIVMAX = 3;

            let factor = Math.floor(CH341_BAUDBASE_FACTOR / baudRate);
            let divisor = CH341_BAUDBASE_DIVMAX;

            // 如果因子太大则减小
            while (factor > 0xfff0 && divisor > 0) {
                factor >>= 3;
                divisor--;
            }

            if (factor > 0xfff0) {
                throw new Error(`CH340 不支持波特率 ${baudRate}`);
            }

            factor = 0x10000 - factor;
            const a = (factor & 0xff00) | divisor;
            const b = factor & 0xff;

            // CH340 使用请求 0x9A 设置波特率
            await this.device.controlTransferOut({
                requestType: 'vendor',
                recipient: 'device',
                request: 0x9A, // CH340 设置波特率
                value: 0x1312, // 用于设置波特率的固定值
                index: a
            });

            // 第二个带 b 值的控制传输
            await this.device.controlTransferOut({
                requestType: 'vendor',
                recipient: 'device',
                request: 0x9A,
                value: 0x0f2c, // 固定值
                index: b
            });

        }
        // CDC 设备（CH343、ESP32 原生 USB）- setBaudRate() 中无需操作
        // 它们在 esp_loader.ts 中通过关闭/重新打开处理

        // 等待波特率更改生效
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    get readable() {
        return this.readableStream;
    }

    get writable() {
        return this.writableStream;
    }

    _createStreams() {
        // 用于传入数据的 ReadableStream
        this.readableStream = new ReadableStream({
            start: async (controller) => {
                this._readLoopRunning = true;
                let streamErrored = false;

                // 在启动读取循环之前验证端点
                if (this.endpointIn == null) {
                    controller.error(new Error('未配置批量 IN 端点'));
                    return;
                }

                try {
                    while (this._readLoopRunning && this.device) {
                        try {
                            // 关键：在读取更多数据之前检查背压
                            // 如果 desiredSize 为 0 或负数，则消费者无法跟上
                            // 等待消费者排空缓冲区后再读取更多数据
                            if (controller.desiredSize !== null && controller.desiredSize <= 0) {
                                // 消费者积压 - 等待后再读取更多
                                await new Promise(r => setTimeout(r, 10));
                                continue;
                            }

                            const result = await this.device.transferIn(this.endpointIn, this.maxTransferSize);

                            if (result.status === 'ok') {
                                controller.enqueue(new Uint8Array(result.data.buffer, result.data.byteOffset, result.data.byteLength));
                                // 少量延迟让消费者处理数据
                                // 这防止在 Android 上压倒 TextDecoderStream
                                await new Promise(r => setTimeout(r, 1));
                                continue;
                            } else if (result.status === 'stall') {
                                await this.device.clearHalt('in', this.endpointIn);
                                await new Promise(r => setTimeout(r, 1));
                                continue;
                            }
                            // 如果未收到数据，才等待
                            await new Promise(r => setTimeout(r, 1));
                        } catch (error) {
                            if (error.message && (error.message.includes('device unavailable') ||
                              error.message.includes('device has been lost') ||
                              error.message.includes('device was disconnected') ||
                              error.message.includes('No device selected'))) {
                                break;
                            }
                            if (error.message && (error.message.includes('transfer was cancelled') ||
                              error.message.includes('transfer error has occurred'))) {
                                continue;
                            }
                            this._log('USB 读取错误：', error.message);
                            // 错误后等待片刻再重试
                            await new Promise(r => setTimeout(r, 10));
                        }
                    }
                } catch (error) {
                    streamErrored = true;
                    controller.error(error);
                } finally {
                    // 仅当流未出错时才关闭
                    if (!streamErrored) {
                        controller.close();
                    }
                }
            },
            cancel: () => {
                this._readLoopRunning = false;
            }
        });

        // 用于传出数据的 WritableStream
        this.writableStream = new WritableStream({
            write: async (chunk) => {
                if (!this.device) {
                    throw new Error('设备未打开');
                }
                if (this.endpointOut == null) {
                    throw new Error('未配置批量 OUT 端点');
                }
                await this.device.transferOut(this.endpointOut, chunk);
            }
        });
    }

    /**
     * 在不关闭端口的情况下重新创建流
     * 在硬件重置或切换到控制台模式后很有用
     * 这会停止当前读取循环并创建新流
     */
    recreateStreams() {
        // 停止当前读取循环
        this._readLoopRunning = false;

        // 等待片刻让读取循环完成
        // 当 _readLoopRunning 变为 false 时，ReadableStream 将自行关闭
        return new Promise((resolve) => {
            setTimeout(() => {
                // 创建新流
                this._createStreams();
                resolve();
            }, 100);
        });
    }

    _cleanup() {
        this._readLoopRunning = false;
        if (this._usbDisconnectHandler) {
            navigator.usb.removeEventListener('disconnect', this._usbDisconnectHandler);
            this._usbDisconnectHandler = null;
        }
    }

    _fireEvent(type) {
        const listeners = this._eventListeners[type] || [];
        listeners.forEach(listener => {
            try {
                listener();
            } catch (e) {
                this._log(`${type} 事件监听器错误：`, e);
            }
        });
    }

    addEventListener(type, listener) {
        if (this._eventListeners[type]) {
            this._eventListeners[type].push(listener);
        }
    }

    removeEventListener(type, listener) {
        if (this._eventListeners[type]) {
            const index = this._eventListeners[type].indexOf(listener);
            if (index !== -1) {
                this._eventListeners[type].splice(index, 1);
            }
        }
    }
}

/**
 * 统一的端口请求函数，在 Android 上尝试 WebUSB，在桌面上尝试 Web Serial
 * 这为桌面（Web Serial）和 Android（WebUSB）提供无缝支持
 * @param {boolean} forceNew - 如果为 true，则强制选择新设备（忽略已配对的设备）
 */
async function requestSerialPort(forceNew = false) {
    // 检测是否在 Android 上
    const isAndroid = /Android/i.test(navigator.userAgent);
    const hasSerial = 'serial' in navigator;
    const hasUSB = 'usb' in navigator;

    console.log(`[requestSerialPort] 平台：${isAndroid ? 'Android' : '桌面'}，Web Serial：${hasSerial}，WebUSB：${hasUSB}`);

    // 在 Android 上，优先使用 WebUSB（Web Serial 无法正常工作）
    if (isAndroid && hasUSB) {
        try {
            return await WebUSBSerial.requestPort(null, forceNew);
        } catch (err) {
            console.log('WebUSB 失败，尝试 Web Serial...', err.message);
        }
    }

    // 尝试 Web Serial API（桌面首选）
    if (hasSerial) {
        try {
            // Web Serial API 不支持以相同方式重用设备
            // 它始终显示选择器，但浏览器记住权限
            return await navigator.serial.requestPort();
        } catch (err) {
            console.log('Web Serial 不可用或已取消，尝试 WebUSB...');
        }
    }

    // 回退到 WebUSB
    if (hasUSB) {
        try {
            return await WebUSBSerial.requestPort(null, forceNew);
        } catch (err) {
            throw new Error('Web Serial 和 WebUSB 均不可用或用户取消');
        }
    }

    throw new Error('此浏览器不支持 Web Serial API 或 WebUSB');
}

// 同时设置到 globalThis 以用于非模块化使用（例如动态脚本加载）
if (typeof globalThis !== 'undefined') {
    globalThis.WebUSBSerial = WebUSBSerial;
    globalThis.requestSerialPort = requestSerialPort;
}

// 导出为 ES 模块
export { WebUSBSerial, requestSerialPort };