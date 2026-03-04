/**
 * @name slipEncode
 * 接收一个数组缓冲区，并返回一个新数组，其中
 * 0xdb 被替换为 0xdb 0xdd，0xc0 被替换为 0xdb 0xdc
 */
export declare const slipEncode: (buffer: number[]) => number[];
/**
 * @name toByteArray
 * 将字符串转换为字节数组
 */
export declare const toByteArray: (str: string) => number[];
export declare const hexFormatter: (bytes: number[]) => string;
export declare const toHex: (value: number, size?: number) => string;
/**
 * 将MAC地址数组格式化为字符串（例如：[0xAA, 0xBB, 0xCC] -> "AA:BB:CC:DD:EE:FF"）
 */
export declare const formatMacAddr: (macAddr: number[]) => string;
/**
 * @name padTo
 * 使用给定的填充字节（默认为0xFF）将数据填充到下一个对齐边界
 */
export declare function padTo(data: Uint8Array, alignment: number, padCharacter?: number): Uint8Array;
export declare const sleep: (ms: number) => Promise<unknown>;
