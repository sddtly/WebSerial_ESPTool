/**
 * @name slipEncode
 * 接收一个数组缓冲区，并返回一个新数组，其中
 * 0xdb 被替换为 0xdb 0xdd，0xc0 被替换为 0xdb 0xdc
 */
export const slipEncode = (buffer) => {
    let encoded = [0xc0];
    for (const byte of buffer) {
        if (byte == 0xdb) {
            encoded = encoded.concat([0xdb, 0xdd]);
        }
        else if (byte == 0xc0) {
            encoded = encoded.concat([0xdb, 0xdc]);
        }
        else {
            encoded.push(byte);
        }
    }
    encoded.push(0xc0);
    return encoded;
};
/**
 * @name toByteArray
 * 将字符串转换为字节数组
 */
export const toByteArray = (str) => {
    const byteArray = [];
    for (let i = 0; i < str.length; i++) {
        const charcode = str.charCodeAt(i);
        if (charcode <= 0xff) {
            byteArray.push(charcode);
        }
    }
    return byteArray;
};
export const hexFormatter = (bytes) => "[" + bytes.map((value) => toHex(value)).join(", ") + "]";
export const toHex = (value, size = 2) => {
    const hex = value.toString(16).toUpperCase();
    if (hex.startsWith("-")) {
        return "-0x" + hex.substring(1).padStart(size, "0");
    }
    else {
        return "0x" + hex.padStart(size, "0");
    }
};
/**
 * 将MAC地址数组格式化为字符串（例如：[0xAA, 0xBB, 0xCC] -> "AA:BB:CC:DD:EE:FF"）
 */
export const formatMacAddr = (macAddr) => {
    return macAddr
        .map((value) => value.toString(16).toUpperCase().padStart(2, "0"))
        .join(":");
};
/**
 * @name padTo
 * 使用给定的填充字节（默认为0xFF）将数据填充到下一个对齐边界
 */
export function padTo(data, alignment, padCharacter = 0xff) {
    const padMod = data.length % alignment;
    if (padMod !== 0) {
        const padding = new Uint8Array(alignment - padMod).fill(padCharacter);
        const paddedData = new Uint8Array(data.length + padding.length);
        paddedData.set(data);
        paddedData.set(padding, data.length);
        return paddedData;
    }
    return data;
}
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
