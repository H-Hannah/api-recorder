// vue项目的入口配置文件
import {createApp} from 'vue'
import App from './components/Control.vue'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import $ from "jquery";

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');

$(document).ready(function () {
    // 打开插件-在当前tab页下唤起操作弹窗开始录制
    window.chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        window.chrome.runtime.sendMessage({action: "start_recording", recordingTab: tabs[0]});
    });
})
