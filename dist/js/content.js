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
/******/ 		"content": 0
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
/******/ 	deferredModules.push(["./src/content-script/main.js","chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content-script/main.js":
/*!************************************!*\
  !*** ./src/content-script/main.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n// 单独环境，始终执行；控制当前弹窗何时展示\n\nvar MS_ID = \"PSCS_RECORDER_PLUGIN\";\n\nfunction injectDivPopup(iframeContainerId, controlsWrapperId, iframeWrapperId) {\n  if (document.getElementById(iframeContainerId) === null) {\n    window.chrome.storage.local.get('position', function (itemsLocal) {\n      var div = document.createElement('div');\n      div.style.border = '1px solid #aeaeae';\n      div.style.borderRadius = '5px';\n      div.style.boxShadow = '0px 3px 10px #888888';\n      div.style.position = 'fixed';\n\n      if (!jquery__WEBPACK_IMPORTED_MODULE_0___default.a.isEmptyObject(itemsLocal.position)) {\n        div.style.top = itemsLocal.position.top + \"px\";\n        div.style.left = itemsLocal.position.left + \"px\";\n      } else {\n        div.style.top = '0px';\n        div.style.left = window.innerWidth - 380 + \"px\";\n      }\n\n      div.style.zIndex = '9000000000000000000';\n      div.style.backgroundColor = '#FFF';\n      div.frameBorder = 'none';\n      div.setAttribute('id', iframeContainerId);\n\n      if (top === self) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').append(div);\n      } else {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(parent.document).append(div);\n      }\n    });\n    window.chrome.storage.local.get('theme', function () {\n      var iframeContainerDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + iframeContainerId);\n      iframeContainerDiv.html('<div id=\"' + iframeWrapperId + '\"></div>');\n    });\n  }\n}\n\nfunction addPopup1Ui() {\n  var iframeId = \"iframe-popup-ui-\" + MS_ID;\n  var iframeContainerId = \"transaction-popup-ui-\" + MS_ID;\n  var iframeWrapperId = \"iframe-wrapper-\" + MS_ID;\n  var controlsWrapperId = \"controls-wrapper-\" + MS_ID;\n  var popup_injected = false;\n  var inject_iframe = false; // 弹窗注入逻辑\n\n  var interval = setInterval(function () {\n    if (inject_iframe || document.readyState === 'complete') {\n      if (!popup_injected) {\n        injectDivPopup(iframeContainerId, controlsWrapperId, iframeWrapperId);\n        popup_injected = true;\n      } else {\n        if (document.getElementById(iframeId) === null) {\n          var iframe = document.createElement('iframe');\n          iframe.src = window.chrome.runtime.getURL('../popup1.html'); // 使用 runtime.getURL 替代 extension.getURL\n\n          iframe.setAttribute('id', iframeId);\n          iframe.setAttribute('name', iframeId); // iframe.style.width = '360px';  // 设置固定宽度\n          // iframe.style.height = '200px'; // 设置固定高度\n          // iframe.style.border = 'none';  // 移除边框\n\n          var iframeWrapperNode = document.getElementById(iframeWrapperId);\n\n          if (iframeWrapperNode !== null) {\n            while (iframeWrapperNode.firstChild) {\n              iframeWrapperNode.removeChild(iframeWrapperNode.firstChild);\n            }\n\n            iframeWrapperNode.appendChild(iframe);\n            clearInterval(interval);\n          }\n        }\n      }\n    }\n  }, 10);\n}\n\nfunction removePopup1Ui() {\n  var iframeContainerId = \"#transaction-popup-ui-\" + MS_ID;\n\n  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(iframeContainerId).length > 0) {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(iframeContainerId).remove();\n  }\n}\n\nfunction messageHandler(request) {\n  switch (request.action) {\n    case \"add_popup1\":\n      removePopup1Ui();\n      addPopup1Ui();\n      break;\n\n    case \"remove_popup1\":\n      removePopup1Ui();\n      break;\n  }\n}\n\nwindow.chrome.runtime.onMessage.addListener(messageHandler);\nwindow.chrome.runtime.sendMessage({\n  action: \"check_status\"\n}, function (response) {\n  if (response && (response.status === \"recording\" || response.status === 'pause')) {\n    setTimeout(addPopup1Ui, 100); // 延迟添加弹窗，确保页面已准备好\n  }\n});\n\n//# sourceURL=webpack:///./src/content-script/main.js?");

/***/ })

/******/ });