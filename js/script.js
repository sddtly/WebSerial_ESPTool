// 导入适用于 Android 的 WebUSB 串行支持
import { WebUSBSerial, requestSerialPort } from './webusb-serial.js';

// 使 requestSerialPort 在全局可用，以便 esptool.js 使用
// 使用防御性赋值避免意外覆盖
if (!globalThis.requestSerialPort) {
  globalThis.requestSerialPort = requestSerialPort;
}

// 从 esptool 模块导入的工具函数
let toHex, formatMacAddr, sleep;

// 从 esptool 包加载工具函数
window.esptoolPackage.then((esptoolMod) => {
  toHex = esptoolMod.toHex;
  formatMacAddr = esptoolMod.formatMacAddr;
  sleep = esptoolMod.sleep;
});

let espStub;
let esp32s2ReconnectInProgress = false;
let currentChipName = null; // 全局存储芯片名称
let currentMacAddr = null; // 全局存储 MAC 地址
let isConnected = false; // 跟踪连接状态
let consoleInstance = null; // ESP32ToolConsole 实例
let baudRateBeforeConsole = null; // 打开控制台前保存波特率
let espLoaderBeforeConsole = null; // 打开控制台前保存原始 ESPLoader
let chipFamilyBeforeConsole = null; // 打开控制台前保存芯片系列
let consoleResetHandler = null;
let consoleCloseHandler = null;

/**
 * 断开连接时清除所有缓存数据和状态
 */
function clearAllCachedData() {

  // 清除分区列表
  partitionList.innerHTML = '';
  partitionList.classList.add('hidden');

  // 再次显示“读取分区表”按钮
  butReadPartitions.classList.remove('hidden');

  // 隐藏 ESP8266 信息（如果存在）
  const esp8266Info = document.getElementById('esp8266Info');
  if (esp8266Info) {
    esp8266Info.classList.add('hidden');
  }
}

const baudRates = [2000000, 1500000, 921600, 500000, 460800, 230400, 153600, 128000, 115200];

const maxLogLength = 100;
const log = document.getElementById("log");
const butConnect = document.getElementById("butConnect");
const baudRateSelect = document.getElementById("baudRate");
const butClear = document.getElementById("butClear");
const butErase = document.getElementById("butErase");
const butProgram = document.getElementById("butProgram");
const butReadFlash = document.getElementById("butReadFlash");
const readOffset = document.getElementById("readOffset");
const readSize = document.getElementById("readSize");
const readProgress = document.getElementById("readProgress");
const butReadPartitions = document.getElementById("butReadPartitions");
const partitionList = document.getElementById("partitionList");
const autoscroll = document.getElementById("autoscroll");
const lightSS = document.getElementById("light");
const darkSS = document.getElementById("dark");
const darkMode = document.getElementById("darkmode");
const debugMode = document.getElementById("debugmode");
const showLog = document.getElementById("showlog");
const firmware = document.querySelectorAll(".upload .firmware input");
const progress = document.querySelectorAll(".upload .progress-bar");
const offsets = document.querySelectorAll(".upload .offset");
const appDiv = document.getElementById("app");

// 移动设备检测
function isMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // 检查移动设备用户代理
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(userAgent);

  // 检查触摸支持
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // 检查屏幕尺寸
  const isSmallScreen = window.innerWidth <= 768;

  return isMobileUA || (hasTouch && isSmallScreen);
}

/**
 * 检测当前是否使用 WebUSB（移动端/Android）还是 Web Serial（桌面端）
 * WebUSB 通常用于 Android 设备
 * Web Serial 用于桌面浏览器
 */
function isUsingWebUSB() {
  // 如果有活动连接，检查端口的 isWebUSB 属性
  if (espStub && espStub.port && typeof espStub.port.isWebUSB !== 'undefined') {
    return espStub.port.isWebUSB === true;
  }

  // 回退：检查是否在移动设备上（可能使用 WebUSB）
  if (isMobileDevice()) {
    return true;
  }

  // 检查 Web Serial 不可用但 USB 可用（仅 WebUSB）
  if (!("serial" in navigator) && "usb" in navigator) {
    return true;
  }

  // 默认为 Web Serial（桌面）
  return false;
}

// 更新移动类和内边距
function updateMobileClasses() {
  const isMobile = isMobileDevice();

  if (isMobile) {
    document.body.classList.add('mobile-device');
    document.body.classList.add('no-hover');
  } else {
    document.body.classList.remove('mobile-device');
    document.body.classList.remove('no-hover');
  }

  // 更新主要内边距以匹配头部高度
  updateMainPadding();
}

// 防抖辅助函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 防抖调整大小处理程序
const debouncedUpdateMobileClasses = debounce(updateMobileClasses, 250);

// 加载时应用移动类
updateMobileClasses();

// 在调整大小和方向变化时更新
window.addEventListener('resize', debouncedUpdateMobileClasses);
window.addEventListener('orientationchange', debouncedUpdateMobileClasses);

document.addEventListener("DOMContentLoaded", () => {
  butConnect.addEventListener("click", () => {
    clickConnect().catch(async (e) => {
      debugMsg('连接错误：' + e);
      errorMsg(e.message || e);
      if (espStub) {
        await espStub.disconnect();
      }
      toggleUIConnected(false);
    });
  });
  butClear.addEventListener("click", clickClear);
  butErase.addEventListener("click", clickErase);
  butProgram.addEventListener("click", clickProgram);
  butReadFlash.addEventListener("click", clickReadFlash);
  butReadPartitions.addEventListener("click", clickReadPartitions);
  for (let i = 0; i < firmware.length; i++) {
    firmware[i].addEventListener("change", checkFirmware);
  }
  for (let i = 0; i < offsets.length; i++) {
    offsets[i].addEventListener("change", checkProgrammable);
  }

  // 初始化上传行的可见性 - 仅显示第一行
  updateUploadRowsVisibility();

  autoscroll.addEventListener("click", clickAutoscroll);
  baudRateSelect.addEventListener("change", changeBaudRate);
  darkMode.addEventListener("click", clickDarkMode);
  debugMode.addEventListener("click", clickDebugMode);
  showLog.addEventListener("click", clickShowLog);
  window.addEventListener("error", function (event) {
    console.log("捕获到未处理的错误：", event.error);
  });

  // 检查 Web Serial 或 WebUSB 支持
  if ("serial" in navigator || "usb" in navigator) {
    const notSupported = document.getElementById("notSupported");
    notSupported.classList.add("hidden");
  }

  initBaudRate();
  loadAllSettings();
  updateTheme();
  logMsg("WebSerial ESPTool 已加载。");

  // 根据头部高度设置主要内边距
  updateMainPadding();
});

function initBaudRate() {
  for (let rate of baudRates) {
    var option = document.createElement("option");
    option.text = rate + " 波特";
    option.value = rate;
    baudRateSelect.add(option);
  }
}

function logMsg(text) {
  log.innerHTML += text + "<br>";

  // 移除旧日志内容
  if (log.textContent.split("\n").length > maxLogLength + 1) {
    let logLines = log.innerHTML.replace(/(\n)/gm, "").split("<br>");
    log.innerHTML = logLines.splice(-maxLogLength).join("<br>\n");
  }

  if (autoscroll.checked) {
    log.scrollTop = log.scrollHeight;
  }
}

/**
 * 当调试模式启用时，将一个或多个调试格式的值附加到应用程序日志中。
 *
 * 将原始值（字符串、数字、布尔值）、`null` 和 `undefined` 格式化为可读文本；
 * 将数组和 `Uint8Array` 元素格式化为十六进制字节（例如 `0x1a`）并放在方括号内；
 * 将其他对象类型记录到浏览器控制台，并记录一条消息指示未处理的类型。
 *
 * @param {...any} args - 要格式化和附加到调试日志的值。第一个参数不加前缀写入；
 *   后续参数不加额外前缀附加。
 */
function debugMsg(...args) {
  if (!debugMode.checked) {
    return;
  }

  let prefix = "";
  for (let arg of args) {
    if (arg === undefined) {
      logMsg(prefix + "undefined");
    } else if (arg === null) {
      logMsg(prefix + "null");
    } else if (typeof arg == "string") {
      logMsg(prefix + arg);
    } else if (typeof arg == "number") {
      logMsg(prefix + arg);
    } else if (typeof arg == "boolean") {
      logMsg(prefix + (arg ? "true" : "false"));
    } else if (Array.isArray(arg)) {
      logMsg(prefix + "[" + arg.map((value) => toHex(value)).join(", ") + "]");
    } else if (typeof arg == "object" && arg instanceof Uint8Array) {
      logMsg(
        prefix +
        "[" +
        Array.from(arg)
          .map((value) => toHex(value))
          .join(", ") +
        "]",
      );
    } else {
      logMsg(prefix + "未处理的参数类型：" + typeof arg);
      console.log(arg);
    }
    prefix = ""; // 仅对第一个参数显示
  }
}

function errorMsg(text) {
  logMsg('<span class="error-message">错误：</span>' + text);
  console.error(text);
}

/**
 * @name updateTheme
 * 设置主题为深色模式。稍后可以重构以支持更多主题
 */
function updateTheme() {
  // 禁用所有主题
  document
    .querySelectorAll("link[rel=stylesheet].alternate")
    .forEach((styleSheet) => {
      enableStyleSheet(styleSheet, false);
    });

  if (darkMode.checked) {
    enableStyleSheet(darkSS, true);
  } else {
    enableStyleSheet(lightSS, true);
  }
}

function enableStyleSheet(node, enabled) {
  node.disabled = !enabled;
}

/**
 * 解析闪存大小字符串（例如“256KB”、“4MB”）为字节数
 * @param {string} sizeStr - 带有单位（KB 或 MB）的闪存大小字符串
 * @returns {number} 字节数
 */
function parseFlashSize(sizeStr) {
  if (!sizeStr || typeof sizeStr !== 'string') {
    return 0;
  }

  // 提取数字和单位
  const match = sizeStr.match(/^(\d+)(KB|MB)$/i);
  if (!match) {
    // 如果没有单位，假设它已经是 MB（旧版行为）
    const num = parseInt(sizeStr);
    return isNaN(num) ? 0 : num * 1024 * 1024;
  }

  const value = parseInt(match[1]);
  const unit = match[2].toUpperCase();

  if (unit === 'KB') {
    return value * 1024; // KB 转字节
  } else if (unit === 'MB') {
    return value * 1024 * 1024; // MB 转字节
  }

  return 0;
}

/**
 * @name clickConnect
 * 连接/断开按钮的点击处理程序。
 */
async function clickConnect() {
  console.log('[clickConnect] 函数被调用');

  if (espStub) {
    console.log('[clickConnect] 已连接，正在断开...');
    // 移除断开连接事件监听器，防止在手动断开时触发
    if (espStub.handleDisconnect) {
      espStub.removeEventListener("disconnect", espStub.handleDisconnect);
    }

    await espStub.disconnect();
    try {
      await espStub.port?.close?.();
    } catch (e) {
      // 忽略重复关闭
    }
    toggleUIConnected(false);
    espStub = undefined;

    // 清除所有缓存数据和状态
    clearAllCachedData();

    return;
  }

  console.log('[clickConnect] 正在获取 esploaderMod...');
  const esploaderMod = await window.esptoolPackage;

  // 平台检测：Android 始终使用 WebUSB，桌面使用 Web Serial
  const userAgent = navigator.userAgent || '';
  const isAndroid = /Android/i.test(userAgent);

  // 仅在调试模式下将平台详情记录到 UI（避免增加指纹识别面）
  if (debugMode.checked) {
    const platformMsg = `平台：${isAndroid ? 'Android' : '桌面'} (UA: ${userAgent.substring(0, 50)}...)`;
    logMsg(platformMsg);
  }
  logMsg(`使用：${isAndroid ? 'WebUSB' : 'Web Serial'}`);

  let esploader;

  if (isAndroid) {
    // Android：直接使用 WebUSB
    console.log('[Connect] 为 Android 使用 WebUSB');
    try {
      const port = await WebUSBSerial.requestPort((...args) => logMsg(...args));
      esploader = await esploaderMod.connectWithPort(port, {
        log: (...args) => logMsg(...args),
        debug: (...args) => debugMsg(...args),
        error: (...args) => errorMsg(...args),
      });
    } catch (err) {
      logMsg(`WebUSB 连接失败：${err.message || err}`);
      throw err;
    }
  } else {
    // 桌面：使用 Web Serial（标准 esptool 连接）
    console.log('[Connect] 为桌面使用 Web Serial');
    esploader = await esploaderMod.connect({
      log: (...args) => logMsg(...args),
      debug: (...args) => debugMsg(...args),
      error: (...args) => errorMsg(...args),
    });
  }

  // 处理 ESP32-S2 Native USB 在浏览器中的重新连接要求
  // 仅当尚未处于重新连接模式时添加监听器
  if (!esp32s2ReconnectInProgress) {
    esploader.addEventListener("esp32s2-usb-reconnect", async () => {
      // 防止递归调用
      if (esp32s2ReconnectInProgress) {
        return;
      }

      esp32s2ReconnectInProgress = true;
      logMsg("检测到 ESP32-S2 Native USB！");
      toggleUIConnected(false);
      const previousStubPort = espStub?.port;
      espStub = undefined;

      try {
        // 先关闭端口
        await esploader.port.close();

        // 使用模态对话框方法
        if (previousStubPort && previousStubPort.readable) {
          await previousStubPort.close();
        }
      } catch (closeErr) {
        // 忽略端口关闭错误
        debugMsg(`端口关闭错误（已忽略）：${closeErr.message}`);
      }

      // 显示模态对话框
      const modal = document.getElementById("esp32s2Modal");
      const reconnectBtn = document.getElementById("butReconnectS2");

      modal.classList.remove("hidden");

      // 处理重新连接按钮点击
      const handleReconnect = async () => {
        modal.classList.add("hidden");
        reconnectBtn.removeEventListener("click", handleReconnect);

        logMsg("请求选择新设备...");

        // 触发端口选择
        try {
          await clickConnect();
          // 成功连接后重置标志
          esp32s2ReconnectInProgress = false;
        } catch (err) {
          errorMsg("重新连接失败：" + err);
          // 出错时重置标志，以便用户重试
          esp32s2ReconnectInProgress = false;
        }
      };
      reconnectBtn.addEventListener("click", handleReconnect);
    });
  }

  try {
    await esploader.initialize();
  } catch (err) {
    // 如果 ESP32-S2 重新连接正在进行（由事件监听器处理），抑制错误
    if (esp32s2ReconnectInProgress) {
      logMsg("ESP32-S2 重新连接中断了初始化。");
      return;
    }

    // 不是 ESP32-S2 或其他错误
    try {
      await esploader.disconnect();
    } catch (disconnectErr) {
      // 忽略断开连接错误
    }
    throw err;
  }

  logMsg("已连接到 " + esploader.chipName);
  logMsg("MAC 地址：" + formatMacAddr(esploader.macAddr()));

  // 全局存储芯片信息
  currentChipName = esploader.chipName;
  currentMacAddr = formatMacAddr(esploader.macAddr());

  espStub = await esploader.runStub();

  toggleUIConnected(true);
  toggleUIToolbar(true);

  // 在读取大小字段中设置检测到的闪存大小
  if (espStub.flashSize) {
    const flashSizeBytes = parseFlashSize(espStub.flashSize);
    readSize.value = "0x" + flashSizeBytes.toString(16);
  }

  // 设置选定的波特率
  let baud = parseInt(baudRateSelect.value);
  if (baudRates.includes(baud)) {
    await espStub.setBaudrate(baud);
  }

  // 存储断开处理程序以便稍后移除
  const handleDisconnect = () => {
    toggleUIConnected(false);
    espStub = false;
  };
  espStub.handleDisconnect = handleDisconnect; // 在 espStub 上存储引用
  espStub.addEventListener("disconnect", handleDisconnect);
}

/**
 * @name changeBaudRate
 * 波特率选择器的更改处理程序。
 */
async function changeBaudRate() {
  saveSetting("baudrate", baudRateSelect.value);
  if (espStub) {
    let baud = parseInt(baudRateSelect.value);
    if (baudRates.includes(baud)) {
      await espStub.setBaudrate(baud);
    }
  }
}

/**
 * @name clickAutoscroll
 * 自动滚动复选框的更改处理程序。
 */
async function clickAutoscroll() {
  saveSetting("autoscroll", autoscroll.checked);
}

/**
 * @name clickDarkMode
 * 深色模式复选框的更改处理程序。
 */
async function clickDarkMode() {
  updateTheme();
  saveSetting("darkmode", darkMode.checked);
}

/**
 * @name clickDebugMode
 * 调试模式复选框的更改处理程序。
 */
async function clickDebugMode() {
  saveSetting("debugmode", debugMode.checked);
  logMsg("调试模式 " + (debugMode.checked ? "已启用" : "已禁用"));
}

/**
 * @name clickShowLog
 * 显示日志复选框的更改处理程序。
 */
async function clickShowLog() {
  saveSetting("showlog", showLog.checked);
  updateLogVisibility();
}

/**
 * @name updateLogVisibility
 * 更新日志和日志控件的可见性
 */
function updateLogVisibility() {
  const logControls = document.querySelector(".log-controls");

  if (showLog.checked) {
    log.classList.remove("hidden");
    if (logControls) {
      logControls.classList.remove("hidden");
    }
  } else {
    log.classList.add("hidden");
    if (logControls) {
      logControls.classList.add("hidden");
    }
  }
}

/**
 * @name updateMainPadding
 * 根据头部高度动态调整主要内容内边距
 */
function updateMainPadding() {
  // 使用 requestAnimationFrame 确保 DOM 已更新
  requestAnimationFrame(() => {
    const header = document.querySelector('.header');
    const main = document.querySelector('.main');

    // 防止缺少元素
    if (!header || !main) {
      return;
    }

    const headerHeight = header.offsetHeight;
    // 添加小缓冲区（10px）以获得更好的间距
    main.style.paddingTop = (headerHeight + 10) + 'px';
  });
}

/**
 * @name clickErase
 * 擦除按钮的点击处理程序。
 */
async function clickErase() {
  if (
    window.confirm("这将擦除整个闪存。点击确定继续。")
  ) {
    butErase.disabled = true;
    butProgram.disabled = true;
    try {
      logMsg("正在擦除闪存，请稍候...");
      let stamp = Date.now();
      await espStub.eraseFlash();
      logMsg("完成。擦除耗时 " + (Date.now() - stamp) + " 毫秒。");
    } catch (e) {
      errorMsg(e);
    } finally {
      butErase.disabled = false;
      baudRateSelect.disabled = false;
      butProgram.disabled = getValidFiles().length == 0;
    }
  }
}

/**
 * @name clickProgram
 * 编程按钮的点击处理程序。
 */
async function clickProgram() {
  const readUploadedFileAsArrayBuffer = (inputFile) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("解析输入文件时出现问题。"));
      };

      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(inputFile);
    });
  };

  baudRateSelect.disabled = true;
  butErase.disabled = true;
  butProgram.disabled = true;
  for (let i = 0; i < firmware.length; i++) {
    firmware[i].disabled = true;
    offsets[i].disabled = true;
  }
  for (let file of getValidFiles()) {
    progress[file].classList.remove("hidden");
    let binfile = firmware[file].files[0];
    let contents = await readUploadedFileAsArrayBuffer(binfile);
    try {
      let offset = parseInt(offsets[file].value, 16);
      const progressBar = progress[file].querySelector("div");
      await espStub.flashData(
        contents,
        (bytesWritten, totalBytes) => {
          progressBar.style.width =
            Math.floor((bytesWritten / totalBytes) * 100) + "%";
        },
        offset,
      );
      await sleep(100);
    } catch (e) {
      errorMsg(e);
    }
  }
  for (let i = 0; i < firmware.length; i++) {
    firmware[i].disabled = false;
    offsets[i].disabled = false;
    progress[i].classList.add("hidden");
    progress[i].querySelector("div").style.width = "0";
  }
  butErase.disabled = false;
  baudRateSelect.disabled = false;
  butProgram.disabled = getValidFiles().length == 0;
  logMsg("要运行新固件，请重置您的设备。");
}

function getValidFiles() {
  // 获取文件和偏移列表
  // 用于检查是否有有效内容
  // 并返回要编程的文件列表
  let validFiles = [];
  let offsetVals = [];
  for (let i = 0; i < firmware.length; i++) {
    let offs = parseInt(offsets[i].value, 16);
    if (firmware[i].files.length > 0 && !offsetVals.includes(offs)) {
      validFiles.push(i);
      offsetVals.push(offs);
    }
  }
  return validFiles;
}

/**
 * @name checkProgrammable
 * 检查编程设备条件是否充足
 */
async function checkProgrammable() {
  butProgram.disabled = getValidFiles().length == 0;
}

/**
 * @name checkFirmware
 * 固件上传更改的处理程序
 */
async function checkFirmware(event) {
  let filename = event.target.value.split("\\").pop();
  let label = event.target.parentNode.querySelector("span");
  let icon = event.target.parentNode.querySelector("svg");
  if (filename != "") {
    label.innerHTML = filename;
    icon.classList.add("hidden");
  } else {
    label.innerHTML = "选择文件…";
    icon.classList.remove("hidden");
  }

  await checkProgrammable();
  updateUploadRowsVisibility();
}

/**
 * @name updateUploadRowsVisibility
 * 动态显示/隐藏上传行 - 仅用于闪存写入部分
 */
function updateUploadRowsVisibility() {
  const uploadRows = document.querySelectorAll(".upload");
  let lastFilledIndex = -1;

  // 查找最后一个已填充的行
  for (let i = 0; i < firmware.length; i++) {
    if (firmware[i].files.length > 0) {
      lastFilledIndex = i;
    }
  }

  // 显示直到 lastFilledIndex + 1 的行（下一个空行），最少显示 1 行
  for (let i = 0; i < uploadRows.length; i++) {
    if (i <= lastFilledIndex + 1) {
      uploadRows[i].style.display = "flex";
    } else {
      uploadRows[i].style.display = "none";
    }
  }
}

/**
 * @name clickReadFlash
 * 读取闪存按钮的点击处理程序。
 */
async function clickReadFlash() {
  const offset = parseInt(readOffset.value, 16);
  const size = parseInt(readSize.value, 16);

  if (isNaN(offset) || isNaN(size) || size <= 0) {
    errorMsg("无效的偏移或大小值");
    return;
  }

  // 提示用户输入文件名
  const defaultFilename = `flash_0x${offset.toString(16)}_0x${size.toString(16)}.bin`;
  const filename = prompt(`输入闪存数据的文件名：`, defaultFilename);

  // 用户取消
  if (filename === null) {
    return;
  }

  // 用户输入空字符串
  if (filename.trim() === "") {
    errorMsg("文件名不能为空");
    return;
  }

  butErase.disabled = true;
  butProgram.disabled = true;
  butReadFlash.disabled = true;
  readOffset.disabled = true;
  readSize.disabled = true;
  readProgress.classList.remove("hidden");

  try {
    const progressBar = readProgress.querySelector("div");

    const data = await espStub.readFlash(
      offset,
      size,
      (packet, progress, totalSize) => {
        progressBar.style.width =
          Math.floor((progress / totalSize) * 100) + "%";
      }
    );

    logMsg(`成功从闪存读取 ${data.length} 字节`);

    // 使用用户指定的文件名创建下载链接
    const blob = new Blob([data], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    logMsg(`闪存数据已下载为“${filename}”`);
  } catch (e) {
    errorMsg("读取闪存失败：" + e);
  } finally {
    readProgress.classList.add("hidden");
    readProgress.querySelector("div").style.width = "0";
    butErase.disabled = false;
    baudRateSelect.disabled = false;
    butProgram.disabled = getValidFiles().length == 0;
    butReadFlash.disabled = false;
    readOffset.disabled = false;
    readSize.disabled = false;
  }
}

/**
 * @name clickReadPartitions
 * 读取分区表按钮的点击处理程序。
 */
async function clickReadPartitions() {
  const PARTITION_TABLE_OFFSET = 0x8000;
  const PARTITION_TABLE_SIZE = 0x1000; // 读取 4KB 以获取所有分区

  butReadPartitions.disabled = true;
  butErase.disabled = true;
  butProgram.disabled = true;
  butReadFlash.disabled = true;

  try {
    logMsg("正在从 0x8000 读取分区表...");

    const data = await espStub.readFlash(PARTITION_TABLE_OFFSET, PARTITION_TABLE_SIZE);

    const partitions = parsePartitionTable(data);

    if (partitions.length === 0) {
      errorMsg("未找到有效的分区表");
      return;
    }

    logMsg(`找到 ${partitions.length} 个分区`);

    // 显示分区
    displayPartitions(partitions);

  } catch (e) {
    errorMsg("读取分区表失败：" + e);
  } finally {
    butReadPartitions.disabled = false;
    butErase.disabled = false;
    butProgram.disabled = getValidFiles().length == 0;
    butReadFlash.disabled = false;
  }
}

/**
 * 从二进制数据解析分区表
 */
function parsePartitionTable(data) {
  const PARTITION_MAGIC = 0x50aa;
  const PARTITION_ENTRY_SIZE = 32;
  const partitions = [];

  for (let i = 0; i < data.length; i += PARTITION_ENTRY_SIZE) {
    const magic = data[i] | (data[i + 1] << 8);

    if (magic !== PARTITION_MAGIC) {
      break; // 分区表结束
    }

    const type = data[i + 2];
    const subtype = data[i + 3];
    const offset = data[i + 4] | (data[i + 5] << 8) | (data[i + 6] << 16) | (data[i + 7] << 24);
    const size = data[i + 8] | (data[i + 9] << 8) | (data[i + 10] << 16) | (data[i + 11] << 24);

    // 读取名称（16 字节，空终止）
    let name = "";
    for (let j = 12; j < 28; j++) {
      if (data[i + j] === 0) break;
      name += String.fromCharCode(data[i + j]);
    }

    const flags = data[i + 28] | (data[i + 29] << 8) | (data[i + 30] << 16) | (data[i + 31] << 24);

    // 获取类型名称
    const typeNames = { 0x00: "app", 0x01: "data" };
    const appSubtypes = {
      0x00: "factory", 0x10: "ota_0", 0x11: "ota_1", 0x12: "ota_2",
      0x13: "ota_3", 0x14: "ota_4", 0x15: "ota_5", 0x20: "test"
    };
    const dataSubtypes = {
      0x00: "ota", 0x01: "phy", 0x02: "nvs", 0x03: "coredump",
      0x04: "nvs_keys", 0x05: "efuse", 0x81: "fat", 0x82: "spiffs"
    };

    const typeName = typeNames[type] || `0x${type.toString(16)}`;
    let subtypeName = "";
    if (type === 0x00) {
      subtypeName = appSubtypes[subtype] || `0x${subtype.toString(16)}`;
    } else if (type === 0x01) {
      subtypeName = dataSubtypes[subtype] || `0x${subtype.toString(16)}`;
    } else {
      subtypeName = `0x${subtype.toString(16)}`;
    }

    partitions.push({
      name,
      type,
      subtype,
      offset,
      size,
      flags,
      typeName,
      subtypeName
    });
  }

  return partitions;
}

/**
 * 在 UI 中显示分区
 */
function displayPartitions(partitions) {
  partitionList.innerHTML = "";
  partitionList.classList.remove("hidden");

  // 成功读取后隐藏“读取分区表”按钮
  butReadPartitions.classList.add("hidden");

  const table = document.createElement("table");
  table.className = "partition-table-display";

  // 表头
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["名称", "类型", "子类型", "偏移", "大小", "操作"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // 表体
  const tbody = document.createElement("tbody");
  partitions.forEach(partition => {
    const row = document.createElement("tr");

    // 名称
    const nameCell = document.createElement("td");
    nameCell.setAttribute("data-label", "名称");
    nameCell.textContent = partition.name;
    row.appendChild(nameCell);

    // 类型
    const typeCell = document.createElement("td");
    typeCell.setAttribute("data-label", "类型");
    typeCell.textContent = partition.typeName;
    row.appendChild(typeCell);

    // 子类型
    const subtypeCell = document.createElement("td");
    subtypeCell.setAttribute("data-label", "子类型");
    subtypeCell.textContent = partition.subtypeName;
    row.appendChild(subtypeCell);

    // 偏移
    const offsetCell = document.createElement("td");
    offsetCell.setAttribute("data-label", "偏移");
    offsetCell.textContent = `0x${partition.offset.toString(16)}`;
    row.appendChild(offsetCell);

    // 大小
    const sizeCell = document.createElement("td");
    sizeCell.setAttribute("data-label", "大小");
    sizeCell.textContent = formatSize(partition.size);
    row.appendChild(sizeCell);

    // 操作
    const actionCell = document.createElement("td");
    actionCell.setAttribute("data-label", "操作");
    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "下载";
    downloadBtn.className = "partition-download-btn";
    downloadBtn.onclick = () => downloadPartition(partition);
    actionCell.appendChild(downloadBtn);
    row.appendChild(actionCell);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  partitionList.appendChild(table);
}

/**
 * 下载分区
 */
async function downloadPartition(partition) {
  // 提示用户输入文件名
  const defaultFilename = `${partition.name}_0x${partition.offset.toString(16)}.bin`;
  const filename = prompt(
    `输入分区“${partition.name}”的文件名：`,
    defaultFilename
  );

  // 用户取消
  if (filename === null) {
    return;
  }

  // 用户输入空字符串
  if (filename.trim() === "") {
    errorMsg("文件名不能为空");
    return;
  }

  const partitionProgress = document.getElementById("partitionProgress");
  const progressBar = partitionProgress.querySelector("div");

  try {
    partitionProgress.classList.remove("hidden");
    progressBar.style.width = "0%";

    logMsg(
      `正在下载分区“${partition.name}”（${formatSize(partition.size)}）...`
    );

    const data = await espStub.readFlash(
      partition.offset,
      partition.size,
      (packet, progress, totalSize) => {
        const percent = Math.floor((progress / totalSize) * 100);
        progressBar.style.width = percent + "%";
      }
    );

    // 使用用户指定的文件名创建下载
    const blob = new Blob([data], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    logMsg(`分区“${partition.name}”已下载为“${filename}”`);
  } catch (e) {
    errorMsg(`下载分区失败：${e}`);
  } finally {
    partitionProgress.classList.add("hidden");
    progressBar.style.width = "0%";
  }
}

/**
 * 以人类可读格式格式化大小
 */
function formatSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}

/**
 * @name clickClear
 * 清除按钮的点击处理程序。
 */
async function clickClear() {
// reset();     reset 函数未声明。
  log.innerHTML = "";
}

function convertJSON(chunk) {
  try {
    let jsonObj = JSON.parse(chunk);
    return jsonObj;
  } catch (e) {
    return chunk;
  }
}

function toggleUIToolbar(show) {
  isConnected = show;
  for (let i = 0; i < progress.length; i++) {
    progress[i].classList.add("hidden");
    progress[i].querySelector("div").style.width = "0";
  }
  if (show) {
    appDiv.classList.add("connected");
  } else {
    appDiv.classList.remove("connected");
  }
  butErase.disabled = !show;
  butReadFlash.disabled = !show;
  butReadPartitions.disabled = !show;
}

function toggleUIConnected(connected) {
  let lbl = "连接";
  const header = document.querySelector(".header");
  const main = document.querySelector(".main");

  if (connected) {
    lbl = "断开连接";
    isConnected = true;

  } else {
    isConnected = false;
    toggleUIToolbar(false);
  }
  butConnect.textContent = lbl;
}

function loadAllSettings() {
  // 加载所有保存的设置或默认值
  autoscroll.checked = loadSetting("autoscroll", true);
  baudRateSelect.value = loadSetting("baudrate", 2000000);
  darkMode.checked = loadSetting("darkmode", false);
  debugMode.checked = loadSetting("debugmode", false);
  showLog.checked = loadSetting("showlog", false);

  // 应用显示日志设置
  updateLogVisibility();
}

function loadSetting(setting, defaultValue) {
  let value = JSON.parse(window.localStorage.getItem(setting));
  if (value == null) {
    return defaultValue;
  }

  return value;
}

function saveSetting(setting, value) {
  window.localStorage.setItem(setting, JSON.stringify(value));
}

function ucWords(text) {
  return text
    .replace("_", " ")
    .toLowerCase()
    .replace(/(?<= )[^\s]|^./g, (a) => a.toUpperCase());
}