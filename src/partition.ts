/**
 * ESP32 分区表解析器
 * 基于 ESP-IDF 分区表格式
 */

export interface Partition {
  name: string; // 分区名称
  type: number; // 分区类型值
  subtype: number; // 分区子类型值
  offset: number; // 分区偏移地址
  size: number; // 分区大小
  flags: number; // 标志位
  typeName: string; // 分区类型名称
  subtypeName: string; // 分区子类型名称
}

// 分区类型
const PARTITION_TYPES: { [key: number]: string } = {
  0x00: "app", // 应用程序分区
  0x01: "data", // 数据分区
};

// 应用程序子类型
const APP_SUBTYPES: { [key: number]: string } = {
  0x00: "factory", // 出厂固件
  0x10: "ota_0", // OTA 分区 0
  0x11: "ota_1", // OTA 分区 1
  0x12: "ota_2", // OTA 分区 2
  0x13: "ota_3", // OTA 分区 3
  0x14: "ota_4", // OTA 分区 4
  0x15: "ota_5", // OTA 分区 5
  0x16: "ota_6", // OTA 分区 6
  0x17: "ota_7", // OTA 分区 7
  0x18: "ota_8", // OTA 分区 8
  0x19: "ota_9", // OTA 分区 9
  0x1a: "ota_10", // OTA 分区 10
  0x1b: "ota_11", // OTA 分区 11
  0x1c: "ota_12", // OTA 分区 12
  0x1d: "ota_13", // OTA 分区 13
  0x1e: "ota_14", // OTA 分区 14
  0x1f: "ota_15", // OTA 分区 15
  0x20: "test", // 测试分区
};

// 数据子类型
const DATA_SUBTYPES: { [key: number]: string } = {
  0x00: "ota", // OTA 信息分区
  0x01: "phy", // PHY 初始化数据
  0x02: "nvs", // NVS（非易失性存储）
  0x03: "coredump", // 核心转储分区
  0x04: "nvs_keys", // NVS 加密密钥
  0x05: "efuse", // eFuse 模拟分区
  0x80: "esphttpd", // ESP HTTP 服务器数据
  0x81: "fat", // FAT 文件系统
  0x82: "spiffs", // SPIFFS 文件系统
};

const PARTITION_TABLE_OFFSET = 0x8000; // 默认分区表偏移地址
const PARTITION_ENTRY_SIZE = 32; // 每个分区条目的大小（字节）
const PARTITION_MAGIC = 0x50aa; // 分区表魔数

/**
 * 从二进制数据解析单个分区条目
 */
function parsePartitionEntry(data: Uint8Array): Partition | null {
  if (data.length < PARTITION_ENTRY_SIZE) {
    return null;
  }

  // 检查魔数
  const magic = (data[0] | (data[1] << 8)) & 0xffff;
  if (magic !== PARTITION_MAGIC) {
    return null;
  }

  const type = data[2];
  const subtype = data[3];
  const offset = data[4] | (data[5] << 8) | (data[6] << 16) | (data[7] << 24);
  const size = data[8] | (data[9] << 8) | (data[10] << 16) | (data[11] << 24);

  // 名称起始于偏移12，最大16字节，以null结尾
  let name = "";
  for (let i = 12; i < 28; i++) {
    if (data[i] === 0) break;
    name += String.fromCharCode(data[i]);
  }

  const flags =
    data[28] | (data[29] << 8) | (data[30] << 16) | (data[31] << 24);

  // 获取类型和子类型的名称
  const typeName = PARTITION_TYPES[type] || `unknown(0x${type.toString(16)})`;
  let subtypeName = "";

  if (type === 0x00) {
    subtypeName = APP_SUBTYPES[subtype] || `unknown(0x${subtype.toString(16)})`;
  } else if (type === 0x01) {
    subtypeName =
      DATA_SUBTYPES[subtype] || `unknown(0x${subtype.toString(16)})`;
  } else {
    subtypeName = `0x${subtype.toString(16)}`;
  }

  return {
    name,
    type,
    subtype,
    offset,
    size,
    flags,
    typeName,
    subtypeName,
  };
}

/**
 * 解析整个分区表
 */
export function parsePartitionTable(data: Uint8Array): Partition[] {
  const partitions: Partition[] = [];

  for (let i = 0; i < data.length; i += PARTITION_ENTRY_SIZE) {
    const entryData = data.slice(i, i + PARTITION_ENTRY_SIZE);
    const partition = parsePartitionEntry(entryData);

    if (partition === null) {
      // 到达分区表末尾或遇到无效条目
      break;
    }

    partitions.push(partition);
  }

  return partitions;
}

/**
 * 获取默认的分区表偏移地址
 */
export function getPartitionTableOffset(): number {
  return PARTITION_TABLE_OFFSET;
}

/**
 * 将大小格式化为人类可读的格式
 */
export function formatSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}
