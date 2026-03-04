/// <reference types="@types/w3c-web-serial" />

import {
  CHIP_FAMILY_ESP32,
  CHIP_FAMILY_ESP32S2,
  CHIP_FAMILY_ESP32S3,
  CHIP_FAMILY_ESP32C2,
  CHIP_FAMILY_ESP32C3,
  CHIP_FAMILY_ESP32C5,
  CHIP_FAMILY_ESP32C6,
  CHIP_FAMILY_ESP32C61,
  CHIP_FAMILY_ESP32H2,
  CHIP_FAMILY_ESP32H4,
  CHIP_FAMILY_ESP32H21,
  CHIP_FAMILY_ESP32P4,
  CHIP_FAMILY_ESP32S31,
  CHIP_FAMILY_ESP8266,
  MAX_TIMEOUT,
  Logger,
  DEFAULT_TIMEOUT,
  ERASE_REGION_TIMEOUT_PER_MB,
  ESP_CHANGE_BAUDRATE,
  ESP_CHECKSUM_MAGIC,
  ESP_FLASH_BEGIN,
  ESP_FLASH_DATA,
  ESP_FLASH_END,
  ESP_MEM_BEGIN,
  ESP_MEM_DATA,
  ESP_MEM_END,
  ESP_READ_REG,
  ESP_WRITE_REG,
  ESP_SPI_ATTACH,
  ESP_SYNC,
  ESP_GET_SECURITY_INFO,
  FLASH_SECTOR_SIZE,
  FLASH_WRITE_SIZE,
  STUB_FLASH_WRITE_SIZE,
  MEM_END_ROM_TIMEOUT,
  ROM_INVALID_RECV_MSG,
  SYNC_PACKET,
  SYNC_TIMEOUT,
  USB_RAM_BLOCK,
  ChipFamily,
  ESP_ERASE_FLASH,
  ESP_ERASE_REGION,
  ESP_READ_FLASH,
  CHIP_ERASE_TIMEOUT,
  FLASH_READ_TIMEOUT,
  timeoutPerMb,
  ESP_ROM_BAUD,
  USB_JTAG_SERIAL_PID,
  ESP_FLASH_DEFL_BEGIN,
  ESP_FLASH_DEFL_DATA,
  ESP_FLASH_DEFL_END,
  getSpiFlashAddresses,
  SpiFlashAddresses,
  DETECTED_FLASH_SIZES,
  CHIP_DETECT_MAGIC_REG_ADDR,
  CHIP_DETECT_MAGIC_VALUES,
  CHIP_ID_TO_INFO,
  ESP32_BASEFUSEADDR,
  ESP32_APB_CTL_DATE_ADDR,
  ESP32S2_EFUSE_BLOCK1_ADDR,
  ESP32S3_EFUSE_BLOCK1_ADDR,
  ESP32C2_EFUSE_BLOCK2_ADDR,
  ESP32C5_EFUSE_BLOCK1_ADDR,
  ESP32C6_EFUSE_BLOCK1_ADDR,
  ESP32C61_EFUSE_BLOCK1_ADDR,
  ESP32H2_EFUSE_BLOCK1_ADDR,
  ESP32P4_EFUSE_BLOCK1_ADDR,
  ESP32S31_EFUSE_BLOCK1_ADDR,
  SlipReadError,
  ESP32S2_RTC_CNTL_WDTWPROTECT_REG,
  ESP32S2_RTC_CNTL_WDTCONFIG0_REG,
  ESP32S2_RTC_CNTL_WDTCONFIG1_REG,
  ESP32S2_RTC_CNTL_WDT_WKEY,
  ESP32S2_RTC_CNTL_OPTION1_REG,
  ESP32S2_RTC_CNTL_FORCE_DOWNLOAD_BOOT_MASK,
  ESP32S3_RTC_CNTL_WDTWPROTECT_REG,
  ESP32S3_RTC_CNTL_WDTCONFIG0_REG,
  ESP32S3_RTC_CNTL_WDTCONFIG1_REG,
  ESP32S3_RTC_CNTL_WDT_WKEY,
  ESP32S3_RTC_CNTL_OPTION1_REG,
  ESP32S3_RTC_CNTL_FORCE_DOWNLOAD_BOOT_MASK,
  ESP32C3_EFUSE_RD_MAC_SPI_SYS_3_REG,
  ESP32C3_EFUSE_RD_MAC_SPI_SYS_5_REG,
  ESP32C3_RTC_CNTL_WDTWPROTECT_REG,
  ESP32C3_RTC_CNTL_WDTCONFIG0_REG,
  ESP32C3_RTC_CNTL_WDTCONFIG1_REG,
  ESP32C3_RTC_CNTL_WDT_WKEY,
  ESP32C5_C6_RTC_CNTL_WDTWPROTECT_REG,
  ESP32C5_C6_RTC_CNTL_WDTCONFIG0_REG,
  ESP32C5_C6_RTC_CNTL_WDTCONFIG1_REG,
  ESP32C5_C6_RTC_CNTL_WDT_WKEY,
  ESP32C5_UART_CLKDIV_REG,
  ESP32C5_PCR_SYSCLK_CONF_REG,
  ESP32C5_PCR_SYSCLK_XTAL_FREQ_V,
  ESP32C5_PCR_SYSCLK_XTAL_FREQ_S,
  ESP32P4_RTC_CNTL_WDTWPROTECT_REG,
  ESP32P4_RTC_CNTL_WDTCONFIG0_REG,
  ESP32P4_RTC_CNTL_WDTCONFIG1_REG,
  ESP32P4_RTC_CNTL_WDT_WKEY,
  ESP32P4_RTC_CNTL_OPTION1_REG,
  ESP32P4_RTC_CNTL_FORCE_DOWNLOAD_BOOT_MASK,
  ESP32P4_LP_SYSTEM_REG_ANA_XPD_PAD_GROUP_REG,
  ESP32P4_PMU_EXT_LDO_P0_0P1A_ANA_REG,
  ESP32P4_PMU_ANA_0P1A_EN_CUR_LIM_0,
  ESP32P4_PMU_EXT_LDO_P0_0P1A_REG,
  ESP32P4_PMU_0P1A_TARGET0_0,
  ESP32P4_PMU_0P1A_FORCE_TIEH_SEL_0,
  ESP32P4_PMU_DATE_REG,
  ESP32S2_UARTDEV_BUF_NO,
  ESP32S2_UARTDEV_BUF_NO_USB_OTG,
  ESP32S3_UARTDEV_BUF_NO,
  ESP32S3_UARTDEV_BUF_NO_USB_OTG,
  ESP32S3_UARTDEV_BUF_NO_USB_JTAG_SERIAL,
  ESP32C3_UARTDEV_BUF_NO_USB_JTAG_SERIAL,
  ESP32C3_BUF_UART_NO_OFFSET,
  ESP32C5_UARTDEV_BUF_NO,
  ESP32C5_UARTDEV_BUF_NO_USB_JTAG_SERIAL,
  ESP32C6_UARTDEV_BUF_NO,
  ESP32C6_UARTDEV_BUF_NO_USB_JTAG_SERIAL,
  ESP32C61_UARTDEV_BUF_NO_REV_LE2,
  ESP32C61_UARTDEV_BUF_NO_REV_GT2,
  ESP32C61_UARTDEV_BUF_NO_USB_JTAG_SERIAL_REV_LE2,
  ESP32C61_UARTDEV_BUF_NO_USB_JTAG_SERIAL_REV_GT2,
  ESP32H2_UARTDEV_BUF_NO,
  ESP32H2_UARTDEV_BUF_NO_USB_JTAG_SERIAL,
  ESP32H4_UARTDEV_BUF_NO,
  ESP32H4_UARTDEV_BUF_NO_USB_JTAG_SERIAL,
  ESP32P4_UARTDEV_BUF_NO_REV0,
  ESP32P4_UARTDEV_BUF_NO_REV300,
  ESP32P4_UARTDEV_BUF_NO_USB_OTG,
  ESP32P4_UARTDEV_BUF_NO_USB_JTAG_SERIAL,
} from "./const";
import { getStubCode } from "./stubs";
import { hexFormatter, padTo, sleep, slipEncode, toHex } from "./util";
import { deflate } from "pako";
import { pack, unpack } from "./struct";

// WebUSB 串口接口（扩展了 SerialPort，添加了 WebUSB 特定的方法）
interface WebUSBSerialPort extends SerialPort {
  isWebUSB?: boolean;
  maxTransferSize?: number;
  setSignals(signals: {
    dataTerminalReady?: boolean;
    requestToSend?: boolean;
  }): Promise<void>;
  setBaudRate(baudRate: number): Promise<void>;
}

export class ESPLoader extends EventTarget {
  __chipFamily?: ChipFamily;
  __chipName: string | null = null;
  __chipRevision: number | null = null;
  __chipVariant: string | null = null;
  _efuses = new Array(4).fill(0);
  _flashsize = 4 * 1024 * 1024;
  debug = false;
  IS_STUB = false;
  connected = true;
  flashSize: string | null = null;

  __inputBuffer?: number[];
  __inputBufferReadIndex?: number;
  __totalBytesRead?: number;
  public currentBaudRate: number = ESP_ROM_BAUD;
  private _maxUSBSerialBaudrate?: number;
  public __reader?: ReadableStreamDefaultReader<Uint8Array>;
  private SLIP_END = 0xc0;
  private SLIP_ESC = 0xdb;
  private SLIP_ESC_END = 0xdc;
  private SLIP_ESC_ESC = 0xdd;
  private _isESP32S2NativeUSB: boolean = false;
  private _initializationSucceeded: boolean = false;
  private __commandLock: Promise<[number, number[]]> = Promise.resolve([0, []]);
  private __isReconfiguring: boolean = false;
  private __abandonCurrentOperation: boolean = false;
  private _suppressDisconnect: boolean = false;
  private __consoleMode: boolean = false;
  public _isUsbJtagOrOtg: boolean | undefined = undefined;

  /**
   * 检查设备是否使用 USB-JTAG 或 USB-OTG（而不是外部串行芯片）
   * 如果尚未确定，返回 undefined
   */
  public get isUsbJtagOrOtg(): boolean | undefined {
    return this._parent ? this._parent._isUsbJtagOrOtg : this._isUsbJtagOrOtg;
  }

  // 用于 flash 读取操作的适应性速度调整
  private __adaptiveBlockMultiplier: number = 1;
  private __adaptiveMaxInFlightMultiplier: number = 1;
  private __consecutiveSuccessfulChunks: number = 0;
  private __lastAdaptiveAdjustment: number = 0;
  private __isCDCDevice: boolean = false;

  constructor(
    public port: SerialPort,
    public logger: Logger,
    private _parent?: ESPLoader,
  ) {
    super();
  }

  // 芯片属性，带有父级委托
  // chipFamily 在初始化之前被访问，这是设计使然
  get chipFamily(): ChipFamily {
    return this._parent ? this._parent.chipFamily : this.__chipFamily!;
  }

  set chipFamily(value: ChipFamily) {
    if (this._parent) {
      this._parent.chipFamily = value;
    } else {
      this.__chipFamily = value;
    }
  }

  get chipName(): string | null {
    return this._parent ? this._parent.chipName : this.__chipName;
  }

  set chipName(value: string | null) {
    if (this._parent) {
      this._parent.chipName = value;
    } else {
      this.__chipName = value;
    }
  }

  get chipRevision(): number | null {
    return this._parent ? this._parent.chipRevision : this.__chipRevision;
  }

  set chipRevision(value: number | null) {
    if (this._parent) {
      this._parent.chipRevision = value;
    } else {
      this.__chipRevision = value;
    }
  }

  get chipVariant(): string | null {
    return this._parent ? this._parent.chipVariant : this.__chipVariant;
  }

  set chipVariant(value: string | null) {
    if (this._parent) {
      this._parent.chipVariant = value;
    } else {
      this.__chipVariant = value;
    }
  }

  // 控制台模式，带有父级委托
  private get _consoleMode(): boolean {
    return this._parent ? this._parent._consoleMode : this.__consoleMode;
  }

  private set _consoleMode(value: boolean) {
    if (this._parent) {
      this._parent._consoleMode = value;
    } else {
      this.__consoleMode = value;
    }
  }

  // 控制台模式的公共设置器（由 script.js 使用）
  public setConsoleMode(value: boolean): void {
    this._consoleMode = value;
  }

  private get _inputBuffer(): number[] {
    if (this._parent) {
      return this._parent._inputBuffer;
    }
    if (this.__inputBuffer === undefined) {
      throw new Error("_inputBuffer 在初始化之前被访问");
    }
    return this.__inputBuffer;
  }

  private get _inputBufferReadIndex(): number {
    return this._parent
      ? this._parent._inputBufferReadIndex
      : this.__inputBufferReadIndex || 0;
  }

  private set _inputBufferReadIndex(value: number) {
    if (this._parent) {
      this._parent._inputBufferReadIndex = value;
    } else {
      this.__inputBufferReadIndex = value;
    }
  }

  // 获取缓冲区中的可用字节数（从读取索引到末尾）
  private get _inputBufferAvailable(): number {
    return this._inputBuffer.length - this._inputBufferReadIndex;
  }

  // 从缓冲区读取一个字节（带索引指针的环形缓冲区样式）
  private _readByte(): number | undefined {
    if (this._inputBufferReadIndex >= this._inputBuffer.length) {
      return undefined;
    }
    return this._inputBuffer[this._inputBufferReadIndex++];
  }

  // 清空输入缓冲区并重置读取索引
  private _clearInputBuffer(): void {
    this._inputBuffer.length = 0;
    this._inputBufferReadIndex = 0;
  }

  // 当读取索引变得太大时压缩缓冲区（防止内存增长）
  private _compactInputBuffer(): void {
    if (
      this._inputBufferReadIndex > 1000 &&
      this._inputBufferReadIndex > this._inputBuffer.length / 2
    ) {
      // 移除已读取的字节并重置索引
      this._inputBuffer.splice(0, this._inputBufferReadIndex);
      this._inputBufferReadIndex = 0;
    }
  }

  private get _totalBytesRead(): number {
    return this._parent
      ? this._parent._totalBytesRead
      : this.__totalBytesRead || 0;
  }

  private set _totalBytesRead(value: number) {
    if (this._parent) {
      this._parent._totalBytesRead = value;
    } else {
      this.__totalBytesRead = value;
    }
  }

  private get _commandLock(): Promise<[number, number[]]> {
    return this._parent ? this._parent._commandLock : this.__commandLock;
  }

  private set _commandLock(value: Promise<[number, number[]]>) {
    if (this._parent) {
      this._parent._commandLock = value;
    } else {
      this.__commandLock = value;
    }
  }

  private get _isReconfiguring(): boolean {
    return this._parent
      ? this._parent._isReconfiguring
      : this.__isReconfiguring;
  }

  private set _isReconfiguring(value: boolean) {
    if (this._parent) {
      this._parent._isReconfiguring = value;
    } else {
      this.__isReconfiguring = value;
    }
  }

  private get _abandonCurrentOperation(): boolean {
    return this._parent
      ? this._parent._abandonCurrentOperation
      : this.__abandonCurrentOperation;
  }

  private set _abandonCurrentOperation(value: boolean) {
    if (this._parent) {
      this._parent._abandonCurrentOperation = value;
    } else {
      this.__abandonCurrentOperation = value;
    }
  }

  private get _adaptiveBlockMultiplier(): number {
    return this._parent
      ? this._parent._adaptiveBlockMultiplier
      : this.__adaptiveBlockMultiplier;
  }

  private set _adaptiveBlockMultiplier(value: number) {
    if (this._parent) {
      this._parent._adaptiveBlockMultiplier = value;
    } else {
      this.__adaptiveBlockMultiplier = value;
    }
  }

  private get _adaptiveMaxInFlightMultiplier(): number {
    return this._parent
      ? this._parent._adaptiveMaxInFlightMultiplier
      : this.__adaptiveMaxInFlightMultiplier;
  }

  private set _adaptiveMaxInFlightMultiplier(value: number) {
    if (this._parent) {
      this._parent._adaptiveMaxInFlightMultiplier = value;
    } else {
      this.__adaptiveMaxInFlightMultiplier = value;
    }
  }

  private get _consecutiveSuccessfulChunks(): number {
    return this._parent
      ? this._parent._consecutiveSuccessfulChunks
      : this.__consecutiveSuccessfulChunks;
  }

  private set _consecutiveSuccessfulChunks(value: number) {
    if (this._parent) {
      this._parent._consecutiveSuccessfulChunks = value;
    } else {
      this.__consecutiveSuccessfulChunks = value;
    }
  }

  private get _lastAdaptiveAdjustment(): number {
    return this._parent
      ? this._parent._lastAdaptiveAdjustment
      : this.__lastAdaptiveAdjustment;
  }

  private set _lastAdaptiveAdjustment(value: number) {
    if (this._parent) {
      this._parent._lastAdaptiveAdjustment = value;
    } else {
      this.__lastAdaptiveAdjustment = value;
    }
  }

  private get _isCDCDevice(): boolean {
    return this._parent ? this._parent._isCDCDevice : this.__isCDCDevice;
  }

  private set _isCDCDevice(value: boolean) {
    if (this._parent) {
      this._parent._isCDCDevice = value;
    } else {
      this.__isCDCDevice = value;
    }
  }

  private detectUSBSerialChip(
    vendorId: number,
    productId: number,
  ): { name: string; maxBaudrate?: number } {
    // 常见的 USB 串行芯片厂商及其产品
    const chips: Record<
      number,
      Record<number, { name: string; maxBaudrate?: number }>
    > = {
      0x1a86: {
        // 沁恒电子
        0x7522: { name: "CH340", maxBaudrate: 460800 },
        0x7523: { name: "CH340", maxBaudrate: 460800 },
        0x7584: { name: "CH340", maxBaudrate: 460800 },
        0x5523: { name: "CH341", maxBaudrate: 2000000 },
        0x55d3: { name: "CH343", maxBaudrate: 6000000 },
        0x55d4: { name: "CH9102", maxBaudrate: 6000000 },
        0x55d8: { name: "CH9101", maxBaudrate: 3000000 },
      },
      0x10c4: {
        // Silicon Labs
        0xea60: { name: "CP2102(n)", maxBaudrate: 3000000 },
        0xea70: { name: "CP2105", maxBaudrate: 2000000 },
        0xea71: { name: "CP2108", maxBaudrate: 2000000 },
      },
      0x0403: {
        // FTDI
        0x6001: { name: "FT232R", maxBaudrate: 3000000 },
        0x6010: { name: "FT2232", maxBaudrate: 3000000 },
        0x6011: { name: "FT4232", maxBaudrate: 3000000 },
        0x6014: { name: "FT232H", maxBaudrate: 12000000 },
        0x6015: { name: "FT230X", maxBaudrate: 3000000 },
      },
      0x303a: {
        // 乐鑫（原生 USB）
        0x2: { name: "ESP32-S2 原生 USB", maxBaudrate: 2000000 },
        0x12: { name: "ESP32-P4 原生 USB", maxBaudrate: 2000000 },
        0x1001: { name: "ESP32 原生 USB", maxBaudrate: 2000000 },
      },
    };

    const vendor = chips[vendorId];
    if (vendor && vendor[productId]) {
      return vendor[productId];
    }

    return {
      name: `未知 (VID: 0x${vendorId.toString(16)}, PID: 0x${productId.toString(16)})`,
    };
  }

  async initialize() {
    if (!this._parent) {
      this.__inputBuffer = [];
      this.__inputBufferReadIndex = 0;
      this.__totalBytesRead = 0;

      // 检测并记录 USB 串行芯片信息
      const portInfo = this.port.getInfo();
      if (portInfo.usbVendorId && portInfo.usbProductId) {
        const chipInfo = this.detectUSBSerialChip(
          portInfo.usbVendorId,
          portInfo.usbProductId,
        );
        this.logger.log(
          `USB 串行芯片: ${chipInfo.name} (VID: 0x${portInfo.usbVendorId.toString(16)}, PID: 0x${portInfo.usbProductId.toString(16)})`,
        );
        if (chipInfo.maxBaudrate) {
          this._maxUSBSerialBaudrate = chipInfo.maxBaudrate;
          this.logger.log(`最大波特率: ${chipInfo.maxBaudrate}`);
        }
        // 检测 ESP32-S2 原生 USB
        if (portInfo.usbVendorId === 0x303a && portInfo.usbProductId === 0x2) {
          this._isESP32S2NativeUSB = true;
        }

        // 检测用于适应性速度调整的 CDC 设备
        // 乐鑫原生 USB (VID: 0x303a) 或 CH343 (VID: 0x1a86, PID: 0x55d3)
        if (
          portInfo.usbVendorId === 0x303a ||
          (portInfo.usbVendorId === 0x1a86 && portInfo.usbProductId === 0x55d3)
        ) {
          this._isCDCDevice = true;
        }
      }

      // 不要等待这个 Promise，以免阻塞方法的其余部分。
      this.readLoop();
    }

    // 尝试使用不同的复位策略进行连接
    await this.connectWithResetStrategies();

    // 检测芯片类型
    await this.detectChip();

    // 为 ESP32-P4 Rev 301 开启闪存电源（必须在加载 stub 之前完成）
    if (this.chipFamily === CHIP_FAMILY_ESP32P4 && this.chipRevision === 301) {
      await this.powerOnFlash();
    }

    // 检测设备是否使用 USB-JTAG/串行或 USB-OTG（而不是外部串行芯片）
    // 这对于确定控制台模式的正确复位策略是必要的
    try {
      this._isUsbJtagOrOtg = await this.detectUsbConnectionType();
      this.logger.debug(
        `USB 连接类型: ${this._isUsbJtagOrOtg ? "USB-JTAG/OTG" : "外部串行芯片"}`,
      );
    } catch (err) {
      this.logger.debug(`无法检测 USB 连接类型: ${err}`);
    }

    try {
      const usbMode = await this.getUsbMode();
      this.logger.debug(
        `USB 模式（寄存器）: ${usbMode.mode} (uartNo=${usbMode.uartNo})`,
      );
    } catch (err) {
      this.logger.debug(`无法检测 USB 模式: ${err}`);
    }

    // 读取此芯片的 OTP 数据并存储到 this.efuses 数组中
    const FlAddr = getSpiFlashAddresses(this.getChipFamily());
    const AddrMAC = FlAddr.macFuse;
    for (let i = 0; i < 4; i++) {
      this._efuses[i] = await this.readRegister(AddrMAC + 4 * i);
    }
    const revisionInfo =
      this.chipRevision !== null && this.chipRevision !== undefined
        ? ` (修订版本 ${this.chipRevision})`
        : "";
    this.logger.log(`已连接到 ${this.chipName}${revisionInfo}`);
    this.logger.debug(
      `引导加载程序闪存偏移量: 0x${FlAddr.flashOffs.toString(16)}`,
    );

    // 标记初始化成功
    this._initializationSucceeded = true;
  }

  /**
   * 使用 GET_SECURITY_INFO（对于较新的芯片）或魔数（对于较旧的芯片）检测芯片类型
   */
  async detectChip() {
    try {
      // 首先尝试 GET_SECURITY_INFO 命令（ESP32-C3 及更高版本）
      const securityInfo = await this.getSecurityInfo();
      const chipId = securityInfo.chipId;

      const chipInfo = CHIP_ID_TO_INFO[chipId];
      if (chipInfo) {
        this.chipName = chipInfo.name;
        this.chipFamily = chipInfo.family;

        this.chipRevision = await this.getChipRevision();
        this.logger.debug(`${this.chipName} 修订版本: ${this.chipRevision}`);

        if (
          this.chipFamily === CHIP_FAMILY_ESP32P4 &&
          this.chipRevision >= 300
        ) {
          this.chipVariant = "rev300";
        } else if (this.chipFamily === CHIP_FAMILY_ESP32P4) {
          this.chipVariant = "rev0";
        }

        this.logger.debug(
          `通过 IMAGE_CHIP_ID 检测到芯片: ${chipId} (${this.chipName})`,
        );
        return;
      }

      this.logger.debug(`未知的 IMAGE_CHIP_ID: ${chipId}，回退到魔数检测`);
    } catch (error) {
      // GET_SECURITY_INFO 不受支持，回退到魔数检测
      this.logger.debug(`GET_SECURITY_INFO 失败，使用魔数检测: ${error}`);

      // 在 Windows 上为 CP210x 兼容性清空输入缓冲区
      // 这确保在继续之前清除所有错误响应
      await this.drainInputBuffer(200);

      // 清空输入缓冲区并重新同步以从失败的命令中恢复
      this._clearInputBuffer();
      await sleep(SYNC_TIMEOUT);

      // 重新与芯片同步以确保通信清晰
      try {
        await this.sync();
      } catch (syncErr) {
        this.logger.debug(`GET_SECURITY_INFO 失败后重新同步: ${syncErr}`);
      }
    }

    // 回退：为 ESP8266、ESP32、ESP32-S2 使用魔数检测
    const chipMagicValue = await this.readRegister(CHIP_DETECT_MAGIC_REG_ADDR);
    const chip = CHIP_DETECT_MAGIC_VALUES[chipMagicValue >>> 0];
    if (chip === undefined) {
      throw new Error(
        `未知芯片: 十六进制: ${toHex(
          chipMagicValue >>> 0,
          8,
        ).toLowerCase()} 数字: ${chipMagicValue}`,
      );
    }
    this.chipName = chip.name;
    this.chipFamily = chip.family;

    this.chipRevision = await this.getChipRevision();
    this.logger.debug(`${this.chipName} 修订版本: ${this.chipRevision}`);

    if (this.chipFamily === CHIP_FAMILY_ESP32P4) {
      this.chipVariant = this.chipRevision >= 300 ? "rev300" : "rev0";
      this.logger.debug(`ESP32-P4 变体: ${this.chipVariant}`);
    }

    this.logger.debug(
      `通过魔数检测到芯片: ${toHex(chipMagicValue >>> 0, 8)} (${this.chipName})`,
    );
  }

  async getChipRevision(): Promise<number> {
    let minor = 0;
    let major = 0;

    switch (this.chipFamily) {
      case CHIP_FAMILY_ESP32: {
        const efuse3 = await this.readRegister(ESP32_BASEFUSEADDR + 4 * 3);
        const efuse5 = await this.readRegister(ESP32_BASEFUSEADDR + 4 * 5);
        minor = (efuse5 >> 24) & 0x3;
        const revBit0 = (efuse3 >> 15) & 0x1;
        const revBit1 = (efuse5 >> 20) & 0x1;
        const apb = await this.readRegister(ESP32_APB_CTL_DATE_ADDR);
        const revBit2 = (apb >> 31) & 0x1;
        const combined = (revBit2 << 2) | (revBit1 << 1) | revBit0;
        major =
          ({ 0: 0, 1: 1, 3: 2, 7: 3 } as Record<number, number>)[combined] ?? 0;
        break;
      }
      case CHIP_FAMILY_ESP32S2: {
        const w3 = await this.readRegister(ESP32S2_EFUSE_BLOCK1_ADDR + 4 * 3);
        const w4 = await this.readRegister(ESP32S2_EFUSE_BLOCK1_ADDR + 4 * 4);
        const hi = (w3 >> 20) & 0x01;
        const lo = (w4 >> 4) & 0x07;
        minor = (hi << 3) + lo;
        major = (w3 >> 18) & 0x03;
        break;
      }
      case CHIP_FAMILY_ESP32S3: {
        const w3 = await this.readRegister(ESP32S3_EFUSE_BLOCK1_ADDR + 4 * 3);
        const w5 = await this.readRegister(ESP32S3_EFUSE_BLOCK1_ADDR + 4 * 5);
        const hi = (w5 >> 23) & 0x01;
        const lo = (w3 >> 18) & 0x07;
        minor = (hi << 3) + lo;
        major = (w5 >> 24) & 0x03;
        break;
      }
      case CHIP_FAMILY_ESP32C2: {
        const w1 = await this.readRegister(ESP32C2_EFUSE_BLOCK2_ADDR + 4 * 1);
        minor = (w1 >> 16) & 0x0f;
        major = (w1 >> 20) & 0x03;
        break;
      }
      case CHIP_FAMILY_ESP32C3: {
        const w3 = await this.readRegister(ESP32C3_EFUSE_RD_MAC_SPI_SYS_3_REG);
        const w5 = await this.readRegister(ESP32C3_EFUSE_RD_MAC_SPI_SYS_5_REG);
        const hi = (w5 >> 23) & 0x01;
        const lo = (w3 >> 18) & 0x07;
        minor = (hi << 3) + lo;
        major = (w5 >> 24) & 0x03;
        break;
      }
      case CHIP_FAMILY_ESP32C5: {
        const w2 = await this.readRegister(ESP32C5_EFUSE_BLOCK1_ADDR + 4 * 2);
        minor = w2 & 0x0f;
        major = (w2 >> 4) & 0x03;
        break;
      }
      case CHIP_FAMILY_ESP32C6: {
        const w3 = await this.readRegister(ESP32C6_EFUSE_BLOCK1_ADDR + 4 * 3);
        minor = (w3 >> 18) & 0x0f;
        major = (w3 >> 22) & 0x03;
        break;
      }
      case CHIP_FAMILY_ESP32C61: {
        const w2 = await this.readRegister(ESP32C61_EFUSE_BLOCK1_ADDR + 4 * 2);
        minor = w2 & 0x0f;
        major = (w2 >> 4) & 0x03;
        break;
      }
      case CHIP_FAMILY_ESP32H2: {
        const w3 = await this.readRegister(ESP32H2_EFUSE_BLOCK1_ADDR + 4 * 3);
        minor = (w3 >> 18) & 0x07;
        major = (w3 >> 21) & 0x03;
        break;
      }
      case CHIP_FAMILY_ESP32H4: {
        break;
      }
      case CHIP_FAMILY_ESP32H21: {
        break;
      }
      case CHIP_FAMILY_ESP32P4: {
        const w2 = await this.readRegister(ESP32P4_EFUSE_BLOCK1_ADDR + 4 * 2);
        minor = w2 & 0x0f;
        major = (((w2 >> 23) & 1) << 2) | ((w2 >> 4) & 0x03);
        break;
      }
      case CHIP_FAMILY_ESP32S31: {
        const w2 = await this.readRegister(ESP32S31_EFUSE_BLOCK1_ADDR + 4 * 2);
        minor = w2 & 0x0f;
        major = (w2 >> 4) & 0x03;
        break;
      }
    }

    return major * 100 + minor;
  }

  /**
   * 为 ESP32-P4 Rev 301 (ECO6) 开启闪存芯片的电源
   * 在 ECO6 上，闪存芯片默认关闭电源，因为默认闪存电压从 1.8V 变为 3.3V。
   * 这是为了防止损坏 1.8V 的闪存芯片。
   */
  async powerOnFlash(): Promise<void> {
    if (this.chipFamily !== CHIP_FAMILY_ESP32P4) {
      return; // 仅对 ESP32-P4 需要
    }

    if (this.chipRevision !== 301) {
      return; // 仅对 Rev 301 (ECO6) 需要
    }

    this.logger.debug("正在为 ESP32-P4 Rev 301 (ECO6) 开启闪存电源");

    // 为 pad 组上电
    await this.writeRegister(ESP32P4_LP_SYSTEM_REG_ANA_XPD_PAD_GROUP_REG, 1);
    await sleep(10); // 0.01 秒

    // 闪存上电序列
    const pmuAnaReg = await this.readRegister(
      ESP32P4_PMU_EXT_LDO_P0_0P1A_ANA_REG,
    );
    await this.writeRegister(
      ESP32P4_PMU_EXT_LDO_P0_0P1A_ANA_REG,
      pmuAnaReg | ESP32P4_PMU_ANA_0P1A_EN_CUR_LIM_0,
    );

    const pmuReg = await this.readRegister(ESP32P4_PMU_EXT_LDO_P0_0P1A_REG);
    await this.writeRegister(
      ESP32P4_PMU_EXT_LDO_P0_0P1A_REG,
      pmuReg | ESP32P4_PMU_0P1A_FORCE_TIEH_SEL_0,
    );

    const pmuDateReg = await this.readRegister(ESP32P4_PMU_DATE_REG);
    await this.writeRegister(ESP32P4_PMU_DATE_REG, pmuDateReg | (3 << 0));

    await sleep(0.05); // 0.00005 秒 = 0.05 毫秒

    const pmuAnaReg2 = await this.readRegister(
      ESP32P4_PMU_EXT_LDO_P0_0P1A_ANA_REG,
    );
    await this.writeRegister(
      ESP32P4_PMU_EXT_LDO_P0_0P1A_ANA_REG,
      pmuAnaReg2 & ~ESP32P4_PMU_ANA_0P1A_EN_CUR_LIM_0,
    );

    const pmuReg2 = await this.readRegister(ESP32P4_PMU_EXT_LDO_P0_0P1A_REG);
    await this.writeRegister(
      ESP32P4_PMU_EXT_LDO_P0_0P1A_REG,
      pmuReg2 & ~ESP32P4_PMU_0P1A_TARGET0_0,
    );

    // 将 eFuse 电压更新到 PMU
    const pmuReg3 = await this.readRegister(ESP32P4_PMU_EXT_LDO_P0_0P1A_REG);
    await this.writeRegister(ESP32P4_PMU_EXT_LDO_P0_0P1A_REG, pmuReg3 | 0x80);

    const pmuReg4 = await this.readRegister(ESP32P4_PMU_EXT_LDO_P0_0P1A_REG);
    await this.writeRegister(
      ESP32P4_PMU_EXT_LDO_P0_0P1A_REG,
      pmuReg4 & ~ESP32P4_PMU_0P1A_FORCE_TIEH_SEL_0,
    );

    await sleep(2); // 0.0018 秒 = 1.8 毫秒，四舍五入到 2 毫秒

    this.logger.debug("闪存电源已成功开启");
  }

  /**
   * 获取安全信息，包括芯片 ID（ESP32-C3 及更高版本）
   */
  async getSecurityInfo(): Promise<{
    flags: number;
    flashCryptCnt: number;
    keyPurposes: number[];
    chipId: number;
    apiVersion: number;
  }> {
    const [, responseData] = await this.checkCommand(
      ESP_GET_SECURITY_INFO,
      [],
      0,
    );

    // 某些芯片/ROM 版本返回空响应或不支持此命令
    if (responseData.length === 0) {
      throw new Error(`GET_SECURITY_INFO 不受支持或返回空响应`);
    }

    if (responseData.length < 12) {
      throw new Error(
        `无效的安全信息响应长度: ${responseData.length}（至少需要 12 字节）`,
      );
    }

    const flags = unpack("<I", responseData.slice(0, 4))[0];
    const flashCryptCnt = responseData[4];
    const keyPurposes = Array.from(responseData.slice(5, 12));
    const chipId =
      responseData.length >= 16
        ? unpack("<I", responseData.slice(12, 16))[0]
        : 0;
    const apiVersion =
      responseData.length >= 20
        ? unpack("<I", responseData.slice(16, 20))[0]
        : 0;

    return {
      flags,
      flashCryptCnt,
      keyPurposes,
      chipId,
      apiVersion,
    };
  }

  /**
   * 从 efuses 获取 MAC 地址
   */
  async getMacAddress(): Promise<string> {
    if (!this._initializationSucceeded) {
      throw new Error("getMacAddress() 要求 initialize() 成功完成");
    }
    const macBytes = this.macAddr(); // 芯片系列感知
    return macBytes
      .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
      .join(":");
  }

  /**
   * @name readLoop
   * 从输入流读取数据并将其放入 inputBuffer
   */
  async readLoop() {
    if (this.debug) {
      this.logger.debug("启动读取循环");
    }

    this._reader = this.port.readable!.getReader();

    try {
      let keepReading = true;
      while (keepReading) {
        const { value, done } = await this._reader.read();
        if (done) {
          this._reader.releaseLock();
          keepReading = false;
          break;
        }
        if (!value || value.length === 0) {
          continue;
        }

        // 始终立即从浏览器的串行缓冲区读取，以防止浏览器缓冲区溢出。这里不应用背压。
        const chunk = Array.from(value as Uint8Array);
        Array.prototype.push.apply(this._inputBuffer, chunk);

        // 跟踪从串口读取的总字节数
        this._totalBytesRead += value.length;
      }
    } catch {
      //      this.logger.error("读取循环断开连接");
    } finally {
      // 当读取循环结束时始终重置重新配置标志
      // 这可以防止当读取循环意外死亡时出现“无法在端口重新配置期间写入”错误
      this._isReconfiguring = false;

      // 如果读取器仍被锁定，则释放它
      if (this._reader) {
        try {
          this._reader.releaseLock();
          this.logger.debug("读取器在 readLoop 清理中释放");
        } catch (err) {
          this.logger.debug(`读取器在 readLoop 中释放出错: ${err}`);
        }
        this._reader = undefined;
      }
    }

    // 断开连接！
    this.connected = false;

    // 检查是否为需要端口重新选择的 ESP32-S2 原生 USB
    // 仅当初始化未成功（错误的端口）时触发重新连接
    if (this._isESP32S2NativeUSB && !this._initializationSucceeded) {
      this.logger.log("检测到 ESP32-S2 原生 USB - 请求端口重新选择");
      this.dispatchEvent(
        new CustomEvent("esp32s2-usb-reconnect", {
          detail: { message: "ESP32-S2 原生 USB 需要端口重新选择" },
        }),
      );
    }

    // 仅在未抑制时触发断开连接事件
    if (!this._suppressDisconnect) {
      this.dispatchEvent(new Event("disconnect"));
    }
    this._suppressDisconnect = false;
    this.logger.debug("读取循环完成");
  }

  state_DTR = false;
  state_RTS = false;

  // ============================================================================
  // Web 串行（桌面端）- DTR/RTS 信号处理与复位策略
  // ============================================================================

  async setRTS(state: boolean) {
    await this.port.setSignals({ requestToSend: state });
    // 为使用 usbser.sys 驱动程序的 Windows 适配器解决：
    // 生成对 DTR 的虚假更改，以便使用更新后的 RTS 状态和相同的 DTR 状态发送设置控制线路状态请求
    // 参考 esptool.py
    await this.setDTR(this.state_DTR);
  }

  async setDTR(state: boolean) {
    this.state_DTR = state;
    await this.port.setSignals({ dataTerminalReady: state });
  }

  async setDTRandRTS(dtr: boolean, rts: boolean) {
    this.state_DTR = dtr;
    this.state_RTS = rts;
    await this.port.setSignals({
      dataTerminalReady: dtr,
      requestToSend: rts,
    });
  }

  private async runSignalSequence(
    steps: Array<{ dtr?: boolean; rts?: boolean; delayMs?: number }>,
  ): Promise<void> {
    const webusb =
      (this.port as unknown as { isWebUSB?: boolean }).isWebUSB === true;
    for (const step of steps) {
      if (step.dtr !== undefined && step.rts !== undefined) {
        if (webusb) {
          await this.setDTRandRTSWebUSB(step.dtr, step.rts);
        } else {
          await this.setDTRandRTS(step.dtr, step.rts);
        }
      } else {
        if (step.dtr !== undefined) {
          if (webusb) {
            await this.setDTRWebUSB(step.dtr);
          } else {
            await this.setDTR(step.dtr);
          }
        }
        if (step.rts !== undefined) {
          if (webusb) {
            await this.setRTSWebUSB(step.rts);
          } else {
            await this.setRTS(step.rts);
          }
        }
      }
      if (step.delayMs) await sleep(step.delayMs);
    }
  }

  /**
   * @name hardResetUSBJTAGSerial
   * 用于 Web 串行（桌面端）的 USB-JTAG/串行复位
   */
  async hardResetUSBJTAGSerial() {
    await this.runSignalSequence([
      { rts: false },
      { dtr: false, delayMs: 500 },
      { dtr: true, rts: false, delayMs: 500 },
      { rts: true },
      { dtr: false, rts: true, delayMs: 500 },
      { dtr: false, rts: false, delayMs: 600 },
    ]);
  }

  /**
   * @name hardResetClassic
   * 用于 Web 串行（桌面端）的经典复位，DTR = IO0，RTS = EN
   */
  async hardResetClassic() {
    await this.runSignalSequence([
      { dtr: false, rts: true, delayMs: 500 },
      { dtr: true, rts: false, delayMs: 450 },
      { dtr: false, delayMs: 600 },
    ]);
  }

  /**
   * 复位到固件模式（非引导加载程序），用于 Web 串行
   * 在复位期间保持 IO0=HIGH，以便芯片启动到固件
   */
  async hardResetToFirmware() {
    await this.runSignalSequence([
      { dtr: false, rts: true, delayMs: 500 },
      { rts: false, delayMs: 450 },
      { delayMs: 600 },
    ]);
  }

  /**
   * @name hardResetUnixTight
   * 用于 Web 串行（桌面端）的 Unix 紧密复位 - 同时设置 DTR 和 RTS
   */
  async hardResetUnixTight() {
    await this.runSignalSequence([
      { dtr: true, rts: true },
      { dtr: false, rts: false },
      { dtr: false, rts: true, delayMs: 500 },
      { dtr: true, rts: false, delayMs: 450 },
      { dtr: false, rts: false },
      { dtr: false, delayMs: 600 },
    ]);
  }

  // ============================================================================
  // WebUSB（安卓端）- DTR/RTS 信号处理与复位策略
  // ============================================================================

  async setRTSWebUSB(state: boolean) {
    this.state_RTS = state;
    // 始终指定两个信号，以避免翻转另一条线
    // WebUSB 的 setSignals() 现在会保留未指定的信号，但显式指定更安全
    await (this.port as WebUSBSerialPort).setSignals({
      requestToSend: state,
      dataTerminalReady: this.state_DTR,
    });
  }

  async setDTRWebUSB(state: boolean) {
    this.state_DTR = state;
    // 始终指定两个信号，以避免翻转另一条线
    await (this.port as WebUSBSerialPort).setSignals({
      dataTerminalReady: state,
      requestToSend: this.state_RTS, // 显式保留当前 RTS 状态
    });
  }

  async setDTRandRTSWebUSB(dtr: boolean, rts: boolean) {
    this.state_DTR = dtr;
    this.state_RTS = rts;
    await (this.port as WebUSBSerialPort).setSignals({
      dataTerminalReady: dtr,
      requestToSend: rts,
    });
  }

  /**
   * @name hardResetUSBJTAGSerialInvertedDTRWebUSB
   * 用于 WebUSB（安卓端）的具有反转 DTR 的 USB-JTAG/串行复位
   */
  async hardResetUSBJTAGSerialInvertedDTRWebUSB() {
    await this.runSignalSequence([
      { rts: false, dtr: true, delayMs: 100 },
      { dtr: false, rts: false, delayMs: 100 },
      { rts: true, dtr: true, delayMs: 100 },
      { dtr: true, rts: false, delayMs: 200 },
    ]);
  }

  /**
   * @name hardResetClassicLongDelayWebUSB
   * 用于 WebUSB（安卓端）的具有较长延迟的经典复位
   * 专门针对可能需要更多时间的 CP2102/CH340
   */
  async hardResetClassicLongDelayWebUSB() {
    await this.runSignalSequence([
      { dtr: false, rts: true, delayMs: 500 },
      { dtr: true, rts: false, delayMs: 200 },
      { dtr: false, delayMs: 500 },
    ]);
  }

  /**
   * @name hardResetClassicShortDelayWebUSB
   * 用于 WebUSB（安卓端）的具有较短延迟的经典复位
   */
  async hardResetClassicShortDelayWebUSB() {
    await this.runSignalSequence([
      { dtr: false, rts: true, delayMs: 50 },
      { dtr: true, rts: false, delayMs: 25 },
      { dtr: false, delayMs: 100 },
    ]);
  }

  /**
   * @name hardResetInvertedWebUSB
   * 用于 WebUSB（安卓端）的反转复位序列 - 两个信号都反转
   */
  async hardResetInvertedWebUSB() {
    await this.runSignalSequence([
      { dtr: true, rts: false, delayMs: 100 },
      { dtr: false, rts: true, delayMs: 50 },
      { dtr: true, delayMs: 200 },
    ]);
  }

  /**
   * @name hardResetInvertedDTRWebUSB
   * 用于 WebUSB（安卓端）的仅 DTR 反转
   */
  async hardResetInvertedDTRWebUSB() {
    await this.runSignalSequence([
      { dtr: true, rts: true, delayMs: 100 },
      { dtr: false, rts: false, delayMs: 50 },
      { dtr: true, delayMs: 200 },
    ]);
  }

  /**
   * @name hardResetInvertedRTSWebUSB
   * 用于 WebUSB（安卓端）的仅 RTS 反转
   */
  async hardResetInvertedRTSWebUSB() {
    await this.runSignalSequence([
      { dtr: false, rts: false, delayMs: 100 },
      { dtr: true, rts: true, delayMs: 50 },
      { dtr: false, delayMs: 200 },
    ]);
  }

  /**
   * 检查我们使用的是 WebUSB（安卓端）还是 Web 串行（桌面端）
   */
  private isWebUSB(): boolean {
    // WebUSBSerial 类具有 isWebUSB 标志 - 这是最可靠的检查
    return (this.port as WebUSBSerialPort).isWebUSB === true;
  }

  /**
   * @name connectWithResetStrategies
   * 尝试不同的复位策略以进入引导加载程序模式
   * 类似于 esptool.py 的 connect() 方法，具有多种复位策略
   */
  async connectWithResetStrategies() {
    const portInfo = this.port.getInfo();
    const isUSBJTAGSerial = portInfo.usbProductId === USB_JTAG_SERIAL_PID;
    const isEspressifUSB = portInfo.usbVendorId === 0x303a;

    //    this.logger.log(
    //      `检测到 USB: VID=0x${portInfo.usbVendorId?.toString(16) || "unknown"}, PID=0x${portInfo.usbProductId?.toString(16) || "unknown"}`,
    //    );

    // 定义要按顺序尝试的复位策略
    const resetStrategies: Array<{ name: string; fn: () => Promise<void> }> =
      [];

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    // 检测这是否为 USB 串行芯片（需要不同的同步方法）
    const isUSBSerialChip = !isUSBJTAGSerial && !isEspressifUSB;

    // WebUSB（安卓端）使用与 Web 串行（桌面端）不同的复位方法
    if (this.isWebUSB()) {
      // 对于 USB 串行芯片（CP2102、CH340 等），首先尝试反转策略

      // 一次性检测特定芯片类型
      const isCP2102 = portInfo.usbVendorId === 0x10c4;
      const isCH34x = portInfo.usbVendorId === 0x1a86;

      // 检查是否为 ESP32-S2 原生 USB（VID: 0x303a, PID: 0x0002）
      const isESP32S2NativeUSB =
        portInfo.usbVendorId === 0x303a && portInfo.usbProductId === 0x0002;

      // WebUSB 策略 1：USB-JTAG/串行复位（仅用于原生 USB）
      if (isUSBJTAGSerial || isEspressifUSB) {
        if (isESP32S2NativeUSB) {
          // ESP32-S2 原生 USB：尝试多种策略
          // 设备可能处于 JTAG 模式或 CDC 模式

          // 策略 1：USB-JTAG/串行（在桌面端的 CDC 模式下有效）
          resetStrategies.push({
            name: "USB-JTAG/串行 (WebUSB) - ESP32-S2",
            fn: async () => {
              return await self.hardResetUSBJTAGSerial();
            },
          });

          // 策略 2：反转 DTR 的 USB-JTAG/串行（在 JTAG 模式下有效）
          resetStrategies.push({
            name: "反转 DTR 的 USB-JTAG/串行 (WebUSB) - ESP32-S2",
            fn: async () => {
              return await self.hardResetUSBJTAGSerialInvertedDTRWebUSB();
            },
          });

          // 策略 3：UnixTight（CDC 后备）
          resetStrategies.push({
            name: "UnixTight (WebUSB) - ESP32-S2 CDC",
            fn: async () => {
              return await self.hardResetUnixTight();
            },
          });

          // 策略 4：经典复位（CDC 后备）
          resetStrategies.push({
            name: "经典 (WebUSB) - ESP32-S2 CDC",
            fn: async () => {
              return await self.hardResetClassic();
            },
          });
        } else {
          // 其他 USB-JTAG 芯片：首先尝试反转 DTR - 对于 ESP32-H2 和其他 JTAG 芯片效果最佳
          resetStrategies.push({
            name: "反转 DTR 的 USB-JTAG/串行 (WebUSB)",
            fn: async () => {
              return await self.hardResetUSBJTAGSerialInvertedDTRWebUSB();
            },
          });
          resetStrategies.push({
            name: "USB-JTAG/串行 (WebUSB)",
            fn: async () => {
              return await self.hardResetUSBJTAGSerial();
            },
          });
          resetStrategies.push({
            name: "反转 DTR 的经典 (WebUSB)",
            fn: async () => {
              return await self.hardResetInvertedDTRWebUSB();
            },
          });
        }
      }

      // 对于 USB 串行芯片，首先尝试反转策略
      if (isUSBSerialChip) {
        if (isCH34x) {
          // CH340/CH343：UnixTight 效果最佳（类似于 CP2102）
          resetStrategies.push({
            name: "UnixTight (WebUSB) - CH34x",
            fn: async () => {
              return await self.hardResetUnixTight();
            },
          });
          resetStrategies.push({
            name: "经典 (WebUSB) - CH34x",
            fn: async () => {
              return await self.hardResetClassic();
            },
          });
          resetStrategies.push({
            name: "反转两者 (WebUSB) - CH34x",
            fn: async () => {
              return await self.hardResetInvertedWebUSB();
            },
          });
          resetStrategies.push({
            name: "反转 RTS (WebUSB) - CH34x",
            fn: async () => {
              return await self.hardResetInvertedRTSWebUSB();
            },
          });
          resetStrategies.push({
            name: "反转 DTR (WebUSB) - CH34x",
            fn: async () => {
              return await self.hardResetInvertedDTRWebUSB();
            },
          });
        } else if (isCP2102) {
          // CP2102：UnixTight 效果最佳（已测试并确认）
          // 首先尝试它，然后回退到其他策略

          resetStrategies.push({
            name: "UnixTight (WebUSB) - CP2102",
            fn: async () => {
              return await self.hardResetUnixTight();
            },
          });

          resetStrategies.push({
            name: "经典 (WebUSB) - CP2102",
            fn: async () => {
              return await self.hardResetClassic();
            },
          });

          resetStrategies.push({
            name: "反转两者 (WebUSB) - CP2102",
            fn: async () => {
              return await self.hardResetInvertedWebUSB();
            },
          });

          resetStrategies.push({
            name: "反转 RTS (WebUSB) - CP2102",
            fn: async () => {
              return await self.hardResetInvertedRTSWebUSB();
            },
          });

          resetStrategies.push({
            name: "反转 DTR (WebUSB) - CP2102",
            fn: async () => {
              return await self.hardResetInvertedDTRWebUSB();
            },
          });
        } else {
          // 对于其他 USB 串行芯片，首先尝试 UnixTight，然后多种策略
          resetStrategies.push({
            name: "UnixTight (WebUSB)",
            fn: async () => {
              return await self.hardResetUnixTight();
            },
          });
          resetStrategies.push({
            name: "经典 (WebUSB)",
            fn: async function () {
              return await self.hardResetClassic();
            },
          });
          resetStrategies.push({
            name: "反转两者 (WebUSB)",
            fn: async function () {
              return await self.hardResetInvertedWebUSB();
            },
          });
          resetStrategies.push({
            name: "反转 RTS (WebUSB)",
            fn: async function () {
              return await self.hardResetInvertedRTSWebUSB();
            },
          });
          resetStrategies.push({
            name: "反转 DTR (WebUSB)",
            fn: async function () {
              return await self.hardResetInvertedDTRWebUSB();
            },
          });
        }
      }

      // 仅对原生 USB 芯片（而非 USB 串行）添加通用后备策略
      // 并且仅针对上面特定块未处理的芯片
      if (
        !isUSBSerialChip &&
        !isCP2102 &&
        !isESP32S2NativeUSB &&
        !isUSBJTAGSerial
      ) {
        // 经典复位（针对上面未处理的芯片）
        if (portInfo.usbVendorId !== 0x1a86) {
          resetStrategies.push({
            name: "经典 (WebUSB)",
            fn: async function () {
              return await self.hardResetClassic();
            },
          });
        }

        // UnixTight 复位（同时设置 DTR/RTS）
        resetStrategies.push({
          name: "UnixTight (WebUSB)",
          fn: async function () {
            return await self.hardResetUnixTight();
          },
        });

        // WebUSB 策略：长延迟经典复位
        resetStrategies.push({
          name: "长延迟经典 (WebUSB)",
          fn: async function () {
            return await self.hardResetClassicLongDelayWebUSB();
          },
        });

        // WebUSB 策略：短延迟经典复位
        resetStrategies.push({
          name: "短延迟经典 (WebUSB)",
          fn: async function () {
            return await self.hardResetClassicShortDelayWebUSB();
          },
        });

        // WebUSB 策略：USB-JTAG/串行后备
        if (!isEspressifUSB) {
          resetStrategies.push({
            name: "USB-JTAG/串行后备 (WebUSB)",
            fn: async function () {
              return await self.hardResetUSBJTAGSerial();
            },
          });
        }
      }
    } else {
      // 策略：USB-JTAG/串行复位
      if (isUSBJTAGSerial || isEspressifUSB) {
        resetStrategies.push({
          name: "USB-JTAG/串行",
          fn: async function () {
            return await self.hardResetUSBJTAGSerial();
          },
        });
      }

      // 策略：UnixTight 复位
      resetStrategies.push({
        name: "UnixTight",
        fn: async function () {
          return await self.hardResetUnixTight();
        },
      });

      // 策略：USB-JTAG/串行后备
      if (!isUSBJTAGSerial && !isEspressifUSB) {
        resetStrategies.push({
          name: "USB-JTAG/串行（后备）",
          fn: async function () {
            return await self.hardResetUSBJTAGSerial();
          },
        });
      }
    }

    let lastError: Error | null = null;

    // 尝试每个复位策略并设置超时
    for (const strategy of resetStrategies) {
      try {
        // 检查端口是否仍然打开，如果不是，跳过此策略
        if (!this.connected || !this.port.writable) {
          this.logger.debug(`端口已断开连接，跳过 ${strategy.name} 复位`);
          continue;
        }

        // 在开始新策略之前清除放弃标志
        this._abandonCurrentOperation = false;

        await strategy.fn();

        // 复位后尝试同步
        // USB 串行 / 原生 USB 芯片需要不同的同步方法

        if (isUSBSerialChip) {
          // USB 串行芯片：使用超时策略（2 秒）
          //          this.logger.log(`检测到 USB 串行芯片，使用带超时的同步。`);
          const syncSuccess = await this.syncWithTimeout(2000);

          if (syncSuccess) {
            // 同步成功
            this.logger.log(`使用 ${strategy.name} 复位成功连接 USB 串行。`);
            return;
          } else {
            throw new Error("同步超时或放弃");
          }
        } else {
          // 原生 USB 芯片
          // 注意：我们使用 Promise.race 直接与 sync() 竞争，而不是 syncWithTimeout()
          // 因为 syncWithTimeout 会导致 CDC/JTAG 设备由于未知原因挂起。
          // readPacket() 中的放弃标志防止 I/O 重叠。
          //          this.logger.log(`检测到原生 USB 芯片，使用 CDC/JTAG 同步。`);
          const syncPromise = this.sync();
          const timeoutPromise = new Promise<void>((_, reject) =>
            setTimeout(() => reject(new Error("同步超时")), 1000),
          );

          try {
            await Promise.race([syncPromise, timeoutPromise]);
            // 同步成功
            this.logger.debug(`使用 ${strategy.name} 复位成功连接 CDC/JTAG。`);
            return;
          } catch {
            throw new Error("同步超时或放弃");
          }
        }
      } catch (error) {
        lastError = error as Error;
        //        this.logger.debug(
        //          `${strategy.name} 复位失败: ${(error as Error).message}`,
        //        );

        // 设置放弃标志以停止任何进行中的操作
        this._abandonCurrentOperation = true;

        // 等待一段时间，让进行中的操作中止
        await sleep(100);

        // 如果端口断开连接，我们无法尝试更多策略
        if (!this.connected || !this.port.writable) {
          this.logger.log(`在复位尝试期间端口断开连接`);
          break;
        }

        // 在尝试下一个策略之前清空缓冲区
        this._clearInputBuffer();
        await this.drainInputBuffer(200);
        await this.flushSerialBuffers();
      }
    }

    // 所有策略都失败 - 在抛出之前重置放弃标志
    this._abandonCurrentOperation = false;

    throw new Error(
      `无法同步到 ESP。请尝试手动复位。最后一个错误: ${lastError?.message}`,
    );
  }

  /**
   * @name watchdogReset
   * 针对具有 USB-OTG 或 USB-JTAG/串行的 ESP32-S2/S3/C3 的看门狗复位
   * 使用 RTC 看门狗定时器复位芯片 - 在 DTR/RTS 信号不可用时有效
   * 这是为了向后兼容而对 rtcWdtResetChipSpecific() 的别名
   */
  async watchdogReset() {
    await this.rtcWdtResetChipSpecific();
  }

  /**
   * 针对 ESP32-S2、ESP32-S3、ESP32-C3、ESP32-C5、ESP32-C6 和 ESP32-P4 的 RTC 看门狗定时器复位
   * 使用每个芯片系列的特定寄存器
   * 注意：ESP32-H2 不支持 WDT 复位
   */
  public async rtcWdtResetChipSpecific(): Promise<void> {
    this.logger.debug("正在使用看门狗定时器硬复位...");

    let WDTWPROTECT_REG: number;
    let WDTCONFIG0_REG: number;
    let WDTCONFIG1_REG: number;
    let WDT_WKEY: number;

    if (this.chipFamily === CHIP_FAMILY_ESP32S2) {
      WDTWPROTECT_REG = ESP32S2_RTC_CNTL_WDTWPROTECT_REG;
      WDTCONFIG0_REG = ESP32S2_RTC_CNTL_WDTCONFIG0_REG;
      WDTCONFIG1_REG = ESP32S2_RTC_CNTL_WDTCONFIG1_REG;
      WDT_WKEY = ESP32S2_RTC_CNTL_WDT_WKEY;
    } else if (this.chipFamily === CHIP_FAMILY_ESP32S3) {
      WDTWPROTECT_REG = ESP32S3_RTC_CNTL_WDTWPROTECT_REG;
      WDTCONFIG0_REG = ESP32S3_RTC_CNTL_WDTCONFIG0_REG;
      WDTCONFIG1_REG = ESP32S3_RTC_CNTL_WDTCONFIG1_REG;
      WDT_WKEY = ESP32S3_RTC_CNTL_WDT_WKEY;
    } else if (this.chipFamily === CHIP_FAMILY_ESP32C3) {
      WDTWPROTECT_REG = ESP32C3_RTC_CNTL_WDTWPROTECT_REG;
      WDTCONFIG0_REG = ESP32C3_RTC_CNTL_WDTCONFIG0_REG;
      WDTCONFIG1_REG = ESP32C3_RTC_CNTL_WDTCONFIG1_REG;
      WDT_WKEY = ESP32C3_RTC_CNTL_WDT_WKEY;
    } else if (
      this.chipFamily === CHIP_FAMILY_ESP32C5 ||
      this.chipFamily === CHIP_FAMILY_ESP32C6
    ) {
      // C5 和 C6 使用 LP_WDT（低功耗看门狗定时器）
      WDTWPROTECT_REG = ESP32C5_C6_RTC_CNTL_WDTWPROTECT_REG;
      WDTCONFIG0_REG = ESP32C5_C6_RTC_CNTL_WDTCONFIG0_REG;
      WDTCONFIG1_REG = ESP32C5_C6_RTC_CNTL_WDTCONFIG1_REG;
      WDT_WKEY = ESP32C5_C6_RTC_CNTL_WDT_WKEY;
    } else if (this.chipFamily === CHIP_FAMILY_ESP32P4) {
      // P4 使用 LP_WDT（低功耗看门狗定时器）
      WDTWPROTECT_REG = ESP32P4_RTC_CNTL_WDTWPROTECT_REG;
      WDTCONFIG0_REG = ESP32P4_RTC_CNTL_WDTCONFIG0_REG;
      WDTCONFIG1_REG = ESP32P4_RTC_CNTL_WDTCONFIG1_REG;
      WDT_WKEY = ESP32P4_RTC_CNTL_WDT_WKEY;
    } else {
      throw new Error(
        `rtcWdtResetChipSpecific() 不受支持于 ${this.chipFamily}`,
      );
    }

    // 解锁看门狗寄存器
    await this.writeRegister(WDTWPROTECT_REG, WDT_WKEY, undefined, 0);

    // 将 WDT 超时设置为 2000ms（匹配 Python esptool）
    await this.writeRegister(WDTCONFIG1_REG, 2000, undefined, 0);

    // 启用 WDT：位 31 = 启用，位 28-30 = 阶段，位 8 = 系统复位，位 0-2 = 预分频器
    const wdtConfig = (1 << 31) | (5 << 28) | (1 << 8) | 2;
    await this.writeRegister(WDTCONFIG0_REG, wdtConfig, undefined, 0);

    // 锁定看门狗寄存器
    await this.writeRegister(WDTWPROTECT_REG, 0, undefined, 0);

    // 等待复位生效
    await sleep(500);
  }

  /**
   * 将设备从引导加载程序模式复位到固件模式
   * 根据 USB 连接类型自动选择正确的复位策略
   * @param clearForceDownloadFlag - 如果为 true，则清除强制下载启动标志（仅限 USB-OTG）
   * @returns 如果端口将更改（USB-OTG）则返回 true，否则返回 false
   */
  public async resetToFirmwareMode(
    clearForceDownloadFlag = true,
  ): Promise<boolean> {
    this.logger.debug("正在从引导加载程序复位到固件模式...");

    try {
      // 检测 USB 连接类型
      const isUsbJtagOrOtg = await this.detectUsbConnectionType();

      if (isUsbJtagOrOtg) {
        // USB-JTAG/OTG 设备需要特殊处理
        this.logger.debug("检测到 USB-JTAG/OTG - 检查 WDT 复位支持");

        // 获取详细的 USB 模式信息
        let usbMode: {
          mode: "uart" | "usb-jtag-serial" | "usb-otg";
          uartNo: number;
        };
        try {
          usbMode = await this.getUsbMode();
          this.logger.debug(
            `USB 模式: ${usbMode.mode} (uartNo=${usbMode.uartNo})`,
          );
        } catch (err) {
          this.logger.debug(`无法获取 USB 模式: ${err}`);
          // 回退到通用的 USB-JTAG/OTG 处理
          usbMode = { mode: "usb-jtag-serial", uartNo: 0 };
        }

        // 检查芯片是否支持 WDT 复位
        // ESP32-C3 不需要 WDT 复位
        // WDT 复位受支持于：ESP32-S2、ESP32-S3、ESP32-P4
        // WDT 复位不受支持于：ESP32-C5、ESP32-C6、ESP32-C61、ESP32-H2
        const supportsWdtReset =
          this.chipFamily === CHIP_FAMILY_ESP32S2 ||
          this.chipFamily === CHIP_FAMILY_ESP32S3 ||
          this.chipFamily === CHIP_FAMILY_ESP32P4;

        if (!supportsWdtReset) {
          this.logger.debug(`${this.chipName} 不支持 WDT 复位 - 改用经典复位`);

          // 对于不支持 WDT 的芯片，使用经典复位
          await this.hardResetToFirmware();
          this.logger.debug("经典复位到固件完成");
          return false; // 端口保持打开
        }

        // WDT 复位受支持 - 继续使用 WDT 复位逻辑
        this.logger.debug(`${this.chipName} 支持 WDT 复位 - 使用 WDT 复位策略`);

        // 关键：WDT 寄存器写入需要 ROM（而非 stub）和波特率 115200

        // 如果在 stub 上，需要先返回 ROM
        if (this.IS_STUB) {
          this.logger.debug("在 stub 上 - 在 WDT 复位前返回 ROM");

          // 如果需要，将波特率改回 ROM 波特率
          if (this.currentBaudRate !== ESP_ROM_BAUD) {
            this.logger.debug(
              `将波特率从 ${this.currentBaudRate} 更改为 ${ESP_ROM_BAUD}`,
            );
            await this.reconfigurePort(ESP_ROM_BAUD);
            this.currentBaudRate = ESP_ROM_BAUD;
            this.logger.debug("波特率已更改为 115200");
          }

          // 关键：临时清除控制台模式标志，以便 hardReset(true) 正常工作
          const wasInConsoleMode = this._consoleMode;
          this._consoleMode = false;

          // 复位到引导加载程序（ROM）
          await this.hardReset(true);
          await sleep(200);

          // 恢复控制台模式标志
          this._consoleMode = wasInConsoleMode;

          // 与 ROM 同步
          await this.sync();
          this.IS_STUB = false;
          this.logger.debug("现在处于 ROM");
        } else {
          // 即使不在 stub 上，也要确保 WDT 寄存器写入的波特率为 115200
          if (this.currentBaudRate !== ESP_ROM_BAUD) {
            this.logger.debug(
              `不在 stub 上，但波特率为 ${this.currentBaudRate} - 为 WDT 复位更改为 ${ESP_ROM_BAUD}`,
            );
            await this.reconfigurePort(ESP_ROM_BAUD);
            this.currentBaudRate = ESP_ROM_BAUD;
            this.logger.debug("波特率已更改为 115200");
          }
        }

        // 如果需要，清除强制下载启动标志（仅限 USB-OTG）
        if (clearForceDownloadFlag && usbMode.mode === "usb-otg") {
          const flagCleared = await this._clearForceDownloadBootIfNeeded();
          if (flagCleared) {
            this.logger.debug("强制下载启动标志已清除");
          }
        }

        // 执行 WDT 复位以启动到固件
        await this.rtcWdtResetChipSpecific();
        this.logger.debug("已触发 WDT 复位 - 设备将启动到固件");

        // 检查 WDT 复位后端口是否会更改
        // USB-OTG（ESP32-S2/P4）：端口始终更改
        // USB-JTAG/串行（ESP32-S3/C3/C5/C6/C61/H2/P4）：端口可能因平台而异
        const portWillChange =
          usbMode.mode === "usb-otg" || usbMode.mode === "usb-jtag-serial";

        if (portWillChange) {
          this.logger.debug(
            `WDT 复位后端口将更改 (${usbMode.mode}) - 需要端口重新选择`,
          );
          return true;
        }

        return false;
      } else {
        // 外部串行芯片 - 使用经典复位到固件
        this.logger.debug("检测到外部串行芯片 - 使用经典复位");

        await this.hardResetToFirmware();
        this.logger.debug("经典复位到固件完成");
        return false;
      }
    } catch (err) {
      this.logger.error(`复位到固件模式失败: ${err}`);
      throw err;
    }
  }

  async hardReset(bootloader = false) {
    // 在控制台模式下，仅允许简单的硬件复位（不进入引导加载程序）
    if (this._consoleMode) {
      if (bootloader) {
        this.logger.debug("跳过引导加载程序复位 - 设备处于控制台模式");
        return;
      }
      // 简单的硬件复位以重启固件（IO0=HIGH）
      this.logger.debug("正在执行硬件复位（控制台模式）...");
      await this.resetInConsoleMode();
      this.logger.debug("硬件复位完成");
      return;
    }

    if (bootloader) {
      // 进入引导加载程序/闪存模式
      if (this.port.getInfo().usbProductId === USB_JTAG_SERIAL_PID) {
        await this.hardResetUSBJTAGSerial();
        this.logger.debug("USB-JTAG/串行复位到引导加载程序。");
      } else {
        await this.hardResetClassic();
        this.logger.debug("经典复位到引导加载程序。");
      }
    } else {
      // 复位到固件模式（退出引导加载程序）
      // 根据 USB 连接类型使用智能复位策略
      this.logger.debug("正在复位到固件模式...");

      // 检测 USB 连接类型以选择正确的复位方法
      const isUsbJtagOrOtg = await this.detectUsbConnectionType();

      if (isUsbJtagOrOtg) {
        // USB-JTAG/OTG 设备：使用 WDT 复位
        this.logger.debug("检测到 USB-JTAG/OTG - 使用 WDT 复位");

        // 获取 USB 模式详细信息
        let usbMode: {
          mode: "uart" | "usb-jtag-serial" | "usb-otg";
          uartNo: number;
        };
        try {
          usbMode = await this.getUsbMode();
          this.logger.debug(
            `USB 模式: ${usbMode.mode} (uartNo=${usbMode.uartNo})`,
          );
        } catch (err) {
          this.logger.debug(`无法获取 USB 模式: ${err}`);
          usbMode = { mode: "usb-jtag-serial", uartNo: 0 };
        }

        // 为 USB-OTG 设备清除强制下载标志
        if (usbMode.mode === "usb-otg") {
          try {
            const flagCleared = await this._clearForceDownloadBootIfNeeded();
            if (flagCleared) {
              this.logger.debug("强制下载启动标志已清除");
            }
          } catch (err) {
            this.logger.debug(`无法清除强制下载标志: ${err}`);
          }
        }

        // 执行 WDT 复位
        await this.rtcWdtResetChipSpecific();
        this.logger.debug(`${this.chipName}: WDT 复位到固件完成`);
        return;
      } else {
        // 外部串行芯片：使用经典复位
        this.logger.debug("检测到外部串行芯片 - 使用经典复位");

        if (this.isWebUSB()) {
          // WebUSB：使用更长的延迟以获得更好的兼容性
          await this.setRTSWebUSB(true); // EN->LOW
          await sleep(200);
          await this.setRTSWebUSB(false);
          await sleep(200);
          this.logger.debug("硬复位到固件（WebUSB）。");
        } else {
          // Web 串行：标准复位
          await this.setRTS(true); // EN->LOW
          await sleep(100);
          await this.setRTS(false);
          this.logger.debug("硬复位到固件。");
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  /**
   * @name macAddr
   * 烧录到 ESP 芯片 OTP 存储器中的 MAC 地址
   */
  macAddr() {
    const macAddr = new Array(6).fill(0);
    const mac0 = this._efuses[0];
    const mac1 = this._efuses[1];
    const mac2 = this._efuses[2];
    const mac3 = this._efuses[3];
    let oui;
    if (this.chipFamily == CHIP_FAMILY_ESP8266) {
      if (mac3 != 0) {
        oui = [(mac3 >> 16) & 0xff, (mac3 >> 8) & 0xff, mac3 & 0xff];
      } else if (((mac1 >> 16) & 0xff) == 0) {
        oui = [0x18, 0xfe, 0x34];
      } else if (((mac1 >> 16) & 0xff) == 1) {
        oui = [0xac, 0xd0, 0x74];
      } else {
        throw new Error("无法确定 OUI");
      }

      macAddr[0] = oui[0];
      macAddr[1] = oui[1];
      macAddr[2] = oui[2];
      macAddr[3] = (mac1 >> 8) & 0xff;
      macAddr[4] = mac1 & 0xff;
      macAddr[5] = (mac0 >> 24) & 0xff;
    } else if (this.chipFamily == CHIP_FAMILY_ESP32) {
      macAddr[0] = (mac2 >> 8) & 0xff;
      macAddr[1] = mac2 & 0xff;
      macAddr[2] = (mac1 >> 24) & 0xff;
      macAddr[3] = (mac1 >> 16) & 0xff;
      macAddr[4] = (mac1 >> 8) & 0xff;
      macAddr[5] = mac1 & 0xff;
    } else if (
      this.chipFamily == CHIP_FAMILY_ESP32S2 ||
      this.chipFamily == CHIP_FAMILY_ESP32S3 ||
      this.chipFamily == CHIP_FAMILY_ESP32C2 ||
      this.chipFamily == CHIP_FAMILY_ESP32C3 ||
      this.chipFamily == CHIP_FAMILY_ESP32C5 ||
      this.chipFamily == CHIP_FAMILY_ESP32C6 ||
      this.chipFamily == CHIP_FAMILY_ESP32C61 ||
      this.chipFamily == CHIP_FAMILY_ESP32H2 ||
      this.chipFamily == CHIP_FAMILY_ESP32H4 ||
      this.chipFamily == CHIP_FAMILY_ESP32H21 ||
      this.chipFamily == CHIP_FAMILY_ESP32P4 ||
      this.chipFamily == CHIP_FAMILY_ESP32S31
    ) {
      macAddr[0] = (mac1 >> 8) & 0xff;
      macAddr[1] = mac1 & 0xff;
      macAddr[2] = (mac0 >> 24) & 0xff;
      macAddr[3] = (mac0 >> 16) & 0xff;
      macAddr[4] = (mac0 >> 8) & 0xff;
      macAddr[5] = mac0 & 0xff;
    } else {
      throw new Error("未知的芯片系列");
    }
    return macAddr;
  }

  async readRegister(reg: number) {
    if (this.debug) {
      this.logger.debug("从寄存器读取 " + toHex(reg, 8));
    }
    const packet = pack("<I", reg);
    await this.sendCommand(ESP_READ_REG, packet);
    const [val] = await this.getResponse(ESP_READ_REG);
    return val;
  }

  /**
   * @name checkCommand
   * 发送命令包，检查命令是否成功，并返回包含值和数据的元组。
   * 有关值/数据的更多详细信息，请参阅 ESP 串行协议。
   *
   * 命令被序列化以防止并发执行，这可能导致在 Windows 下的 CP210x 适配器上发生 WritableStream 锁定争用。
   */
  async checkCommand(
    opcode: number,
    buffer: number[],
    checksum = 0,
    timeout = DEFAULT_TIMEOUT,
  ): Promise<[number, number[]]> {
    // 序列化命令执行以防止锁定争用
    const executeCommand = async (): Promise<[number, number[]]> => {
      timeout = Math.min(timeout, MAX_TIMEOUT);
      await this.sendCommand(opcode, buffer, checksum);
      const [value, responseData] = await this.getResponse(opcode, timeout);

      if (responseData === null) {
        throw new Error("未获取到足够的状态字节");
      }

      let data = responseData;
      let statusLen = 0;

      if (this.IS_STUB || this.chipFamily == CHIP_FAMILY_ESP8266) {
        statusLen = 2;
      } else if (
        [
          CHIP_FAMILY_ESP32,
          CHIP_FAMILY_ESP32S2,
          CHIP_FAMILY_ESP32S3,
          CHIP_FAMILY_ESP32C2,
          CHIP_FAMILY_ESP32C3,
          CHIP_FAMILY_ESP32C5,
          CHIP_FAMILY_ESP32C6,
          CHIP_FAMILY_ESP32C61,
          CHIP_FAMILY_ESP32H2,
          CHIP_FAMILY_ESP32H4,
          CHIP_FAMILY_ESP32H21,
          CHIP_FAMILY_ESP32P4,
          CHIP_FAMILY_ESP32S31,
        ].includes(this.chipFamily)
      ) {
        statusLen = 4;
      } else {
        // 当 chipFamily 尚未设置时（例如在 detectChip 中的 GET_SECURITY_INFO 期间），
        // 假设现代芯片使用 4 字节状态
        if (opcode === ESP_GET_SECURITY_INFO) {
          statusLen = 4;
        } else if ([2, 4].includes(data.length)) {
          statusLen = data.length;
        } else {
          // 如果无法确定，默认为 2 字节状态
          // 这可以防止当 statusLen 将为 0 时发生静默数据损坏
          statusLen = 2;
          this.logger.debug(
            `未知的芯片系列，默认使用 2 字节状态 (opcode: ${toHex(opcode)}, data.length: ${data.length})`,
          );
        }
      }

      if (data.length < statusLen) {
        throw new Error("未获取到足够的状态字节");
      }
      const status = data.slice(-statusLen, data.length);
      data = data.slice(0, -statusLen);
      if (this.debug) {
        this.logger.debug("状态", status);
        this.logger.debug("值", value);
        this.logger.debug("数据", data);
      }
      if (status[0] == 1) {
        if (status[1] == ROM_INVALID_RECV_MSG) {
          // 不受支持的命令可能导致多个错误响应
          // 使用 drainInputBuffer 以确保 Windows 上的 CP210x 兼容性
          await this.drainInputBuffer(200);
          throw new Error("无效（不受支持）的命令 " + toHex(opcode));
        } else {
          throw new Error("命令失败错误代码 " + toHex(status[1]));
        }
      }

      return [value, data];
    };

    // 通过锁链式执行命令
    // 使用 .then() 处理程序以确保即使在错误时锁也能继续
    this._commandLock = this._commandLock.then(executeCommand, executeCommand);
    return this._commandLock;
  }

  /**
   * @name sendCommand
   * 在 UART 上发送经过 slip 编码、带校验和的命令，不检查响应
   */
  async sendCommand(opcode: number, buffer: number[], checksum = 0) {
    const packet = slipEncode([
      ...pack("<BBHI", 0x00, opcode, buffer.length, checksum),
      ...buffer,
    ]);

    if (this.debug) {
      this.logger.debug(`写入 ${packet.length} 字节:`, packet);
    }
    await this.writeToStream(packet);
  }

  /**
   * @name readPacket
   * 从串口读取 SLIP 包的生成器。
   * 每次生成一个完整的 SLIP 包，在超时或无效数据时引发异常。
   *
   * 两种实现：
   * - 突发模式：CDC 设备（原生 USB）和 CH343 - 极速处理
   * - 逐字节模式：CH340、CP2102 和其他 USB 串行适配器 - 稳定快速处理
   */
  async readPacket(timeout: number): Promise<number[]> {
    let partialPacket: number[] | null = null;
    let inEscape = false;

    // CDC 设备使用突发处理，非 CDC 使用逐字节处理
    if (this._isCDCDevice) {
      // 突发版本：一次处理所有可用字节，用于超高速传输
      // 用于：CDC 设备（所有平台）和 CH343
      const startTime = Date.now();

      while (true) {
        // 检查放弃标志（用于复位策略超时）
        if (this._abandonCurrentOperation) {
          throw new SlipReadError("操作已放弃（复位策略超时）");
        }

        // 检查超时
        if (Date.now() - startTime > timeout) {
          const waitingFor = partialPacket === null ? "包头" : "内容";
          throw new SlipReadError("等待包超时 " + waitingFor);
        }

        // 如果没有数据可用，等待片刻
        if (this._inputBufferAvailable === 0) {
          await sleep(1);
          continue;
        }

        // 处理所有可用字节，不返回外部循环
        // 这对于处理高速突发传输至关重要
        while (this._inputBufferAvailable > 0) {
          // 定期检查超时以防止慢速数据时挂起
          if (Date.now() - startTime > timeout) {
            const waitingFor = partialPacket === null ? "包头" : "内容";
            throw new SlipReadError("等待包超时 " + waitingFor);
          }
          const byte = this._readByte()!;

          if (partialPacket === null) {
            // 等待包头
            if (byte == this.SLIP_END) {
              partialPacket = [];
            } else {
              if (this.debug) {
                this.logger.debug("读取到无效数据: " + toHex(byte));
                this.logger.debug(
                  "串行缓冲区中剩余数据: " + hexFormatter(this._inputBuffer),
                );
              }
              throw new SlipReadError("无效的包首字节 (" + toHex(byte) + ")");
            }
          } else if (inEscape) {
            // 转义序列进行中
            inEscape = false;
            if (byte == this.SLIP_ESC_END) {
              partialPacket.push(this.SLIP_END);
            } else if (byte == this.SLIP_ESC_ESC) {
              partialPacket.push(this.SLIP_ESC);
            } else {
              if (this.debug) {
                this.logger.debug("读取到无效数据: " + toHex(byte));
                this.logger.debug(
                  "串行缓冲区中剩余数据: " + hexFormatter(this._inputBuffer),
                );
              }
              throw new SlipReadError(
                "无效的 SLIP 转义 (0xdb, " + toHex(byte) + ")",
              );
            }
          } else if (byte == this.SLIP_ESC) {
            // 转义序列开始
            inEscape = true;
          } else if (byte == this.SLIP_END) {
            // 包结束
            if (this.debug)
              this.logger.debug("收到完整包: " + hexFormatter(partialPacket));
            // 定期压缩缓冲区以防止内存增长
            this._compactInputBuffer();
            return partialPacket;
          } else {
            // 包中的正常字节
            partialPacket.push(byte);
          }
        }
      }
    } else {
      // 逐字节版本：对于非 CDC USB 串行适配器（CH340、CP2102 等）稳定
      let readBytes: number[] = [];
      while (true) {
        // 检查放弃标志（用于复位策略超时）
        if (this._abandonCurrentOperation) {
          throw new SlipReadError("操作已放弃（复位策略超时）");
        }

        const stamp = Date.now();
        readBytes = [];
        while (Date.now() - stamp < timeout) {
          if (this._inputBufferAvailable > 0) {
            readBytes.push(this._readByte()!);
            break;
          } else {
            // 减少休眠时间，以便在高速传输期间更快响应
            await sleep(1);
          }
        }
        if (readBytes.length == 0) {
          const waitingFor = partialPacket === null ? "包头" : "内容";
          throw new SlipReadError("等待包超时 " + waitingFor);
        }
        if (this.debug)
          this.logger.debug(
            "读取 " + readBytes.length + " 字节: " + hexFormatter(readBytes),
          );
        for (const byte of readBytes) {
          if (partialPacket === null) {
            // 等待包头
            if (byte == this.SLIP_END) {
              partialPacket = [];
            } else {
              if (this.debug) {
                this.logger.debug("读取到无效数据: " + toHex(byte));
                this.logger.debug(
                  "串行缓冲区中剩余数据: " + hexFormatter(this._inputBuffer),
                );
              }
              throw new SlipReadError("无效的包首字节 (" + toHex(byte) + ")");
            }
          } else if (inEscape) {
            // 转义序列进行中
            inEscape = false;
            if (byte == this.SLIP_ESC_END) {
              partialPacket.push(this.SLIP_END);
            } else if (byte == this.SLIP_ESC_ESC) {
              partialPacket.push(this.SLIP_ESC);
            } else {
              if (this.debug) {
                this.logger.debug("读取到无效数据: " + toHex(byte));
                this.logger.debug(
                  "串行缓冲区中剩余数据: " + hexFormatter(this._inputBuffer),
                );
              }
              throw new SlipReadError(
                "无效的 SLIP 转义 (0xdb, " + toHex(byte) + ")",
              );
            }
          } else if (byte == this.SLIP_ESC) {
            // 转义序列开始
            inEscape = true;
          } else if (byte == this.SLIP_END) {
            // 包结束
            if (this.debug)
              this.logger.debug("收到完整包: " + hexFormatter(partialPacket));
            // 定期压缩缓冲区以防止内存增长
            this._compactInputBuffer();
            return partialPacket;
          } else {
            // 包中的正常字节
            partialPacket.push(byte);
          }
        }
      }
    }
  }

  /**
   * @name getResponse
   * 读取响应数据并解码 slip 包，然后解析出值/数据，并返回元组 (value, data)，其中每个都是字节列表
   */
  async getResponse(
    opcode: number,
    timeout = DEFAULT_TIMEOUT,
  ): Promise<[number, number[]]> {
    for (let i = 0; i < 100; i++) {
      const packet = await this.readPacket(timeout);

      if (packet.length < 8) {
        continue;
      }

      const [resp, opRet, , val] = unpack("<BBHI", packet.slice(0, 8));

      if (resp != 1) {
        continue;
      }
      const data = packet.slice(8);
      if (opcode == null || opRet == opcode) {
        return [val, data];
      }
      if (data[0] != 0 && data[1] == ROM_INVALID_RECV_MSG) {
        // 不受支持的命令可能导致多个错误响应
        // 使用 drainInputBuffer 以确保 Windows 上的 CP210x 兼容性
        await this.drainInputBuffer(200);
        throw new Error(`无效（不受支持）的命令 ${toHex(opcode)}`);
      }
    }
    throw new Error("响应与请求不匹配");
  }

  /**
   * @name checksum
   * 计算数据块的校验和，如 ROM 所定义
   */
  checksum(data: number[], state = ESP_CHECKSUM_MAGIC) {
    for (const b of data) {
      state ^= b;
    }
    return state;
  }

  async getC5CrystalFreqRomExpect(): Promise<number> {
    const reg = await this.readRegister(ESP32C5_PCR_SYSCLK_CONF_REG);
    return (
      (reg & ESP32C5_PCR_SYSCLK_XTAL_FREQ_V) >>> ESP32C5_PCR_SYSCLK_XTAL_FREQ_S
    );
  }

  async getC5CrystalFreqDetected(): Promise<number> {
    const UART_CLKDIV_MASK = 0xfffff;
    const uartDiv =
      (await this.readRegister(ESP32C5_UART_CLKDIV_REG)) & UART_CLKDIV_MASK;
    const estXtal = (ESP_ROM_BAUD * uartDiv) / 1e6;
    if (estXtal > 45) return 48;
    if (estXtal > 33) return 40;
    return 26;
  }

  async setBaudrate(baud: number) {
    const chipFamily = this._parent ? this._parent.chipFamily : this.chipFamily;

    if (!this.IS_STUB && chipFamily === CHIP_FAMILY_ESP32C5) {
      await this.setBaudrateC5Rom(baud);
    } else {
      try {
        const buffer = pack("<II", baud, this.IS_STUB ? ESP_ROM_BAUD : 0);
        await this.checkCommand(ESP_CHANGE_BAUDRATE, buffer);
      } catch (e) {
        this.logger.error(`波特率更改错误: ${e}`);
        throw new Error(`无法将波特率更改为 ${baud}：设置波特率命令无响应。`);
      }
    }

    if (this._parent) {
      await this._parent.reconfigurePort(baud);
    } else {
      await this.reconfigurePort(baud);
    }

    // 波特率更改后等待端口准备就绪
    await sleep(SYNC_TIMEOUT);

    // 为重新连接跟踪当前波特率
    if (this._parent) {
      this._parent.currentBaudRate = baud;
    } else {
      this.currentBaudRate = baud;
    }

    // 如果波特率超过 USB 串行芯片的能力，发出警告
    const maxBaud = this._parent
      ? this._parent._maxUSBSerialBaudrate
      : this._maxUSBSerialBaudrate;
    if (maxBaud && baud > maxBaud) {
      this.logger.log(
        `⚠️ 警告：波特率 ${baud} 超过 USB 串行芯片的限制 (${maxBaud})！`,
      );
      this.logger.log(`⚠️ 这可能导致数据损坏或连接失败！`);
    }

    this.logger.debug(`波特率已更改为 ${baud}`);
  }

  private async setBaudrateC5Rom(baud: number) {
    const crystalFreqRomExpect = await this.getC5CrystalFreqRomExpect();
    const crystalFreqDetect = await this.getC5CrystalFreqDetected();
    this.logger.log(
      `ROM 期望的晶振频率: ${crystalFreqRomExpect} MHz，检测到 ${crystalFreqDetect} MHz。`,
    );

    let baudRate = baud;
    if (crystalFreqDetect === 48 && crystalFreqRomExpect === 40) {
      baudRate = Math.trunc((baud * 40) / 48);
    } else if (crystalFreqDetect === 40 && crystalFreqRomExpect === 48) {
      baudRate = Math.trunc((baud * 48) / 40);
    }

    this.logger.log(`正在将波特率更改为 ${baudRate}...`);
    try {
      const buffer = pack("<II", baudRate, 0);
      await this.checkCommand(ESP_CHANGE_BAUDRATE, buffer);
    } catch (e) {
      this.logger.error(`波特率更改错误: ${e}`);
      throw new Error(`无法将波特率更改为 ${baudRate}：设置波特率命令无响应。`);
    }
    this.logger.log("已更改。");
  }

  async reconfigurePort(baud: number) {
    // 在整个重新配置期间阻止新写入（所有路径）
    this._isReconfiguring = true;

    try {
      // 等待待处理的写入完成
      try {
        await this._writeChain;
      } catch (err) {
        this.logger.debug(`重新配置期间待处理写入错误: ${err}`);
      }

      // WebUSB：检查是否应该使用 setBaudRate() 还是关闭/重新打开
      if (this.isWebUSB()) {
        const portInfo = this.port.getInfo();
        const isCH343 =
          portInfo.usbVendorId === 0x1a86 && portInfo.usbProductId === 0x55d3;

        // CH343 是 CDC 设备，必须使用关闭/重新打开
        // 其他芯片（CH340、CP2102、FTDI）必须使用 setBaudRate()
        if (
          !isCH343 &&
          typeof (this.port as WebUSBSerialPort).setBaudRate === "function"
        ) {
          //          this.logger.log(
          //            `[WebUSB] 使用 setBaudRate() 将波特率更改为 ${baud}...`,
          //          );
          await (this.port as WebUSBSerialPort).setBaudRate(baud);
          //          this.logger.log(`[WebUSB] 波特率已更改为 ${baud}`);

          // 给芯片一些时间适应新波特率
          await sleep(100);
          return;
        } else if (isCH343) {
          //          this.logger.log(
          //            `[WebUSB] 检测到 CH343 - 使用关闭/重新打开进行波特率更改`,
          //          );
        }
      }

      // Web 串行或 CH343：关闭并重新打开端口
      // 在关闭前释放持久写入器
      if (this._writer) {
        try {
          this._writer.releaseLock();
        } catch (err) {
          this.logger.debug(`重新配置期间写入器释放错误: ${err}`);
        }
        this._writer = undefined;
      }

      // SerialPort 在打开时不允许重新配置，因此我们关闭并重新打开
      // reader.cancel() 会导致在 readLoop 上运行的读取操作返回的 Promise 立即返回 { value: undefined, done: true }，
      // 从而中断循环并退出 readLoop()；
      await this._reader?.cancel();
      await this.port.close();

      // 重新打开端口
      await this.port.open({ baudRate: baud });

      // 再次清空缓冲区
      await this.flushSerialBuffers();

      // 重启读取循环
      this.readLoop();
    } catch {
      //      this.logger.error(`重新配置端口错误`);
      //      throw new Error(`无法将波特率更改为 ${baud}`);
    } finally {
      // 始终重置标志，即使在错误或提前返回时
      this._isReconfiguring = false;
    }
  }

  /**
   * @name syncWithTimeout
   * 带超时的同步，可以放弃（用于复位策略循环）
   * 此方法内部有时间限制，并检查放弃标志
   */
  async syncWithTimeout(timeoutMs: number): Promise<boolean> {
    const startTime = Date.now();

    for (let i = 0; i < 5; i++) {
      // 检查是否超过超时时间
      if (Date.now() - startTime > timeoutMs) {
        return false;
      }

      // 检查放弃标志
      if (this._abandonCurrentOperation) {
        return false;
      }

      this._clearInputBuffer();

      try {
        const response = await this._sync();
        if (response) {
          await sleep(SYNC_TIMEOUT);
          return true;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // 出错后检查放弃标志
        if (this._abandonCurrentOperation) {
          return false;
        }
      }

      await sleep(SYNC_TIMEOUT);
    }

    return false;
  }

  /**
   * @name sync
   * 进入 ROM 引导加载模式并尝试与 ESP ROM 引导加载程序同步，我们将重试几次
   */
  async sync() {
    for (let i = 0; i < 5; i++) {
      this._clearInputBuffer();
      const response = await this._sync();
      if (response) {
        await sleep(SYNC_TIMEOUT);
        return true;
      }
      await sleep(SYNC_TIMEOUT);
    }

    throw new Error("无法同步到 ESP。请尝试复位。");
  }

  /**
   * @name _sync
   * 使用 AT 同步包执行软同步，不执行任何硬件复位
   */
  async _sync() {
    await this.sendCommand(ESP_SYNC, SYNC_PACKET);

    for (let i = 0; i < 8; i++) {
      try {
        const [, data] = await this.getResponse(ESP_SYNC, SYNC_TIMEOUT);
        if (data.length > 1 && data[0] == 0 && data[1] == 0) {
          return true;
        }
      } catch (e) {
        if (this.debug) {
          this.logger.debug(`同步尝试 ${i + 1} 失败: ${e}`);
        }
      }
    }
    return false;
  }

  /**
   * @name getFlashWriteSize
   * 根据芯片获取闪存写入大小
   */
  getFlashWriteSize() {
    if (this.IS_STUB) {
      return STUB_FLASH_WRITE_SIZE;
    }
    return FLASH_WRITE_SIZE;
  }

  /**
   * @name flashData
   * 将完整的未压缩二进制文件编程到 SPI 闪存的给定偏移量处。
   * 如果是 ESP32 且传入了 md5 字符串，还将验证内存。ESP8266 在 ROM 中没有校验和内存验证功能。
   */
  async flashData(
    binaryData: ArrayBuffer,
    updateProgress: (bytesWritten: number, totalBytes: number) => void,
    offset = 0,
    compress = false,
  ) {
    if (binaryData.byteLength >= 8) {
      // 解包（潜在的）镜像头部
      const header = Array.from(new Uint8Array(binaryData, 0, 4));
      const headerMagic = header[0];
      const headerFlashMode = header[2];
      const headerFlashSizeFreq = header[3];

      this.logger.log(
        `镜像头部，Magic=${toHex(headerMagic)}，FlashMode=${toHex(
          headerFlashMode,
        )}，FlashSizeFreq=${toHex(headerFlashSizeFreq)}`,
      );
    }

    const paddedData = padTo(new Uint8Array(binaryData), 4);
    binaryData = paddedData.buffer as ArrayBuffer;

    const uncompressedFilesize = binaryData.byteLength;
    let compressedFilesize = 0;

    let dataToFlash;
    let timeout = DEFAULT_TIMEOUT;

    if (compress) {
      dataToFlash = deflate(new Uint8Array(binaryData), {
        level: 9,
      }).buffer;
      compressedFilesize = dataToFlash.byteLength;
      this.logger.log(
        `正在写入数据，文件大小: ${uncompressedFilesize}。压缩后大小: ${compressedFilesize}`,
      );
      timeout = await this.flashDeflBegin(
        uncompressedFilesize,
        compressedFilesize,
        offset,
      );
    } else {
      this.logger.log(`正在写入数据，文件大小: ${uncompressedFilesize}`);
      dataToFlash = binaryData;
      await this.flashBegin(uncompressedFilesize, offset);
    }

    let block = [];
    let seq = 0;
    let written = 0;
    let position = 0;
    const stamp = Date.now();
    const flashWriteSize = this.getFlashWriteSize();

    const filesize = compress ? compressedFilesize : uncompressedFilesize;

    while (filesize - position > 0) {
      if (this.debug) {
        this.logger.log(
          `正在写入地址 ${toHex(offset + seq * flashWriteSize, 8)} `,
        );
      }
      if (filesize - position >= flashWriteSize) {
        block = Array.from(
          new Uint8Array(dataToFlash, position, flashWriteSize),
        );
      } else {
        // 仅当发送未压缩数据时才填充最后一个块。
        block = Array.from(
          new Uint8Array(dataToFlash, position, filesize - position),
        );
        if (!compress) {
          block = block.concat(
            new Array(flashWriteSize - block.length).fill(0xff),
          );
        }
      }
      if (compress) {
        await this.flashDeflBlock(block, seq, timeout);
      } else {
        await this.flashBlock(block, seq);
      }
      seq += 1;
      // 如果使用压缩，我们根据块长度与压缩比例成比例地更新进度。
      // 这样我们报告的是未压缩大小的进度
      written += compress
        ? Math.round((block.length * uncompressedFilesize) / compressedFilesize)
        : block.length;
      position += flashWriteSize;
      updateProgress(
        Math.min(written, uncompressedFilesize),
        uncompressedFilesize,
      );
    }
    this.logger.log(
      "写入 " + filesize + " 字节耗时 " + (Date.now() - stamp) + " 毫秒",
    );

    // 仅当运行 stub 时才发送 flash finish，因为这会促使 ROM 退出并运行用户代码
    if (this.IS_STUB) {
      await this.flashBegin(0, 0);
      if (compress) {
        await this.flashDeflFinish();
      } else {
        await this.flashFinish();
      }
    }
  }

  /**
   * @name flashBlock
   * 发送一个数据块以编程到 SPI 闪存中
   */
  async flashBlock(data: number[], seq: number, timeout = DEFAULT_TIMEOUT) {
    await this.checkCommand(
      ESP_FLASH_DATA,
      pack("<IIII", data.length, seq, 0, 0).concat(data),
      this.checksum(data),
      timeout,
    );
  }
  async flashDeflBlock(data: number[], seq: number, timeout = DEFAULT_TIMEOUT) {
    await this.checkCommand(
      ESP_FLASH_DEFL_DATA,
      pack("<IIII", data.length, seq, 0, 0).concat(data),
      this.checksum(data),
      timeout,
    );
  }

  /**
   * @name flashBegin
   * 通过附加 SPI 芯片并擦除所需数量的块来为闪存做准备。
   */
  async flashBegin(size = 0, offset = 0, encrypted = false) {
    // 在闪存写入操作之前刷新串行缓冲区
    await this.flushSerialBuffers();

    let eraseSize;
    const flashWriteSize = this.getFlashWriteSize();
    if (
      !this.IS_STUB &&
      [
        CHIP_FAMILY_ESP32,
        CHIP_FAMILY_ESP32S2,
        CHIP_FAMILY_ESP32S3,
        CHIP_FAMILY_ESP32C2,
        CHIP_FAMILY_ESP32C3,
        CHIP_FAMILY_ESP32C5,
        CHIP_FAMILY_ESP32C6,
        CHIP_FAMILY_ESP32C61,
        CHIP_FAMILY_ESP32H2,
        CHIP_FAMILY_ESP32H4,
        CHIP_FAMILY_ESP32H21,
        CHIP_FAMILY_ESP32P4,
        CHIP_FAMILY_ESP32S31,
      ].includes(this.chipFamily)
    ) {
      await this.checkCommand(ESP_SPI_ATTACH, new Array(8).fill(0));
    }
    const numBlocks = Math.floor((size + flashWriteSize - 1) / flashWriteSize);
    if (this.chipFamily == CHIP_FAMILY_ESP8266 && !this.IS_STUB) {
      eraseSize = this.getEraseSize(offset, size);
    } else {
      eraseSize = size;
    }

    const timeout = this.IS_STUB
      ? DEFAULT_TIMEOUT
      : timeoutPerMb(ERASE_REGION_TIMEOUT_PER_MB, size);

    const stamp = Date.now();
    let buffer = pack("<IIII", eraseSize, numBlocks, flashWriteSize, offset);
    if (
      this.chipFamily == CHIP_FAMILY_ESP32 ||
      this.chipFamily == CHIP_FAMILY_ESP32S2 ||
      this.chipFamily == CHIP_FAMILY_ESP32S3 ||
      this.chipFamily == CHIP_FAMILY_ESP32C2 ||
      this.chipFamily == CHIP_FAMILY_ESP32C3 ||
      this.chipFamily == CHIP_FAMILY_ESP32C5 ||
      this.chipFamily == CHIP_FAMILY_ESP32C6 ||
      this.chipFamily == CHIP_FAMILY_ESP32C61 ||
      this.chipFamily == CHIP_FAMILY_ESP32H2 ||
      this.chipFamily == CHIP_FAMILY_ESP32H4 ||
      this.chipFamily == CHIP_FAMILY_ESP32H21 ||
      this.chipFamily == CHIP_FAMILY_ESP32P4 ||
      this.chipFamily == CHIP_FAMILY_ESP32S31
    ) {
      buffer = buffer.concat(pack("<I", encrypted ? 1 : 0));
    }
    this.logger.log(
      "擦除大小 " +
        eraseSize +
        "，块数 " +
        numBlocks +
        "，块大小 " +
        toHex(flashWriteSize, 4) +
        "，偏移量 " +
        toHex(offset, 4) +
        "，加密 " +
        (encrypted ? "是" : "否"),
    );
    await this.checkCommand(ESP_FLASH_BEGIN, buffer, 0, timeout);
    if (size != 0 && !this.IS_STUB) {
      this.logger.log(
        "擦除 " + numBlocks + " 字节耗时 " + (Date.now() - stamp) + " 毫秒",
      );
    }
    return numBlocks;
  }

  /**
   * @name flashDeflBegin
   *
   */

  async flashDeflBegin(size = 0, compressedSize = 0, offset = 0) {
    // 开始下载压缩数据到闪存（执行擦除）
    // 返回要写入的块数。
    const flashWriteSize = this.getFlashWriteSize();
    const numBlocks = Math.floor(
      (compressedSize + flashWriteSize - 1) / flashWriteSize,
    );
    const eraseBlocks = Math.floor(
      (size + flashWriteSize - 1) / flashWriteSize,
    );
    let writeSize = 0;
    let timeout = 0;

    if (this.IS_STUB) {
      writeSize = size; // stub 期望这里的字节数，在内部管理擦除
      timeout = timeoutPerMb(ERASE_REGION_TIMEOUT_PER_MB, writeSize); // ROM 预先执行擦除
    } else {
      writeSize = eraseBlocks * flashWriteSize; // ROM 期望向上取整到擦除块大小
      timeout = DEFAULT_TIMEOUT;
    }
    const buffer = pack("<IIII", writeSize, numBlocks, flashWriteSize, offset);

    await this.checkCommand(ESP_FLASH_DEFL_BEGIN, buffer, 0, timeout);

    return timeout;
  }

  async flashFinish() {
    const buffer = pack("<I", 1);
    await this.checkCommand(ESP_FLASH_END, buffer);
  }

  async flashDeflFinish() {
    const buffer = pack("<I", 1);
    await this.checkCommand(ESP_FLASH_DEFL_END, buffer);
  }

  getBootloaderOffset() {
    const bootFlashOffs = getSpiFlashAddresses(this.getChipFamily());
    const BootldrFlashOffs = bootFlashOffs.flashOffs;
    return BootldrFlashOffs;
  }

  async flashId() {
    const SPIFLASH_RDID = 0x9f;
    const result = await this.runSpiFlashCommand(SPIFLASH_RDID, [], 24);
    return result;
  }

  getChipFamily() {
    return this._parent ? this._parent.chipFamily : this.chipFamily;
  }

  async writeRegister(
    address: number,
    value: number,
    mask = 0xffffffff,
    delayUs = 0,
    delayAfterUs = 0,
  ) {
    let buffer = pack("<IIII", address, value, mask, delayUs);
    if (delayAfterUs > 0) {
      // 添加一个对日期寄存器的虚拟写入作为延迟的借口
      buffer = buffer.concat(
        pack(
          "<IIII",
          getSpiFlashAddresses(this.getChipFamily()).uartDateReg,
          0,
          0,
          delayAfterUs,
        ),
      );
    }
    await this.checkCommand(ESP_WRITE_REG, buffer);
  }

  async setDataLengths(
    spiAddresses: SpiFlashAddresses,
    mosiBits: number,
    misoBits: number,
  ) {
    if (spiAddresses.mosiDlenOffs != -1) {
      // 实际 MCU 有一种更复杂的方式来设置“用户”命令
      const SPI_MOSI_DLEN_REG =
        spiAddresses.regBase + spiAddresses.mosiDlenOffs;
      const SPI_MISO_DLEN_REG =
        spiAddresses.regBase + spiAddresses.misoDlenOffs;
      if (mosiBits > 0) {
        await this.writeRegister(SPI_MOSI_DLEN_REG, mosiBits - 1);
      }
      if (misoBits > 0) {
        await this.writeRegister(SPI_MISO_DLEN_REG, misoBits - 1);
      }
    } else {
      const SPI_DATA_LEN_REG = spiAddresses.regBase + spiAddresses.usr1Offs;
      const SPI_MOSI_BITLEN_S = 17;
      const SPI_MISO_BITLEN_S = 8;
      const mosiMask = mosiBits == 0 ? 0 : mosiBits - 1;
      const misoMask = misoBits == 0 ? 0 : misoBits - 1;
      const value =
        (misoMask << SPI_MISO_BITLEN_S) | (mosiMask << SPI_MOSI_BITLEN_S);
      await this.writeRegister(SPI_DATA_LEN_REG, value);
    }
  }
  async waitDone(spiCmdReg: number, spiCmdUsr: number) {
    for (let i = 0; i < 10; i++) {
      const cmdValue = await this.readRegister(spiCmdReg);
      if ((cmdValue & spiCmdUsr) == 0) {
        return;
      }
    }
    throw Error("SPI 命令未在时间内完成");
  }

  async runSpiFlashCommand(
    spiflashCommand: number,
    data: number[],
    readBits = 0,
  ) {
    // 运行任意的 SPI 闪存命令。

    // 此函数使用 ESP SPI 硬件中的“USR_COMMAND”功能，而不是硬件支持的预定义命令。
    // 因此 spiflash_command 的值是通过线路发送的实际命令字节。

    // 写入命令字节后，将 'data' 写入 MOSI，然后从 MISO 读回 'read_bits' 的回复。结果是一个数字。

    // SPI_USR 寄存器标志
    const SPI_USR_COMMAND = 1 << 31;
    const SPI_USR_MISO = 1 << 28;
    const SPI_USR_MOSI = 1 << 27;

    // SPI 寄存器，基地址不同
    const spiAddresses = getSpiFlashAddresses(this.getChipFamily());
    const base = spiAddresses.regBase;
    const SPI_CMD_REG = base;
    const SPI_USR_REG = base + spiAddresses.usrOffs;
    const SPI_USR2_REG = base + spiAddresses.usr2Offs;
    const SPI_W0_REG = base + spiAddresses.w0Offs;

    // SPI 外设“命令”位掩码，用于 SPI_CMD_REG
    const SPI_CMD_USR = 1 << 18;

    // 移位值
    const SPI_USR2_COMMAND_LEN_SHIFT = 28;

    if (readBits > 32) {
      throw new Error("从 SPI 闪存操作读回超过 32 位不受支持");
    }
    if (data.length > 64) {
      throw new Error("使用单个 SPI 命令写入超过 64 字节的数据不受支持");
    }

    const dataBits = data.length * 8;
    const oldSpiUsr = await this.readRegister(SPI_USR_REG);
    const oldSpiUsr2 = await this.readRegister(SPI_USR2_REG);

    let flags = SPI_USR_COMMAND;

    if (readBits > 0) {
      flags |= SPI_USR_MISO;
    }
    if (dataBits > 0) {
      flags |= SPI_USR_MOSI;
    }

    await this.setDataLengths(spiAddresses, dataBits, readBits);

    await this.writeRegister(SPI_USR_REG, flags);
    await this.writeRegister(
      SPI_USR2_REG,
      (7 << SPI_USR2_COMMAND_LEN_SHIFT) | spiflashCommand,
    );
    if (dataBits == 0) {
      await this.writeRegister(SPI_W0_REG, 0); // 在读取之前清除数据寄存器
    } else {
      const padLen = (4 - (data.length % 4)) % 4;
      data = data.concat(new Array(padLen).fill(0x00)); // 填充到 32 位倍数

      const words = unpack("I".repeat(Math.floor(data.length / 4)), data);
      let nextReg = SPI_W0_REG;

      this.logger.debug(`字数: ${words.length}`);

      for (const word of words) {
        this.logger.debug(
          `将字 ${toHex(word)} 写入寄存器偏移量 ${toHex(nextReg)}`,
        );
        await this.writeRegister(nextReg, word);
        nextReg += 4;
      }
    }
    await this.writeRegister(SPI_CMD_REG, SPI_CMD_USR);
    await this.waitDone(SPI_CMD_REG, SPI_CMD_USR);

    const status = await this.readRegister(SPI_W0_REG);
    // 恢复一些 SPI 控制器寄存器
    await this.writeRegister(SPI_USR_REG, oldSpiUsr);
    await this.writeRegister(SPI_USR2_REG, oldSpiUsr2);
    return status;
  }
  async detectFlashSize() {
    this.logger.debug("正在检测闪存大小");

    const flashId = await this.flashId();
    const flashIdLowbyte = (flashId >> 16) & 0xff;

    this.flashSize = DETECTED_FLASH_SIZES[flashIdLowbyte];
    this.logger.log(`自动检测到的闪存大小: ${this.flashSize}`);
  }

  /**
   * @name getEraseSize
   * 根据给定的字节大小计算擦除大小。
   *   为 ESP8266 上的引导加载程序擦除错误提供解决方法。
   */
  getEraseSize(offset: number, size: number) {
    const sectorsPerBlock = 16;
    const sectorSize = FLASH_SECTOR_SIZE;
    const numSectors = Math.floor((size + sectorSize - 1) / sectorSize);
    const startSector = Math.floor(offset / sectorSize);

    let headSectors = sectorsPerBlock - (startSector % sectorsPerBlock);
    if (numSectors < headSectors) {
      headSectors = numSectors;
    }

    if (numSectors < 2 * headSectors) {
      return Math.floor(((numSectors + 1) / 2) * sectorSize);
    }

    return (numSectors - headSectors) * sectorSize;
  }

  /**
   * @name memBegin (592)
   * 开始下载应用程序镜像到 RAM
   */
  async memBegin(
    size: number,
    blocks: number,
    blocksize: number,
    offset: number,
  ) {
    return await this.checkCommand(
      ESP_MEM_BEGIN,
      pack("<IIII", size, blocks, blocksize, offset),
    );
  }

  /**
   * @name memBlock (609)
   * 发送镜像的一个块到 RAM
   */
  async memBlock(data: number[], seq: number) {
    return await this.checkCommand(
      ESP_MEM_DATA,
      pack("<IIII", data.length, seq, 0, 0).concat(data),
      this.checksum(data),
    );
  }

  /**
   * @name memFinish (615)
   * 离开下载模式并运行应用程序
   *
   * 发送 ESP_MEM_END 通常会返回正确的响应，但有时（对于 ROM 加载程序）
   * 执行的代码可能在发送 FIFO 为空之前复位 UART 或更改波特率。
   * 因此在这些情况下，我们设置较短的超时并忽略错误。
   */
  async memFinish(entrypoint = 0) {
    const timeout = this.IS_STUB ? DEFAULT_TIMEOUT : MEM_END_ROM_TIMEOUT;
    const data = pack("<II", entrypoint == 0 ? 1 : 0, entrypoint);
    return await this.checkCommand(ESP_MEM_END, data, 0, timeout);
  }

  async runStub(skipFlashDetection = false): Promise<EspStubLoader> {
    this.logger.debug(
      `正在为 ${this.chipName} 加载 stub，修订版本: ${this.chipRevision}`,
    );
    const stub = await getStubCode(this.chipFamily, this.chipRevision);

    // 此芯片没有可用的 stub，返回 ROM 加载程序
    if (stub === null) {
      this.logger.log(
        `Stub 闪存器尚不支持 ${this.chipName}，使用 ROM 加载程序`,
      );
      return this as unknown as EspStubLoader;
    }

    // 我们正在通过 USB 传输，对吗？
    const ramBlock = USB_RAM_BLOCK;

    // 上传
    this.logger.debug("正在上传 stub...");
    for (const field of ["text", "data"] as const) {
      const fieldData = stub[field];
      const offset = stub[`${field}_start` as "text_start" | "data_start"];
      const length = fieldData.length;
      const blocks = Math.floor((length + ramBlock - 1) / ramBlock);
      await this.memBegin(length, blocks, ramBlock, offset);
      for (const seq of Array(blocks).keys()) {
        const fromOffs = seq * ramBlock;
        let toOffs = fromOffs + ramBlock;
        if (toOffs > length) {
          toOffs = length;
        }
        await this.memBlock(fieldData.slice(fromOffs, toOffs), seq);
      }
    }
    await this.memFinish(stub.entry);

    const p = await this.readPacket(500);
    const pChar = String.fromCharCode(...p);

    if (pChar != "OHAI") {
      throw new Error("无法启动 stub。意外响应: " + pChar);
    }
    this.logger.debug("Stub 正在运行...");
    const espStubLoader = new EspStubLoader(this.port, this.logger, this);

    // 尝试自动检测闪存大小。
    if (!skipFlashDetection) {
      await espStubLoader.detectFlashSize();
    }

    return espStubLoader;
  }

  __writer?: WritableStreamDefaultWriter<Uint8Array>;
  __writeChain: Promise<void> = Promise.resolve();

  private get _reader(): ReadableStreamDefaultReader<Uint8Array> | undefined {
    return this._parent ? this._parent._reader : this.__reader;
  }

  private set _reader(
    value: ReadableStreamDefaultReader<Uint8Array> | undefined,
  ) {
    if (this._parent) {
      this._parent._reader = value;
    } else {
      this.__reader = value;
    }
  }

  private get _writer(): WritableStreamDefaultWriter<Uint8Array> | undefined {
    return this._parent ? this._parent._writer : this.__writer;
  }

  private set _writer(
    value: WritableStreamDefaultWriter<Uint8Array> | undefined,
  ) {
    if (this._parent) {
      this._parent._writer = value;
    } else {
      this.__writer = value;
    }
  }

  private get _writeChain(): Promise<void> {
    return this._parent ? this._parent._writeChain : this.__writeChain;
  }

  private set _writeChain(value: Promise<void>) {
    if (this._parent) {
      this._parent._writeChain = value;
    } else {
      this.__writeChain = value;
    }
  }

  async writeToStream(data: number[]) {
    if (!this.port.writable) {
      this.logger.debug("端口可写流不可用，跳过写入");
      return;
    }

    if (this._isReconfiguring) {
      throw new Error("无法在端口重新配置期间写入");
    }

    // 排队写入以防止锁定争用（对于 Windows 上的 CP2102 至关重要）
    this._writeChain = this._writeChain
      .then(
        async () => {
          // 在尝试写入之前检查端口是否仍可写
          if (!this.port.writable) {
            throw new Error("写入期间端口变得不可用");
          }

          // 获取或创建持久写入器
          if (!this._writer) {
            try {
              this._writer = this.port.writable.getWriter();
            } catch (err) {
              this.logger.error(`获取写入器失败: ${err}`);
              throw err;
            }
          }

          // 执行写入
          await this._writer.write(new Uint8Array(data));
        },
        async () => {
          // 先前的写入失败，但继续尝试本次写入
          this.logger.debug("先前的写入失败，正在尝试恢复当前写入");
          if (!this.port.writable) {
            throw new Error("写入期间端口变得不可用");
          }

          // 写入器可能已被先前的错误清理，创建新的
          if (!this._writer) {
            try {
              this._writer = this.port.writable.getWriter();
            } catch (err) {
              this.logger.debug(`恢复时获取写入器失败: ${err}`);
              throw new Error("无法获取写入器锁");
            }
          }

          await this._writer.write(new Uint8Array(data));
        },
      )
      .catch((err) => {
        this.logger.error(`写入错误: ${err}`);
        // 确保在发生任何错误时清理写入器
        if (this._writer) {
          try {
            this._writer.releaseLock();
          } catch {
            // 忽略释放错误
          }
          this._writer = undefined;
        }
        // 重新抛出以传播错误
        throw err;
      });

    // 始终等待写入链以确保捕获错误
    await this._writeChain;
  }

  async disconnect() {
    if (this._parent) {
      await this._parent.disconnect();
      return;
    }
    if (!this.port.writable) {
      //      this.logger.debug("端口已关闭，跳过断开连接");
      return;
    }

    // 等待待处理的写入完成
    try {
      await this._writeChain;
    } catch {
      //      this.logger.debug("断开连接时待处理写入错误");
    }

    // 在关闭前释放持久写入器
    if (this._writer) {
      try {
        await this._writer.close();
        this._writer.releaseLock();
      } catch {
        //        this.logger.debug("写入器关闭/释放错误");
      }
      this._writer = undefined;
    } else {
      // 没有持久写入器存在，直接关闭流
      // 当没有写入排队时采用此路径
      try {
        const writer = this.port.writable.getWriter();
        await writer.close();
        writer.releaseLock();
      } catch {
        //        this.logger.debug("直接写入器关闭错误");
      }
    }

    await new Promise((resolve) => {
      if (!this._reader) {
        resolve(undefined);
        return;
      }

      // 设置超时以防止挂起（对于 node-usb 很重要）
      const timeout = setTimeout(() => {
        this.logger.debug("断开连接超时 - 强制解决");
        resolve(undefined);
      }, 1000);

      this.addEventListener(
        "disconnect",
        () => {
          clearTimeout(timeout);
          resolve(undefined);
        },
        { once: true },
      );

      // 仅在读取器仍处于活动状态时取消
      try {
        this._reader.cancel();
      } catch {
        // 读取器已释放，立即解决
        clearTimeout(timeout);
        resolve(undefined);
      }
    });
    this.connected = false;

    // 关闭端口（对于 node-usb 适配器很重要）
    try {
      await this.port.close();
      this.logger.debug("端口成功关闭");
    } catch (err) {
      this.logger.debug(`端口关闭错误: ${err}`);
    }
  }

  /**
   * @name releaseReaderWriter
   * 释放读取器和写入器锁而不关闭端口
   * 在切换到控制台模式时使用
   */
  async releaseReaderWriter() {
    if (this._parent) {
      await this._parent.releaseReaderWriter();
      return;
    }

    // 等待待处理的写入完成
    try {
      await this._writeChain;
    } catch {
      //      this.logger.debug("释放期间待处理写入错误");
    }

    // 释放写入器
    if (this._writer) {
      try {
        this._writer.releaseLock();
        this.logger.debug("写入器已释放");
      } catch (err) {
        this.logger.debug(`写入器释放错误: ${err}`);
      }
      this._writer = undefined;
    }

    // 取消读取器 - 让 readLoop 的 finally 块处理 releaseLock()
    if (this._reader) {
      try {
        // 在控制台模式切换期间抑制断开连接事件
        this._suppressDisconnect = true;

        // 取消将导致 readLoop 退出并在其 finally 块中调用 releaseLock()
        await this._reader.cancel();
        this.logger.debug("读取器已取消 - 等待 readLoop 完成");

        // 关键：等待片刻让 readLoop 的 finally 块完成
        // finally 块需要时间调用 releaseLock() 并将 _reader 设置为 undefined
        // 这比等待浏览器解锁快得多（仅等待 JS 执行）
        await sleep(50);

        this.logger.debug("ReadLoop 清理应该已完成");
      } catch (err) {
        this.logger.debug(`读取器取消错误: ${err}`);
      }
      // 不要在此处调用 releaseLock() 或将 _reader 设置为 undefined
      // 让 readLoop 的 finally 块处理，以避免竞争条件
    }
  }

  /**
   * @name resetToFirmware
   * 公共方法，用于在切换到控制台模式时将设备从引导加载程序复位到固件
   * 自动检测 USB-JTAG/串行和 USB-OTG 设备并执行适当的复位
   * @returns 如果执行了复位则返回 true，如果不需要则返回 false
   */
  public async resetToFirmware(): Promise<boolean> {
    return await this._resetToFirmwareIfNeeded();
  }

  /**
   * @name detectUsbConnectionType
   * 检测设备是否使用 USB-JTAG/串行或 USB-OTG（而非外部串行芯片）
   * 使用 USB PID（产品 ID）进行可靠检测 - 不需要 chipFamily
   * @returns 如果为 USB-JTAG 或 USB-OTG 则返回 true，如果为外部串行芯片则返回 false
   */
  public async detectUsbConnectionType(): Promise<boolean> {
    // 使用基于 PID 的检测
    const portInfo = this.port.getInfo();
    const pid = portInfo.usbProductId;
    const vid = portInfo.usbVendorId;

    // 检查是否为乐鑫设备
    const isEspressif = vid === 0x303a;

    if (!isEspressif) {
      this.logger.debug("非乐鑫 VID - 外部串行芯片");
      return false;
    }

    // ESP32-S2/S3/C3/C5/C6/C61/H2/P4 USB-JTAG/OTG PID
    // 根据乐鑫官方文档：
    // https://docs.espressif.com/projects/esp-iot-solution/en/latest/usb/usb_overview/usb_device_const_COM.html
    // 0x0002 = ESP32-S2 USB-OTG, 0x0012 = ESP32-P4 USB-Serial-JTAG
    // 0x1001 = ESP32-S3, C3, C5, C6, C61, H2 USB-Serial-JTAG
    const usbJtagPids = [0x0002, 0x0012, 0x1001];
    const isUsbJtag = usbJtagPids.includes(pid || 0);

    this.logger.debug(
      `USB-JTAG/OTG 检测: ${isUsbJtag ? "是" : "否"} (PID=0x${pid?.toString(16)})`,
    );

    return isUsbJtag;
  }

  public async getUsbMode(): Promise<{
    mode: "uart" | "usb-jtag-serial" | "usb-otg";
    uartNo: number;
  }> {
    const family = this._parent ? this._parent.chipFamily : this.chipFamily;
    const revision = this._parent
      ? (this._parent.chipRevision ?? 0)
      : (this.chipRevision ?? 0);

    let bufNoAddr: number | null = null;
    let jtagSerialVal: number | null = null;
    let otgVal: number | null = null;

    switch (family) {
      case CHIP_FAMILY_ESP32S2:
        bufNoAddr = ESP32S2_UARTDEV_BUF_NO;
        otgVal = ESP32S2_UARTDEV_BUF_NO_USB_OTG;
        break;
      case CHIP_FAMILY_ESP32S3:
        bufNoAddr = ESP32S3_UARTDEV_BUF_NO;
        jtagSerialVal = ESP32S3_UARTDEV_BUF_NO_USB_JTAG_SERIAL;
        otgVal = ESP32S3_UARTDEV_BUF_NO_USB_OTG;
        break;
      case CHIP_FAMILY_ESP32C3: {
        const bssAddr = revision < 101 ? 0x3fcdf064 : 0x3fcdf060;
        bufNoAddr = bssAddr + ESP32C3_BUF_UART_NO_OFFSET;
        jtagSerialVal = ESP32C3_UARTDEV_BUF_NO_USB_JTAG_SERIAL;
        break;
      }
      case CHIP_FAMILY_ESP32C5:
        bufNoAddr = ESP32C5_UARTDEV_BUF_NO;
        jtagSerialVal = ESP32C5_UARTDEV_BUF_NO_USB_JTAG_SERIAL;
        break;
      case CHIP_FAMILY_ESP32C6:
        bufNoAddr = ESP32C6_UARTDEV_BUF_NO;
        jtagSerialVal = ESP32C6_UARTDEV_BUF_NO_USB_JTAG_SERIAL;
        break;
      case CHIP_FAMILY_ESP32C61:
        bufNoAddr =
          revision <= 200
            ? ESP32C61_UARTDEV_BUF_NO_REV_LE2
            : ESP32C61_UARTDEV_BUF_NO_REV_GT2;
        jtagSerialVal =
          revision <= 200
            ? ESP32C61_UARTDEV_BUF_NO_USB_JTAG_SERIAL_REV_LE2
            : ESP32C61_UARTDEV_BUF_NO_USB_JTAG_SERIAL_REV_GT2;
        break;
      case CHIP_FAMILY_ESP32H2:
        bufNoAddr = ESP32H2_UARTDEV_BUF_NO;
        jtagSerialVal = ESP32H2_UARTDEV_BUF_NO_USB_JTAG_SERIAL;
        break;
      case CHIP_FAMILY_ESP32H4:
        bufNoAddr = ESP32H4_UARTDEV_BUF_NO;
        jtagSerialVal = ESP32H4_UARTDEV_BUF_NO_USB_JTAG_SERIAL;
        break;
      case CHIP_FAMILY_ESP32P4:
        bufNoAddr =
          revision < 300
            ? ESP32P4_UARTDEV_BUF_NO_REV0
            : ESP32P4_UARTDEV_BUF_NO_REV300;
        jtagSerialVal = ESP32P4_UARTDEV_BUF_NO_USB_JTAG_SERIAL;
        otgVal = ESP32P4_UARTDEV_BUF_NO_USB_OTG;
        break;
    }

    if (bufNoAddr === null) {
      return { mode: "uart", uartNo: 0 };
    }

    const uartNo = (await this.readRegister(bufNoAddr)) & 0xff;

    if (otgVal !== null && uartNo === otgVal) {
      this.logger.debug(`USB 模式: USB-OTG (uartNo=${uartNo})`);
      return { mode: "usb-otg", uartNo };
    }
    if (jtagSerialVal !== null && uartNo === jtagSerialVal) {
      this.logger.debug(`USB 模式: USB-JTAG/串行 (uartNo=${uartNo})`);
      return { mode: "usb-jtag-serial", uartNo };
    }

    this.logger.debug(`USB 模式: UART (uartNo=${uartNo})`);
    return { mode: "uart", uartNo };
  }

  /**
   * 检查当前芯片是否支持 USB-JTAG 或 USB-OTG
   * @returns 如果芯片具有原生 USB 支持（JTAG 或 OTG）则返回 true
   */
  public supportsNativeUsb(): boolean {
    const family = this._parent ? this._parent.chipFamily : this.chipFamily;

    // 具有 USB-JTAG/串行或 USB-OTG 支持的芯片
    const usbChips = [
      CHIP_FAMILY_ESP32S2, // USB-OTG
      CHIP_FAMILY_ESP32S3, // USB-OTG + USB-JTAG/串行
      CHIP_FAMILY_ESP32C3, // USB-JTAG/串行
      CHIP_FAMILY_ESP32C5, // USB-JTAG/串行
      CHIP_FAMILY_ESP32C6, // USB-JTAG/串行
      CHIP_FAMILY_ESP32C61, // USB-JTAG/串行
      CHIP_FAMILY_ESP32H2, // USB-JTAG/串行
      CHIP_FAMILY_ESP32H4, // USB-JTAG/串行
      CHIP_FAMILY_ESP32P4, // USB-OTG + USB-JTAG/串行
    ];

    return usbChips.includes(family);
  }

  /**
   * @name _ensureStreamsReady
   * 硬件复位后，确保端口流可用。
   * 在 WebUSB 上，由于复位后流会中断，因此重新创建流。
   * 在 Web 串行上，等待流变得可用。
   */
  private async _ensureStreamsReady(): Promise<void> {
    if (this.isWebUSB()) {
      try {
        await (
          this.port as unknown as { recreateStreams(): Promise<void> }
        ).recreateStreams();
        this.logger.debug("WebUSB 流已重新创建");

        let retries = 30;
        while (retries > 0 && !this.port.readable) {
          await sleep(100);
          retries--;
        }
        if (!this.port.readable) {
          throw new Error("重新创建流后可读流不可用");
        }
        this.logger.debug("WebUSB 流已准备就绪");
      } catch (err) {
        this.logger.error(`重新创建 WebUSB 流失败: ${err}`);
        this._consoleMode = false;
        throw err;
      }
    } else {
      let retries = 20;
      while (retries > 0 && !this.port.readable) {
        await sleep(100);
        retries--;
      }
      if (!this.port.readable) {
        this._consoleMode = false;
        throw new Error("复位后可读流不可用");
      }
      this.logger.debug("端口流已准备就绪");
    }
  }

  /**
   * @name enterConsoleMode
   * 通过复位到固件来为控制台模式准备设备
   * 处理 USB-JTAG/OTG 设备（关闭端口）和外部串行芯片（保持端口打开）
   * @returns 如果端口已关闭（USB-JTAG）则返回 true，如果端口保持打开（串行芯片）则返回 false
   */
  public async enterConsoleMode(): Promise<boolean> {
    // 检查端口是否打开 - 如果没有，我们需要一个新的端口选择
    if (!this.port.writable || !this.port.readable) {
      this.logger.debug("端口未打开 - 需要端口选择");
      // 返回 true 表示需要端口选择
      // 调用方应处理端口选择并重试
      return true;
    }

    // 重新检测 USB 连接类型以确保我们有确定的值
    let isUsbJtag: boolean;
    try {
      isUsbJtag = await this.detectUsbConnectionType();
      this.logger.debug(
        `检测到 USB 连接类型: ${isUsbJtag ? "USB-JTAG/OTG" : "外部串行芯片"}`,
      );

      // 关键：设置缓存值，以便 _resetToFirmwareIfNeeded() 可以使用它
      this._isUsbJtagOrOtg = isUsbJtag;
    } catch (err) {
      // 如果检测失败，回退到缓存值或快速失败
      if (this.isUsbJtagOrOtg === undefined) {
        throw new Error(
          `无法进入控制台模式：USB 连接类型未知且检测失败: ${err}`,
        );
      }

      this.logger.debug(`USB 检测失败，使用缓存值: ${this.isUsbJtagOrOtg}`);
      isUsbJtag = this.isUsbJtagOrOtg;
    }

    // 在任何操作之前设置控制台模式标志
    this._consoleMode = true;

    if (isUsbJtag) {
      // USB-JTAG/OTG 设备：使用可能关闭端口的复位
      const wasReset = await this._resetToFirmwareIfNeeded();
      if (wasReset) {
        return true; // 端口已关闭，调用方必须重新打开
      }

      // 端口保持打开（例如 C3/C5/C6/H2 经典复位）
      await this._ensureStreamsReady();
      return false;
    } else {
      // 外部串行芯片设备：释放锁并执行简单复位
      try {
        await this.releaseReaderWriter();
        await sleep(100);
      } catch (err) {
        this.logger.debug(`释放锁失败: ${err}`);
      }

      try {
        await this.hardResetToFirmware();
        this.logger.debug("设备已复位到固件模式");
      } catch (err) {
        this.logger.debug(`无法复位设备: ${err}`);
      }

      await this._ensureStreamsReady();
      return false;
    }
  }

  /**
   * @name _clearForceDownloadBootIfNeeded
   * 读取并清除强制下载启动标志（如果已设置）
   * 这应该仅在处于 ROM（非 stub）且 WDT 复位之前调用
   * 在每次连接时清除它会导致闪存操作出现问题
   * 如果标志已清除则返回 true，如果已清除则返回 false
   */
  private async _clearForceDownloadBootIfNeeded(): Promise<boolean> {
    try {
      let regAddr: number;
      let mask: number;
      let chipName: string;

      // 获取此芯片的寄存器地址和掩码
      if (this.chipFamily === CHIP_FAMILY_ESP32S2) {
        regAddr = ESP32S2_RTC_CNTL_OPTION1_REG;
        mask = ESP32S2_RTC_CNTL_FORCE_DOWNLOAD_BOOT_MASK;
        chipName = "ESP32-S2";
      } else if (this.chipFamily === CHIP_FAMILY_ESP32S3) {
        regAddr = ESP32S3_RTC_CNTL_OPTION1_REG;
        mask = ESP32S3_RTC_CNTL_FORCE_DOWNLOAD_BOOT_MASK;
        chipName = "ESP32-S3";
      } else if (this.chipFamily === CHIP_FAMILY_ESP32P4) {
        regAddr = ESP32P4_RTC_CNTL_OPTION1_REG;
        mask = ESP32P4_RTC_CNTL_FORCE_DOWNLOAD_BOOT_MASK;
        chipName = "ESP32-P4";
      } else {
        // 不是需要此操作的芯片
        return false;
      }

      // 读取当前寄存器值
      const currentValue = await this.readRegister(regAddr);
      this.logger.debug(
        `${chipName} 强制下载启动寄存器: 0x${currentValue.toString(16)} (掩码: 0x${mask.toString(16)})`,
      );

      // 检查标志是否已设置
      const isFlagSet = (currentValue & mask) !== 0;

      if (isFlagSet) {
        this.logger.debug(`${chipName} 强制下载启动标志已设置 - 正在清除`);
        // 通过将掩码位写为 0 来清除标志
        await this.writeRegister(regAddr, 0, mask, 0);
        this.logger.debug(`${chipName} 强制下载启动标志已清除`);
        return true;
      } else {
        this.logger.debug(`${chipName} 强制下载启动标志已清除 - 无需操作`);
        return false;
      }
    } catch (err) {
      this.logger.debug(`检查/清除强制下载标志时出错: ${err}`);
      return false;
    }
  }

  /**
   * @name _resetToFirmwareIfNeeded
   * 在切换到控制台模式时，将设备从引导加载程序复位到固件
   * 检测 USB-JTAG/串行和 USB-OTG 设备并执行适当的复位
   * @returns 如果执行了重新连接则返回 true，否则返回 false
   */
  private async _resetToFirmwareIfNeeded(): Promise<boolean> {
    // 检测是否需要 WDT 复位（USB-JTAG/OTG）还是经典复位
    const isUsbJtagOrOtg = await this.detectUsbConnectionType();
    try {
      // 检查端口是否打开 - 如果未打开，假设设备已处于固件模式
      if (!this.port.writable || !this.port.readable) {
        this.logger.debug("端口未打开 - 假设设备已处于固件模式");
        return false;
      }

      if (isUsbJtagOrOtg) {
        // USB-JTAG/OTG：不要在 WDT 复位前释放读取器/写入器
        // WDT 复位需要活动通信才能发送寄存器写入命令
        // 无论如何，WDT 复位后端口将自动关闭
        this.logger.debug("USB-JTAG/OTG：为 WDT 复位保持读取器/写入器活动");
      } else {
        // 外部串行芯片：在经典复位前释放读取器/写入器
        await this.releaseReaderWriter();
        this.logger.debug("外部串行：复位前读取器/写入器已释放");
      }

      // 使用新的 resetToFirmwareMode 方法，该方法处理所有逻辑
      const portWillChange = await this.resetToFirmwareMode(true);

      if (portWillChange) {
        this.logger.debug(
          `${this.chipName}：WDT 复位后端口将更改 - 用户必须重新选择端口`,
        );

        // 触发事件以通知端口更改
        this.dispatchEvent(
          new CustomEvent("usb-otg-port-change", {
            detail: {
              chipName: this.chipName,
              message: `${this.chipName} USB 端口在复位后已更改。请选择新端口。`,
              reason: "wdt-reset-to-firmware",
            },
          }),
        );

        return true;
      } else {
        // 端口保持不变 - 现在释放读取器/写入器（如果尚未释放）
        if (isUsbJtagOrOtg) {
          await this.releaseReaderWriter();
          this.logger.debug("复位后读取器/写入器已释放");
        }
        return false;
      }
    } catch (err) {
      this.logger.error(`复位到固件模式失败: ${err}`);

      // 对于 USB-JTAG/OTG，复位失败后端口可能已失效
      // 对于外部串行，端口通常仍然正常
      if (isUsbJtagOrOtg) {
        this.logger.debug("由于 USB-JTAG/OTG 复位失败，强制端口重新选择");
        return true;
      }
      this.logger.debug("外部串行复位失败，但端口应该仍可用");
      return false;
    }
  }

  /**
   * @name reconnect
   * 重新连接串口以刷新浏览器缓冲区并重新加载 stub
   */
  async reconnect(): Promise<void> {
    if (this._parent) {
      await this._parent.reconnect();
      return;
    }

    try {
      this.logger.log("正在重新连接串口...");
      const savedBaudRate = this.currentBaudRate;

      this.connected = false;
      this.__inputBuffer = [];
      this.__inputBufferReadIndex = 0;

      // 等待待处理的写入完成
      try {
        await this._writeChain;
      } catch (err) {
        this.logger.debug(`重新连接期间待处理写入错误: ${err}`);
      }

      // 在端口关闭/打开期间阻止新写入
      this._isReconfiguring = true;

      // 释放持久写入器
      if (this._writer) {
        try {
          this._writer.releaseLock();
        } catch (err) {
          this.logger.debug(`重新连接期间写入器释放错误: ${err}`);
        }
        this._writer = undefined;
      }

      // 取消读取器
      if (this._reader) {
        try {
          await this._reader.cancel();
        } catch (err) {
          this.logger.debug(`读取器取消错误: ${err}`);
        }
        this._reader = undefined;
      }

      // 关闭端口
      try {
        await this.port.close();
        this.logger.debug("端口已关闭");
      } catch (err) {
        this.logger.debug(`端口关闭错误: ${err}`);
      }

      // 打开端口
      this.logger.debug("正在打开端口...");
      try {
        await this.port.open({ baudRate: ESP_ROM_BAUD });
        this.connected = true;
        this.currentBaudRate = ESP_ROM_BAUD;
      } catch (err) {
        throw new Error(`打开端口失败: ${err}`);
      }

      // 验证端口流是否可用
      if (!this.port.readable || !this.port.writable) {
        throw new Error(
          `打开后端口流不可用（可读: ${!!this.port.readable}，可写: ${!!this.port.writable}）`,
        );
      }

      // 端口现在打开并准备就绪 - 允许初始化写入
      this._isReconfiguring = false;

      // 保存芯片信息和闪存大小（无需再次检测）
      const savedChipFamily = this.chipFamily;
      const savedChipName = this.chipName;
      const savedChipRevision = this.chipRevision;
      const savedChipVariant = this.chipVariant;
      const savedFlashSize = this.flashSize;

      // 重新初始化
      await this.hardReset(true);

      if (!this._parent) {
        this.__inputBuffer = [];
        this.__inputBufferReadIndex = 0;
        this.__totalBytesRead = 0;
        this.readLoop();
      }

      await this.flushSerialBuffers();
      await this.sync();

      // 恢复芯片信息
      this.chipFamily = savedChipFamily;
      this.chipName = savedChipName;
      this.chipRevision = savedChipRevision;
      this.chipVariant = savedChipVariant;
      this.flashSize = savedFlashSize;

      this.logger.debug(`重新连接完成（芯片: ${this.chipName}）`);

      // 验证端口是否准备就绪
      if (!this.port.writable || !this.port.readable) {
        throw new Error("重新连接后端口未准备就绪");
      }

      // 为 ESP32-P4 Rev 301 开启闪存电源（必须在加载 stub 之前完成）
      if (
        this.chipFamily === CHIP_FAMILY_ESP32P4 &&
        this.chipRevision === 301
      ) {
        await this.powerOnFlash();
      }

      // 加载 stub
      const stubLoader = await this.runStub(true);
      this.logger.debug("Stub 已加载");

      // 如果波特率已更改，则恢复
      if (savedBaudRate !== ESP_ROM_BAUD) {
        await stubLoader.setBaudrate(savedBaudRate);

        // 验证波特率更改后端口是否仍准备就绪
        if (!this.port.writable || !this.port.readable) {
          throw new Error(
            `波特率更改后端口未准备就绪（可读: ${!!this.port.readable}，可写: ${!!this.port.writable}）`,
          );
        }
      }

      // Stub 现在在芯片上运行
      // stubLoader 将此实例作为 _parent，因此所有操作都通过此实例
      // 我们只需要将此实例标记为正在运行 stub 代码
      this.IS_STUB = true;

      this.logger.debug("重新连接成功");
    } catch (err) {
      // 确保在出错时重置标志
      this._isReconfiguring = false;
      throw err;
    }
  }

  /**
   * @name reconnectToBootloader
   * 关闭并重新打开端口，然后将 ESP 复位到引导加载程序模式
   * 在 Improv 或其他使 ESP 处于固件模式的操作后需要这样做
   */
  async reconnectToBootloader(): Promise<void> {
    if (this._parent) {
      await this._parent.reconnectToBootloader();
      return;
    }

    try {
      this.logger.log("正在重新连接到引导加载程序模式...");

      // 在重新连接到引导加载程序时清除控制台模式标志
      this._consoleMode = false;

      this.connected = false;
      this.__inputBuffer = [];
      this.__inputBufferReadIndex = 0;

      // 等待待处理的写入完成
      try {
        await this._writeChain;
      } catch (err) {
        this.logger.debug(`重新连接期间待处理写入错误: ${err}`);
      }

      // 在端口关闭/打开期间阻止新写入
      this._isReconfiguring = true;

      // 释放持久写入器
      if (this._writer) {
        try {
          this._writer.releaseLock();
        } catch (err) {
          this.logger.debug(`重新连接期间写入器释放错误: ${err}`);
        }
        this._writer = undefined;
      }

      // 取消读取器
      if (this._reader) {
        try {
          await this._reader.cancel();
        } catch (err) {
          this.logger.debug(`读取器取消错误: ${err}`);
        }
        this._reader = undefined;
      }

      // 关闭端口
      try {
        await this.port.close();
        this.logger.debug("端口已关闭");
      } catch (err) {
        this.logger.debug(`端口关闭错误: ${err}`);
      }

      // 打开端口
      this.logger.debug("正在打开端口...");
      try {
        await this.port.open({ baudRate: ESP_ROM_BAUD });
        this.connected = true;
        this.currentBaudRate = ESP_ROM_BAUD;
      } catch (err) {
        throw new Error(`打开端口失败: ${err}`);
      }

      // 验证端口流是否可用
      if (!this.port.readable || !this.port.writable) {
        throw new Error(
          `打开后端口流不可用（可读: ${!!this.port.readable}，可写: ${!!this.port.writable}）`,
        );
      }

      // 端口现在打开并准备就绪 - 允许初始化写入
      this._isReconfiguring = false;

      // 重置芯片信息和 stub 状态
      this.__chipFamily = undefined;
      this.chipName = "未知芯片";
      this.chipRevision = null;
      this.chipVariant = null;
      this.IS_STUB = false;

      // 启动读取循环
      if (!this._parent) {
        this.__inputBuffer = [];
        this.__inputBufferReadIndex = 0;
        this.__totalBytesRead = 0;
        this.readLoop();
      }

      // 等待读取循环启动
      await sleep(100);

      // 使用多种策略复位到引导加载程序模式
      await this.connectWithResetStrategies();

      // 检测芯片类型
      await this.detectChip();

      this.logger.debug(`已重新连接到引导加载程序: ${this.chipName}`);
    } catch (err) {
      // 确保在出错时重置标志
      this._isReconfiguring = false;
      throw err;
    }
  }

  /**
   * @name exitConsoleMode
   * 退出控制台模式并返回引导加载程序
   * 对于 ESP32-S2，使用 reconnectToBootloader，这将触发端口更改
   * @returns 如果需要手动重新连接（ESP32-S2）则返回 true，否则返回 false
   */
  async exitConsoleMode(): Promise<boolean> {
    if (this._parent) {
      return await this._parent.exitConsoleMode();
    }

    // 清除控制台模式标志
    this._consoleMode = false;

    // 检查是否为 USB-OTG 设备（ESP32-S2 或 ESP32-P4）
    const isUsbOtgChip =
      this.chipFamily === CHIP_FAMILY_ESP32S2 ||
      this.chipFamily === CHIP_FAMILY_ESP32P4;

    // 对于 USB-OTG 芯片：如果 _isUsbJtagOrOtg 未定义，尝试检测它
    // 如果检测失败或未定义，假定为 USB-JTAG/OTG（保守/安全路径）
    let isUsbJtagOrOtg = this._isUsbJtagOrOtg;
    if (isUsbOtgChip && isUsbJtagOrOtg === undefined) {
      try {
        isUsbJtagOrOtg = await this.detectUsbConnectionType();
      } catch (err) {
        this.logger.debug(
          `USB 检测失败，假定 ${this.chipName} 为 USB-JTAG/OTG: ${err}`,
        );
        isUsbJtagOrOtg = true; // 保守回退
      }
    }

    if (isUsbOtgChip && isUsbJtagOrOtg) {
      // USB-OTG 设备：需要复位到引导加载程序，这将导致端口更改
      this.logger.debug(`${this.chipName} USB：正在复位到引导加载程序模式`);

      // 执行硬件复位到引导加载程序（GPIO0=LOW）
      // 这将导致端口从 CDC（固件）更改为 JTAG（引导加载程序）
      try {
        await this.hardResetClassic();
        this.logger.debug("已启动复位到引导加载程序");
      } catch (err) {
        this.logger.debug(`复位错误: ${err}`);
      }

      // 等待复位完成并端口更改
      await sleep(500);

      this.logger.debug(
        `${this.chipName}：端口已更改。请选择引导加载程序端口。`,
      );

      // 触发事件以通知端口更改
      this.dispatchEvent(
        new CustomEvent("usb-otg-port-change", {
          detail: {
            chipName: this.chipName,
            message: `${this.chipName}：端口已更改。请选择引导加载程序端口。`,
            reason: "exit-console-to-bootloader",
          },
        }),
      );

      // 端口将更改，因此返回 true 表示需要手动重新连接
      return true;
    }

    // 对于其他设备，使用标准 reconnectToBootloader
    await this.reconnectToBootloader();
    return false; // 无需手动重新连接
  }

  /**
   * @name isConsoleResetSupported
   * 检查此设备是否支持控制台复位
   * ESP32-S2 USB-JTAG/CDC 不支持控制台模式复位，
   * 因为任何复位都会导致 USB 端口丢失（硬件限制）
   */
  isConsoleResetSupported(): boolean {
    if (this._parent) {
      return this._parent.isConsoleResetSupported();
    }

    // 对于 ESP32-S2：如果 _isUsbJtagOrOtg 未定义，假定为 USB-JTAG/OTG（保守）
    // 这意味着控制台复位不受支持（更安全的默认值）
    const isS2UsbJtag =
      this.chipFamily === CHIP_FAMILY_ESP32S2 &&
      (this._isUsbJtagOrOtg === true || this._isUsbJtagOrOtg === undefined);
    return !isS2UsbJtag; // 对于 ESP32-S2 USB-JTAG/CDC 不受支持
  }

  /**
   * @name resetInConsoleMode
   * 在控制台模式（固件模式）下复位设备
   *
   * 注意：对于 ESP32-S2 USB-JTAG/CDC，任何复位（硬件或软件）都会导致
   * USB 端口丢失，因为设备在复位期间会切换 USB 模式。
   * 这是硬件限制 - 首先使用 isConsoleResetSupported() 检查。
   */
  async resetInConsoleMode(): Promise<void> {
    if (this._parent) {
      return await this._parent.resetInConsoleMode();
    }

    if (!this.isConsoleResetSupported()) {
      this.logger.debug(
        "ESP32-S2 USB-JTAG/CDC 不支持简单的控制台复位 - 使用 exitConsoleMode 进入引导加载程序",
      );
      await this.exitConsoleMode();
      this.logger.debug(
        "S2 现在处于引导加载程序模式 - 调用方必须在新端口上执行 syncAndWdtReset，然后重新连接控制台",
      );
      return;
    }

    // 对于其他设备：使用标准固件复位
    try {
      this.logger.debug("正在控制台模式复位设备");
      await this.hardResetToFirmware();
      this.logger.debug("设备复位完成");
    } catch (err) {
      this.logger.error(`复位失败: ${err}`);
      throw err;
    }
  }

  /**
   * @name syncAndWdtReset
   * 打开一个新的引导加载程序端口，与 ROM 同步（无 stub，无复位策略），并触发 WDT 复位。
   * 这用于需要 WDT 复位以切换模式的 ESP32-S2 USB-OTG 设备。
   * WDT 复位后端口将再次重新枚举。
   * 调用此方法后，用户必须选择新端口。
   * @param newPort - 用户选择的引导加载程序端口
   */
  async syncAndWdtReset(newPort: SerialPort): Promise<void> {
    if (this._parent) {
      await this._parent.syncAndWdtReset(newPort);
      return;
    }

    this.port = newPort;
    this.connected = false;
    this.IS_STUB = false;
    this.__inputBuffer = [];
    this.__inputBufferReadIndex = 0;
    this.__totalBytesRead = 0;

    this.logger.debug("正在以 115200 波特率打开引导加载程序端口...");
    await this.port.open({ baudRate: ESP_ROM_BAUD });
    this.connected = true;
    this.currentBaudRate = ESP_ROM_BAUD;

    // 启动读取循环
    this.readLoop();
    await sleep(100);

    // 仅与 ROM 同步 - 无复位策略，设备已处于引导加载程序
    this.logger.debug("正在与引导加载程序 ROM 同步...");
    await this.sync();
    this.logger.debug("引导加载程序同步正常，无 stub");

    // 触发 WDT 复位 → 设备启动到固件
    this.logger.debug("正在触发 WDT 复位...");
    await this.rtcWdtResetChipSpecific();
    this.logger.debug("WDT 复位已触发 - 设备将启动到固件");
  }

  /**
   * @name drainInputBuffer
   * 通过在指定时间内读取数据来主动排空输入缓冲区。
   * 对于某些驱动程序（尤其是 Windows 上的 CP210x）缓冲刷新有问题时，采用简单方法。
   *
   * 基于 esptool.py 的修复：https://github.com/espressif/esptool/commit/5338ea054e5099ac7be235c54034802ac8a43162
   *
   * @param bufferingTime - 等待缓冲区填充的时间（毫秒）
   */
  async drainInputBuffer(bufferingTime = 200): Promise<void> {
    // 等待缓冲区填充
    await sleep(bufferingTime);

    // 不支持的命令响应被发送 8 次，长度为 14 字节，包括分隔符 SLIP_END (0xC0) 字节。
    // 至少有一部分作为命令响应被读取，但为了安全起见，读取所有。
    const bytesToDrain = 14 * 8;
    let drained = 0;

    // 通过读取可用数据来排空缓冲区
    const drainStart = Date.now();
    const drainTimeout = 100; // 排空的短超时

    while (drained < bytesToDrain && Date.now() - drainStart < drainTimeout) {
      if (this._inputBufferAvailable > 0) {
        const byte = this._readByte();
        if (byte !== undefined) {
          drained++;
        }
      } else {
        // 小睡以避免忙等待
        await sleep(1);
      }
    }

    if (drained > 0) {
      this.logger.debug(`从输入缓冲区排空了 ${drained} 字节`);
    }

    // 最终清空应用程序缓冲区
    if (!this._parent) {
      this.__inputBuffer = [];
      this.__inputBufferReadIndex = 0;
    }
  }

  /**
   * @name flushSerialBuffers
   * 刷新 TX 和 RX 串口缓冲区中任何待处理的数据
   * 这会清空应用程序 RX 缓冲区并等待硬件缓冲区排空
   */
  async flushSerialBuffers(): Promise<void> {
    // 清空应用程序缓冲区
    if (!this._parent) {
      this.__inputBuffer = [];
      this.__inputBufferReadIndex = 0;
    }

    // 等待任何待处理的数据
    await sleep(SYNC_TIMEOUT);

    // 最终清空
    if (!this._parent) {
      this.__inputBuffer = [];
      this.__inputBufferReadIndex = 0;
    }

    this.logger.debug("串行缓冲区已刷新");
  }

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
  async readFlash(
    addr: number,
    size: number,
    onPacketReceived?: (
      packet: Uint8Array,
      progress: number,
      totalSize: number,
    ) => void,
    options?: {
      chunkSize?: number;
      blockSize?: number;
      maxInFlight?: number;
    },
  ): Promise<Uint8Array> {
    if (!this.IS_STUB) {
      throw new Error("读取闪存仅支持 stub 模式。请先运行 runStub()。");
    }

    // 在闪存读取操作之前刷新串行缓冲区
    await this.flushSerialBuffers();

    this.logger.log(
      `正在从闪存地址 0x${addr.toString(16)} 读取 ${size} 字节...`,
    );

    // 为 WebUSB 设备初始化自适应速度乘数
    if (this.isWebUSB()) {
      if (this._isCDCDevice) {
        // CDC 设备（CH343）：从最大值开始，启用自适应调整
        this._adaptiveBlockMultiplier = 8; // blockSize = 248 字节
        this._adaptiveMaxInFlightMultiplier = 8; // maxInFlight = 248 字节
        this._consecutiveSuccessfulChunks = 0;
        this.logger.debug(
          `CDC 设备 - 已初始化: blockMultiplier=${this._adaptiveBlockMultiplier}, maxInFlightMultiplier=${this._adaptiveMaxInFlightMultiplier}`,
        );
      } else {
        // 非 CDC 设备（CH340、CP2102）：固定值，无自适应调整
        this._adaptiveBlockMultiplier = 1; // blockSize = 31 字节（固定）
        this._adaptiveMaxInFlightMultiplier = 1; // maxInFlight = 31 字节（固定）
        this._consecutiveSuccessfulChunks = 0;
        this.logger.debug(`非 CDC 设备 - 固定值: blockSize=31, maxInFlight=31`);
      }
    }

    // 块大小：一次命令中向 ESP 请求的数据量
    // 对于 WebUSB（安卓），使用较小的块以避免超时和缓冲区问题
    // 对于 Web 串行（桌面），使用较大的块以获得更好的性能
    let CHUNK_SIZE: number;
    if (options?.chunkSize !== undefined) {
      // 如果在高级模式下，使用用户提供的 chunkSize
      CHUNK_SIZE = options.chunkSize;
      this.logger.log(`使用自定义块大小: 0x${CHUNK_SIZE.toString(16)} 字节`);
    } else if (this.isWebUSB()) {
      // WebUSB：使用较小的块以避免 SLIP 超时问题
      CHUNK_SIZE = 0x4 * 0x1000; // 4KB = 16384 字节
    } else {
      // Web 串行：使用较大的块以获得更好的性能
      CHUNK_SIZE = 0x40 * 0x1000;
    }

    let allData = new Uint8Array(0);
    let currentAddr = addr;
    let remainingSize = size;

    while (remainingSize > 0) {
      const chunkSize = Math.min(CHUNK_SIZE, remainingSize);
      let chunkSuccess = false;
      let retryCount = 0;
      const MAX_RETRIES = 5;
      let deepRecoveryAttempted = false;

      // 此块的重试循环
      while (!chunkSuccess && retryCount <= MAX_RETRIES) {
        let resp = new Uint8Array(0);
        let lastAckedLength = 0; // 跟踪最后确认的长度

        try {
          // 仅在第一次尝试或重试时记录
          if (retryCount === 0) {
            this.logger.debug(
              `正在读取地址 0x${currentAddr.toString(16)} 的块，大小: 0x${chunkSize.toString(16)}`,
            );
          }

          let blockSize: number;
          let maxInFlight: number;

          if (
            options?.blockSize !== undefined &&
            options?.maxInFlight !== undefined
          ) {
            // 如果在高级模式下，使用用户提供的值
            blockSize = options.blockSize;
            maxInFlight = options.maxInFlight;
            if (retryCount === 0) {
              this.logger.debug(
                `使用自定义参数: blockSize=${blockSize}, maxInFlight=${maxInFlight}`,
              );
            }
          } else if (this.isWebUSB()) {
            // WebUSB（安卓）：所有设备都使用自适应速度
            // 所有设备都有 maxTransferSize=64，baseBlockSize=31
            const maxTransferSize =
              (this.port as WebUSBSerialPort).maxTransferSize || 64;
            const baseBlockSize = Math.floor((maxTransferSize - 2) / 2); // 31 字节

            // 使用当前的自适应乘数（在 readFlash 开始时初始化）
            blockSize = baseBlockSize * this._adaptiveBlockMultiplier;
            maxInFlight = baseBlockSize * this._adaptiveMaxInFlightMultiplier;
          } else {
            // Web 串行（桌面）：使用 63 的倍数以保持一致性
            const base = 63;
            blockSize = base * 65; // 63 * 65 = 4095（接近 0x1000）
            maxInFlight = base * 130; // 63 * 130 = 8190（接近 blockSize * 2）
          }

          const pkt = pack(
            "<IIII",
            currentAddr,
            chunkSize,
            blockSize,
            maxInFlight,
          );

          const [res] = await this.checkCommand(ESP_READ_FLASH, pkt);

          if (res != 0) {
            throw new Error("读取内存失败: " + res);
          }

          while (resp.length < chunkSize) {
            // 读取一个 SLIP 包
            let packet: number[];
            try {
              packet = await this.readPacket(FLASH_READ_TIMEOUT);
            } catch (err) {
              if (err instanceof SlipReadError) {
                this.logger.debug(
                  `${err.message} 在字节 0x${resp.length.toString(16)} 处`,
                );

                // 发送空 SLIP 帧以中止 stub 的读取操作
                // stub 期望 4 字节（ACK），如果我们发送更少，它将跳出
                try {
                  // 发送无数据的 SLIP 帧（仅分隔符）
                  const abortFrame = [this.SLIP_END, this.SLIP_END]; // 空 SLIP 帧
                  await this.writeToStream(abortFrame);
                  this.logger.debug(`向 stub 发送了中止帧`);

                  // 给 stub 处理中止的时间
                  await sleep(50);
                } catch (abortErr) {
                  this.logger.debug(`中止帧错误: ${abortErr}`);
                }

                // 排空输入缓冲区以清除任何陈旧数据
                await this.drainInputBuffer(200);

                // 如果已读取所有所需数据，则跳出
                if (resp.length >= chunkSize) {
                  break;
                }
              }
              throw err;
            }

            if (packet && packet.length > 0) {
              const packetData = new Uint8Array(packet);

              // 附加到响应
              const newResp = new Uint8Array(resp.length + packetData.length);
              newResp.set(resp);
              newResp.set(packetData, resp.length);
              resp = newResp;

              // 当收到 maxInFlight 字节时发送确认
              // stub 发送包直到 (num_sent - num_acked) >= max_in_flight
              // 我们必须等待所有包再发送 ACK
              const shouldAck =
                resp.length >= chunkSize || // 块结束
                resp.length >= lastAckedLength + maxInFlight; // 收到所有包

              if (shouldAck) {
                const ackData = pack("<I", resp.length);
                const slipEncodedAck = slipEncode(ackData);
                await this.writeToStream(slipEncodedAck);

                // 将 lastAckedLength 更新为当前响应长度
                // 这确保下一次 ACK 在正确的时间发送
                lastAckedLength = resp.length;
              }
            }
          }

          // 块读取成功 - 附加到所有数据
          const newAllData = new Uint8Array(allData.length + resp.length);
          newAllData.set(allData);
          newAllData.set(resp, allData.length);
          allData = newAllData;

          chunkSuccess = true;

          // 自适应速度调整：仅适用于 CDC 设备
          // 非 CDC 设备（CH340、CP2102）保持固定 blockSize=31，maxInFlight=31
          if (this.isWebUSB() && this._isCDCDevice && retryCount === 0) {
            this._consecutiveSuccessfulChunks++;

            // 连续成功 2 个块后，逐渐提高速度
            if (this._consecutiveSuccessfulChunks >= 2) {
              const maxTransferSize =
                (this.port as WebUSBSerialPort).maxTransferSize || 64;
              const baseBlockSize = Math.floor((maxTransferSize - 2) / 2); // 31 字节

              // 最大值：blockSize=248（8 * 31），maxInFlight=248（8 * 31）
              const MAX_BLOCK_MULTIPLIER = 8; // 248 字节 - 经测试稳定
              const MAX_INFLIGHT_MULTIPLIER = 8; // 248 字节 - 经测试稳定

              let adjusted = false;

              // 首先增加 blockSize（最大 248），然后增加 maxInFlight
              if (this._adaptiveBlockMultiplier < MAX_BLOCK_MULTIPLIER) {
                this._adaptiveBlockMultiplier = Math.min(
                  this._adaptiveBlockMultiplier * 2,
                  MAX_BLOCK_MULTIPLIER,
                );
                adjusted = true;
              }
              // 一旦 blockSize 达到最大值，增加 maxInFlight
              else if (
                this._adaptiveMaxInFlightMultiplier < MAX_INFLIGHT_MULTIPLIER
              ) {
                this._adaptiveMaxInFlightMultiplier = Math.min(
                  this._adaptiveMaxInFlightMultiplier * 2,
                  MAX_INFLIGHT_MULTIPLIER,
                );
                adjusted = true;
              }

              if (adjusted) {
                const newBlockSize =
                  baseBlockSize * this._adaptiveBlockMultiplier;
                const newMaxInFlight =
                  baseBlockSize * this._adaptiveMaxInFlightMultiplier;
                this.logger.debug(
                  `速度提高: blockSize=${newBlockSize}, maxInFlight=${newMaxInFlight}`,
                );
                this._lastAdaptiveAdjustment = Date.now();
              }

              // 重置计数器
              this._consecutiveSuccessfulChunks = 0;
            }
          }
        } catch (err) {
          retryCount++;

          // 自适应速度调整：仅适用于 CDC 设备
          // 非 CDC 设备保持固定值
          if (this.isWebUSB() && this._isCDCDevice && retryCount === 1) {
            // 仅当我们高于最小值时才降低
            if (
              this._adaptiveBlockMultiplier > 1 ||
              this._adaptiveMaxInFlightMultiplier > 1
            ) {
              // 出错时降至最小值
              this._adaptiveBlockMultiplier = 1; // 31 字节（适用于 CH343）
              this._adaptiveMaxInFlightMultiplier = 1; // 31 字节
              this._consecutiveSuccessfulChunks = 0; // 重置成功计数器

              const maxTransferSize =
                (this.port as WebUSBSerialPort).maxTransferSize || 64;
              const baseBlockSize = Math.floor((maxTransferSize - 2) / 2);
              const newBlockSize =
                baseBlockSize * this._adaptiveBlockMultiplier;
              const newMaxInFlight =
                baseBlockSize * this._adaptiveMaxInFlightMultiplier;

              this.logger.debug(
                `在较高速度下出错 - 降至最小值: blockSize=${newBlockSize}, maxInFlight=${newMaxInFlight}`,
              );
            } else {
              // 已在最小值且仍然失败 - 这是真正的错误
              this.logger.debug(
                `在最低速度下出错 (blockSize=31, maxInFlight=31) - 非速度问题`,
              );
            }
          }

          // 检查是否为超时错误或 SLIP 错误
          if (err instanceof SlipReadError) {
            if (retryCount <= MAX_RETRIES) {
              this.logger.debug(
                `已清空缓冲区并重试（尝试 ${retryCount}/${MAX_RETRIES}）...`,
              );
              // 继续重试相同的块（将发送新的读取命令）
            } else {
              // 所有重试都已用尽 - 尝试通过重新加载 stub 进行恢复
              // 重要：不要关闭端口以保持 ESP32 处于引导加载程序模式
              if (!deepRecoveryAttempted) {
                deepRecoveryAttempted = true;

                this.logger.log(
                  `在地址 0x${currentAddr.toString(16)} 处所有重试都已用尽。正在尝试恢复（关闭并重新打开端口）...`,
                );

                try {
                  // 重新连接将关闭端口、重新打开并重新加载 stub
                  await this.reconnect();

                  this.logger.log("深度恢复成功。从当前位置恢复读取...");

                  // 重置重试计数器以在恢复后再次尝试
                  retryCount = 0;
                  continue;
                } catch (recoveryErr) {
                  throw new Error(
                    `在地址 0x${currentAddr.toString(16)} 处读取块失败，经过 ${MAX_RETRIES} 次重试且恢复失败: ${recoveryErr}`,
                  );
                }
              } else {
                // 已尝试恢复，放弃
                throw new Error(
                  `在地址 0x${currentAddr.toString(16)} 处读取块失败，经过 ${MAX_RETRIES} 次重试和恢复尝试`,
                );
              }
            }
          } else {
            // 非 SLIP 错误，不重试
            throw err;
          }
        }
      }

      // 更新进度（使用空数组，因为我们已经将数据附加到 allData）
      if (onPacketReceived) {
        onPacketReceived(new Uint8Array(chunkSize), allData.length, size);
      }

      currentAddr += chunkSize;
      remainingSize -= chunkSize;

      this.logger.debug(
        `总进度: 0x${allData.length.toString(16)} / 0x${size.toString(16)} 字节`,
      );
    }

    return allData;
  }
}

class EspStubLoader extends ESPLoader {
  /*
    Stub 加载器具有在 RAM 中上传的 Stub 代码上运行的命令，
    而不是内置命令。
  */
  IS_STUB = true;

  /**
   * @name memBegin (592)
   * 开始下载应用程序镜像到 RAM
   */
  async memBegin(
    size: number,
    _blocks: number,
    _blocksize: number,
    offset: number,
  ): Promise<[number, number[]]> {
    const stub = await getStubCode(this.chipFamily, this.chipRevision);

    // 对于不支持 stub 的芯片，stub 可能为 null
    if (stub === null) {
      return [0, []];
    }

    const load_start = offset;
    const load_end = offset + size;
    this.logger.debug(
      `加载范围: ${toHex(load_start, 8)}-${toHex(load_end, 8)}`,
    );
    this.logger.debug(
      `Stub 数据: ${toHex(stub.data_start, 8)}，长度: ${stub.data.length}，文本: ${toHex(stub.text_start, 8)}，长度: ${stub.text.length}`,
    );
    for (const [start, end] of [
      [stub.data_start, stub.data_start + stub.data.length],
      [stub.text_start, stub.text_start + stub.text.length],
    ]) {
      if (load_start < end && load_end > start) {
        throw new Error(
          "软件加载程序驻留在 " +
            toHex(start, 8) +
            "-" +
            toHex(end, 8) +
            "。 " +
            "无法在重叠的地址范围 " +
            toHex(load_start, 8) +
            "-" +
            toHex(load_end, 8) +
            " 加载二进制文件。 " +
            "请尝试更改二进制加载地址。",
        );
      }
    }
    return [0, []];
  }

  /**
   * @name eraseFlash
   * 擦除整个闪存芯片
   */
  async eraseFlash() {
    await this.checkCommand(ESP_ERASE_FLASH, [], 0, CHIP_ERASE_TIMEOUT);
  }

  /**
   * @name eraseRegion
   * 擦除闪存的特定区域
   */
  async eraseRegion(offset: number, size: number) {
    // 验证输入
    if (offset < 0) {
      throw new Error(`无效的偏移量: ${offset}（必须为非负数）`);
    }
    if (size < 0) {
      throw new Error(`无效的大小: ${size}（必须为非负数）`);
    }

    // 大小为零时无操作
    if (size === 0) {
      this.logger.log("eraseRegion: 大小为 0，跳过擦除");
      return;
    }

    // 检查扇区对齐
    if (offset % FLASH_SECTOR_SIZE !== 0) {
      throw new Error(
        `偏移量 ${offset} (0x${offset.toString(16)}) 未与闪存扇区大小 ${FLASH_SECTOR_SIZE} (0x${FLASH_SECTOR_SIZE.toString(16)}) 对齐`,
      );
    }
    if (size % FLASH_SECTOR_SIZE !== 0) {
      throw new Error(
        `大小 ${size} (0x${size.toString(16)}) 未与闪存扇区大小 ${FLASH_SECTOR_SIZE} (0x${FLASH_SECTOR_SIZE.toString(16)}) 对齐`,
      );
    }

    // 检查合理范围（防止在 pack 中溢出）
    const maxValue = 0xffffffff; // 32 位无符号最大值
    if (offset > maxValue) {
      throw new Error(`偏移量 ${offset} 超过最大值 ${maxValue}`);
    }
    if (size > maxValue) {
      throw new Error(`大小 ${size} 超过最大值 ${maxValue}`);
    }
    // 检查溢出
    if (offset + size > maxValue) {
      throw new Error(
        `区域结束（偏移量 + 大小 = ${offset + size}）超过最大可寻址范围 ${maxValue}`,
      );
    }

    const timeout = timeoutPerMb(ERASE_REGION_TIMEOUT_PER_MB, size);
    const buffer = pack("<II", offset, size);
    await this.checkCommand(ESP_ERASE_REGION, buffer, 0, timeout);
  }
}
