<template>
  <div style="width: 275px;text-align: center">
    <div class="popup-header">
      <img src='../../assets/icon48.png' style="margin:5px;" alt/>
      <span style="margin-top: 5px">接口测试·录制助手</span>
      <div class="popup-header-button">
        <el-button-group>
          <el-button id="start" title="开始" type="success" size="small">
            <el-icon :size="18">
              <VideoPlay/>
            </el-icon>
          </el-button>
          <el-button id="pause" title="暂停" type="warning" size="small">
            <el-icon :size="18">
              <VideoPause/>
            </el-icon>
          </el-button>
          <el-button id="resume" title="继续" type="success" size="small">
            <el-icon :size="18">
              <CaretRight/>
            </el-icon>
          </el-button>
          <el-button id="stop" title="停止" type="danger" size="small">
            <el-icon :size="18">
              <SwitchButton/>
            </el-icon>
          </el-button>
          <el-button id="edit" title="保存" type="info" size="small">
            <el-icon :size="18">
              <Edit/>
            </el-icon>
          </el-button>
        </el-button-group>
      </div>
    </div>
    <div class="popup-middle">
      <div class="record-middle-list">
        <div class="record-middle-list-row" v-for="item in groupList" :key="item.id">
          <el-row justify="space-between">
            <el-col :span="19" style="text-align: left">
              <span>{{ item.id }} {{ item.name }}</span>
            </el-col>
            <el-col :span="5">
              <span>（{{ item.counter }}）</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="popup-middle-create">
        <el-row justify="space-between">
          <el-col :span="18">
            <el-input v-model="inputName" size="small" placeholder="自定义分组" minlength="1" clearable/>
          </el-col>
          <el-col :span="5">
            <el-button id="add_group" type="primary" size="small" plain>添加</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="popup-footer">
      <span>Copyright © 2019-{{ new Date().getFullYear() }} Hannah Han</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      inputName: '',
      groupList: []
    }
  },
}
</script>

<style lang="less" scoped>
.popup-header {
  height: 30px;
  font-size: 15px;
  color: rgb(245, 245, 245);
  background-color: rgb(43, 58, 145);
  font-weight: bolder;
  display: flex;
  justify-content: space-between;
}

.popup-header-button {
  background-color: #ffffff;

  .el-button {
    height: 30px;
  }
}

.popup-middle {
  height: 65px;
  padding: 4px 10px;
}


.record-middle-list {
  height: 40px;
  display: block;
  overflow: auto;
  margin-left: 5px;
}

.record-middle-list-row {
  font-size: 12px;
  margin-bottom: 4px;
  color: #303133;
  font-weight: bold;
  overflow-wrap: break-word;
  font-family: system-ui, "PingFang SC", STHeiti, sans-serif;
}

.popup-footer {
  height: 30px;
  line-height: 30px;
  font-size: 10px;
  color: rgb(245, 245, 245);
  background-color: rgb(43, 58, 145);
}

</style>
