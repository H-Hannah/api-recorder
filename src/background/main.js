import hotReload from '@/utils/hotReload'
import $ from "jquery";

// npm run watch 热加载
hotReload()

var groupList = [{id: 1, name: '默认分组', counter: 0}];

// 录制器
class Recorder {
    constructor() {
        this.status = "stopped";
        this.traffic = {};
        this.activeTabId = 0;
        this.debuggeeId = null;
    }

    // 保存录制
    saveRecording() {
        let traffic = [];
        groupList.forEach(group => {
            let keys = Object.keys(this.traffic);
            let content = []
            keys.forEach(index => {
                let item = this.traffic[index];
                if (item.group_key === group.id) {
                    content.push(item);
                }
            });
            traffic.push({
                groupID: group.id,
                groupName: group.name,
                requestContent: content
            })
        })
        window.chrome.storage.local.set({"traffic": JSON.stringify(traffic)});
        // 重置
        groupList = [{id: 1, name: '默认分组', counter: 0}];
        this.traffic = {};
    }

    // 暂停录制
    pauseRecording() {
        this.status = 'pause';
    }

    // 重开录制
    resumeRecording() {
        this.status = 'recording';
    }

    // 停止录制
    stopRecording() {
        this.status = 'stopped';
        if (this.debuggeeId) {
            chrome.debugger.detach(this.debuggeeId);
            this.debuggeeId = null;
        }
        this.saveRecording();
    }

    // 开始录制
    startRecording(tab) {
        window.chrome.storage.local.set({"traffic": ''});
        this.status = 'recording';
        this.activeTabId = tab.id;
        this.debuggeeId = {tabId: tab.id};
        
        chrome.debugger.attach(this.debuggeeId, "1.3", () => {
            if (chrome.runtime.lastError) {
                console.error('Debugger attach error:', chrome.runtime.lastError);
                return;
            }
            chrome.debugger.sendCommand(this.debuggeeId, "Network.enable", {
                extraHTTPHeaders: true  // 启用额外的 HTTP 头信息
            }, () => {
                if (chrome.runtime.lastError) {
                    console.error('Network.enable error:', chrome.runtime.lastError);
                }
            });
        });

        chrome.debugger.onEvent.addListener((debuggeeId, message, params) => {
            this.onDebuggerEvent(debuggeeId, message, params);
        });

        // 唤起操作弹窗
        window.chrome.tabs.sendMessage(tab.id, {action: "add_popup1"});
        // 新弹窗传输数据
        window.chrome.runtime.sendMessage({action: 'update_transactions', data: groupList})
        // 广播到所有标签页
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                chrome.tabs.sendMessage(tab.id, {
                    action: 'update_transactions',
                    data: groupList
                });
            });
        });
    }

    // 监听调试器事件
    onDebuggerEvent(debuggeeId, message, params) {
        if (this.status !== 'recording' || debuggeeId.tabId !== this.activeTabId) return;

        // 监听请求发送
        if (message === "Network.requestWillBeSent") {
            if (params.type !== 'XHR' && params.type !== 'Fetch') return;

            const key = `${params.request.method}_${params.requestId}`;
            this.traffic[key] = {
                url: params.request.url,
                label: params.request.url,
                method: params.request.method,
                requestHeaders: params.request.headers,
                requestBody: params.request.postData,
                requestId: params.requestId,
                requestType: params.type,
                timestamp: params.timestamp * 1000,
                tabId: this.activeTabId,
                group_key: groupList[groupList.length - 1].id
            };

            // 更新计数器并发送分组信息
            groupList[groupList.length - 1].counter++;
            window.chrome.runtime.sendMessage({action: 'update_transactions',data: groupList});
        }

        // 添加请求头额外信息监听
        if (message === "Network.requestWillBeSentExtraInfo") {
            const trafficKeys = Object.keys(this.traffic);
            const key = trafficKeys.find(k => k.endsWith(params.requestId));
            
            if (key && this.traffic[key]) {
                // 合并请求头信息
                this.traffic[key].requestHeaders = {
                    ...this.traffic[key].requestHeaders,
                    ...params.headers
                };
            }
        }

        // 监听响应接收
        if (message === "Network.responseReceived") {
            if (params.type !== 'XHR' && params.type !== 'Fetch') return;

            // 从已保存的请求信息中获取method
            const trafficKeys = Object.keys(this.traffic);
            const key = trafficKeys.find(k => k.endsWith(params.requestId));
            
            if (!key || !this.traffic[key]) {
                console.log('未找到对应的请求记录:', params.requestId);
                return;
            }

            try {
                this.traffic[key].responseHeaders = params.response.headers;
                this.traffic[key].statusCode = params.response.status;
                this.traffic[key].statusText = params.response.statusText;
                this.traffic[key].mimeType = params.response.mimeType;

                // 获取响应体
                this.getResponseBody(debuggeeId, params.requestId, key);
                
                // 更新计数器
                if (!this.traffic[key].counted) {
                    groupList[groupList.length - 1].counter++;
                    this.traffic[key].counted = true;
                    window.chrome.runtime.sendMessage({action: 'update_transactions', data: groupList});
                }
            } catch (error) {
                console.error('处理响应数据时出错:', error);
            }
        }
    }

    // 获取响应体
    async getResponseBody(debuggeeId, requestId, key) {
        try {
            const result = await new Promise((resolve, reject) => {
                chrome.debugger.sendCommand(debuggeeId, "Network.getResponseBody", {
                    requestId: requestId
                }, (response) => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                        return;
                    }
                    resolve(response);
                });
            });

            if (result && this.traffic[key]) {
                const bodyContent = result.base64Encoded ? atob(result.body) : result.body;
                try {
                    this.traffic[key].responseBody = JSON.parse(bodyContent);
                } catch (e) {
                    this.traffic[key].responseBody = bodyContent;
                }
            }
        } catch (error) {
            console.error('获取响应体失败:', error);
            if (this.traffic[key]) {
                this.traffic[key].responseError = error.message;
            }
        }
    }
}

var recorder = new Recorder();

// 消息处理方法
let messageHandler = function (request, sender, sendResponse) {
    if (request.action) {
        switch (request.action) {
            case 'start_recording':
                recorder.startRecording(request.recordingTab);
                sendResponse({
                    status: recorder.status,
                    msg: '开始录制',
                    error: false
                });
                break;
            case 'stop_recording':
                recorder.stopRecording();
                sendResponse({
                    msg: 'ok',
                    error: false
                });
                break;
            case 'pause_recording':
                recorder.pauseRecording();
                sendResponse({
                    msg: 'ok',
                    error: false
                });
                break;
            case 'resume_recording':
                recorder.resumeRecording();
                sendResponse({
                    msg: 'ok',
                    error: false
                });
                break;
            case 'save_recording':
                recorder.saveRecording();
                sendResponse({
                    msg: 'ok',
                    error: false
                });
                break;
            case 'check_status':
                sendResponse({
                    status: recorder.status,
                    msg: 'ok',
                    error: false,
                    data: groupList
                });
                break;
            case 'update_group_list':
                groupList = request.groupList;
                sendResponse({
                    msg: 'ok',
                    error: false
                });
                break;
        }
    }
}

// 监听消息并处理
window.chrome.runtime.onMessage.addListener(messageHandler);

window.chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        window.chrome.storage.local.clear();
    }
});
