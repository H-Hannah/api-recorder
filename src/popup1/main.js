// vue项目的入口配置文件
import {createApp} from 'vue'
import App from './components/Record.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {CaretRight, Edit, SwitchButton, VideoPause, VideoPlay} from "@element-plus/icons";
import $ from 'jquery';

const app = createApp(App);
app.use(ElementPlus);
app.component('VideoPlay', VideoPlay);
app.component('VideoPause', VideoPause);
app.component('SwitchButton', SwitchButton);
app.component('Edit', Edit);
app.component('CaretRight', CaretRight);
const vm = app.mount('#app');

/* 按钮操作相关 */
function showButtons() {
    for (let i = 0; i < arguments.length; i++) {
        $("#" + arguments[i]).show();
    }
}

function hideButtons() {
    for (let i = 0; i < arguments.length; i++) {
        $("#" + arguments[i]).hide();
    }
}

function switchButtons(status) {
    switch (status) {
        case "recording":
            hideButtons('resume', 'edit', 'start');
            showButtons('pause', 'stop');
            break;
        case "pause":
            hideButtons('pause', 'edit', 'start');
            showButtons('stop', 'resume');
            break;
        case "stopped":
            hideButtons('pause', 'stop', 'resume');
            showButtons('start', 'edit');
            break;
    }
}

function updateButtons() {
    window.chrome.runtime.sendMessage({action: "check_status"}, function (response) {
        switchButtons(response.status);
    });
}

$(document).ready(function () {
    updateButtons();
    $('#start').click(function () {
        switchButtons("recording");
        window.chrome.runtime.sendMessage({action: "start_recording"});
        window.chrome.runtime.sendMessage({action: "update_buttons"});
    });
    $('#pause').click(function () {
        switchButtons("pause");
        window.chrome.runtime.sendMessage({action: "pause_recording"});
        window.chrome.runtime.sendMessage({action: "update_buttons"});
    });
    $('#resume').click(function () {
        switchButtons("recording");
        window.chrome.runtime.sendMessage({action: "resume_recording"});
        window.chrome.runtime.sendMessage({action: "update_buttons"});
    });
    $('#stop').click(function () {
        switchButtons("stopped");
        window.chrome.runtime.sendMessage({action: "stop_recording"});
        window.chrome.runtime.sendMessage({action: "update_buttons"});
    });
    $('#edit').click(function () {
        window.chrome.tabs.create({url: 'popup2.html'});    // 跳转编辑保存页
        window.chrome.tabs.query({}, function (tabs) {      // 关闭所有弹窗
            for (let i = 0; i < tabs.length; i++) {
                window.chrome.tabs.sendMessage(tabs[i].id, {action: 'remove_popup1'});
            }
        });
    });
    $('#add_group').click(function () {
        if (vm.$data.inputName.length !== 0) {
            vm.$data.groupList.push({
                id: vm.$data.groupList.length + 1,
                name: vm.$data.inputName,
                counter: 0
            });
            vm.$data.inputName = '';
        }
        window.chrome.runtime.sendMessage({action: "update_group_list", groupList: vm.$data.groupList});
    });
    window.chrome.runtime.onMessage.addListener(function (request) {
        switch (request.action) {
            case "update_buttons":
                updateButtons();
                break;
            case "update_transactions":
                vm.$data.groupList = request.data;
                vm.$forceUpdate();
                break;
        }
    });
});
