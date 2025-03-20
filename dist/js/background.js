/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"background": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/background/main.js","chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background/main.js":
/*!********************************!*\
  !*** ./src/background/main.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass.js */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ \"./node_modules/core-js/modules/es.object.keys.js\");\n/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.json.stringify.js */ \"./node_modules/core-js/modules/es.json.stringify.js\");\n/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ \"./node_modules/core-js/modules/es.array.concat.js\");\n/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ \"./node_modules/core-js/modules/es.array.find.js\");\n/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.string.ends-with.js */ \"./node_modules/core-js/modules/es.string.ends-with.js\");\n/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _utils_hotReload__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/utils/hotReload */ \"./src/utils/hotReload.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_14__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n // npm run watch 热加载\n\nObject(_utils_hotReload__WEBPACK_IMPORTED_MODULE_13__[\"default\"])();\nvar groupList = [{\n  id: 1,\n  name: '默认分组',\n  counter: 0\n}]; // 录制器\n\nvar Recorder = /*#__PURE__*/function () {\n  function Recorder() {\n    Object(_Users_hanshiqian_MyFiles_api_recorder_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, Recorder);\n\n    this.status = \"stopped\";\n    this.traffic = {};\n    this.activeTabId = 0;\n    this.debuggeeId = null;\n  } // 保存录制\n\n\n  Object(_Users_hanshiqian_MyFiles_api_recorder_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(Recorder, [{\n    key: \"saveRecording\",\n    value: function saveRecording() {\n      var _this = this;\n\n      var traffic = [];\n      groupList.forEach(function (group) {\n        var keys = Object.keys(_this.traffic);\n        var content = [];\n        keys.forEach(function (index) {\n          var item = _this.traffic[index];\n\n          if (item.group_key === group.id) {\n            content.push(item);\n          }\n        });\n        traffic.push({\n          groupID: group.id,\n          groupName: group.name,\n          requestContent: content\n        });\n      });\n      window.chrome.storage.local.set({\n        \"traffic\": JSON.stringify(traffic)\n      }); // 重置\n\n      groupList = [{\n        id: 1,\n        name: '默认分组',\n        counter: 0\n      }];\n      this.traffic = {};\n    } // 暂停录制\n\n  }, {\n    key: \"pauseRecording\",\n    value: function pauseRecording() {\n      this.status = 'pause';\n    } // 重开录制\n\n  }, {\n    key: \"resumeRecording\",\n    value: function resumeRecording() {\n      this.status = 'recording';\n    } // 停止录制\n\n  }, {\n    key: \"stopRecording\",\n    value: function stopRecording() {\n      this.status = 'stopped';\n\n      if (this.debuggeeId) {\n        chrome.debugger.detach(this.debuggeeId);\n        this.debuggeeId = null;\n      }\n\n      this.saveRecording();\n    } // 开始录制\n\n  }, {\n    key: \"startRecording\",\n    value: function startRecording(tab) {\n      var _this2 = this;\n\n      window.chrome.storage.local.set({\n        \"traffic\": ''\n      });\n      this.status = 'recording';\n      this.activeTabId = tab.id;\n      this.debuggeeId = {\n        tabId: tab.id\n      };\n      chrome.debugger.attach(this.debuggeeId, \"1.3\", function () {\n        if (chrome.runtime.lastError) {\n          console.error('Debugger attach error:', chrome.runtime.lastError);\n          return;\n        }\n\n        chrome.debugger.sendCommand(_this2.debuggeeId, \"Network.enable\", {\n          extraHTTPHeaders: true // 启用额外的 HTTP 头信息\n\n        }, function () {\n          if (chrome.runtime.lastError) {\n            console.error('Network.enable error:', chrome.runtime.lastError);\n          }\n        });\n      });\n      chrome.debugger.onEvent.addListener(function (debuggeeId, message, params) {\n        _this2.onDebuggerEvent(debuggeeId, message, params);\n      }); // 唤起操作弹窗\n\n      window.chrome.tabs.sendMessage(tab.id, {\n        action: \"add_popup1\"\n      }); // 新弹窗传输数据\n\n      window.chrome.runtime.sendMessage({\n        action: 'update_transactions',\n        data: groupList\n      }); // 广播到所有标签页\n\n      chrome.tabs.query({}, function (tabs) {\n        tabs.forEach(function (tab) {\n          chrome.tabs.sendMessage(tab.id, {\n            action: 'update_transactions',\n            data: groupList\n          });\n        });\n      });\n    } // 监听调试器事件\n\n  }, {\n    key: \"onDebuggerEvent\",\n    value: function onDebuggerEvent(debuggeeId, message, params) {\n      if (this.status !== 'recording' || debuggeeId.tabId !== this.activeTabId) return; // 监听请求发送\n\n      if (message === \"Network.requestWillBeSent\") {\n        if (params.type !== 'XHR' && params.type !== 'Fetch') return;\n        var key = \"\".concat(params.request.method, \"_\").concat(params.requestId);\n        this.traffic[key] = {\n          url: params.request.url,\n          label: params.request.url,\n          method: params.request.method,\n          requestHeaders: params.request.headers,\n          requestBody: params.request.postData,\n          requestId: params.requestId,\n          requestType: params.type,\n          timestamp: params.timestamp * 1000,\n          tabId: this.activeTabId,\n          group_key: groupList[groupList.length - 1].id\n        }; // 更新计数器并发送分组信息\n\n        groupList[groupList.length - 1].counter++;\n        window.chrome.runtime.sendMessage({\n          action: 'update_transactions',\n          data: groupList\n        });\n      } // 添加请求头额外信息监听\n\n\n      if (message === \"Network.requestWillBeSentExtraInfo\") {\n        var trafficKeys = Object.keys(this.traffic);\n\n        var _key = trafficKeys.find(function (k) {\n          return k.endsWith(params.requestId);\n        });\n\n        if (_key && this.traffic[_key]) {\n          // 合并请求头信息\n          this.traffic[_key].requestHeaders = Object(_Users_hanshiqian_MyFiles_api_recorder_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_Users_hanshiqian_MyFiles_api_recorder_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({}, this.traffic[_key].requestHeaders), params.headers);\n        }\n      } // 监听响应接收\n\n\n      if (message === \"Network.responseReceived\") {\n        if (params.type !== 'XHR' && params.type !== 'Fetch') return; // 从已保存的请求信息中获取method\n\n        var _trafficKeys = Object.keys(this.traffic);\n\n        var _key2 = _trafficKeys.find(function (k) {\n          return k.endsWith(params.requestId);\n        });\n\n        if (!_key2 || !this.traffic[_key2]) {\n          console.log('未找到对应的请求记录:', params.requestId);\n          return;\n        }\n\n        try {\n          this.traffic[_key2].responseHeaders = params.response.headers;\n          this.traffic[_key2].statusCode = params.response.status;\n          this.traffic[_key2].statusText = params.response.statusText;\n          this.traffic[_key2].mimeType = params.response.mimeType; // 获取响应体\n\n          this.getResponseBody(debuggeeId, params.requestId, _key2); // 更新计数器\n\n          if (!this.traffic[_key2].counted) {\n            groupList[groupList.length - 1].counter++;\n            this.traffic[_key2].counted = true;\n            window.chrome.runtime.sendMessage({\n              action: 'update_transactions',\n              data: groupList\n            });\n          }\n        } catch (error) {\n          console.error('处理响应数据时出错:', error);\n        }\n      }\n    } // 获取响应体\n\n  }, {\n    key: \"getResponseBody\",\n    value: function () {\n      var _getResponseBody = Object(_Users_hanshiqian_MyFiles_api_recorder_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(debuggeeId, requestId, key) {\n        var result, bodyContent;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _context.prev = 0;\n                _context.next = 3;\n                return new Promise(function (resolve, reject) {\n                  chrome.debugger.sendCommand(debuggeeId, \"Network.getResponseBody\", {\n                    requestId: requestId\n                  }, function (response) {\n                    if (chrome.runtime.lastError) {\n                      reject(chrome.runtime.lastError);\n                      return;\n                    }\n\n                    resolve(response);\n                  });\n                });\n\n              case 3:\n                result = _context.sent;\n\n                if (result && this.traffic[key]) {\n                  bodyContent = result.base64Encoded ? atob(result.body) : result.body;\n\n                  try {\n                    this.traffic[key].responseBody = JSON.parse(bodyContent);\n                  } catch (e) {\n                    this.traffic[key].responseBody = bodyContent;\n                  }\n                }\n\n                _context.next = 11;\n                break;\n\n              case 7:\n                _context.prev = 7;\n                _context.t0 = _context[\"catch\"](0);\n                console.error('获取响应体失败:', _context.t0);\n\n                if (this.traffic[key]) {\n                  this.traffic[key].responseError = _context.t0.message;\n                }\n\n              case 11:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this, [[0, 7]]);\n      }));\n\n      function getResponseBody(_x, _x2, _x3) {\n        return _getResponseBody.apply(this, arguments);\n      }\n\n      return getResponseBody;\n    }()\n  }]);\n\n  return Recorder;\n}();\n\nvar recorder = new Recorder(); // 消息处理方法\n\nvar messageHandler = function messageHandler(request, sender, sendResponse) {\n  if (request.action) {\n    switch (request.action) {\n      case 'start_recording':\n        recorder.startRecording(request.recordingTab);\n        sendResponse({\n          status: recorder.status,\n          msg: '开始录制',\n          error: false\n        });\n        break;\n\n      case 'stop_recording':\n        recorder.stopRecording();\n        sendResponse({\n          msg: 'ok',\n          error: false\n        });\n        break;\n\n      case 'pause_recording':\n        recorder.pauseRecording();\n        sendResponse({\n          msg: 'ok',\n          error: false\n        });\n        break;\n\n      case 'resume_recording':\n        recorder.resumeRecording();\n        sendResponse({\n          msg: 'ok',\n          error: false\n        });\n        break;\n\n      case 'save_recording':\n        recorder.saveRecording();\n        sendResponse({\n          msg: 'ok',\n          error: false\n        });\n        break;\n\n      case 'check_status':\n        sendResponse({\n          status: recorder.status,\n          msg: 'ok',\n          error: false,\n          data: groupList\n        });\n        break;\n\n      case 'update_group_list':\n        groupList = request.groupList;\n        sendResponse({\n          msg: 'ok',\n          error: false\n        });\n        break;\n    }\n  }\n}; // 监听消息并处理\n\n\nwindow.chrome.runtime.onMessage.addListener(messageHandler);\nwindow.chrome.runtime.onInstalled.addListener(function (details) {\n  if (details.reason === 'install') {\n    window.chrome.storage.local.clear();\n  }\n});\n\n//# sourceURL=webpack:///./src/background/main.js?");

/***/ }),

/***/ "./src/utils/hotReload.js":
/*!********************************!*\
  !*** ./src/utils/hotReload.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ \"./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ \"./node_modules/core-js/modules/es.array.concat.js\");\n/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ \"./node_modules/core-js/modules/es.array.join.js\");\n/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\n\n// 加载文件\nvar filesInDirectory = function filesInDirectory(dir) {\n  return new Promise(function (resolve) {\n    return dir.createReader().readEntries(function (entries) {\n      Promise.all(entries.filter(function (e) {\n        return e.name[0] !== '.';\n      }).map(function (e) {\n        return e.isDirectory ? filesInDirectory(e) : new Promise(function (resolve) {\n          return e.file(resolve);\n        });\n      })).then(function (files) {\n        var _ref;\n\n        return (_ref = []).concat.apply(_ref, Object(_Users_hanshiqian_MyFiles_api_recorder_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(files));\n      }).then(resolve);\n    });\n  });\n}; // 遍历插件目录，读取文件信息，组合文件名称和修改时间成数据\n\n\nvar timestampForFilesInDirectory = function timestampForFilesInDirectory(dir) {\n  return filesInDirectory(dir).then(function (files) {\n    return files.map(function (f) {\n      return f.name + f.lastModifiedDate;\n    }).join();\n  });\n}; // 刷新当前活动页\n\n\nvar reload = function reload() {\n  window.chrome.tabs.query({\n    active: true,\n    currentWindow: true\n  }, function (tabs) {\n    // NB: see https://github.com/xpl/crx-hotreload/issues/5\n    if (tabs[0]) {\n      window.chrome.tabs.reload(tabs[0].id);\n    } // 强制刷新页面\n\n\n    window.chrome.runtime.reload();\n  });\n}; // 观察文件改动\n\n\nvar watchChanges = function watchChanges(dir, lastTimestamp) {\n  timestampForFilesInDirectory(dir).then(function (timestamp) {\n    // 文件没有改动则循环监听watchChanges方法\n    if (!lastTimestamp || lastTimestamp === timestamp) {\n      setTimeout(function () {\n        return watchChanges(dir, timestamp);\n      }, 1000); // retry after 1s\n    } else {\n      // 强制刷新页面\n      reload();\n    }\n  });\n};\n\nvar hotReload = function hotReload() {\n  window.chrome.management.getSelf(function (self) {\n    if (self.installType === 'development') {\n      // 获取插件目录，监听文件变化\n      window.chrome.runtime.getPackageDirectoryEntry(function (dir) {\n        return watchChanges(dir);\n      });\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (hotReload);\n\n//# sourceURL=webpack:///./src/utils/hotReload.js?");

/***/ })

/******/ });