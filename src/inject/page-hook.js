/**
 * 注入页面 MAIN 世界，拦截 fetch / XHR（不依赖 chrome.debugger）
 */
(function () {
  if (window.__API_RECORDER_HOOKED__) return;
  window.__API_RECORDER_HOOKED__ = true;

  function emit(record) {
    try {
      window.postMessage({ source: 'API_RECORDER', record: record }, '*');
    } catch (e) { /* ignore */ }
  }

  function rid() {
    return 'r_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
  }

  function parseBody(body) {
    if (body == null || body === '') return '';
    if (typeof body === 'string') {
      try { return JSON.parse(body); } catch (e) { return body; }
    }
    try { return JSON.stringify(body); } catch (e) { return String(body); }
  }

  function headersFromInit(init) {
    var out = {};
    if (!init || !init.headers) return out;
    var h = init.headers;
    try {
      if (typeof Headers !== 'undefined' && h instanceof Headers) {
        h.forEach(function (v, k) { out[k] = v; });
        return out;
      }
    } catch (e) { /* */ }
    if (Array.isArray(h)) {
      h.forEach(function (pair) {
        if (pair && pair[0]) out[String(pair[0])] = String(pair[1] != null ? pair[1] : '');
      });
      return out;
    }
    if (typeof h === 'object') {
      Object.keys(h).forEach(function (k) { out[k] = h[k]; });
    }
    return out;
  }

  var origFetch = window.fetch;
  window.fetch = function (input, init) {
    init = init || {};
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var method = (init.method || 'GET').toUpperCase();
    var requestId = rid();
    var ts = Date.now();
    var reqBody = parseBody(init.body);
    var reqHeaders = headersFromInit(init);

    return origFetch.apply(this, arguments).then(function (res) {
      var clone = res.clone();
      clone.text().then(function (text) {
        var respBody = text;
        try { respBody = JSON.parse(text); } catch (e) { /* string */ }
        emit({
          requestId: requestId,
          requestType: 'Fetch',
          url: url,
          method: method,
          requestHeaders: reqHeaders,
          requestBody: reqBody,
          statusCode: res.status,
          responseBody: respBody,
          timestamp: ts
        });
      }).catch(function () {
        emit({
          requestId: requestId,
          requestType: 'Fetch',
          url: url,
          method: method,
          requestHeaders: reqHeaders,
          requestBody: reqBody,
          statusCode: res.status,
          responseBody: '',
          timestamp: ts
        });
      });
      return res;
    }).catch(function (err) {
      emit({
        requestId: requestId,
        requestType: 'Fetch',
        url: url,
        method: method,
        requestHeaders: reqHeaders,
        requestBody: reqBody,
        statusCode: 0,
        responseBody: String(err && err.message || err),
        timestamp: ts
      });
      throw err;
    });
  };

  var XOpen = XMLHttpRequest.prototype.open;
  var XSend = XMLHttpRequest.prototype.send;
  var XSetHeader = XMLHttpRequest.prototype.setRequestHeader;

  XMLHttpRequest.prototype.open = function (method, url) {
    this.__rec = {
      requestId: rid(),
      requestType: 'XHR',
      method: (method || 'GET').toUpperCase(),
      url: String(url || ''),
      timestamp: Date.now(),
      requestHeaders: {},
      requestBody: '',
      statusCode: 0,
      responseBody: ''
    };
    return XOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    if (this.__rec) {
      if (!this.__rec.requestHeaders) this.__rec.requestHeaders = {};
      this.__rec.requestHeaders[name] = value == null ? '' : String(value);
    }
    return XSetHeader.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function (body) {
    var self = this;
    if (self.__rec) self.__rec.requestBody = parseBody(body);
    self.addEventListener('load', function () {
      if (!self.__rec) return;
      var text = self.responseText || '';
      var resp = text;
      try { resp = JSON.parse(text); } catch (e) { /* */ }
      self.__rec.statusCode = self.status;
      self.__rec.responseBody = resp;
      emit(self.__rec);
    });
    self.addEventListener('error', function () {
      if (!self.__rec) return;
      self.__rec.statusCode = 0;
      emit(self.__rec);
    });
    return XSend.apply(this, arguments);
  };
})();
