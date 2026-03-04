/**
 * ESP32 分区表解析器
 * 基于 ESP-IDF 分区表格式
 */
export interface Partition {
    name: string;
    type: number;
    subtype: number;
    offset: number;
    size: number;
    flags: number;
    typeName: string;
    subtypeName: string;
}
/**
 * 解析整个分区表
 */
export declare function parsePartitionTable(data: Uint8Array): Partition[];
/**
 * 获取默认的分区表偏移地址
 */
export declare function getPartitionTableOffset(): number;
/**
 * 将大小格式化为人类可读的格式
 */
export declare function formatSize(bytes: number): string;
