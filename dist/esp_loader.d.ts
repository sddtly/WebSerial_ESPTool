import { Logger, ChipFamily, SpiFlashAddresses } from "./const";
export declare class ESPLoader extends EventTarget {
    port: SerialPort;
    logger: Logger;
    private _parent?;
    __chipFamily?: ChipFamily;
    __chipName: string | null;
    __chipRevision: number | null;
    __chipVariant: string | null;
    _efuses: any[];
    _flashsize: number;
    debug: boolean;
    IS_STUB: boolean;
    connected: boolean;
    flashSize: string | null;
    __inputBuffer?: number[];
    __inputBufferReadIndex?: number;
    __totalBytesRead?: number;
    currentBaudRate: number;
    private _maxUSBSerialBaudrate?;
    __reader?: ReadableStreamDefaultReader<Uint8Array>;
    private SLIP_END;
    private SLIP_ESC;
    private SLIP_ESC_END;
    private SLIP_ESC_ESC;
    private _isESP32S2NativeUSB;
    private _initializationSucceeded;
    private __commandLock;
    private __isReconfiguring;
    private __abandonCurrentOperation;
    private _suppressDisconnect;
    private __consoleMode;
    _isUsbJtagOrOtg: boolean | undefined;
    /**
     * 检查设备是否使用 USB-JTAG 或 USB-OTG（而不是外部串行芯片）
     * 如果尚未确定，返回 undefined
     */
    get isUsbJtagOrOtg(): boolean | undefined;
    private __adaptiveBlockMultiplier;
    private __adaptiveMaxInFlightMultiplier;
    private __consecutiveSuccessfulChunks;
    private __lastAdaptiveAdjustment;
    private __isCDCDevice;
    constructor(port: SerialPort, logger: Logger, _parent?: ESPLoader | undefined);
    get chipFamily(): ChipFamily;
    set chipFamily(value: ChipFamily);
    get chipName(): string | null;
    set chipName(value: string | null);
    get chipRevision(): number | null;
    set chipRevision(value: number | null);
    get chipVariant(): string | null;
    set chipVariant(value: string | null);
    private get _consoleMode();
    private set _consoleMode(value);
    setConsoleMode(value: boolean): void;
    private get _inputBuffer();
    private get _inputBufferReadIndex();
    private set _inputBufferReadIndex(value);
    private get _inputBufferAvailable();
    private _readByte;
    private _clearInputBuffer;
    private _compactInputBuffer;
    private get _totalBytesRead();
    private set _totalBytesRead(value);
    private get _commandLock();
    private set _commandLock(value);
    private get _isReconfiguring();
    private set _isReconfiguring(value);
    private get _abandonCurrentOperation();
    private set _abandonCurrentOperation(value);
    private get _adaptiveBlockMultiplier();
    private set _adaptiveBlockMultiplier(value);
    private get _adaptiveMaxInFlightMultiplier();
    private set _adaptiveMaxInFlightMultiplier(value);
    private get _consecutiveSuccessfulChunks();
    private set _consecutiveSuccessfulChunks(value);
    private get _lastAdaptiveAdjustment();
    private set _lastAdaptiveAdjustment(value);
    private get _isCDCDevice();
    private set _isCDCDevice(value);
    private detectUSBSerialChip;
    initialize(): Promise<void>;
    /**
     * 使用 GET_SECURITY_INFO（对于较新的芯片）或魔数（对于较旧的芯片）检测芯片类型
     */
    detectChip(): Promise<void>;
    getChipRevision(): Promise<number>;
    /**
     * 为 ESP32-P4 Rev 301 (ECO6) 开启闪存芯片的电源
     * 在 ECO6 上，闪存芯片默认关闭电源，因为默认闪存电压从 1.8V 变为 3.3V。
     * 这是为了防止损坏 1.8V 的闪存芯片。
     */
    powerOnFlash(): Promise<void>;
    /**
     * 获取安全信息，包括芯片 ID（ESP32-C3 及更高版本）
     */
    getSecurityInfo(): Promise<{
        flags: number;
        flashCryptCnt: number;
        keyPurposes: number[];
        chipId: number;
        apiVersion: number;
    }>;
    /**
     * 从 efuses 获取 MAC 地址
     */
    getMacAddress(): Promise<string>;
    /**
     * @name readLoop
     * 从输入流读取数据并将其放入 inputBuffer
     */
    readLoop(): Promise<void>;
    state_DTR: boolean;
    state_RTS: boolean;
    setRTS(state: boolean): Promise<void>;
    setDTR(state: boolean): Promise<void>;
    setDTRandRTS(dtr: boolean, rts: boolean): Promise<void>;
    private runSignalSequence;
    /**
     * @name hardResetUSBJTAGSerial
     * 用于 Web 串行（桌面端）的 USB-JTAG/串行复位
     */
    hardResetUSBJTAGSerial(): Promise<void>;
    /**
     * @name hardResetClassic
     * 用于 Web 串行（桌面端）的经典复位，DTR = IO0，RTS = EN
     */
    hardResetClassic(): Promise<void>;
    /**
     * 复位到固件模式（非引导加载程序），用于 Web 串行
     * 在复位期间保持 IO0=HIGH，以便芯片启动到固件
     */
    hardResetToFirmware(): Promise<void>;
    /**
     * @name hardResetUnixTight
     * 用于 Web 串行（桌面端）的 Unix 紧密复位 - 同时设置 DTR 和 RTS
     */
    hardResetUnixTight(): Promise<void>;
    setRTSWebUSB(state: boolean): Promise<void>;
    setDTRWebUSB(state: boolean): Promise<void>;
    setDTRandRTSWebUSB(dtr: boolean, rts: boolean): Promise<void>;
    /**
     * @name hardResetUSBJTAGSerialInvertedDTRWebUSB
     * 用于 WebUSB（安卓端）的具有反转 DTR 的 USB-JTAG/串行复位
     */
    hardResetUSBJTAGSerialInvertedDTRWebUSB(): Promise<void>;
    /**
     * @name hardResetClassicLongDelayWebUSB
     * 用于 WebUSB（安卓端）的具有较长延迟的经典复位
     * 专门针对可能需要更多时间的 CP2102/CH340
     */
    hardResetClassicLongDelayWebUSB(): Promise<void>;
    /**
     * @name hardResetClassicShortDelayWebUSB
     * 用于 WebUSB（安卓端）的具有较短延迟的经典复位
     */
    hardResetClassicShortDelayWebUSB(): Promise<void>;
    /**
     * @name hardResetInvertedWebUSB
     * 用于 WebUSB（安卓端）的反转复位序列 - 两个信号都反转
     */
    hardResetInvertedWebUSB(): Promise<void>;
    /**
     * @name hardResetInvertedDTRWebUSB
     * 用于 WebUSB（安卓端）的仅 DTR 反转
     */
    hardResetInvertedDTRWebUSB(): Promise<void>;
    /**
     * @name hardResetInvertedRTSWebUSB
     * 用于 WebUSB（安卓端）的仅 RTS 反转
     */
    hardResetInvertedRTSWebUSB(): Promise<void>;
    /**
     * 检查我们使用的是 WebUSB（安卓端）还是 Web 串行（桌面端）
     */
    private isWebUSB;
    /**
     * @name connectWithResetStrategies
     * 尝试不同的复位策略以进入引导加载程序模式
     * 类似于 esptool.py 的 connect() 方法，具有多种复位策略
     */
    connectWithResetStrategies(): Promise<void>;
    /**
     * @name watchdogReset
     * 针对具有 USB-OTG 或 USB-JTAG/串行的 ESP32-S2/S3/C3 的看门狗复位
     * 使用 RTC 看门狗定时器复位芯片 - 在 DTR/RTS 信号不可用时有效
     * 这是为了向后兼容而对 rtcWdtResetChipSpecific() 的别名
     */
    watchdogReset(): Promise<void>;
    /**
     * 针对 ESP32-S2、ESP32-S3、ESP32-C3、ESP32-C5、ESP32-C6 和 ESP32-P4 的 RTC 看门狗定时器复位
     * 使用每个芯片系列的特定寄存器
     * 注意：ESP32-H2 不支持 WDT 复位
     */
    rtcWdtResetChipSpecific(): Promise<void>;
    /**
     * 将设备从引导加载程序模式复位到固件模式
     * 根据 USB 连接类型自动选择正确的复位策略
     * @param clearForceDownloadFlag - 如果为 true，则清除强制下载启动标志（仅限 USB-OTG）
     * @returns 如果端口将更改（USB-OTG）则返回 true，否则返回 false
     */
    resetToFirmwareMode(clearForceDownloadFlag?: boolean): Promise<boolean>;
    hardReset(bootloader?: boolean): Promise<void>;
    /**
     * @name macAddr
     * 烧录到 ESP 芯片 OTP 存储器中的 MAC 地址
     */
    macAddr(): any[];
    readRegister(reg: number): Promise<number>;
    /**
     * @name checkCommand
     * 发送命令包，检查命令是否成功，并返回包含值和数据的元组。
     * 有关值/数据的更多详细信息，请参阅 ESP 串行协议。
     *
     * 命令被序列化以防止并发执行，这可能导致在 Windows 下的 CP210x 适配器上发生 WritableStream 锁定争用。
     */
    checkCommand(opcode: number, buffer: number[], checksum?: number, timeout?: number): Promise<[number, number[]]>;
    /**
     * @name sendCommand
     * 在 UART 上发送经过 slip 编码、带校验和的命令，不检查响应
     */
    sendCommand(opcode: number, buffer: number[], checksum?: number): Promise<void>;
    /**
     * @name readPacket
     * 从串口读取 SLIP 包的生成器。
     * 每次生成一个完整的 SLIP 包，在超时或无效数据时引发异常。
     *
     * 两种实现：
     * - 突发模式：CDC 设备（原生 USB）和 CH343 - 极速处理
     * - 逐字节模式：CH340、CP2102 和其他 USB 串行适配器 - 稳定快速处理
     */
    readPacket(timeout: number): Promise<number[]>;
    /**
     * @name getResponse
     * 读取响应数据并解码 slip 包，然后解析出值/数据，并返回元组 (value, data)，其中每个都是字节列表
     */
    getResponse(opcode: number, timeout?: number): Promise<[number, number[]]>;
    /**
     * @name checksum
     * 计算数据块的校验和，如 ROM 所定义
     */
    checksum(data: number[], state?: number): number;
    getC5CrystalFreqRomExpect(): Promise<number>;
    getC5CrystalFreqDetected(): Promise<number>;
    setBaudrate(baud: number): Promise<void>;
    private setBaudrateC5Rom;
    reconfigurePort(baud: number): Promise<void>;
    /**
     * @name syncWithTimeout
     * 带超时的同步，可以放弃（用于复位策略循环）
     * 此方法内部有时间限制，并检查放弃标志
     */
    syncWithTimeout(timeoutMs: number): Promise<boolean>;
    /**
     * @name sync
     * 进入 ROM 引导加载模式并尝试与 ESP ROM 引导加载程序同步，我们将重试几次
     */
    sync(): Promise<boolean>;
    /**
     * @name _sync
     * 使用 AT 同步包执行软同步，不执行任何硬件复位
     */
    _sync(): Promise<boolean>;
    /**
     * @name getFlashWriteSize
     * 根据芯片获取闪存写入大小
     */
    getFlashWriteSize(): 1024 | 16384;
    /**
     * @name flashData
     * 将完整的未压缩二进制文件编程到 SPI 闪存的给定偏移量处。
     * 如果是 ESP32 且传入了 md5 字符串，还将验证内存。ESP8266 在 ROM 中没有校验和内存验证功能。
     */
    flashData(binaryData: ArrayBuffer, updateProgress: (bytesWritten: number, totalBytes: number) => void, offset?: number, compress?: boolean): Promise<void>;
    /**
     * @name flashBlock
     * 发送一个数据块以编程到 SPI 闪存中
     */
    flashBlock(data: number[], seq: number, timeout?: number): Promise<void>;
    flashDeflBlock(data: number[], seq: number, timeout?: number): Promise<void>;
    /**
     * @name flashBegin
     * 通过附加 SPI 芯片并擦除所需数量的块来为闪存做准备。
     */
    flashBegin(size?: number, offset?: number, encrypted?: boolean): Promise<number>;
    /**
     * @name flashDeflBegin
     *
     */
    flashDeflBegin(size?: number, compressedSize?: number, offset?: number): Promise<number>;
    flashFinish(): Promise<void>;
    flashDeflFinish(): Promise<void>;
    getBootloaderOffset(): number;
    flashId(): Promise<number>;
    getChipFamily(): ChipFamily;
    writeRegister(address: number, value: number, mask?: number, delayUs?: number, delayAfterUs?: number): Promise<void>;
    setDataLengths(spiAddresses: SpiFlashAddresses, mosiBits: number, misoBits: number): Promise<void>;
    waitDone(spiCmdReg: number, spiCmdUsr: number): Promise<void>;
    runSpiFlashCommand(spiflashCommand: number, data: number[], readBits?: number): Promise<number>;
    detectFlashSize(): Promise<void>;
    /**
     * @name getEraseSize
     * 根据给定的字节大小计算擦除大小。
     *   为 ESP8266 上的引导加载程序擦除错误提供解决方法。
     */
    getEraseSize(offset: number, size: number): number;
    /**
     * @name memBegin (592)
     * 开始下载应用程序镜像到 RAM
     */
    memBegin(size: number, blocks: number, blocksize: number, offset: number): Promise<[number, number[]]>;
    /**
     * @name memBlock (609)
     * 发送镜像的一个块到 RAM
     */
    memBlock(data: number[], seq: number): Promise<[number, number[]]>;
    /**
     * @name memFinish (615)
     * 离开下载模式并运行应用程序
     *
     * 发送 ESP_MEM_END 通常会返回正确的响应，但有时（对于 ROM 加载程序）
     * 执行的代码可能在发送 FIFO 为空之前复位 UART 或更改波特率。
     * 因此在这些情况下，我们设置较短的超时并忽略错误。
     */
    memFinish(entrypoint?: number): Promise<[number, number[]]>;
    runStub(skipFlashDetection?: boolean): Promise<EspStubLoader>;
    __writer?: WritableStreamDefaultWriter<Uint8Array>;
    __writeChain: Promise<void>;
    private get _reader();
    private set _reader(value);
    private get _writer();
    private set _writer(value);
    private get _writeChain();
    private set _writeChain(value);
    writeToStream(data: number[]): Promise<void>;
    disconnect(): Promise<void>;
    /**
     * @name releaseReaderWriter
     * 释放读取器和写入器锁而不关闭端口
     * 在切换到控制台模式时使用
     */
    releaseReaderWriter(): Promise<void>;
    /**
     * @name resetToFirmware
     * 公共方法，用于在切换到控制台模式时将设备从引导加载程序复位到固件
     * 自动检测 USB-JTAG/串行和 USB-OTG 设备并执行适当的复位
     * @returns 如果执行了复位则返回 true，如果不需要则返回 false
     */
    resetToFirmware(): Promise<boolean>;
    /**
     * @name detectUsbConnectionType
     * 检测设备是否使用 USB-JTAG/串行或 USB-OTG（而非外部串行芯片）
     * 使用 USB PID（产品 ID）进行可靠检测 - 不需要 chipFamily
     * @returns 如果为 USB-JTAG 或 USB-OTG 则返回 true，如果为外部串行芯片则返回 false
     */
    detectUsbConnectionType(): Promise<boolean>;
    getUsbMode(): Promise<{
        mode: "uart" | "usb-jtag-serial" | "usb-otg";
        uartNo: number;
    }>;
    /**
     * 检查当前芯片是否支持 USB-JTAG 或 USB-OTG
     * @returns 如果芯片具有原生 USB 支持（JTAG 或 OTG）则返回 true
     */
    supportsNativeUsb(): boolean;
    /**
     * @name _ensureStreamsReady
     * 硬件复位后，确保端口流可用。
     * 在 WebUSB 上，由于复位后流会中断，因此重新创建流。
     * 在 Web 串行上，等待流变得可用。
     */
    private _ensureStreamsReady;
    /**
     * @name enterConsoleMode
     * 通过复位到固件来为控制台模式准备设备
     * 处理 USB-JTAG/OTG 设备（关闭端口）和外部串行芯片（保持端口打开）
     * @returns 如果端口已关闭（USB-JTAG）则返回 true，如果端口保持打开（串行芯片）则返回 false
     */
    enterConsoleMode(): Promise<boolean>;
    /**
     * @name _clearForceDownloadBootIfNeeded
     * 读取并清除强制下载启动标志（如果已设置）
     * 这应该仅在处于 ROM（非 stub）且 WDT 复位之前调用
     * 在每次连接时清除它会导致闪存操作出现问题
     * 如果标志已清除则返回 true，如果已清除则返回 false
     */
    private _clearForceDownloadBootIfNeeded;
    /**
     * @name _resetToFirmwareIfNeeded
     * 在切换到控制台模式时，将设备从引导加载程序复位到固件
     * 检测 USB-JTAG/串行和 USB-OTG 设备并执行适当的复位
     * @returns 如果执行了重新连接则返回 true，否则返回 false
     */
    private _resetToFirmwareIfNeeded;
    /**
     * @name reconnect
     * 重新连接串口以刷新浏览器缓冲区并重新加载 stub
     */
    reconnect(): Promise<void>;
    /**
     * @name reconnectToBootloader
     * 关闭并重新打开端口，然后将 ESP 复位到引导加载程序模式
     * 在 Improv 或其他使 ESP 处于固件模式的操作后需要这样做
     */
    reconnectToBootloader(): Promise<void>;
    /**
     * @name exitConsoleMode
     * 退出控制台模式并返回引导加载程序
     * 对于 ESP32-S2，使用 reconnectToBootloader，这将触发端口更改
     * @returns 如果需要手动重新连接（ESP32-S2）则返回 true，否则返回 false
     */
    exitConsoleMode(): Promise<boolean>;
    /**
     * @name isConsoleResetSupported
     * 检查此设备是否支持控制台复位
     * ESP32-S2 USB-JTAG/CDC 不支持控制台模式复位，
     * 因为任何复位都会导致 USB 端口丢失（硬件限制）
     */
    isConsoleResetSupported(): boolean;
    /**
     * @name resetInConsoleMode
     * 在控制台模式（固件模式）下复位设备
     *
     * 注意：对于 ESP32-S2 USB-JTAG/CDC，任何复位（硬件或软件）都会导致
     * USB 端口丢失，因为设备在复位期间会切换 USB 模式。
     * 这是硬件限制 - 首先使用 isConsoleResetSupported() 检查。
     */
    resetInConsoleMode(): Promise<void>;
    /**
     * @name syncAndWdtReset
     * 打开一个新的引导加载程序端口，与 ROM 同步（无 stub，无复位策略），并触发 WDT 复位。
     * 这用于需要 WDT 复位以切换模式的 ESP32-S2 USB-OTG 设备。
     * WDT 复位后端口将再次重新枚举。
     * 调用此方法后，用户必须选择新端口。
     * @param newPort - 用户选择的引导加载程序端口
     */
    syncAndWdtReset(newPort: SerialPort): Promise<void>;
    /**
     * @name drainInputBuffer
     * 通过在指定时间内读取数据来主动排空输入缓冲区。
     * 对于某些驱动程序（尤其是 Windows 上的 CP210x）缓冲刷新有问题时，采用简单方法。
     *
     * 基于 esptool.py 的修复：https://github.com/espressif/esptool/commit/5338ea054e5099ac7be235c54034802ac8a43162
     *
     * @param bufferingTime - 等待缓冲区填充的时间（毫秒）
     */
    drainInputBuffer(bufferingTime?: number): Promise<void>;
    /**
     * @name flushSerialBuffers
     * 刷新 TX 和 RX 串口缓冲区中任何待处理的数据
     * 这会清空应用程序 RX 缓冲区并等待硬件缓冲区排空
     */
    flushSerialBuffers(): Promise<void>;
    /**
     * @name readFlash
     * 从芯片读取闪存（仅适用于 stub 加载程序）
     * @param addr - 要读取的地址
     * @param size - 要读取的字节数
     * @param onPacketReceived - 收到数据包时调用的可选回调函数
     * @param options - 用于高级控制的可选参数
     *   - chunkSize: 一次命令中向 ESP 请求的数据量（字节）
     *   - blockSize: ESP 发送的每个数据块的大小（字节）
     *   - maxInFlight: 最大未确认字节数（字节）
     * @returns 包含闪存数据的 Uint8Array
     */
    readFlash(addr: number, size: number, onPacketReceived?: (packet: Uint8Array, progress: number, totalSize: number) => void, options?: {
        chunkSize?: number;
        blockSize?: number;
        maxInFlight?: number;
    }): Promise<Uint8Array>;
}
declare class EspStubLoader extends ESPLoader {
    IS_STUB: boolean;
    /**
     * @name memBegin (592)
     * 开始下载应用程序镜像到 RAM
     */
    memBegin(size: number, _blocks: number, _blocksize: number, offset: number): Promise<[number, number[]]>;
    /**
     * @name eraseFlash
     * 擦除整个闪存芯片
     */
    eraseFlash(): Promise<void>;
    /**
     * @name eraseRegion
     * 擦除闪存的特定区域
     */
    eraseRegion(offset: number, size: number): Promise<void>;
}
export {};
