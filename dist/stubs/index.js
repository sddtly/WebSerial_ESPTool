import { CHIP_FAMILY_ESP32, CHIP_FAMILY_ESP32S2, CHIP_FAMILY_ESP32S3, CHIP_FAMILY_ESP8266, CHIP_FAMILY_ESP32C2, CHIP_FAMILY_ESP32C3, CHIP_FAMILY_ESP32C5, CHIP_FAMILY_ESP32C6, CHIP_FAMILY_ESP32C61, CHIP_FAMILY_ESP32H2, CHIP_FAMILY_ESP32H4, CHIP_FAMILY_ESP32H21, CHIP_FAMILY_ESP32P4, CHIP_FAMILY_ESP32S31 } from "../const";
import { toByteArray } from "../util";
export const getStubCode = async (chipFamily, chipRevision) => {
    let stubcode;
    // 尚无桩代码支持的芯片
    if (chipFamily == CHIP_FAMILY_ESP32H4 ||
        chipFamily == CHIP_FAMILY_ESP32H21 ||
        chipFamily == CHIP_FAMILY_ESP32S31) {
        return null;
    }
    if (chipFamily == CHIP_FAMILY_ESP32) {
        stubcode = await import("./esp32.json");
    }
    else if (chipFamily == CHIP_FAMILY_ESP32S2) {
        stubcode = await import("./esp32s2.json");
    }
    else if (chipFamily == CHIP_FAMILY_ESP32S3) {
        stubcode = await import("./esp32s3.json");
    }
    else if (chipFamily == CHIP_FAMILY_ESP8266) {
        stubcode = await import("./esp8266.json");
    }
    else if (chipFamily == CHIP_FAMILY_ESP32C2) {
        stubcode = await import("./esp32c2.json");
    }
    else if (chipFamily == CHIP_FAMILY_ESP32C3) {
        stubcode = await import("./esp32c3.json");
    }
    else if (chipFamily == CHIP_FAMILY_ESP32C5) {
        stubcode = await import("./esp32c5.json");
    }
    else if (chipFamily == CHIP_FAMILY_ESP32C6) {
        stubcode = await import("./esp32c6.json");
    }
    else if (chipFamily == CHIP_FAMILY_ESP32C61) {
        stubcode = await import("./esp32c61.json");
    }
    else if (chipFamily == CHIP_FAMILY_ESP32H2) {
        stubcode = await import("./esp32h2.json");
    }
    else if (chipFamily == CHIP_FAMILY_ESP32P4) {
        // ESP32-P4：对于版本号 300+ 使用 esp32p4r3.json，旧版本使用 esp32p4.json
        if (chipRevision !== null && chipRevision !== undefined && chipRevision >= 300) {
            stubcode = await import("./esp32p4r3.json");
        }
        else {
            stubcode = await import("./esp32p4.json");
        }
    }
    else {
        // 未知的芯片系列 - 没有可用的桩代码
        return null;
    }
    // 对文本和数据进行 Base64 解码
    return {
        ...stubcode,
        text: toByteArray(atob(stubcode.text)),
        data: toByteArray(atob(stubcode.data)),
    };
};
