# 项目状态与路线图

Chrome 插件 **api-recorder** + 后端 **api-test-platform** 组成「录制 → AI 入库 → Web 管理 → 执行」闭环。

## 当前架构（精简后）

```
扩展图标(popup) → content 抽屉 → page-hook 抓包
                ↘ background/sw 状态
                ↘ POST /api/v1/ai/ingest → 平台 SQLite
Web (Vue3)      → 同域 API 管理 / 场景 / 报告
```

已移除：popup1/popup2、MeterSphere、chrome.debugger、插件内直连大模型。

---

## 已完成功能

| 模块 | 能力 |
|------|------|
| 插件录制 | XHR/Fetch、暂停/继续/停止、多选批量保存接口、保存场景 |
| 插件 UI | 右侧抽屉、整页详情、平台配置弹窗、登录式 Token（平台 Web） |
| 平台 API | AI 入库、目录树、单接口/场景执行、报告 |
| 平台 Web | 登录页、接口定义/场景/报告三页、Trex/Edgen/example 三项目 |
| 数据 | 断言 expected 兼容 bool/number 解析 |

---

## 待完成（建议优先级）

### P0 — 核心闭环

1. **Web 接口编辑**：新建/编辑接口、断言、Headers（目前只读 + 删除）
2. **Web 场景编辑**：步骤顺序、关联 API、变量提取规则可视化
3. **插件 ↔ 平台默认项目**：记住上次选择的 Trex/Edgen/example
4. **执行报告详情**：点击步骤展示请求/响应快照（报告页仅部分展示）

### P1 — 体验与稳定

5. **平台 Web 批量操作**：多选删除接口、批量执行
6. **AI 入库进度**：长时间请求显示 loading / 超时提示优化
7. **环境变量 UI**：管理 `environments.variables` JSON
8. **集成测试 CI**：`integration-test.sh` 纳入 GitHub Actions（可选）

### P2 — 工程化

9. **插件依赖升级**：Element Plus 2.x、减小 drawer 包体积（当前未 minify）
10. **平台迁移合并**：003/004 可合并为单一 products 迁移（新库无历史负担时）
11. **统一 README**：两仓库交叉链接、端口 8081、seed 步骤一处说明

---

## 可优化项（非阻塞）

| 项 | 说明 |
|----|------|
| 插件 `npm` 依赖 | 已去掉 jquery / axios / markdown-it / hotReload |
| 导出 JSON 命名 | `formatExportJson` 替代旧 MeterSphere 命名 |
| `dist/` 提交策略 | 建议只提交源码，CI 构建 dist；或文档注明需本地 build |
| Web `element-plus` 分包 | Vite manualChunks 降低首屏 1.2MB |
| 平台 `completeLegacy` AI 客户端 | 若只用 compatible-mode 可删 legacy 分支 |
| fixtures | `ingest-api-ad.json` 等仍用旧「项目A」语义，仅测试用 |

---

## 运维命令速查

```bash
# 插件
cd api-recorder && npm run build

# 平台
cd api-test-platform && ./scripts/seed.sh && ./scripts/build-web.sh
go run ./cmd/server   # http://localhost:8081
```
