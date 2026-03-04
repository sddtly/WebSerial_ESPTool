/// <reference types="@types/w3c-web-serial" />
import { ESP_ROM_BAUD } from "./const";
import { ESPLoader } from "./esp_loader";
export { ESPLoader } from "./esp_loader";
export { CHIP_FAMILY_ESP32, CHIP_FAMILY_ESP32S2, CHIP_FAMILY_ESP32S3, CHIP_FAMILY_ESP8266, CHIP_FAMILY_ESP32C2, CHIP_FAMILY_ESP32C3, CHIP_FAMILY_ESP32C5, CHIP_FAMILY_ESP32C6, CHIP_FAMILY_ESP32C61, CHIP_FAMILY_ESP32H2, CHIP_FAMILY_ESP32H4, CHIP_FAMILY_ESP32H21, CHIP_FAMILY_ESP32P4, CHIP_FAMILY_ESP32S31, 
// 命令常量
ESP_FLASH_BEGIN, ESP_FLASH_DATA, ESP_FLASH_END, ESP_MEM_BEGIN, ESP_MEM_END, ESP_MEM_DATA, ESP_SYNC, ESP_WRITE_REG, ESP_READ_REG, ESP_ERASE_FLASH, ESP_ERASE_REGION, ESP_READ_FLASH, ESP_SPI_SET_PARAMS, ESP_SPI_ATTACH, ESP_CHANGE_BAUDRATE, ESP_SPI_FLASH_MD5, ESP_GET_SECURITY_INFO, ESP_CHECKSUM_MAGIC, ESP_FLASH_DEFL_BEGIN, ESP_FLASH_DEFL_DATA, ESP_FLASH_DEFL_END, ROM_INVALID_RECV_MSG, 
// 块大小常量
USB_RAM_BLOCK, ESP_RAM_BLOCK, 
// 超时常量
DEFAULT_TIMEOUT, CHIP_ERASE_TIMEOUT, MAX_TIMEOUT, SYNC_TIMEOUT, ERASE_REGION_TIMEOUT_PER_MB, MEM_END_ROM_TIMEOUT, FLASH_READ_TIMEOUT, } from "./const";
export const connect = async (logger) => {
    // - 请求一个端口并打开连接。
    // 尝试使用 requestSerialPort（如果可用，支持 Android 上的 WebUSB）
    let port;
    const customRequestPort = globalThis.requestSerialPort;
    if (typeof customRequestPort === "function") {
        port = await customRequestPort();
    }
    else {
        // 检查 Web Serial API 是否可用
        if (!navigator.serial) {
            throw new Error("当前浏览器不支持 Web Serial API。请使用桌面版的 Chrome、Edge 或 Opera，或 Android 上的 Chrome。注意：页面必须通过 HTTPS 或 localhost 提供服务。");
        }
        port = await navigator.serial.requestPort();
    }
    // 仅在端口未打开时才打开（requestSerialPort 可能返回已打开的端口）
    if (!port.readable || !port.writable) {
        await port.open({ baudRate: ESP_ROM_BAUD });
    }
    return new ESPLoader(port, logger);
};
export const connectWithPort = async (port, logger) => {
    // 使用已打开的端口连接（适用于 WebUSB 包装器）
    if (!port) {
        throw new Error("需要提供端口");
    }
    // 检查端口是否已打开，若未打开则打开
    if (!port.readable || !port.writable) {
        await port.open({ baudRate: ESP_ROM_BAUD });
    }
    return new ESPLoader(port, logger);
};
// 导出供 UI 代码使用的实用函数
export { toHex, sleep, hexFormatter, formatMacAddr } from "./util";
