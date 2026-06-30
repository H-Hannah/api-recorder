<template>
  <div class="recorder-drawer">
    <template v-if="screen === 'detail' && detailRow">
      <header class="top-bar top-bar--detail">
        <span class="header-fill"></span>
        <button type="button" class="btn-back btn-back--header" @click="backToList">返回</button>
        <button type="button" class="icon-btn" title="关闭抽屉" @click="closeDrawer">×</button>
      </header>
      <section class="body detail-page">
        <div class="detail-meta">
          <span class="method" :data-m="detailRow.method">{{ detailRow.method }}</span>
          <span class="status" :data-s="statusLevel(detailRow.statusCode)">{{ detailRow.statusCode || '—' }}</span>
        </div>
        <p class="detail-url">{{ detailRow.url }}</p>
        <div class="detail-block">
          <h4>请求头</h4>
          <pre class="code">{{ formatJson(detailRow.requestHeaders) }}</pre>
        </div>
        <div class="detail-block">
          <h4>请求体</h4>
          <pre class="code">{{ formatJson(detailRow.requestBody) }}</pre>
        </div>
        <div class="detail-block">
          <h4>响应体</h4>
          <pre class="code">{{ formatJson(detailRow.responseBody) }}</pre>
        </div>
      </section>
    </template>

    <!-- 列表主界面 -->
    <template v-else>
      <header v-if="phase === 'recording'" class="top-bar top-bar--recording">
        <img src="../../assets/icon48.png" class="brand-icon" alt="" />
        <span class="rec-dot" :class="{ paused: status === 'pause' }"></span>
        <span class="rec-label">{{ status === 'pause' ? '已暂停' : '录制中' }}</span>
        <span class="rec-count">{{ records.length }} 条</span>
        <div class="rec-actions">
          <button v-if="status === 'recording'" type="button" class="btn btn-toolbar btn-warn" @click="send('pause_recording')">暂停</button>
          <button v-else type="button" class="btn btn-toolbar btn-ghost" @click="send('resume_recording')">继续</button>
          <button type="button" class="btn btn-toolbar btn-stop" @click="send('stop_recording')">停止</button>
        </div>
        <button type="button" class="icon-btn" title="关闭" @click="closeDrawer">×</button>
      </header>

      <header v-else-if="phase === 'idle'" class="top-bar top-bar--center">
        <img src="../../assets/icon48.png" class="brand-icon" alt="" />
        <h1 class="title-center">接口录制助手</h1>
        <button type="button" class="icon-btn" title="关闭" @click="closeDrawer">×</button>
      </header>

      <header v-else class="top-bar">
        <img src="../../assets/icon48.png" class="brand-icon" alt="" />
        <span class="brand-name">录制结果 · {{ records.length }}</span>
        <button type="button" class="btn btn-ghost btn-header" @click="newSession">新录制</button>
        <button type="button" class="icon-btn" title="关闭" @click="closeDrawer">×</button>
      </header>

      <section v-if="phase === 'idle'" class="body body-idle">
        <div class="hero-card">
          <p class="hero-title">录制当前页面接口</p>
          <p class="hero-sub">仅捕获 XHR / Fetch · 录制正在查看的标签页</p>
          <div class="devtools-warn" role="alert">
            <strong>请勿打开 DevTools</strong>
            <span>打开开发者工具会干扰页面 Hook，可能导致漏录或录不到真实请求。</span>
          </div>
          <button type="button" class="btn btn-primary btn-block" :disabled="starting" @click="startRecording">
            {{ starting ? '启动中…' : '开始录制' }}
          </button>
        </div>
      </section>

      <section v-else-if="phase === 'recording'" class="body body-list">
        <div v-if="!records.length" class="empty">在页面操作后，接口将显示在这里</div>
        <div
          v-for="(item, idx) in records"
          :key="item.requestId || idx"
          class="row"
          :class="{ 'row-saved': isRecordSaved(item) }"
          @click="viewDetail(item)"
        >
          <span class="method" :data-m="item.method">{{ item.method }}</span>
          <span class="path" :title="item.url">{{ item.path || item.url }}</span>
          <span v-if="isRecordSaved(item)" class="saved-badge">已入库</span>
          <span class="status" :data-s="statusLevel(item.statusCode)">{{ item.statusCode || '…' }}</span>
          <span class="row-arrow">›</span>
        </div>
      </section>

      <section v-else class="body body-review">
        <div class="action-bar">
          <button type="button" class="btn btn-sm" @click="showPlatformConfig">平台配置</button>
          <button type="button" class="btn btn-sm btn-primary" :disabled="selectedRows.length < 1" @click="openIngest('api')">
            保存接口
          </button>
          <button
            type="button"
            class="btn btn-sm btn-accent"
            :disabled="!canSaveCases"
            @click="openIngest('api_cases')"
          >
            保存用例
          </button>
          <button type="button" class="btn btn-sm btn-warn" :disabled="selectedRows.length < 2" @click="openIngest('scenario')">
            保存场景
          </button>
        </div>
        <p class="hint">已选 {{ selectedRows.length }} 条 · 先「保存接口」再「保存用例」· 点击行查看详情</p>
        <div class="list-toolbar">
          <label class="select-all">
            <input
              ref="selectAllChk"
              type="checkbox"
              class="chk"
              :checked="allFilteredSelected"
              :disabled="!filteredRecords.length"
              @change="toggleSelectAll"
            />
            <span>全选</span>
          </label>
          <input
            v-model.trim="filterText"
            type="search"
            class="filter-input"
            placeholder="筛选 method、path、URL、状态码…"
          />
          <span v-if="filterText" class="filter-count">{{ filteredRecords.length }}/{{ records.length }}</span>
        </div>
        <div class="list-scroll">
          <div v-if="!filteredRecords.length" class="empty empty--filter">
            {{ filterText ? '无匹配记录，请调整筛选条件' : '暂无记录' }}
          </div>
          <div
            v-for="(item, idx) in filteredRecords"
            :key="item.requestId || idx"
            class="row row-select"
            :class="{ on: isSelected(item), 'row-saved': isRecordSaved(item) }"
            @click="onReviewRowClick(item, $event)"
          >
            <input type="checkbox" class="chk" :checked="isSelected(item)" @click.stop @change="toggleSelect(item)" />
            <span class="method" :data-m="item.method">{{ item.method }}</span>
            <span class="path" :title="item.url">{{ item.path || item.url }}</span>
            <span v-if="isRecordSaved(item)" class="saved-badge">已入库</span>
            <span class="row-arrow">›</span>
          </div>
        </div>
      </section>
    </template>

    <el-dialog
      v-model="platformConfigVisible"
      title="配置测试平台"
      width="340px"
      :close-on-click-modal="false"
      align-center
      class="app-dialog platform-dialog"
    >
      <PlatformConfig @save-success="onPlatformConfigSaved" />
    </el-dialog>

    <PlatformIngestDialog
      :visible="ingestDialogVisible"
      :mode="ingestMode"
      :record-count="pendingIngestRecords.length"
      :loading="ingesting"
      @confirm="handlePlatformIngest"
      @cancel="ingestDialogVisible = false"
    />
  </div>
</template>

<script>
/* global chrome */
import PlatformConfig from './PlatformConfig.vue'
import PlatformIngestDialog from './PlatformIngestDialog.vue'
import * as PlatformClient from '../../services/platform-client.js'
import { notifyIngestResult } from '../../utils/notify.js'
import { loadSavedMarks, markRecordsSaved, isRecordSaved as checkRecordSaved, getRecordApiId } from '../../utils/savedMarks.js'

export default {
  name: 'RecorderDrawer',
  components: { PlatformConfig, PlatformIngestDialog },
  data() {
    const q = new URLSearchParams(window.location.search)
    const tid = parseInt(q.get('tabId'), 10)
    return {
      hostTabId: Number.isFinite(tid) ? tid : null,
      screen: 'list',
      detailRow: null,
      status: 'stopped',
      records: [],
      selectedRows: [],
      filterText: '',
      starting: false,
      platformConfigVisible: false,
      platformConfig: null,
      platformProjects: [],
      ingestDialogVisible: false,
      ingestMode: 'api',
      pendingIngestRecords: [],
      ingesting: false,
      savedMarks: { requestIds: {}, fingerprints: {} }
    }
  },
  computed: {
    phase() {
      if (this.status === 'recording' || this.status === 'pause') return 'recording'
      if (this.records.length && this.status === 'stopped') return 'review'
      return 'idle'
    },
    filteredRecords() {
      const q = (this.filterText || '').trim().toLowerCase()
      if (!q) return this.records
      return this.records.filter((item) => this.recordMatchesFilter(item, q))
    },
    allFilteredSelected() {
      if (!this.filteredRecords.length) return false
      return this.filteredRecords.every((item) => this.isSelected(item))
    },
    someFilteredSelected() {
      if (!this.filteredRecords.length) return false
      const n = this.filteredRecords.filter((item) => this.isSelected(item)).length
      return n > 0 && n < this.filteredRecords.length
    },
    canSaveCases() {
      if (this.selectedRows.length !== 1) return false
      const row = this.selectedRows[0]
      if (!checkRecordSaved(row, this.savedMarks)) return false
      return getRecordApiId(row, this.savedMarks) > 0
    }
  },
  updated() {
    const el = this.$refs.selectAllChk
    if (el) el.indeterminate = this.someFilteredSelected
  },
  mounted() {
    this.syncHostTabId()
    this.refreshSavedMarks()
    this.refreshState()
    chrome.runtime.onMessage.addListener(this.onRuntimeMessage)
    chrome.storage.onChanged.addListener(this.onStorageChanged)
  },
  beforeUnmount() {
    chrome.runtime.onMessage.removeListener(this.onRuntimeMessage)
  },
  methods: {
    formatJson(val) {
      if (val == null || val === '') return '（空）'
      if (typeof val === 'string') {
        try {
          return JSON.stringify(JSON.parse(val), null, 2)
        } catch {
          return val
        }
      }
      try {
        return JSON.stringify(val, null, 2)
      } catch {
        return String(val)
      }
    },
    statusLevel(code) {
      if (!code) return 'pending'
      if (code >= 400) return 'err'
      if (code >= 300) return 'warn'
      return 'ok'
    },
    onRuntimeMessage(req) {
      if (req.action === 'drawer_state' && req.data) this.applyState(req.data)
      if (req.action === 'drawer_notify') {
        this.starting = false
        if (req.level === 'error') this.$message.error(req.message)
      }
    },
    onStorageChanged(changes) {
      if (changes.trafficDraft && this.status === 'recording') this.refreshState()
    },
    syncHostTabId() {
      chrome.storage.local.get('hostRecordTabId', (res) => {
        if (res.hostRecordTabId) this.hostTabId = res.hostRecordTabId
      })
    },
    applyState(data) {
      this.starting = false
      this.status = data.status || 'stopped'
      this.records = (data.records || []).map((r) => ({
        ...r,
        path: r.path || this.shortPath(r.url)
      }))
      if (this.screen === 'detail' && this.detailRow) {
        const id = this.detailRow.requestId
        const found = this.records.find((r) => r.requestId === id)
        if (found) this.detailRow = found
      }
    },
    shortPath(url) {
      try {
        const u = new URL(url)
        return u.pathname + (u.search || '')
      } catch {
        return url || ''
      }
    },
    refreshState() {
      chrome.runtime.sendMessage({ action: 'get_drawer_state' }, (res) => {
        if (chrome.runtime.lastError) return
        if (res && res.data) this.applyState(res.data)
      })
    },
    async refreshSavedMarks() {
      try {
        this.savedMarks = await loadSavedMarks()
      } catch { /* */ }
    },
    isRecordSaved(item) {
      return checkRecordSaved(item, this.savedMarks)
    },
    startRecording() {
      if (this.starting || this.status === 'recording') return
      this.screen = 'list'
      this.starting = true
      this.records = []
      this.selectedRows = []
      this.filterText = ''
      chrome.runtime.sendMessage({ action: 'start_recording' }, (res) => {
        this.starting = false
        if (chrome.runtime.lastError) {
          this.$message.error(chrome.runtime.lastError.message)
          return
        }
        if (!res || !res.ok) {
          this.$message.error('开始录制失败')
          return
        }
        this.applyState(res.data)
      })
    },
    newSession() {
      this.screen = 'list'
      this.selectedRows = []
      this.filterText = ''
      this.send('clear_records')
    },
    send(action) {
      chrome.runtime.sendMessage({ action, tabId: this.hostTabId }, (res) => {
        if (chrome.runtime.lastError) {
          this.$message.error(chrome.runtime.lastError.message)
          return
        }
        if (res && res.data) this.applyState(res.data)
      })
    },
    closeDrawer() {
      chrome.runtime.sendMessage({ action: 'close_drawer' })
      if (window.parent !== window) {
        window.parent.postMessage({ action: 'close_drawer' }, '*')
      }
    },
    backToList() {
      this.screen = 'list'
      this.detailRow = null
    },
    viewDetail(row) {
      this.detailRow = row
      this.screen = 'detail'
    },
    onReviewRowClick(item, e) {
      if (e.target.classList.contains('chk')) return
      this.viewDetail(item)
    },
    isSelected(item) {
      return this.selectedRows.some((r) => r.requestId === item.requestId)
    },
    toggleSelect(item) {
      const i = this.selectedRows.findIndex((r) => r.requestId === item.requestId)
      if (i >= 0) this.selectedRows.splice(i, 1)
      else this.selectedRows.push(item)
    },
    toggleSelectAll() {
      if (!this.filteredRecords.length) return
      if (this.allFilteredSelected) {
        const ids = new Set(this.filteredRecords.map((r) => r.requestId))
        this.selectedRows = this.selectedRows.filter((r) => !ids.has(r.requestId))
        return
      }
      const existing = new Set(this.selectedRows.map((r) => r.requestId))
      for (const item of this.filteredRecords) {
        if (!existing.has(item.requestId)) {
          this.selectedRows.push(item)
        }
      }
    },
    recordMatchesFilter(item, q) {
      const parts = [
        item.method,
        item.path,
        item.url,
        item.service,
        item.host,
        item.statusCode != null ? String(item.statusCode) : ''
      ]
      return parts.join(' ').toLowerCase().includes(q)
    },
    showPlatformConfig() {
      this.platformConfigVisible = true
    },
    async onPlatformConfigSaved(config) {
      this.platformConfig = config
      try {
        this.platformProjects = await PlatformClient.listProducts(config)
      } catch (e) { /* */ }
    },
    async ensurePlatformConfig() {
      const config = await PlatformClient.loadConfig()
      if (!config?.baseUrl || !config?.apiToken) {
        this.$message.warning('请先配置测试平台')
        this.showPlatformConfig()
        return null
      }
      this.platformConfig = config
      if (!this.platformProjects.length) {
        try {
          this.platformProjects = await PlatformClient.listProducts(config)
        } catch (e) {
          this.$message.error(e.message)
          return null
        }
      }
      return config
    },
    openIngest(mode) {
      const selected = [...this.selectedRows].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
      if (mode === 'api' && selected.length < 1) {
        this.$message.warning('请至少勾选 1 条接口')
        return
      }
      if (mode === 'api_cases') {
        if (selected.length !== 1) {
          this.$message.warning('保存用例请只选 1 条已入库接口')
          return
        }
        if (!checkRecordSaved(selected[0], this.savedMarks)) {
          this.$message.warning('请先「保存接口」再生成用例')
          return
        }
        if (getRecordApiId(selected[0], this.savedMarks) <= 0) {
          this.$message.warning('未找到对应接口 ID，请重新保存接口')
          return
        }
      }
      if (mode === 'scenario' && selected.length < 2) {
        this.$message.warning('保存场景请至少选 2 条')
        return
      }
      this.ensurePlatformConfig().then((c) => {
        if (!c) return
        this.ingestMode = mode
        this.pendingIngestRecords = selected
        this.ingestDialogVisible = true
      })
    },
    async handlePlatformIngest({ hint }) {
      const config = await this.ensurePlatformConfig()
      if (!config) return
      this.ingesting = true
      const savedRecords = [...this.pendingIngestRecords]
      try {
        const payload = { hint, records: savedRecords }
        let result
        if (this.ingestMode === 'scenario') {
          result = await PlatformClient.ingestScenario(config, payload)
        } else if (this.ingestMode === 'api_cases') {
          const apiId = getRecordApiId(savedRecords[0], this.savedMarks)
          result = await PlatformClient.ingestApiCases(config, { ...payload, apiId })
        } else {
          result = await PlatformClient.ingestApis(config, payload)
        }
        if (this.ingestMode === 'api') {
          const apiIds = (result?.apis || []).map((a) => a.id)
          await markRecordsSaved(savedRecords, 1, apiIds)
        }
        await this.refreshSavedMarks()
        notifyIngestResult(result, this.ingestMode)
        this.ingestDialogVisible = false
        this.selectedRows = []
      } catch (e) {
        this.$message.error(e.message)
      } finally {
        this.ingesting = false
      }
    }
  }
}
</script>

<style scoped>
.recorder-drawer {
  --c-bg: #f5f6f8;
  --c-surface: #fff;
  --c-border: #e8eaef;
  --c-text: #1f2329;
  --c-muted: #8b919a;
  --c-primary: #2563eb;
  --radius: 8px;
  --btn-h: 32px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--c-bg);
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Segoe UI', sans-serif;
  color: var(--c-text);
  font-size: 13px;
}

.top-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  flex-shrink: 0;
  background: #fff;
  border-bottom: 1px solid #e8eaef;
  min-height: 48px;
}
.top-bar--recording {
  flex-wrap: nowrap;
  gap: 6px;
}
.top-bar--center {
  display: grid;
  grid-template-columns: 28px 1fr 32px;
  align-items: center;
  gap: 8px;
}
.top-bar--center .brand-icon {
  grid-column: 1;
}
.title-center {
  margin: 0;
  grid-column: 2;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  color: #1f2329;
}
.top-bar--center .icon-btn {
  grid-column: 3;
  justify-self: end;
}
.top-bar--detail .header-fill {
  flex: 1;
}
.btn-back--header {
  padding: 4px 8px;
  margin-right: 2px;
}
.brand-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}
.brand-name {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.icon-btn {
  border: none;
  background: transparent;
  font-size: 22px;
  line-height: 1;
  color: #8f959e;
  cursor: pointer;
  padding: 2px 6px;
  flex-shrink: 0;
}
.icon-btn:hover { color: #1f2329; }

.btn-back {
  border: none;
  background: none;
  color: #2563eb;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 0;
  flex-shrink: 0;
}
.btn-back:hover { text-decoration: underline; }

.rec-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 1.2s ease infinite;
}
.rec-dot.paused { background: #f59e0b; animation: none; }
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}
.rec-label { font-size: 12px; font-weight: 500; white-space: nowrap; }
.rec-count { font-size: 11px; color: var(--c-muted); margin-left: auto; white-space: nowrap; }
.rec-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.body {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.body-idle {
  padding: 24px 16px;
  justify-content: center;
}
.hero-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 1px 8px rgba(31, 35, 41, 0.06);
}
.hero-title { font-size: 18px; font-weight: 600; margin: 0 0 8px; }
.hero-sub { font-size: 13px; color: #8f959e; margin: 0 0 16px; line-height: 1.5; }
.devtools-warn {
  text-align: left;
  margin: 0 0 20px;
  padding: 10px 12px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.45;
  color: #9a3412;
}
.devtools-warn strong {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
}
.saved-badge {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 600;
  color: #047857;
  background: #d1fae5;
  padding: 2px 6px;
  border-radius: 4px;
}
.row-saved {
  border-color: #a7f3d0;
  background: #f0fdf4;
}
.row-saved:hover {
  border-color: #6ee7b7;
  background: #ecfdf5;
}

.body-list, .list-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 10px 12px;
}
.body-review {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.action-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 12px 0;
  flex-shrink: 0;
}
.hint {
  font-size: 12px;
  color: #8f959e;
  margin: 6px 12px 4px;
  flex-shrink: 0;
}
.list-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px 8px;
  flex-shrink: 0;
}
.select-all {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  flex-shrink: 0;
  user-select: none;
}
.filter-input {
  flex: 1;
  min-width: 0;
  height: 30px;
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 12px;
  color: #1f2329;
  background: #fff;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.filter-input:focus {
  border-color: #93c5fd;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12);
}
.filter-count {
  flex-shrink: 0;
  font-size: 11px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 10px;
}
.list-scroll { padding-top: 0; }

.empty {
  text-align: center;
  color: #8f959e;
  font-size: 13px;
  padding: 48px 16px;
}
.empty--filter {
  padding: 24px 16px;
}

.row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 10px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 6px;
  font-size: 12px;
  border: 1px solid #eef0f4;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.row:hover {
  border-color: #c7d2fe;
  background: #fafbff;
}
.row-select.on {
  border-color: #93c5fd;
  background: #f0f7ff;
}
.row-arrow {
  color: #c0c4cc;
  font-size: 16px;
  flex-shrink: 0;
}
.method {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}
.method[data-m='GET'] { background: #dcfce7; color: #166534; }
.method[data-m='POST'] { background: #dbeafe; color: #1e40af; }
.method[data-m='PUT'] { background: #fef3c7; color: #92400e; }
.method[data-m='DELETE'] { background: #fee2e2; color: #991b1b; }
.method[data-m='PATCH'] { background: #f3e8ff; color: #6b21a8; }
.path {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #4b5563;
}
.status {
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}
.status[data-s='ok'] { color: #16a34a; }
.status[data-s='err'] { color: #dc2626; }
.status[data-s='warn'] { color: #d97706; }
.status[data-s='pending'] { color: #9ca3af; }
.chk { flex-shrink: 0; width: 16px; height: 16px; }

.detail-page {
  overflow-y: auto;
  padding: 12px 14px 20px;
}
.detail-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.detail-url {
  font-size: 12px;
  color: #6b7280;
  word-break: break-all;
  margin: 0 0 16px;
  line-height: 1.5;
}
.detail-block {
  margin-bottom: 16px;
}
.detail-block h4 {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 600;
  color: #8f959e;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.code {
  margin: 0;
  padding: 12px;
  background: #fff;
  border: 1px solid #e8eaef;
  border-radius: 8px;
  font-size: 11px;
  line-height: 1.45;
  overflow: auto;
  max-height: 200px;
  white-space: pre-wrap;
  word-break: break-all;
}

.btn {
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s, opacity 0.15s;
}
.btn-toolbar {
  min-width: 52px;
  height: var(--btn-h);
  padding: 0 12px;
  font-size: 12px;
  line-height: var(--btn-h);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.btn-block {
  width: 100%;
  height: 40px;
  font-size: 14px;
  border-radius: var(--radius);
}
.btn-primary { background: var(--c-primary); color: #fff; }
.btn-primary:hover:not(:disabled) { background: #1d4ed8; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-ghost {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
}
.btn-ghost:hover { background: #ebedf0; }
.btn-header {
  height: 28px;
  padding: 0 10px;
  font-size: 12px;
  white-space: nowrap;
}
.btn-warn {
  background: #fff7ed;
  color: #c2410c;
  border: 1px solid #fdba74;
}
.btn-warn:hover { background: #ffedd5; }
.btn-stop {
  background: #ef4444;
  color: #fff;
  border: 1px solid #ef4444;
}
.btn-stop:hover { background: #dc2626; }
.btn-sm {
  height: 30px;
  padding: 0 12px;
  font-size: 12px;
  background: var(--c-surface);
  border: 1px solid #e5e7eb;
  color: #374151;
  border-radius: 6px;
}
.btn-sm.btn-primary { background: var(--c-primary); color: #fff; border-color: var(--c-primary); }
.btn-sm.btn-accent { background: #ecfdf5; color: #047857; border-color: #a7f3d0; }
.btn-sm.btn-accent:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-sm.btn-warn { background: #fff7ed; color: #c2410c; border-color: #fed7aa; }
.btn-sm:disabled { opacity: 0.45; cursor: not-allowed; }

:deep(.app-dialog) {
  border-radius: 10px;
  overflow: hidden;
}
:deep(.app-dialog .el-dialog__header) {
  padding: 14px 16px 10px;
  margin-right: 0;
}
:deep(.app-dialog .el-dialog__title) {
  font-size: 15px;
  font-weight: 600;
  color: var(--c-text);
}
:deep(.app-dialog .el-dialog__headerbtn) {
  top: 14px;
  right: 12px;
  width: 28px;
  height: 28px;
}
:deep(.app-dialog .el-dialog__body) {
  padding: 4px 16px 12px;
}
:deep(.app-dialog .el-dialog__footer) {
  padding: 8px 16px 14px;
}
</style>
