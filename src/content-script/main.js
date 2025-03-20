// 单独环境，始终执行；控制当前弹窗何时展示
import $ from "jquery";

const MS_ID = "PSCS_RECORDER_PLUGIN";

function injectDivPopup(iframeContainerId, controlsWrapperId, iframeWrapperId) {
    if (document.getElementById(iframeContainerId) === null) {
        window.chrome.storage.local.get('position', function (itemsLocal) {
            let div = document.createElement('div');
            div.style.border = '1px solid #aeaeae';
            div.style.borderRadius = '5px';
            div.style.boxShadow = '0px 3px 10px #888888';
            div.style.position = 'fixed'
            if (!$.isEmptyObject(itemsLocal.position)) {
                div.style.top = itemsLocal.position.top + "px";
                div.style.left = itemsLocal.position.left + "px";
            } else {
                div.style.top = '0px';
                div.style.left = window.innerWidth - 380 + "px";
            }
            div.style.zIndex = '9000000000000000000';
            div.style.backgroundColor = '#FFF';
            div.frameBorder = 'none';
            div.setAttribute('id', iframeContainerId);
            if (top === self) {
                $('html').append(div);
            } else {
                $(parent.document).append(div);
            }
        });
        window.chrome.storage.local.get('theme', function () {
            let iframeContainerDiv = $('#' + iframeContainerId);
            iframeContainerDiv.html('<div id="' + iframeWrapperId + '"></div>');
        });
    }
}

function addPopup1Ui() {
    let iframeId = "iframe-popup-ui-" + MS_ID;
    let iframeContainerId = "transaction-popup-ui-" + MS_ID;
    let iframeWrapperId = "iframe-wrapper-" + MS_ID;
    let controlsWrapperId = "controls-wrapper-" + MS_ID;
    let popup_injected = false;
    let inject_iframe = false;

    // 弹窗注入逻辑
    let interval = setInterval(function () {
        if (inject_iframe || document.readyState === 'complete') {
            if (!popup_injected) {
                injectDivPopup(iframeContainerId, controlsWrapperId, iframeWrapperId);
                popup_injected = true;
            } else {
                if (document.getElementById(iframeId) === null) {
                    let iframe = document.createElement('iframe');
                    iframe.src = window.chrome.runtime.getURL('../popup1.html'); // 使用 runtime.getURL 替代 extension.getURL
                    iframe.setAttribute('id', iframeId);
                    iframe.setAttribute('name', iframeId);
                    // iframe.style.width = '360px';  // 设置固定宽度
                    // iframe.style.height = '200px'; // 设置固定高度
                    // iframe.style.border = 'none';  // 移除边框
                    let iframeWrapperNode = document.getElementById(iframeWrapperId);
                    if (iframeWrapperNode !== null) {
                        while (iframeWrapperNode.firstChild) {
                            iframeWrapperNode.removeChild(iframeWrapperNode.firstChild);
                        }
                        iframeWrapperNode.appendChild(iframe);
                        clearInterval(interval);
                    }
                }
            }
        }
    }, 10);
}

function removePopup1Ui() {
    let iframeContainerId = "#transaction-popup-ui-" + MS_ID;
    if ($(iframeContainerId).length > 0) {
        $(iframeContainerId).remove();
    }
}

function messageHandler(request) {
    switch (request.action) {
        case "add_popup1":
            removePopup1Ui();
            addPopup1Ui();
            break;
        case "remove_popup1":
            removePopup1Ui();
            break;
    }
}

window.chrome.runtime.onMessage.addListener(messageHandler);

window.chrome.runtime.sendMessage({action: "check_status"}, function (response) {
    if (response && (response.status === "recording" || response.status === 'pause')) {
        setTimeout(addPopup1Ui, 100); // 延迟添加弹窗，确保页面已准备好
    }
});

