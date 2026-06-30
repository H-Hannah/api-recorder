<template>
  <el-dialog
    v-model="dialogOpen"
    :title="dialogTitle"
    width="340px"
    align-center
    class="app-dialog ingest-dialog"
    :close-on-click-modal="false"
    @closed="$emit('cancel')"
  >
    <div class="ingest-meta">
      <span class="meta-label">已选录制</span>
      <span class="meta-badge">{{ recordCount }} 条</span>
    </div>

    <el-form label-position="top" size="default" class="ingest-form">
      <el-form-item label="业务说明">
        <el-input
          v-model="form.hint"
          type="textarea"
          :rows="2"
          placeholder="可选，如：Brief / Tracker 模块"
          resize="none"
        />
        <p class="field-hint">{{ fieldHint }}</p>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer-center">
        <el-button class="footer-btn" @click="$emit('cancel')">取消</el-button>
        <el-button class="footer-btn" type="primary" :loading="loading" @click="confirm">
          {{ confirmLabel }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'PlatformIngestDialog',
  props: {
    visible: Boolean,
    mode: { type: String, default: 'api' },
    recordCount: { type: Number, default: 0 },
    loading: Boolean
  },
  emits: ['confirm', 'cancel'],
  data() {
    return {
      form: { hint: '' }
    }
  },
  computed: {
    dialogOpen: {
      get() { return this.visible },
      set(v) { if (!v) this.$emit('cancel') }
    },
    dialogTitle() {
      if (this.mode === 'scenario') return `保存场景 · ${this.recordCount} 步`
      if (this.mode === 'api_cases') return '保存用例 · 单接口多案例'
      return `保存接口 · ${this.recordCount} 个`
    },
    confirmLabel() {
      if (this.mode === 'api_cases') return 'AI 生成用例'
      return 'AI 分析并入库'
    },
    fieldHint() {
      if (this.mode === 'api_cases') {
        return '基于已入库接口与录制响应，AI 生成多条 test_datasets 用例（含断言）'
      }
      if (this.mode === 'scenario') {
        return '多步线性场景；运行环境在 Web 端执行时选择'
      }
      return '仅保存接口概览（无断言）；入库时自动匹配 BETA/PRE/PROD 全部环境 URL'
    }
  },
  watch: {
    visible(v) {
      if (v) this.form.hint = ''
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm', { hint: this.form.hint })
    }
  }
}
</script>

<style scoped>
.ingest-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding: 8px 10px;
  background: #f4f6f9;
  border-radius: 6px;
}
.meta-label { font-size: 12px; color: #6b7280; }
.meta-badge {
  font-size: 12px;
  font-weight: 600;
  color: #2563eb;
  background: #eff6ff;
  padding: 2px 8px;
  border-radius: 10px;
}
.ingest-form :deep(.el-form-item) { margin-bottom: 14px; }
.ingest-form :deep(.el-form-item__label) {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  padding-bottom: 4px;
}
.ingest-form :deep(.el-textarea) { width: 100%; }
.field-hint {
  margin: 4px 0 0;
  font-size: 11px;
  line-height: 1.45;
  color: #9ca3af;
}
.dialog-footer-center {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
}
.footer-btn {
  min-width: 100px;
  height: 34px;
  border-radius: 6px;
  font-size: 13px;
}
</style>
