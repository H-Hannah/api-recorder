<template>
  <div style="padding: 20px">
    <el-alert style="margin: -10px 0;font-size: 14px;" title="以下为您录制的接口请求，导出之前请勾选确认" type="info" show-icon center
              :closable="false" effect="dark"></el-alert>
    <div v-for="item in recordData" :key="item.groupID" style="text-align: center">
      <el-table ref="multipleTable" :data="item.requestContent" style="width: 100%;margin: 30px 0" border stripe highlight-current-row
                @selection-change="(selection) => handleSelection(selection, item.groupID)">
        <el-table-column :label="item.groupName" align="center">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column prop="requestId" label="请求ID" align="center" width="120"/>
          <el-table-column label="请求方法" align="center" width="100">
            <template #default="scope">
              <el-tag effect="plain" :type="getMethodType(scope.row.method)">{{ scope.row.method }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="请求地址" align="center" min-width="300">
            <template #default="scope">
              <div style="text-align: left; word-break: break-all;">{{ scope.row.url }}</div>
            </template>
          </el-table-column>
          <el-table-column label="请求头信息" align="center" width="200">
            <template #default="scope">
              <el-popover placement="right" trigger="hover" width="400">
                <template #reference>
                  <el-tag effect="plain" type="info">查看详情</el-tag>
                </template>
                <pre style="max-height: 400px; overflow: auto;">{{ JSON.stringify(scope.row.requestHeaders, null, 2) }}</pre>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="请求体" align="center" width="200">
            <template #default="scope">
              <template v-if="scope.row.requestBody">
                <el-popover placement="right" trigger="hover" width="400">
                  <template #reference>
                    <el-tag effect="plain" type="info">查看详情</el-tag>
                  </template>
                  <pre style="max-height: 400px; overflow: auto;">{{ JSON.stringify(scope.row.requestBody, null, 2) }}</pre>
                </el-popover>
              </template>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column label="响应状态" align="center" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.statusCode >= 400 ? 'danger' : scope.row.statusCode >= 300 ? 'warning' : 'success'" effect="plain">
                {{ scope.row.statusCode || 200 }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="响应头信息" align="center" width="200">
            <template #default="scope">
              <el-popover placement="right" trigger="hover" width="400">
                <template #reference>
                  <el-tag effect="plain" type="info">查看详情</el-tag>
                </template>
                <pre style="max-height: 400px; overflow: auto;">{{ JSON.stringify(scope.row.responseHeaders, null, 2) }}</pre>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="响应体" align="center" width="200">
            <template #default="scope">
              <template v-if="scope.row.responseBody">
                <el-popover placement="right" trigger="hover" width="400">
                  <template #reference>
                    <el-tag effect="plain" type="info">查看详情</el-tag>
                  </template>
                  <pre style="max-height: 400px; overflow: auto;">{{ JSON.stringify(scope.row.responseBody, null, 2) }}</pre>
                </el-popover>
              </template>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <!-- AI 分析输出列 -->
          <el-table-column label="AI 分析请求" align="center" width="200">
            <template #default="scope">
              <template v-if="scope.row.aiOutput">
                <el-tag effect="plain" type="success" @click="showAIOutput(scope.row)" style="cursor: pointer">
                  查看分析结果
                </el-tag>
              </template>
              <el-tag v-else-if="scope.row.isAnalyzing" effect="plain" type="success">
                <i class="el-icon-loading"></i> AI 分析中...
              </el-tag>
              <el-button v-else type="success" size="small" link @click="aiAnalyze(scope.row)">
                分析接口
              </el-button>
            </template>
          </el-table-column>
          <!-- AI 测试用例列 -->
          <el-table-column label="AI 测试用例" align="center" width="200">
            <template #default="scope">
              <template v-if="scope.row.aiTestCase">
                <el-tag effect="plain" type="warning" @click="showAITestCase(scope.row)" style="cursor: pointer">
                  查看测试用例
                </el-tag>
              </template>
              <el-tag v-else-if="scope.row.isGenerating" effect="plain" type="warning">
                <i class="el-icon-loading"></i> AI 生成中...
              </el-tag>
              <el-button v-else type="warning" size="small" link @click="aiGeneration(scope.row)">
                生成用例
              </el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 通用抽屉组件 -->
    <el-drawer v-model="drawerConfig.visible" :title="drawerConfig.title" direction="rtl" size="50%">
      <div class="markdown-body" style="padding: 20px;" v-html="drawerConfig.content"></div>
    </el-drawer>
    <div style="text-align: center">
      <el-button type="primary" @click="saveForButton">
        <el-icon><Download /></el-icon> 导出 JSON
      </el-button>
    </div>
  </div>
</template>

<script>
import { Download } from '@element-plus/icons-vue'
import { API_CONFIG, PROMPTS } from '../../utils/prompts.js';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

export default {
  name: "Handle",
  components: {Download},
  data() {
    return {
      recordData: [],
      selectList: {},
      isAnalyzing: false,
      drawerConfig: {
        visible: false,
        title: '',
        content: ''
      }
    }
  },
  methods: {
    // 表格选择同步数据
    handleSelection(selection, id) {
      this.selectList[id] = selection;
    },

    // 获取选中数据
    getSelectedData() {
      let selectedData = [];
      for (let key in this.selectList) {
        selectedData.push(...this.selectList[key]);
      }
      return selectedData;
    },

    // 根据请求方法获取对应的颜色
    getMethodType(method) {
      const methodMap = {
        'GET': 'success',
        'POST': 'warning',
        'PUT': 'info',
        'DELETE': 'danger',
        'PATCH': 'warning'
      };
      return methodMap[method.toUpperCase()] || 'info';
    },

    // 处理录制到的数据
    dataHandler() {
      const that = this;
      window.chrome.storage.local.get('traffic', async (res) => {
        let temp = JSON.parse(res.traffic);
        console.log("录制数据详情：", temp);
        if (temp && temp.length > 0) {
          that.recordData = temp;
        } else {
          that.$message({
            message: '未获取到录制内容！',
            type: 'error'
          });
        }
      });
    },

    // AI 大模型请求
    async aiRequest(data, prompt) {
      const requestBody = {
        model: API_CONFIG.MODEL_NAME,
        input: {
          messages: [{
            role: "user",
            content: prompt.replace('{requestData}', JSON.stringify(data))
          }]
        }
      };

      const response = await fetch(API_CONFIG.BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });
      const result = await response.json();
      return md.render(result.output.text.trim());
    },

    // AI 接口分析处理
    async aiAnalyze(row) {
      try {
        row.isAnalyzing = true;
        row.aiOutput = await this.aiRequest(row, PROMPTS.ANALYZE_API);
        this.showAIOutput(row);
      } catch (error) {
        console.error('AI 分析出错：', error);
        row.aiOutput = '分析失败：' + error.message;
      } finally {
        row.isAnalyzing = false;
      }
    },

    // AI 生成测试用例
    async aiGeneration(row) {
      try {
        row.isGenerating = true;
        row.aiTestCase = await this.aiRequest(row, PROMPTS.GENERATION_CASE);
        this.showAITestCase(row);
      } catch (error) {
        console.error('AI 生成测试用例出错：', error);
        row.aiTestCase = '生成失败：' + error.message;
      } finally {
        row.isGenerating = false;
      }
    },

    // 格式化 headers
    formattedHeaders(headers) {
      return Object.entries(headers).map(([name, value]) => ({name,value: String(value)}));
    },

    // 直接导出符合MS平台JSON数据
    async saveForButton() {
      const selectedData = this.getSelectedData();
      if (!selectedData.length) {
        this.$message({message: '请先选择需要导出的数据！',type: 'warning'});
        return;
      }

      const formattedData = {};
      selectedData.forEach((item, index) => {
        const requestKey = `${item.method} ${item.url} [${item.requestId}]`;
        formattedData[`测试用例 [${index}]`] = {
          [requestKey]: {
            url: item.url,
            method: item.method,
            headers: this.formattedHeaders(item.requestHeaders),
            body: item.requestBody,
            request_type: item.requestType,
            request_subtype: "",
            timestamp: item.timestamp,
            response: {
              status: item.statusCode || 200,
              statusText: item.statusText || `HTTP/1.1 ${item.statusCode || 200}`,
              headers: this.formattedHeaders(item.responseHeaders),
              body: item.responseBody || null
            }
          }
        };
      });
      this.downloadJson(formattedData);
    },

    // 下载 JSON 文件
    downloadJson(data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}`;
      a.download = `RECORD-${formattedDate}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },

    // 显示 AI 分析输出
    showAIOutput(row) {
      this.drawerConfig = {
        visible: true,
        title: 'AI 分析结果',
        content: row.aiOutput
      };
    },

    showAITestCase(row) {
      this.drawerConfig = {
        visible: true,
        title: 'AI 测试用例',
        content: row.aiTestCase
      };
    },
  },
  created() {
    this.dataHandler();
  }
}
</script>

<style scoped>
.el-table {
  border-radius: 8px;
  margin: 20px 0 !important;
}

.el-table th {
  background-color: #f5f7fa !important;
  color: #606266;
  font-weight: 600;
}

.el-table--border th {
  border-right: 1px solid #ebeef5;
}

:deep(.markdown-body) {
  text-align: left;
  line-height: 1.6;
}

:deep(.markdown-body h3) {
  margin-top: 1.5em;
  font-size: 1.3em;
  border-bottom: 1px solid #eaecef;
}

:deep(.markdown-body table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

:deep(.markdown-body table th),
:deep(.markdown-body table td) {
  border: 1px solid #dfe2e5;
  padding: 6px 13px;
}

:deep(.markdown-body table th) {
  background-color: #f6f8fa;
}

:deep(.markdown-body pre) {
  background-color: #f6f8fa;
  padding: 16px;
  border-radius: 6px;
  overflow: auto;
}

:deep(.markdown-body code) {
  background-color: rgba(27,31,35,0.05);
  padding: 0.2em 0.4em;
  border-radius: 3px;
}
</style>



