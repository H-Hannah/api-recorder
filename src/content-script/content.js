/* global chrome */

const ROOT_ID = 'api-recorder-drawer-root';
const FRAME_ID = 'api-recorder-drawer-frame';
const WIDTH = 400;

let hostTabId = null;
let drawerOpen = false;

function drawerUrl() {
  var url = chrome.runtime.getURL('drawer.html');
  if (hostTabId) url += '?tabId=' + hostTabId;
  return url;
}

function ensureDrawerDom() {
  var root = document.getElementById(ROOT_ID);
  if (root) return root;

  root = document.createElement('div');
  root.id = ROOT_ID;
  root.style.cssText = [
    'position:fixed', 'top:0', 'right:0', 'width:' + WIDTH + 'px', 'height:100vh',
    'z-index:2147483646', 'background:#fff',
    'box-shadow:-4px 0 16px rgba(0,0,0,0.12)',
    'transform:translateX(100%)', 'transition:transform .22s ease'
  ].join(';');

  var iframe = document.createElement('iframe');
  iframe.id = FRAME_ID;
  iframe.style.cssText = 'width:100%;height:100%;border:none';
  iframe.dataset.loadedUrl = '';
  root.appendChild(iframe);
  document.documentElement.appendChild(root);
  return root;
}

function loadIframeIfNeeded() {
  var frame = document.getElementById(FRAME_ID);
  if (!frame) return;
  var url = drawerUrl();
  if (frame.dataset.loadedUrl !== url) {
    frame.src = url;
    frame.dataset.loadedUrl = url;
  }
}

function setVisible(open) {
  var root = document.getElementById(ROOT_ID);
  if (!root) return;
  root.style.transform = open ? 'translateX(0)' : 'translateX(100%)';
  drawerOpen = open;
}

function openDrawer(tabId) {
  if (tabId) hostTabId = tabId;
  ensureDrawerDom();
  loadIframeIfNeeded();
  if (drawerOpen) return;
  requestAnimationFrame(function () {
    setVisible(true);
  });
}

function closeDrawer() {
  setVisible(false);
}

window.addEventListener('message', function (event) {
  if (!event.data) return;

  if (event.data.source === 'API_RECORDER' && event.data.record) {
    chrome.runtime.sendMessage({
      action: 'record_captured',
      tabId: hostTabId,
      record: event.data.record
    });
    return;
  }

  var extOrigin = 'chrome-extension://' + chrome.runtime.id;
  if (event.origin !== extOrigin) return;
  if (event.data.action === 'close_drawer') {
    closeDrawer();
  }
});

chrome.runtime.onMessage.addListener(function (req) {
  if (req.action === 'open_drawer') {
    openDrawer(req.tabId);
    return;
  }
  if (req.action === 'toggle_drawer') {
    if (drawerOpen) closeDrawer();
    else openDrawer(req.tabId);
    return;
  }
  if (req.action === 'close_drawer') {
    closeDrawer();
  }
});

chrome.storage.local.get(['hostRecordTabId', 'isRecording'], function (res) {
  if (res.hostRecordTabId) hostTabId = res.hostRecordTabId;
  if (res.isRecording) {
    openDrawer(hostTabId);
  }
});
