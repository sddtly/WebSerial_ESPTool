/**
 * @name toByteArray
 * 将字符串转换为字节数组
 */
function toByteArray(str) {
  let byteArray = [];
  for (let i = 0; i < str.length; i++) {
    let charcode = str.charCodeAt(i);
    if (charcode <= 0xff) {
      byteArray.push(charcode);
    }
  }
  return byteArray;
}

/**
 * @name fromByteArray
 * 将字节数组转换为字符串
 */
function fromByteArray(byteArray) {
  return String.fromCharCode.apply(String, byteArray);
}

/**
 * @name crc32
 * 计算 CRC32 校验和
 * @param {Array|string} data - 输入数据（数组或字符串）
 * @param {number} value - 初始值（默认为 0）
 * @returns {number} CRC32 值
 */
function crc32(data, value = 0) {
  if (data instanceof Array) {
    data = fromByteArray(data);
  }
  let table = [];
  for (let entry, c = 0; c < 256; c++) {
    entry = c;
    for (let k = 0; k < 8; k++) {
      entry = 1 & entry ? 3988292384 ^ (entry >>> 1) : entry >>> 1;
    }
    table[c] = entry;
  }
  let n = -1 - value;
  for (let t = 0; t < data.length; t++) {
    n = (n >>> 8) ^ table[255 & (n ^ data.charCodeAt(t))];
  }
  return (-1 ^ n) >>> 0;
}

/**
 * @name zipLongest
 * 将多个数组按最长长度对齐组合，类似于 Python 的 zip_longest
 * @param {...Array} arrays - 输入的数组列表
 * @returns {Array} 组合后的数组，每个元素是一个包含所有数组对应位置值的数组，缺失部分为 undefined
 */
function zipLongest() {
  var args = [].slice.call(arguments);
  var longest = args.reduce(function (a, b) {
    return a.length > b.length ? a : b;
  }, []);

  return longest.map(function (_, i) {
    return args.map(function (array) {
      return array[i];
    });
  });
}

/**
 * @class struct
 * 模拟 Python 的 struct 模块，支持打包（pack）和解包（unpack）二进制数据
 */
class struct {
  // 查找表，包含类型字符对应的数据视图方法及字节数
  static lut = {
    b: {
      u: DataView.prototype.getInt8,
      p: DataView.prototype.setInt8,
      bytes: 1,
    },
    B: {
      u: DataView.prototype.getUint8,
      p: DataView.prototype.setUint8,
      bytes: 1,
    },
    h: {
      u: DataView.prototype.getInt16,
      p: DataView.prototype.setInt16,
      bytes: 2,
    },
    H: {
      u: DataView.prototype.getUint16,
      p: DataView.prototype.setUint16,
      bytes: 2,
    },
    i: {
      u: DataView.prototype.getInt32,
      p: DataView.prototype.setInt32,
      bytes: 4,
    },
    I: {
      u: DataView.prototype.getUint32,
      p: DataView.prototype.setUint32,
      bytes: 4,
    },
    q: {
      u: DataView.prototype.getInt64,
      p: DataView.prototype.setInt64,
      bytes: 8,
    },
    Q: {
      u: DataView.prototype.getUint64,
      p: DataView.prototype.setUint64,
      bytes: 8,
    },
  };

  /**
   * @name pack
   * 将数据按格式打包为字节数组
   * @param {string} format - 格式字符串，例如 "<II" 表示小端两个无符号整数
   * @param {...number} args - 要打包的数据
   * @returns {number[]} 字节数组
   */
  static pack(...args) {
    let format = args[0];
    let pointer = 0;
    let data = args.slice(1);
    if (format.replace(/[<>]/, "").length != data.length) {
      throw "打包格式与参数个数不匹配";
      return;
    }
    let bytes = [];
    let littleEndian = true;
    for (let i = 0; i < format.length; i++) {
      if (format[i] == "<") {
        littleEndian = true;
      } else if (format[i] == ">") {
        littleEndian = false;
      } else {
        pushBytes(format[i], data[pointer]);
        pointer++;
      }
    }

    function pushBytes(formatChar, value) {
      if (!(formatChar in struct.lut)) {
        throw "打包格式中包含未处理的字符 '" + formatChar + "'";
      }
      let dataSize = struct.lut[formatChar].bytes;
      let view = new DataView(new ArrayBuffer(dataSize));
      let dataViewFn = struct.lut[formatChar].p.bind(view);
      dataViewFn(0, value, littleEndian);
      for (let i = 0; i < dataSize; i++) {
        bytes.push(view.getUint8(i));
      }
    }

    return bytes;
  }

  /**
   * @name unpack
   * 从字节数组中按格式解包数据
   * @param {string} format - 格式字符串
   * @param {number[]} bytes - 字节数组
   * @returns {number[]} 解包后的数值数组
   */
  static unpack(format, bytes) {
    let pointer = 0;
    let data = [];
    let littleEndian = true;

    for (let c of format) {
      if (c == "<") {
        littleEndian = true;
      } else if (c == ">") {
        littleEndian = false;
      } else {
        pushData(c);
      }
    }

    function pushData(formatChar) {
      if (!(formatChar in struct.lut)) {
        throw "解包格式中包含未处理的字符 '" + formatChar + "'";
      }
      let dataSize = struct.lut[formatChar].bytes;
      let view = new DataView(new ArrayBuffer(dataSize));
      for (let i = 0; i < dataSize; i++) {
        view.setUint8(i, bytes[pointer + i] & 0xff);
      }
      let dataViewFn = struct.lut[formatChar].u.bind(view);
      data.push(dataViewFn(0, littleEndian));
      pointer += dataSize;
    }

    return data;
  }

  /**
   * @name calcsize
   * 计算给定格式字符串对应的字节大小
   * @param {string} format - 格式字符串
   * @returns {number} 字节数
   */
  static calcsize(format) {
    let size = 0;
    for (let i = 0; i < format.length; i++) {
      if (format[i] != "<" && format[i] != ">") {
        size += struct.lut[format[i]].bytes;
      }
    }

    return size;
  }
}

/**
 * @name makeFileIterator
 * 创建一个生成器，按行迭代字符串内容（类似文件按行读取）
 * @param {string} content - 要迭代的字符串内容
 * @yields {string} 每一行的内容（已去除首尾空白）
 */
function* makeFileIterator(content) {
  for (let line of content.split(/\r?\n/)) {
    yield line.trim();
  }
  return "";
}