# API Recorder

在 **当前 active 的 https 标签页** 录制 XHR / Fetch，右侧抽屉查看并保存到测试平台。

## 录制原理（重要）

- **不再使用 `chrome.debugger`**（页面内有扩展抽屉 iframe 时 Debugger 会报错）
- 向页面 **MAIN 世界注入脚本**，hook `fetch` / `XMLHttpRequest`
- 可多标签：始终录制 **当前窗口正在看的 https 标签**

## 使用

1. `npm run build`，加载 `dist/`
2. 切换到要录制的 **https 标签**（可多开标签，录 active 的那个）
3. 点击扩展图标 → 右侧抽屉
4. **开始录制** → 操作页面 → 列表实时增加（无调试黄条，属正常）
5. **停止** → 勾选 → 保存到平台 / 导出 JSON

## 结构

| 路径 | 作用 |
|------|------|
| `popup/` | 点击图标：tabs.query 锁定 tab，打开抽屉 |
| `content-script/` | 挂抽屉 + 转发页面 hook 消息 |
| `inject/page-hook.js` | 页面内 fetch/XHR 拦截 |
| `drawer/` | 录制 UI |
| `background/sw.js` | 状态与入库 |
| `services/platform-client.js` | 对接 api-test-platform |

配套后端：[api-test-platform](../api-test-platform)（Web 管理 + AI 入库）。

详细路线图见 [docs/PROJECT-STATUS.md](docs/PROJECT-STATUS.md)。
