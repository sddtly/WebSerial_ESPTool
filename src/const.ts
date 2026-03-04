import { toByteArray } from "./util";

// 定义日志记录器接口
export interface Logger {
  log(msg: string, ...args: unknown[]): void; // 常规日志
  error(msg: string, ...args: unknown[]): void; // 错误日志
  debug(msg: string, ...args: unknown[]): void; // 调试日志
}

// 支持的波特率列表
export const baudRates = [
  115200, 128000, 153600, 230400, 460800, 500000, 921600, 1500000, 2000000,
];

// 闪存大小映射（传统格式）
export const FLASH_SIZES = {
  "512KB": 0x00,
  "256KB": 0x10,
  "1MB": 0x20,
  "2MB": 0x30,
  "4MB": 0x40,
  "2MB-c1": 0x50,
  "4MB-c1": 0x60,
  "8MB": 0x80,
  "16MB": 0x90,
};

// ESP32 系列闪存大小映射
export const ESP32_FLASH_SIZES = {
  "1MB": 0x00,
  "2MB": 0x10,
  "4MB": 0x20,
  "8MB": 0x30,
  "16MB": 0x40,
  "32MB": 0x50,
  "64MB": 0x60,
  "128MB": 0x70,
};

// 闪存大小查询结果映射接口
interface FlashSize {
  [key: number]: string;
}

// 检测到的闪存大小值与名称的映射
export const DETECTED_FLASH_SIZES: FlashSize = {
  0x12: "256KB",
  0x13: "512KB",
  0x14: "1MB",
  0x15: "2MB",
  0x16: "4MB",
  0x17: "8MB",
  0x18: "16MB",
  0x19: "32MB",
  0x1a: "64MB",
  0x1b: "128MB",
  0x1c: "256MB",
  0x20: "64MB",
  0x21: "128MB",
  0x22: "256MB",
  0x32: "256KB",
  0x33: "512KB",
  0x34: "1MB",
  0x35: "2MB",
  0x36: "4MB",
  0x37: "8MB",
  0x38: "16MB",
  0x39: "32MB",
  0x3a: "64MB",
};

// 闪存写入块大小（普通模式）
export const FLASH_WRITE_SIZE = 0x400;
// 闪存写入块大小（驻留程序模式）
export const STUB_FLASH_WRITE_SIZE = 0x4000;
// 闪存扇区大小，擦除的最小单位
export const FLASH_SECTOR_SIZE = 0x1000;
// ROM 启动时的默认波特率
export const ESP_ROM_BAUD = 115200;
// USB-JTAG/串行设备的 PID
export const USB_JTAG_SERIAL_PID = 0x1001;

// ESP8266 SPI 寄存器基址
export const ESP8266_SPI_REG_BASE = 0x60000200;
export const ESP8266_BASEFUSEADDR = 0x3ff00050; // 基础熔丝地址
export const ESP8266_MACFUSEADDR = 0x3ff00050; // MAC 地址熔丝地址
export const ESP8266_SPI_USR_OFFS = 0x1c; // SPI_USR 寄存器偏移
export const ESP8266_SPI_USR1_OFFS = 0x20; // SPI_USR1 寄存器偏移
export const ESP8266_SPI_USR2_OFFS = 0x24; // SPI_USR2 寄存器偏移
export const ESP8266_SPI_MOSI_DLEN_OFFS = -1; // 无 MOSI 数据长度寄存器
export const ESP8266_SPI_MISO_DLEN_OFFS = -1; // 无 MISO 数据长度寄存器
export const ESP8266_SPI_W0_OFFS = 0x40; // SPI_W0 寄存器偏移
export const ESP8266_UART_DATE_REG_ADDR = 0x60000078; // UART 日期寄存器地址
export const ESP8266_BOOTLOADER_FLASH_OFFSET = 0x0000; // 引导加载程序闪存偏移

// ESP32 SPI 寄存器基址
export const ESP32_SPI_REG_BASE = 0x3ff42000;
export const ESP32_BASEFUSEADDR = 0x3ff5a000;
export const ESP32_MACFUSEADDR = 0x3ff5a000;
export const ESP32_SPI_USR_OFFS = 0x1c;
export const ESP32_SPI_USR1_OFFS = 0x20;
export const ESP32_SPI_USR2_OFFS = 0x24;
export const ESP32_SPI_MOSI_DLEN_OFFS = 0x28; // MOSI 数据长度寄存器偏移
export const ESP32_SPI_MISO_DLEN_OFFS = 0x2c; // MISO 数据长度寄存器偏移
export const ESP32_SPI_W0_OFFS = 0x80; // SPI_W0 寄存器偏移
export const ESP32_UART_DATE_REG_ADDR = 0x60000078;
export const ESP32_BOOTLOADER_FLASH_OFFSET = 0x1000; // 引导加载程序闪存偏移（通常为 0x1000）
export const ESP32_APB_CTL_DATE_ADDR = 0x3ff66000 + 0x7c; // APB 控制日期寄存器地址

// ESP32-S2 SPI 寄存器基址
export const ESP32S2_SPI_REG_BASE = 0x3f402000;
export const ESP32S2_BASEFUSEADDR = 0x3f41a000;
export const ESP32S2_EFUSE_BLOCK1_ADDR = ESP32S2_BASEFUSEADDR + 0x044; // 熔丝块1地址
export const ESP32S2_MACFUSEADDR = 0x3f41a044; // MAC 熔丝地址
export const ESP32S2_SPI_USR_OFFS = 0x18;
export const ESP32S2_SPI_USR1_OFFS = 0x1c;
export const ESP32S2_SPI_USR2_OFFS = 0x20;
export const ESP32S2_SPI_MOSI_DLEN_OFFS = 0x24;
export const ESP32S2_SPI_MISO_DLEN_OFFS = 0x28;
export const ESP32S2_SPI_W0_OFFS = 0x58;
export const ESP32S2_UART_DATE_REG_ADDR = 0x60000078;
export const ESP32S2_BOOTLOADER_FLASH_OFFSET = 0x1000;
// ESP32-S2 RTC 看门狗定时器寄存器（用于 USB-OTG 复位）
export const ESP32S2_RTCCNTL_BASE_REG = 0x3f408000;
export const ESP32S2_RTC_CNTL_WDTWPROTECT_REG =
  ESP32S2_RTCCNTL_BASE_REG + 0x00ac;
export const ESP32S2_RTC_CNTL_WDTCONFIG0_REG =
  ESP32S2_RTCCNTL_BASE_REG + 0x0094;
export const ESP32S2_RTC_CNTL_WDTCONFIG1_REG =
  ESP32S2_RTCCNTL_BASE_REG + 0x0098;
export const ESP32S2_RTC_CNTL_WDT_WKEY = 0x50d83aa1; // 看门狗解锁密钥
// ESP32-S2 GPIO 启动模式控制寄存器
export const ESP32S2_GPIO_STRAP_REG = 0x3f404038;
export const ESP32S2_GPIO_STRAP_SPI_BOOT_MASK = 1 << 3; // 非下载模式掩码
export const ESP32S2_GPIO_STRAP_VDDSPI_MASK = 1 << 4; // SPI 电压选择掩码 (1.8V vs 3.3V)
export const ESP32S2_RTC_CNTL_OPTION1_REG = 0x3f408128;
export const ESP32S2_RTC_CNTL_FORCE_DOWNLOAD_BOOT_MASK = 0x1; // 是否强制通过 USB 进入下载模式
export const ESP32S2_UARTDEV_BUF_NO = 0x3ffffd14; // ROM .bss 中的变量，指示当前使用的端口
export const ESP32S2_UARTDEV_BUF_NO_USB_OTG = 2; // 上述变量值，表示正在使用 USB-OTG

// ESP32-S3 SPI 寄存器基址
export const ESP32S3_SPI_REG_BASE = 0x60002000;
export const ESP32S3_BASEFUSEADDR = 0x60007000;
export const ESP32S3_EFUSE_BLOCK1_ADDR = ESP32S3_BASEFUSEADDR + 0x044;
export const ESP32S3_MACFUSEADDR = 0x60007000 + 0x044;
export const ESP32S3_SPI_USR_OFFS = 0x18;
export const ESP32S3_SPI_USR1_OFFS = 0x1c;
export const ESP32S3_SPI_USR2_OFFS = 0x20;
export const ESP32S3_SPI_MOSI_DLEN_OFFS = 0x24;
export const ESP32S3_SPI_MISO_DLEN_OFFS = 0x28;
export const ESP32S3_SPI_W0_OFFS = 0x58;
export const ESP32S3_UART_DATE_REG_ADDR = 0x60000080;
export const ESP32S3_BOOTLOADER_FLASH_OFFSET = 0x0000; // ESP32-S3 引导加载程序闪存偏移
// ESP32-S3 RTC 看门狗定时器寄存器（用于 USB-OTG 复位）
export const ESP32S3_RTCCNTL_BASE_REG = 0x60008000;
export const ESP32S3_RTC_CNTL_WDTWPROTECT_REG =
  ESP32S3_RTCCNTL_BASE_REG + 0x00b0;
export const ESP32S3_RTC_CNTL_WDTCONFIG0_REG =
  ESP32S3_RTCCNTL_BASE_REG + 0x0098;
export const ESP32S3_RTC_CNTL_WDTCONFIG1_REG =
  ESP32S3_RTCCNTL_BASE_REG + 0x009c;
export const ESP32S3_RTC_CNTL_WDT_WKEY = 0x50d83aa1;
// ESP32-S3 GPIO 启动模式控制寄存器
export const ESP32S3_GPIO_STRAP_REG = 0x60004038;
export const ESP32S3_GPIO_STRAP_SPI_BOOT_MASK = 1 << 3;
export const ESP32S3_GPIO_STRAP_VDDSPI_MASK = 1 << 4;
export const ESP32S3_RTC_CNTL_OPTION1_REG = 0x6000812c;
export const ESP32S3_RTC_CNTL_FORCE_DOWNLOAD_BOOT_MASK = 0x1;
export const ESP32S3_UARTDEV_BUF_NO = 0x3fcef14c; // ROM .bss 变量，指示当前端口
export const ESP32S3_UARTDEV_BUF_NO_USB_OTG = 3; // 使用 USB-OTG 时的变量值
export const ESP32S3_UARTDEV_BUF_NO_USB_JTAG_SERIAL = 4; // 使用 USB-JTAG/串行时的变量值

// ESP32-C2 SPI 寄存器基址
export const ESP32C2_SPI_REG_BASE = 0x60002000;
export const ESP32C2_BASEFUSEADDR = 0x60008800;
export const ESP32C2_EFUSE_BLOCK2_ADDR = ESP32C2_BASEFUSEADDR + 0x040;
export const ESP32C2_MACFUSEADDR = ESP32C2_BASEFUSEADDR + 0x040;
export const ESP32C2_SPI_USR_OFFS = 0x18;
export const ESP32C2_SPI_USR1_OFFS = 0x1c;
export const ESP32C2_SPI_USR2_OFFS = 0x20;
export const ESP32C2_SPI_MOSI_DLEN_OFFS = 0x24;
export const ESP32C2_SPI_MISO_DLEN_OFFS = 0x28;
export const ESP32C2_SPI_W0_OFFS = 0x58;
export const ESP32C2_UART_DATE_REG_ADDR = 0x6000007c;
export const ESP32C2_BOOTLOADER_FLASH_OFFSET = 0x0000;
// ESP32-C2 RTC 看门狗定时器寄存器
export const ESP32C2_RTCCNTL_BASE_REG = 0x60008000;
export const ESP32C2_RTC_CNTL_WDTWPROTECT_REG =
  ESP32C2_RTCCNTL_BASE_REG + 0x009c;
export const ESP32C2_RTC_CNTL_WDTCONFIG0_REG =
  ESP32C2_RTCCNTL_BASE_REG + 0x0084;
export const ESP32C2_RTC_CNTL_WDTCONFIG1_REG =
  ESP32C2_RTCCNTL_BASE_REG + 0x0088;
export const ESP32C2_RTC_CNTL_WDT_WKEY = 0x50d83aa1;

// ESP32-C3 SPI 寄存器基址
export const ESP32C3_SPI_REG_BASE = 0x60002000;
export const ESP32C3_BASEFUSEADDR = 0x60008800;
export const ESP32C3_EFUSE_BLOCK1_ADDR = ESP32C3_BASEFUSEADDR + 0x044;
export const ESP32C3_MACFUSEADDR = 0x60008800 + 0x044;
export const ESP32C3_SPI_USR_OFFS = 0x18;
export const ESP32C3_SPI_USR1_OFFS = 0x1c;
export const ESP32C3_SPI_USR2_OFFS = 0x20;
export const ESP32C3_SPI_MOSI_DLEN_OFFS = 0x24;
export const ESP32C3_SPI_MISO_DLEN_OFFS = 0x28;
export const ESP32C3_SPI_W0_OFFS = 0x58;
export const ESP32C3_UART_DATE_REG_ADDR = 0x6000007c;
export const ESP32C3_BOOTLOADER_FLASH_OFFSET = 0x0000;
// ESP32-C3 RTC 看门狗定时器寄存器
export const ESP32C3_RTC_CNTL_BASE_REG = 0x60008000;
export const ESP32C3_RTC_CNTL_WDTWPROTECT_REG =
  ESP32C3_RTC_CNTL_BASE_REG + 0x00a8;
export const ESP32C3_RTC_CNTL_WDTCONFIG0_REG =
  ESP32C3_RTC_CNTL_BASE_REG + 0x0090;
export const ESP32C3_RTC_CNTL_WDTCONFIG1_REG =
  ESP32C3_RTC_CNTL_BASE_REG + 0x0094;
export const ESP32C3_RTC_CNTL_WDT_WKEY = 0x50d83aa1;
export const ESP32C3_RTC_CNTL_SWD_WKEY = 0x8f1d312a; // 超级看门狗解锁密钥
export const ESP32C3_RTC_CNTL_SWD_CONF_REG = ESP32C3_RTC_CNTL_BASE_REG + 0x00ac; // 超级看门狗配置寄存器
export const ESP32C3_RTC_CNTL_SWD_AUTO_FEED_EN = 1 << 31; // 超级看门狗自动喂狗使能位
export const ESP32C3_RTC_CNTL_SWD_WPROTECT_REG =
  ESP32C3_RTC_CNTL_BASE_REG + 0x00b0; // 超级看门狗写保护寄存器
export const ESP32C3_UARTDEV_BUF_NO_USB_JTAG_SERIAL = 3; // 使用 USB-JTAG/串行时的变量值
export const ESP32C3_BUF_UART_NO_OFFSET = 24; // ROM .bss 中 UART 编号的偏移量
// 注意：ESP32C3_BSS_UART_DEV_ADDR 在 esp_loader.ts 中根据芯片版本动态计算
// 版本 < 101: 0x3FCDF064, 版本 >= 101: 0x3FCDF060
// ESP32-C3 用于芯片版本检测的熔丝寄存器
export const ESP32C3_EFUSE_RD_MAC_SPI_SYS_3_REG = 0x60008850;
export const ESP32C3_EFUSE_RD_MAC_SPI_SYS_5_REG = 0x60008858;

// ESP32-C5 SPI 寄存器基址
export const ESP32C5_SPI_REG_BASE = 0x60003000;
export const ESP32C5_BASEFUSEADDR = 0x600b4800;
export const ESP32C5_EFUSE_BLOCK1_ADDR = ESP32C5_BASEFUSEADDR + 0x044;
export const ESP32C5_MACFUSEADDR = 0x600b4800 + 0x044;
export const ESP32C5_SPI_USR_OFFS = 0x18;
export const ESP32C5_SPI_USR1_OFFS = 0x1c;
export const ESP32C5_SPI_USR2_OFFS = 0x20;
export const ESP32C5_SPI_MOSI_DLEN_OFFS = 0x24;
export const ESP32C5_SPI_MISO_DLEN_OFFS = 0x28;
export const ESP32C5_SPI_W0_OFFS = 0x58;
export const ESP32C5_UART_DATE_REG_ADDR = 0x6000007c;
export const ESP32C5_UART_CLKDIV_REG = 0x60000014; // UART 时钟分频寄存器
export const ESP32C5_BOOTLOADER_FLASH_OFFSET = 0x2000; // 引导加载程序闪存偏移
// ESP32-C5 晶振频率检测寄存器
export const ESP32C5_PCR_SYSCLK_CONF_REG = 0x60096110;
export const ESP32C5_PCR_SYSCLK_XTAL_FREQ_V = 0x7f << 24; // 晶振频率值掩码
export const ESP32C5_PCR_SYSCLK_XTAL_FREQ_S = 24; // 晶振频率值起始位
// ESP32-C5 USB-JTAG/串行检测
export const ESP32C5_UARTDEV_BUF_NO = 0x4085f514; // ROM .bss 变量，指示当前端口
export const ESP32C5_UARTDEV_BUF_NO_USB_JTAG_SERIAL = 3; // 使用 USB-JTAG/串行时的变量值

// ESP32-C6 SPI 寄存器基址
export const ESP32C6_SPI_REG_BASE = 0x60003000;
export const ESP32C6_BASEFUSEADDR = 0x600b0800;
export const ESP32C6_EFUSE_BLOCK1_ADDR = ESP32C6_BASEFUSEADDR + 0x044;
export const ESP32C6_MACFUSEADDR = 0x600b0800 + 0x044;
export const ESP32C6_SPI_USR_OFFS = 0x18;
export const ESP32C6_SPI_USR1_OFFS = 0x1c;
export const ESP32C6_SPI_USR2_OFFS = 0x20;
export const ESP32C6_SPI_MOSI_DLEN_OFFS = 0x24;
export const ESP32C6_SPI_MISO_DLEN_OFFS = 0x28;
export const ESP32C6_SPI_W0_OFFS = 0x58;
export const ESP32C6_UART_DATE_REG_ADDR = 0x6000007c;
export const ESP32C6_BOOTLOADER_FLASH_OFFSET = 0x0000;
// ESP32-C6 RTC 看门狗定时器寄存器（LP_WDT）
export const ESP32C6_DR_REG_LP_WDT_BASE = 0x600b1c00;
export const ESP32C6_RTC_CNTL_WDTWPROTECT_REG =
  ESP32C6_DR_REG_LP_WDT_BASE + 0x0018; // LP_WDT_RWDT_WPROTECT_REG
export const ESP32C6_RTC_CNTL_WDTCONFIG0_REG =
  ESP32C6_DR_REG_LP_WDT_BASE + 0x0000; // LP_WDT_RWDT_CONFIG0_REG
export const ESP32C6_RTC_CNTL_WDTCONFIG1_REG =
  ESP32C6_DR_REG_LP_WDT_BASE + 0x0004; // LP_WDT_RWDT_CONFIG1_REG
export const ESP32C6_RTC_CNTL_WDT_WKEY = 0x50d83aa1; // LP_WDT_SWD_WKEY，此处与 WDT 密钥相同
export const ESP32C6_RTC_CNTL_SWD_WKEY = 0x50d83aa1; // LP_WDT_SWD_WKEY，与 WDT 密钥相同
// ESP32-C6 USB-JTAG/串行检测
export const ESP32C6_UARTDEV_BUF_NO = 0x4087f580; // ROM .bss 变量，指示当前端口
export const ESP32C6_UARTDEV_BUF_NO_USB_JTAG_SERIAL = 3; // 使用 USB-JTAG/串行时的变量值

// ESP32-C5/C6 LP 看门狗定时器寄存器（低功耗 WDT）
export const ESP32C5_C6_DR_REG_LP_WDT_BASE = 0x600b1c00;
export const ESP32C5_C6_RTC_CNTL_WDTCONFIG0_REG =
  ESP32C5_C6_DR_REG_LP_WDT_BASE + 0x0000; // LP_WDT_RWDT_CONFIG0_REG
export const ESP32C5_C6_RTC_CNTL_WDTCONFIG1_REG =
  ESP32C5_C6_DR_REG_LP_WDT_BASE + 0x0004; // LP_WDT_RWDT_CONFIG1_REG
export const ESP32C5_C6_RTC_CNTL_WDTWPROTECT_REG =
  ESP32C5_C6_DR_REG_LP_WDT_BASE + 0x0018; // LP_WDT_RWDT_WPROTECT_REG
export const ESP32C5_C6_RTC_CNTL_WDT_WKEY = 0x50d83aa1; // LP_WDT_SWD_WKEY
export const ESP32C5_C6_RTC_CNTL_SWD_CONF_REG =
  ESP32C5_C6_DR_REG_LP_WDT_BASE + 0x001c; // LP_WDT_SWD_CONFIG_REG
export const ESP32C5_C6_RTC_CNTL_SWD_AUTO_FEED_EN = 1 << 18; // 超级看门狗自动喂狗使能位
export const ESP32C5_C6_RTC_CNTL_SWD_WPROTECT_REG =
  ESP32C5_C6_DR_REG_LP_WDT_BASE + 0x0020; // LP_WDT_SWD_WPROTECT_REG

// ESP32-C61 SPI 寄存器基址
export const ESP32C61_SPI_REG_BASE = 0x60003000;
export const ESP32C61_BASEFUSEADDR = 0x600b4800;
export const ESP32C61_EFUSE_BLOCK1_ADDR = ESP32C61_BASEFUSEADDR + 0x044;
export const ESP32C61_MACFUSEADDR = 0x600b4800 + 0x044;
export const ESP32C61_SPI_USR_OFFS = 0x18;
export const ESP32C61_SPI_USR1_OFFS = 0x1c;
export const ESP32C61_SPI_USR2_OFFS = 0x20;
export const ESP32C61_SPI_MOSI_DLEN_OFFS = 0x24;
export const ESP32C61_SPI_MISO_DLEN_OFFS = 0x28;
export const ESP32C61_SPI_W0_OFFS = 0x58;
export const ESP32C61_UART_DATE_REG_ADDR = 0x6000007c;
export const ESP32C61_BOOTLOADER_FLASH_OFFSET = 0x0000;
// ESP32-C61 USB-JTAG/串行检测（根据芯片版本动态变化）
export const ESP32C61_UARTDEV_BUF_NO_REV_LE2 = 0x4084f5ec; // 版本 <= 2 时的地址
export const ESP32C61_UARTDEV_BUF_NO_REV_GT2 = 0x4084f5e4; // 版本 > 2 时的地址
export const ESP32C61_UARTDEV_BUF_NO_USB_JTAG_SERIAL_REV_LE2 = 3; // 版本 <= 2 时的变量值
export const ESP32C61_UARTDEV_BUF_NO_USB_JTAG_SERIAL_REV_GT2 = 4; // 版本 > 2 时的变量值

// ESP32-H2 SPI 寄存器基址
export const ESP32H2_SPI_REG_BASE = 0x60003000;
export const ESP32H2_BASEFUSEADDR = 0x600b0800;
export const ESP32H2_EFUSE_BLOCK1_ADDR = ESP32H2_BASEFUSEADDR + 0x044;
export const ESP32H2_MACFUSEADDR = 0x600b0800 + 0x044;
export const ESP32H2_SPI_USR_OFFS = 0x18;
export const ESP32H2_SPI_USR1_OFFS = 0x1c;
export const ESP32H2_SPI_USR2_OFFS = 0x20;
export const ESP32H2_SPI_MOSI_DLEN_OFFS = 0x24;
export const ESP32H2_SPI_MISO_DLEN_OFFS = 0x28;
export const ESP32H2_SPI_W0_OFFS = 0x58;
export const ESP32H2_UART_DATE_REG_ADDR = 0x6000007c;
export const ESP32H2_BOOTLOADER_FLASH_OFFSET = 0x0000;
// ESP32-H2 RTC 看门狗定时器寄存器（LP_WDT）
export const ESP32H2_DR_REG_LP_WDT_BASE = 0x600b1c00;
export const ESP32H2_RTC_CNTL_WDTWPROTECT_REG =
  ESP32H2_DR_REG_LP_WDT_BASE + 0x001c; // LP_WDT_RWDT_WPROTECT_REG
export const ESP32H2_RTC_CNTL_WDTCONFIG0_REG =
  ESP32H2_DR_REG_LP_WDT_BASE + 0x0000; // LP_WDT_RWDT_CONFIG0_REG
export const ESP32H2_RTC_CNTL_WDTCONFIG1_REG =
  ESP32H2_DR_REG_LP_WDT_BASE + 0x0004; // LP_WDT_RWDT_CONFIG1_REG
export const ESP32H2_RTC_CNTL_WDT_WKEY = 0x50d83aa1; // LP_WDT_SWD_WKEY，此处与 WDT 密钥相同
export const ESP32H2_RTC_CNTL_SWD_WKEY = 0x50d83aa1; // LP_WDT_SWD_WKEY，与 WDT 密钥相同
// ESP32-H2 USB-JTAG/串行检测
export const ESP32H2_UARTDEV_BUF_NO = 0x4084fefc; // ROM .bss 变量，指示当前端口
export const ESP32H2_UARTDEV_BUF_NO_USB_JTAG_SERIAL = 3; // 使用 USB-JTAG/串行时的变量值

// ESP32-H4 SPI 寄存器基址
export const ESP32H4_SPI_REG_BASE = 0x60099000;
export const ESP32H4_BASEFUSEADDR = 0x600b1800;
export const ESP32H4_EFUSE_BLOCK1_ADDR = ESP32H4_BASEFUSEADDR + 0x044;
export const ESP32H4_MACFUSEADDR = 0x600b1800 + 0x044;
export const ESP32H4_SPI_USR_OFFS = 0x18;
export const ESP32H4_SPI_USR1_OFFS = 0x1c;
export const ESP32H4_SPI_USR2_OFFS = 0x20;
export const ESP32H4_SPI_MOSI_DLEN_OFFS = 0x24;
export const ESP32H4_SPI_MISO_DLEN_OFFS = 0x28;
export const ESP32H4_SPI_W0_OFFS = 0x58;
export const ESP32H4_UART_DATE_REG_ADDR = 0x60012000 + 0x7c;
export const ESP32H4_BOOTLOADER_FLASH_OFFSET = 0x2000;
// ESP32-H4 RTC 看门狗定时器寄存器
export const ESP32H4_DR_REG_LP_WDT_BASE = 0x600b5400;
export const ESP32H4_RTC_CNTL_WDTWPROTECT_REG =
  ESP32H4_DR_REG_LP_WDT_BASE + 0x0018; // LP_WDT_RWDT_WPROTECT_REG
export const ESP32H4_RTC_CNTL_WDTCONFIG0_REG =
  ESP32H4_DR_REG_LP_WDT_BASE + 0x0000; // LP_WDT_RWDT_CONFIG0_REG
export const ESP32H4_RTC_CNTL_WDTCONFIG1_REG =
  ESP32H4_DR_REG_LP_WDT_BASE + 0x0004; // LP_WDT_RWDT_CONFIG1_REG
export const ESP32H4_RTC_CNTL_WDT_WKEY = 0x50d83aa1; // LP_WDT_SWD_WKEY，此处与 WDT 密钥相同
export const ESP32H4_RTC_CNTL_SWD_WKEY = 0x50d83aa1; // LP_WDT_SWD_WKEY，与 WDT 密钥相同
// ESP32-H4 USB-JTAG/串行检测
export const ESP32H4_UARTDEV_BUF_NO = 0x4087f580; // ROM .bss 变量，指示当前端口
export const ESP32H4_UARTDEV_BUF_NO_USB_JTAG_SERIAL = 3; // 使用 USB-JTAG/串行时的变量值

// ESP32-H21 SPI 寄存器基址
export const ESP32H21_SPI_REG_BASE = 0x60003000;
export const ESP32H21_BASEFUSEADDR = 0x600b4000;
export const ESP32H21_EFUSE_BLOCK1_ADDR = ESP32H21_BASEFUSEADDR + 0x044;
export const ESP32H21_MACFUSEADDR = 0x600b4000 + 0x044;
export const ESP32H21_SPI_USR_OFFS = 0x18;
export const ESP32H21_SPI_USR1_OFFS = 0x1c;
export const ESP32H21_SPI_USR2_OFFS = 0x20;
export const ESP32H21_SPI_MOSI_DLEN_OFFS = 0x24;
export const ESP32H21_SPI_MISO_DLEN_OFFS = 0x28;
export const ESP32H21_SPI_W0_OFFS = 0x58;
export const ESP32H21_UART_DATE_REG_ADDR = 0x6000007c;
export const ESP32H21_BOOTLOADER_FLASH_OFFSET = 0x0000;
// ESP32-H21 RTC 看门狗定时器寄存器（LP_WDT）
export const ESP32H21_DR_REG_LP_WDT_BASE = 0x600b1c00;
export const ESP32H21_RTC_CNTL_WDTWPROTECT_REG =
  ESP32H21_DR_REG_LP_WDT_BASE + 0x001c;
export const ESP32H21_RTC_CNTL_WDTCONFIG0_REG =
  ESP32H21_DR_REG_LP_WDT_BASE + 0x0000;
export const ESP32H21_RTC_CNTL_WDTCONFIG1_REG =
  ESP32H21_DR_REG_LP_WDT_BASE + 0x0004; // LP_WDT_RWDT_CONFIG1_REG
export const ESP32H21_RTC_CNTL_WDT_WKEY = 0x50d83aa1;
export const ESP32H21_RTC_CNTL_SWD_WKEY = 0x50d83aa1; // LP_WDT_SWD_WKEY，与 WDT 密钥相同

// ESP32-P4 SPI 寄存器基址
export const ESP32P4_SPI_REG_BASE = 0x5008d000;
export const ESP32P4_BASEFUSEADDR = 0x5012d000;
export const ESP32P4_EFUSE_BLOCK1_ADDR = ESP32P4_BASEFUSEADDR + 0x044;
export const ESP32P4_MACFUSEADDR = 0x5012d000 + 0x044;
export const ESP32P4_SPI_USR_OFFS = 0x18;
export const ESP32P4_SPI_USR1_OFFS = 0x1c;
export const ESP32P4_SPI_USR2_OFFS = 0x20;
export const ESP32P4_SPI_MOSI_DLEN_OFFS = 0x24;
export const ESP32P4_SPI_MISO_DLEN_OFFS = 0x28;
export const ESP32P4_SPI_W0_OFFS = 0x58;
export const ESP32P4_UART_DATE_REG_ADDR = 0x500ca000 + 0x8c;
export const ESP32P4_BOOTLOADER_FLASH_OFFSET = 0x2000;
// ESP32-P4 RTC 看门狗定时器寄存器
export const ESP32P4_DR_REG_LP_WDT_BASE = 0x50116000;
export const ESP32P4_RTC_CNTL_WDTWPROTECT_REG =
  ESP32P4_DR_REG_LP_WDT_BASE + 0x0018; // LP_WDT_WPROTECT_REG
export const ESP32P4_RTC_CNTL_WDTCONFIG0_REG =
  ESP32P4_DR_REG_LP_WDT_BASE + 0x0000; // LP_WDT_CONFIG0_REG
export const ESP32P4_RTC_CNTL_WDTCONFIG1_REG =
  ESP32P4_DR_REG_LP_WDT_BASE + 0x0004; // LP_WDT_CONFIG1_REG
export const ESP32P4_RTC_CNTL_WDT_WKEY = 0x50d83aa1;
export const ESP32P4_RTC_CNTL_SWD_CONF_REG =
  ESP32P4_DR_REG_LP_WDT_BASE + 0x001c; // RTC_WDT_SWD_CONFIG_REG
export const ESP32P4_RTC_CNTL_SWD_AUTO_FEED_EN = 1 << 18;
export const ESP32P4_RTC_CNTL_SWD_WPROTECT_REG =
  ESP32P4_DR_REG_LP_WDT_BASE + 0x0020; // RTC_WDT_SWD_WPROTECT_REG
export const ESP32P4_RTC_CNTL_SWD_WKEY = 0x50d83aa1; // RTC_WDT_SWD_WKEY，与 WDT 密钥相同
// ESP32-P4 USB-JTAG/串行和 USB-OTG 检测
// 注意：UARTDEV_BUF_NO 根据芯片版本动态变化
// 版本 < 300: 0x4FF3FEB0 + 24 = 0x4FF3FEC8
// 版本 >= 300: 0x4FFBFEB0 + 24 = 0x4FFBFEC8
export const ESP32P4_UARTDEV_BUF_NO_REV0 = 0x4ff3fec8; // ROM .bss 变量（版本 < 300）
export const ESP32P4_UARTDEV_BUF_NO_REV300 = 0x4ffbfec8; // ROM .bss 变量（版本 >= 300）
export const ESP32P4_UARTDEV_BUF_NO_USB_OTG = 5; // 使用 USB-OTG 时的变量值
export const ESP32P4_UARTDEV_BUF_NO_USB_JTAG_SERIAL = 6; // 使用 USB-JTAG/串行时的变量值
export const ESP32P4_GPIO_STRAP_REG = 0x500e0038;
export const ESP32P4_GPIO_STRAP_SPI_BOOT_MASK = 0x8; // 非下载模式掩码
export const ESP32P4_RTC_CNTL_OPTION1_REG = 0x50110008;
export const ESP32P4_RTC_CNTL_FORCE_DOWNLOAD_BOOT_MASK = 0x4; // 是否强制通过 USB 进入下载模式

// 与闪存上电相关的寄存器和位（用于 ECO6，修订版 301）
export const ESP32P4_DR_REG_LPAON_BASE = 0x50110000;
export const ESP32P4_DR_REG_PMU_BASE = ESP32P4_DR_REG_LPAON_BASE + 0x5000;
export const ESP32P4_DR_REG_LP_SYS_BASE = ESP32P4_DR_REG_LPAON_BASE + 0x0;
export const ESP32P4_LP_SYSTEM_REG_ANA_XPD_PAD_GROUP_REG =
  ESP32P4_DR_REG_LP_SYS_BASE + 0x10c;
export const ESP32P4_PMU_EXT_LDO_P0_0P1A_ANA_REG =
  ESP32P4_DR_REG_PMU_BASE + 0x1bc;
export const ESP32P4_PMU_ANA_0P1A_EN_CUR_LIM_0 = 1 << 27;
export const ESP32P4_PMU_EXT_LDO_P0_0P1A_REG = ESP32P4_DR_REG_PMU_BASE + 0x1b8;
export const ESP32P4_PMU_0P1A_TARGET0_0 = 0xff << 23;
export const ESP32P4_PMU_0P1A_FORCE_TIEH_SEL_0 = 1 << 7;
export const ESP32P4_PMU_DATE_REG = ESP32P4_DR_REG_PMU_BASE + 0x3fc;

// ESP32-S31 SPI 寄存器基址
export const ESP32S31_SPI_REG_BASE = 0x20500000;
export const ESP32S31_BASEFUSEADDR = 0x20715000;
export const ESP32S31_EFUSE_BLOCK1_ADDR = ESP32S31_BASEFUSEADDR + 0x044;
export const ESP32S31_MACFUSEADDR = 0x20715000 + 0x044;
export const ESP32S31_SPI_USR_OFFS = 0x18;
export const ESP32S31_SPI_USR1_OFFS = 0x1c;
export const ESP32S31_SPI_USR2_OFFS = 0x20;
export const ESP32S31_SPI_MOSI_DLEN_OFFS = 0x24;
export const ESP32S31_SPI_MISO_DLEN_OFFS = 0x28;
export const ESP32S31_SPI_W0_OFFS = 0x58;
export const ESP32S31_UART_DATE_REG_ADDR = 0x2038a000 + 0x8c;
export const ESP32S31_BOOTLOADER_FLASH_OFFSET = 0x2000;

// SPI 闪存地址结构定义
export interface SpiFlashAddresses {
  regBase: number; // SPI 寄存器基址
  baseFuse: number; // 基础熔丝地址
  macFuse: number; // MAC 熔丝地址
  usrOffs: number; // SPI_USR 寄存器偏移
  usr1Offs: number; // SPI_USR1 寄存器偏移
  usr2Offs: number; // SPI_USR2 寄存器偏移
  mosiDlenOffs: number; // MOSI 数据长度寄存器偏移
  misoDlenOffs: number; // MISO 数据长度寄存器偏移
  w0Offs: number; // SPI_W0 寄存器偏移
  uartDateReg: number; // UART 日期寄存器地址
  flashOffs: number; // 引导加载程序闪存偏移
}

// 同步命令包（用于与 ROM 引导加载程序建立通信）
export const SYNC_PACKET = toByteArray(
  "\x07\x07\x12 UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU",
);
// 芯片检测魔数寄存器地址
export const CHIP_DETECT_MAGIC_REG_ADDR = 0x40001000;

// 镜像芯片 ID（从 ESP32-C3 及以后用于芯片检测）
// 这些系列值是虚构的，与 esptool 使用的值无关
export const CHIP_FAMILY_ESP8266 = 0x8266;
export const CHIP_FAMILY_ESP32 = 0x32;
export const CHIP_FAMILY_ESP32S2 = 0x3252;
export const CHIP_FAMILY_ESP32S3 = 0x3253;
export const CHIP_FAMILY_ESP32C2 = 0x32c2;
export const CHIP_FAMILY_ESP32C3 = 0x32c3;
export const CHIP_FAMILY_ESP32C5 = 0x32c5;
export const CHIP_FAMILY_ESP32C6 = 0x32c6;
export const CHIP_FAMILY_ESP32C61 = 0x32c61;
export const CHIP_FAMILY_ESP32H2 = 0x3272;
export const CHIP_FAMILY_ESP32H4 = 0x3274;
export const CHIP_FAMILY_ESP32H21 = 0x3275;
export const CHIP_FAMILY_ESP32P4 = 0x3280;
export const CHIP_FAMILY_ESP32S31 = 0x3231;

// 芯片系列类型
export type ChipFamily =
  | typeof CHIP_FAMILY_ESP8266
  | typeof CHIP_FAMILY_ESP32
  | typeof CHIP_FAMILY_ESP32S2
  | typeof CHIP_FAMILY_ESP32S3
  | typeof CHIP_FAMILY_ESP32C2
  | typeof CHIP_FAMILY_ESP32C3
  | typeof CHIP_FAMILY_ESP32C5
  | typeof CHIP_FAMILY_ESP32C6
  | typeof CHIP_FAMILY_ESP32C61
  | typeof CHIP_FAMILY_ESP32H2
  | typeof CHIP_FAMILY_ESP32H4
  | typeof CHIP_FAMILY_ESP32H21
  | typeof CHIP_FAMILY_ESP32P4
  | typeof CHIP_FAMILY_ESP32S31;

// 芯片 ID 信息接口
interface ChipIdInfo {
  name: string; // 芯片名称
  family: ChipFamily; // 芯片系列
}

// 芯片 ID 到信息的映射
export const CHIP_ID_TO_INFO: { [chipId: number]: ChipIdInfo } = {
  5: { name: "ESP32-C3", family: CHIP_FAMILY_ESP32C3 },
  9: { name: "ESP32-S3", family: CHIP_FAMILY_ESP32S3 },
  12: { name: "ESP32-C2", family: CHIP_FAMILY_ESP32C2 },
  13: { name: "ESP32-C6", family: CHIP_FAMILY_ESP32C6 },
  16: { name: "ESP32-H2", family: CHIP_FAMILY_ESP32H2 },
  18: { name: "ESP32-P4", family: CHIP_FAMILY_ESP32P4 },
  20: { name: "ESP32-C61", family: CHIP_FAMILY_ESP32C61 },
  23: { name: "ESP32-C5", family: CHIP_FAMILY_ESP32C5 },
  25: { name: "ESP32-H21", family: CHIP_FAMILY_ESP32H21 },
  28: { name: "ESP32-H4", family: CHIP_FAMILY_ESP32H4 },
  32: { name: "ESP32-S31", family: CHIP_FAMILY_ESP32S31 },
};

// 芯片检测魔数值到信息的映射（用于通过读取特定寄存器识别芯片）
interface ChipInfo {
  [magicValue: number]: {
    name: string; // 芯片名称
    family: ChipFamily; // 芯片系列
  };
}

export const CHIP_DETECT_MAGIC_VALUES: ChipInfo = {
  0xfff0c101: { name: "ESP8266", family: CHIP_FAMILY_ESP8266 },
  0x00f01d83: { name: "ESP32", family: CHIP_FAMILY_ESP32 },
  0x000007c6: { name: "ESP32-S2", family: CHIP_FAMILY_ESP32S2 },
};

// ESP8266 ROM 引导加载程序支持的命令
export const ESP_FLASH_BEGIN = 0x02; // 开始闪存操作
export const ESP_FLASH_DATA = 0x03; // 发送闪存数据
export const ESP_FLASH_END = 0x04; // 结束闪存操作
export const ESP_MEM_BEGIN = 0x05; // 开始内存操作
export const ESP_MEM_END = 0x06; // 结束内存操作
export const ESP_MEM_DATA = 0x07; // 发送内存数据
export const ESP_SYNC = 0x08; // 同步命令
export const ESP_WRITE_REG = 0x09; // 写寄存器
export const ESP_READ_REG = 0x0a; // 读寄存器

export const ESP_ERASE_FLASH = 0xd0; // 擦除整个闪存
export const ESP_ERASE_REGION = 0xd1; // 擦除闪存区域
export const ESP_READ_FLASH = 0xd2; // 读取闪存

export const ESP_SPI_SET_PARAMS = 0x0b; // 设置 SPI 参数
export const ESP_SPI_ATTACH = 0x0d; // 挂载 SPI 闪存
export const ESP_CHANGE_BAUDRATE = 0x0f; // 更改波特率
export const ESP_SPI_FLASH_MD5 = 0x13; // 计算闪存 MD5
export const ESP_GET_SECURITY_INFO = 0x14; // 获取安全信息
export const ESP_CHECKSUM_MAGIC = 0xef; // 校验和魔数
export const ESP_FLASH_DEFL_BEGIN = 0x10; // 开始压缩闪存操作
export const ESP_FLASH_DEFL_DATA = 0x11; // 发送压缩闪存数据
export const ESP_FLASH_DEFL_END = 0x12; // 结束压缩闪存操作

export const ROM_INVALID_RECV_MSG = 0x05; // ROM 返回的无效接收消息错误码

export const USB_RAM_BLOCK = 0x800; // USB 内存块大小
export const ESP_RAM_BLOCK = 0x1800; // ESP 内存块大小

// 超时设置（毫秒）
export const DEFAULT_TIMEOUT = 3000; // 默认超时
export const CHIP_ERASE_TIMEOUT = 150000; // 全片擦除超时
export const MAX_TIMEOUT = CHIP_ERASE_TIMEOUT * 2; // 最长命令超时
export const SYNC_TIMEOUT = 100; // 同步超时
export const ERASE_REGION_TIMEOUT_PER_MB = 30000; // 每兆字节擦除区域超时
export const MEM_END_ROM_TIMEOUT = 500; // MEM_END ROM 超时
export const FLASH_READ_TIMEOUT = 100; // 读取闪存超时

/**
 * @name timeoutPerMb
 * 根据大小计算超时时间（用于与大小相关的操作）
 */
export const timeoutPerMb = (secondsPerMb: number, sizeBytes: number) => {
  const result = Math.floor(secondsPerMb * (sizeBytes / 0x1e6));
  if (result < DEFAULT_TIMEOUT) {
    return DEFAULT_TIMEOUT;
  }
  return result;
};

/**
 * 根据芯片系列获取 SPI 闪存地址结构
 */
export const getSpiFlashAddresses = (
  chipFamily: ChipFamily,
): SpiFlashAddresses => {
  switch (chipFamily) {
    case CHIP_FAMILY_ESP32:
      return {
        regBase: ESP32_SPI_REG_BASE,
        baseFuse: ESP32_BASEFUSEADDR,
        macFuse: ESP32_MACFUSEADDR,
        usrOffs: ESP32_SPI_USR_OFFS,
        usr1Offs: ESP32_SPI_USR1_OFFS,
        usr2Offs: ESP32_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32_SPI_W0_OFFS,
        uartDateReg: ESP32_UART_DATE_REG_ADDR,
        flashOffs: ESP32_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP32S2:
      return {
        regBase: ESP32S2_SPI_REG_BASE,
        baseFuse: ESP32S2_BASEFUSEADDR,
        macFuse: ESP32S2_MACFUSEADDR,
        usrOffs: ESP32S2_SPI_USR_OFFS,
        usr1Offs: ESP32S2_SPI_USR1_OFFS,
        usr2Offs: ESP32S2_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32S2_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32S2_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32S2_SPI_W0_OFFS,
        uartDateReg: ESP32S2_UART_DATE_REG_ADDR,
        flashOffs: ESP32S2_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP32S3:
      return {
        regBase: ESP32S3_SPI_REG_BASE,
        usrOffs: ESP32S3_SPI_USR_OFFS,
        baseFuse: ESP32S3_BASEFUSEADDR,
        macFuse: ESP32S3_MACFUSEADDR,
        usr1Offs: ESP32S3_SPI_USR1_OFFS,
        usr2Offs: ESP32S3_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32S3_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32S3_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32S3_SPI_W0_OFFS,
        uartDateReg: ESP32S3_UART_DATE_REG_ADDR,
        flashOffs: ESP32S3_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP8266:
      return {
        regBase: ESP8266_SPI_REG_BASE,
        usrOffs: ESP8266_SPI_USR_OFFS,
        baseFuse: ESP8266_BASEFUSEADDR,
        macFuse: ESP8266_MACFUSEADDR,
        usr1Offs: ESP8266_SPI_USR1_OFFS,
        usr2Offs: ESP8266_SPI_USR2_OFFS,
        mosiDlenOffs: ESP8266_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP8266_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP8266_SPI_W0_OFFS,
        uartDateReg: ESP8266_UART_DATE_REG_ADDR,
        flashOffs: ESP8266_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP32C2:
      return {
        regBase: ESP32C2_SPI_REG_BASE,
        baseFuse: ESP32C2_BASEFUSEADDR,
        macFuse: ESP32C2_MACFUSEADDR,
        usrOffs: ESP32C2_SPI_USR_OFFS,
        usr1Offs: ESP32C2_SPI_USR1_OFFS,
        usr2Offs: ESP32C2_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32C2_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32C2_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32C2_SPI_W0_OFFS,
        uartDateReg: ESP32C2_UART_DATE_REG_ADDR,
        flashOffs: ESP32C2_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP32C3:
      return {
        regBase: ESP32C3_SPI_REG_BASE,
        baseFuse: ESP32C3_BASEFUSEADDR,
        macFuse: ESP32C3_MACFUSEADDR,
        usrOffs: ESP32C3_SPI_USR_OFFS,
        usr1Offs: ESP32C3_SPI_USR1_OFFS,
        usr2Offs: ESP32C3_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32C3_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32C3_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32C3_SPI_W0_OFFS,
        uartDateReg: ESP32C3_UART_DATE_REG_ADDR,
        flashOffs: ESP32C3_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP32C5:
      return {
        regBase: ESP32C5_SPI_REG_BASE,
        baseFuse: ESP32C5_BASEFUSEADDR,
        macFuse: ESP32C5_MACFUSEADDR,
        usrOffs: ESP32C5_SPI_USR_OFFS,
        usr1Offs: ESP32C5_SPI_USR1_OFFS,
        usr2Offs: ESP32C5_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32C5_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32C5_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32C5_SPI_W0_OFFS,
        uartDateReg: ESP32C5_UART_DATE_REG_ADDR,
        flashOffs: ESP32C5_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP32C6:
      return {
        regBase: ESP32C6_SPI_REG_BASE,
        baseFuse: ESP32C6_BASEFUSEADDR,
        macFuse: ESP32C6_MACFUSEADDR,
        usrOffs: ESP32C6_SPI_USR_OFFS,
        usr1Offs: ESP32C6_SPI_USR1_OFFS,
        usr2Offs: ESP32C6_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32C6_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32C6_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32C6_SPI_W0_OFFS,
        uartDateReg: ESP32C6_UART_DATE_REG_ADDR,
        flashOffs: ESP32C6_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP32C61:
      return {
        regBase: ESP32C61_SPI_REG_BASE,
        baseFuse: ESP32C61_BASEFUSEADDR,
        macFuse: ESP32C61_MACFUSEADDR,
        usrOffs: ESP32C61_SPI_USR_OFFS,
        usr1Offs: ESP32C61_SPI_USR1_OFFS,
        usr2Offs: ESP32C61_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32C61_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32C61_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32C61_SPI_W0_OFFS,
        uartDateReg: ESP32C61_UART_DATE_REG_ADDR,
        flashOffs: ESP32C61_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP32H2:
      return {
        regBase: ESP32H2_SPI_REG_BASE,
        baseFuse: ESP32H2_BASEFUSEADDR,
        macFuse: ESP32H2_MACFUSEADDR,
        usrOffs: ESP32H2_SPI_USR_OFFS,
        usr1Offs: ESP32H2_SPI_USR1_OFFS,
        usr2Offs: ESP32H2_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32H2_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32H2_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32H2_SPI_W0_OFFS,
        uartDateReg: ESP32H2_UART_DATE_REG_ADDR,
        flashOffs: ESP32H2_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP32H4:
      return {
        regBase: ESP32H4_SPI_REG_BASE,
        baseFuse: ESP32H4_BASEFUSEADDR,
        macFuse: ESP32H4_MACFUSEADDR,
        usrOffs: ESP32H4_SPI_USR_OFFS,
        usr1Offs: ESP32H4_SPI_USR1_OFFS,
        usr2Offs: ESP32H4_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32H4_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32H4_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32H4_SPI_W0_OFFS,
        uartDateReg: ESP32H4_UART_DATE_REG_ADDR,
        flashOffs: ESP32H4_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP32H21:
      return {
        regBase: ESP32H21_SPI_REG_BASE,
        baseFuse: ESP32H21_BASEFUSEADDR,
        macFuse: ESP32H21_MACFUSEADDR,
        usrOffs: ESP32H21_SPI_USR_OFFS,
        usr1Offs: ESP32H21_SPI_USR1_OFFS,
        usr2Offs: ESP32H21_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32H21_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32H21_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32H21_SPI_W0_OFFS,
        uartDateReg: ESP32H21_UART_DATE_REG_ADDR,
        flashOffs: ESP32H21_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP32P4:
      return {
        regBase: ESP32P4_SPI_REG_BASE,
        baseFuse: ESP32P4_BASEFUSEADDR,
        macFuse: ESP32P4_MACFUSEADDR,
        usrOffs: ESP32P4_SPI_USR_OFFS,
        usr1Offs: ESP32P4_SPI_USR1_OFFS,
        usr2Offs: ESP32P4_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32P4_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32P4_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32P4_SPI_W0_OFFS,
        uartDateReg: ESP32P4_UART_DATE_REG_ADDR,
        flashOffs: ESP32P4_BOOTLOADER_FLASH_OFFSET,
      };
    case CHIP_FAMILY_ESP32S31:
      return {
        regBase: ESP32S31_SPI_REG_BASE,
        baseFuse: ESP32S31_BASEFUSEADDR,
        macFuse: ESP32S31_MACFUSEADDR,
        usrOffs: ESP32S31_SPI_USR_OFFS,
        usr1Offs: ESP32S31_SPI_USR1_OFFS,
        usr2Offs: ESP32S31_SPI_USR2_OFFS,
        mosiDlenOffs: ESP32S31_SPI_MOSI_DLEN_OFFS,
        misoDlenOffs: ESP32S31_SPI_MISO_DLEN_OFFS,
        w0Offs: ESP32S31_SPI_W0_OFFS,
        uartDateReg: ESP32S31_UART_DATE_REG_ADDR,
        flashOffs: ESP32S31_BOOTLOADER_FLASH_OFFSET,
      };
    default:
      return {
        regBase: -1,
        baseFuse: -1,
        macFuse: -1,
        usrOffs: -1,
        usr1Offs: -1,
        usr2Offs: -1,
        mosiDlenOffs: -1,
        misoDlenOffs: -1,
        w0Offs: -1,
        uartDateReg: -1,
        flashOffs: -1,
      };
  }
};

// SLIP 读取错误类
export class SlipReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SlipReadError";
  }
}
