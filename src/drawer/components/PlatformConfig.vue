<template>
  <div class="platform-config">
    <p class="config-desc">连接测试平台后，可将录制接口 AI 分析并入库</p>

    <el-form :model="config" label-position="top" size="default" class="config-form" @submit.prevent>
      <el-form-item label="服务地址">
        <el-input
          v-model="config.baseUrl"
          placeholder="http://localhost:8081"
          clearable
        />
        <p class="field-hint">默认端口 8081</p>
      </el-form-item>

      <el-form-item label="API Token">
        <el-input
          v-model="config.apiToken"
          type="password"
          show-password
          placeholder="与平台 API_TOKEN 一致（如 TEST123）"
          clearable
        />
      </el-form-item>

      <el-button
        type="primary"
        class="test-btn"
        :loading="testing"
        @click="testConnection"
      >
        <el-icon v-if="!testing"><Connection /></el-icon>
        测试连接
      </el-button>

      <div v-if="connected" class="status-ok">
        <el-icon><CircleCheck /></el-icon>
        <span>已连接</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { Connection, CircleCheck } from '@element-plus/icons-vue'
import * as PlatformClient from '../../services/platform-client.js'

const DEFAULT_BASE = 'http://localhost:8081'

export default {
  name: 'PlatformConfig',
  components: { Connection, CircleCheck },
  emits: ['save-success'],
  data() {
    return {
      config: {
        baseUrl: DEFAULT_BASE,
        apiToken: ''
      },
      testing: false,
      connected: false
    }
  },
  async created() {
    const saved = await PlatformClient.loadConfig()
    if (saved?.baseUrl || saved?.apiToken) {
      this.config = {
        baseUrl: saved.baseUrl || DEFAULT_BASE,
        apiToken: saved.apiToken || ''
      }
      this.connected = !!(saved.baseUrl && saved.apiToken)
    }
  },
  methods: {
    async testConnection() {
      if (!this.config.baseUrl?.trim() || !this.config.apiToken?.trim()) {
        this.$message.warning('请填写服务地址和 API Token')
        return
      }
      this.testing = true
      this.connected = false
      try {
        await PlatformClient.testConnection(this.config)
        const toSave = {
          baseUrl: this.config.baseUrl.trim().replace(/\/$/, ''),
          apiToken: this.config.apiToken.trim()
        }
        await PlatformClient.saveConfig(toSave)
        this.config = { ...toSave }
        this.connected = true
        this.$message.success('连接成功')
        this.$emit('save-success', toSave)
      } catch (e) {
        this.$message.error('连接失败：' + e.message)
      } finally {
        this.testing = false
      }
    }
  }
}
</script>

<style scoped>
.platform-config {
  padding: 0;
}

.config-desc {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
  color: #8b919a;
}

.config-form :deep(.el-form-item) {
  margin-bottom: 14px;
}

.config-form :deep(.el-form-item__label) {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  padding-bottom: 4px;
  line-height: 1.3;
}

.config-form :deep(.el-input__wrapper) {
  border-radius: 6px;
  min-height: 34px;
}

.field-hint {
  margin: 4px 0 0;
  font-size: 11px;
  color: #b0b6bf;
  line-height: 1.3;
}

.test-btn {
  width: 100%;
  height: 34px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  margin-top: 2px;
}

.status-ok {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  padding: 6px 10px;
  background: #ecfdf5;
  border-radius: 6px;
  font-size: 12px;
  color: #059669;
}

.status-ok .el-icon {
  font-size: 14px;
}
</style>
