// MV3 Service Worker — 页面注入 hook 录制 XHR/Fetch（不用 debugger，避免与抽屉 iframe 冲突）

var hostTabId = null;

function isHttpTab(tab) {
  if (!tab || !tab.id) return false;
  var u = tab.url || '';
  return u.indexOf('http://') === 0 || u.indexOf('https://') === 0;
}

function skipUrl(url) {
  if (!url) return true;
  return url.indexOf('chrome-extension://') === 0
    || url.indexOf('chrome://') === 0
    || url.indexOf('devtools://') === 0;
}

function shortPath(url) {
  try {
    var u = new URL(url);
    return u.pathname + (u.search || '');
  } catch (e) {
    return url || '';
  }
}

function inferService(url) {
  try {
    var u = new URL(url);
    var host = (u.hostname || '').toLowerCase();
    if (host.indexOf('openreplay') >= 0) return 'openreplay';
    if (host.indexOf('anchor') >= 0) return 'anchor';
    if (host.indexOf('quest') >= 0) return 'quest';
    if (host.indexOf('trex') >= 0 || host.indexOf('dipbit') >= 0) return 'trex';
    if (host.indexOf('edgen') >= 0 || host.indexOf('ospprotocol') >= 0) return 'edgen';
    var parts = host.split('.');
    var first = parts[0];
    if (first && first !== 'www' && first !== 'api' && first !== 'm' && first !== 'app') {
      return first;
    }
    var segs = u.pathname.split('/').filter(function (s) { return !!s; });
    if (segs.length && segs[0] !== 'api' && segs[0] !== 'v1' && segs[0] !== 'v2' && segs[0] !== 'v3') {
      return segs[0];
    }
  } catch (e) { /* */ }
  return '';
}

/** 当前窗口 active 的 https 标签（多标签场景：录用户正在看的那一页） */
function resolveRecordTab(preferredTabId, cb) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (activeTabs) {
    var i;
    for (i = 0; i < activeTabs.length; i++) {
      if (isHttpTab(activeTabs[i])) {
        cb(activeTabs[i], null);
        return;
      }
    }
    if (preferredTabId) {
      chrome.tabs.get(preferredTabId, function (tab) {
        if (!chrome.runtime.lastError && isHttpTab(tab)) {
          cb(tab, null);
          return;
        }
        queryAnyHttpTab(cb);
      });
      return;
    }
    queryAnyHttpTab(cb);
  });
}

function queryAnyHttpTab(cb) {
  chrome.tabs.query({ lastFocusedWindow: true }, function (all) {
    var j;
    for (j = 0; j < all.length; j++) {
      if (isHttpTab(all[j])) {
        cb(all[j], null);
        return;
      }
    }
    cb(null, '未找到 https 页面，请切换到要录制的标签后重试');
  });
}

function pushUi(payload) {
  chrome.runtime.sendMessage(payload).catch(function () {});
}

var recorder = {
  status: 'stopped',
  list: [],
  tabId: 0,
  starting: false,

  payload: function () {
    return { status: this.status, records: this.list.slice(), count: this.list.length };
  },

  broadcast: function () {
    pushUi({ action: 'drawer_state', data: this.payload() });
  },

  notify: function (level, message) {
    pushUi({ action: 'drawer_notify', level: level, message: message });
  },

  start: function (tab) {
    var self = this;
    if (this.starting || this.status === 'recording') return;
    if (!isHttpTab(tab)) {
      this.notify('error', '请在 http/https 页面录制');
      return;
    }
    this.starting = true;
    hostTabId = tab.id;
    this.tabId = tab.id;
    this.list = [];
    this.status = 'recording';

    chrome.storage.local.set({
      hostRecordTabId: tab.id,
      hostRecordTabUrl: tab.url || '',
      traffic: '',
      trafficDraft: '[]',
      isRecording: true
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['js/page-hook.js'],
      world: 'MAIN'
    }, function () {
      self.starting = false;
      if (chrome.runtime.lastError) {
        self.status = 'stopped';
        chrome.storage.local.set({ isRecording: false });
        self.notify('error', '注入录制脚本失败: ' + chrome.runtime.lastError.message);
        self.broadcast();
        return;
      }
      self.broadcast();
    });
    this.broadcast();
  },

  stop: function () {
    this.status = 'stopped';
    chrome.storage.local.set({ isRecording: false });
    this.list.sort(function (a, b) { return (a.timestamp || 0) - (b.timestamp || 0); });
    chrome.storage.local.set({
      traffic: JSON.stringify(this.list),
      trafficDraft: JSON.stringify(this.list)
    });
    this.broadcast();
  },

  pause: function () {
    this.status = 'pause';
    this.broadcast();
  },

  resume: function () {
    this.status = 'recording';
    this.broadcast();
  },

  clear: function () {
    this.list = [];
    chrome.storage.local.set({ traffic: '', trafficDraft: '[]' });
    this.broadcast();
  },

  onCaptured: function (tabId, raw) {
    if (this.status !== 'recording' || tabId !== this.tabId) return;
    if (!raw || skipUrl(raw.url)) return;
    if (raw.requestType !== 'XHR' && raw.requestType !== 'Fetch') return;

    var row = {
      requestId: raw.requestId || ('r_' + Date.now()),
      method: raw.method || 'GET',
      url: raw.url,
      path: shortPath(raw.url),
      service: inferService(raw.url),
      statusCode: raw.statusCode || 0,
      timestamp: raw.timestamp || Date.now(),
      requestBody: raw.requestBody,
      responseBody: raw.responseBody,
      requestHeaders: raw.requestHeaders || {},
      responseHeaders: raw.responseHeaders || {}
    };
    var i = this.list.findIndex(function (r) { return r.requestId === row.requestId; });
    if (i >= 0) this.list[i] = row;
    else this.list.push(row);
    this.list.sort(function (a, b) { return (a.timestamp || 0) - (b.timestamp || 0); });
    chrome.storage.local.set({ trafficDraft: JSON.stringify(this.list) });
    this.broadcast();
  },

  loadState: function (cb) {
    chrome.storage.local.get(['trafficDraft', 'traffic', 'isRecording', 'hostRecordTabId'], function (res) {
      if (res.hostRecordTabId) hostTabId = res.hostRecordTabId;
      var raw = res.trafficDraft || res.traffic;
      if (raw) {
        try { recorder.list = JSON.parse(raw); } catch (e) { recorder.list = []; }
      }
      if (res.isRecording) recorder.status = 'recording';
      cb(recorder.payload());
    });
  }
};

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  if (!req.action) return;

  switch (req.action) {
    case 'record_captured': {
      var fromTab = req.tabId || (sender.tab && sender.tab.id);
      recorder.onCaptured(fromTab, req.record);
      sendResponse({ ok: true });
      break;
    }
    case 'start_recording': {
      if (recorder.status === 'recording') {
        sendResponse({ ok: true, data: recorder.payload() });
        break;
      }
      var hintId = (req.recordingTab && req.recordingTab.id) || req.tabId || hostTabId;
      resolveRecordTab(hintId, function (tab, err) {
        if (!tab) {
          recorder.notify('error', err || '无法定位录制页面');
          sendResponse({ ok: false, data: recorder.payload() });
          return;
        }
        recorder.start(tab);
        sendResponse({ ok: true, data: recorder.payload() });
      });
      return true;
    }
    case 'stop_recording':
      recorder.stop();
      sendResponse({ ok: true, data: recorder.payload() });
      break;
    case 'pause_recording':
      recorder.pause();
      sendResponse({ ok: true, data: recorder.payload() });
      break;
    case 'resume_recording':
      recorder.resume();
      sendResponse({ ok: true, data: recorder.payload() });
      break;
    case 'get_drawer_state':
      recorder.loadState(function (data) {
        if (recorder.status === 'recording' || recorder.status === 'pause') {
          data.status = recorder.status;
          data.records = recorder.list.slice();
        }
        sendResponse({ ok: true, data: data });
      });
      return true;
    case 'clear_records':
      recorder.clear();
      sendResponse({ ok: true, data: recorder.payload() });
      break;
    case 'close_drawer':
      sendResponse({ ok: true });
      break;
    default:
      break;
  }
});

chrome.runtime.onInstalled.addListener(function (d) {
  if (d.reason === 'install') chrome.storage.local.clear();
});

chrome.storage.local.get(['isRecording', 'trafficDraft', 'hostRecordTabId'], function (res) {
  if (res.hostRecordTabId) hostTabId = res.hostRecordTabId;
  if (res.isRecording) {
    recorder.status = 'recording';
    if (res.trafficDraft) {
      try { recorder.list = JSON.parse(res.trafficDraft); } catch (e) { /* */ }
    }
  }
});
