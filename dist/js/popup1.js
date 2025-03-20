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
/******/ 		"popup1": 0
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
/******/ 	deferredModules.push([1,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/popup1/components/Record.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/popup1/components/Record.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"App\",\n  data: function data() {\n    return {\n      inputName: '',\n      groupList: []\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/popup1/components/Record.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/popup1/components/Record.vue?vue&type=template&id=66e699d9&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/popup1/components/Record.vue?vue&type=template&id=66e699d9&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n/* harmony import */ var _assets_icon48_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/icon48.png */ \"./src/assets/icon48.png\");\n/* harmony import */ var _assets_icon48_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_icon48_png__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nvar _withScopeId = function _withScopeId(n) {\n  return Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"pushScopeId\"])(\"data-v-66e699d9\"), n = n(), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"popScopeId\"])(), n;\n};\n\nvar _hoisted_1 = {\n  style: {\n    \"width\": \"275px\",\n    \"text-align\": \"center\"\n  }\n};\nvar _hoisted_2 = {\n  class: \"popup-header\"\n};\n\nvar _hoisted_3 = /*#__PURE__*/_withScopeId(function () {\n  return /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementVNode\"])(\"img\", {\n    src: _assets_icon48_png__WEBPACK_IMPORTED_MODULE_2___default.a,\n    style: {\n      \"margin\": \"5px\"\n    },\n    alt: \"\"\n  }, null, -1\n  /* HOISTED */\n  );\n});\n\nvar _hoisted_4 = /*#__PURE__*/_withScopeId(function () {\n  return /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementVNode\"])(\"span\", {\n    style: {\n      \"margin-top\": \"5px\"\n    }\n  }, \"接口测试·录制助手\", -1\n  /* HOISTED */\n  );\n});\n\nvar _hoisted_5 = {\n  class: \"popup-header-button\"\n};\nvar _hoisted_6 = {\n  class: \"popup-middle\"\n};\nvar _hoisted_7 = {\n  class: \"record-middle-list\"\n};\nvar _hoisted_8 = {\n  class: \"popup-middle-create\"\n};\n\nvar _hoisted_9 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createTextVNode\"])(\"添加\");\n\nvar _hoisted_10 = {\n  class: \"popup-footer\"\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  var _component_VideoPlay = Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"resolveComponent\"])(\"VideoPlay\");\n\n  var _component_el_icon = Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"resolveComponent\"])(\"el-icon\");\n\n  var _component_el_button = Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"resolveComponent\"])(\"el-button\");\n\n  var _component_VideoPause = Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"resolveComponent\"])(\"VideoPause\");\n\n  var _component_CaretRight = Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"resolveComponent\"])(\"CaretRight\");\n\n  var _component_SwitchButton = Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"resolveComponent\"])(\"SwitchButton\");\n\n  var _component_Edit = Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"resolveComponent\"])(\"Edit\");\n\n  var _component_el_button_group = Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"resolveComponent\"])(\"el-button-group\");\n\n  var _component_el_col = Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"resolveComponent\"])(\"el-col\");\n\n  var _component_el_row = Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"resolveComponent\"])(\"el-row\");\n\n  var _component_el_input = Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"resolveComponent\"])(\"el-input\");\n\n  return Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"openBlock\"])(), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementBlock\"])(\"div\", _hoisted_1, [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementVNode\"])(\"div\", _hoisted_2, [_hoisted_3, _hoisted_4, Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementVNode\"])(\"div\", _hoisted_5, [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_button_group, null, {\n    default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n      return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_button, {\n        id: \"start\",\n        title: \"开始\",\n        type: \"success\",\n        size: \"small\"\n      }, {\n        default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n          return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_icon, {\n            size: 18\n          }, {\n            default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n              return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_VideoPlay)];\n            }),\n            _: 1\n            /* STABLE */\n\n          })];\n        }),\n        _: 1\n        /* STABLE */\n\n      }), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_button, {\n        id: \"pause\",\n        title: \"暂停\",\n        type: \"warning\",\n        size: \"small\"\n      }, {\n        default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n          return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_icon, {\n            size: 18\n          }, {\n            default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n              return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_VideoPause)];\n            }),\n            _: 1\n            /* STABLE */\n\n          })];\n        }),\n        _: 1\n        /* STABLE */\n\n      }), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_button, {\n        id: \"resume\",\n        title: \"继续\",\n        type: \"success\",\n        size: \"small\"\n      }, {\n        default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n          return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_icon, {\n            size: 18\n          }, {\n            default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n              return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_CaretRight)];\n            }),\n            _: 1\n            /* STABLE */\n\n          })];\n        }),\n        _: 1\n        /* STABLE */\n\n      }), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_button, {\n        id: \"stop\",\n        title: \"停止\",\n        type: \"danger\",\n        size: \"small\"\n      }, {\n        default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n          return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_icon, {\n            size: 18\n          }, {\n            default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n              return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_SwitchButton)];\n            }),\n            _: 1\n            /* STABLE */\n\n          })];\n        }),\n        _: 1\n        /* STABLE */\n\n      }), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_button, {\n        id: \"edit\",\n        title: \"保存\",\n        type: \"info\",\n        size: \"small\"\n      }, {\n        default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n          return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_icon, {\n            size: 18\n          }, {\n            default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n              return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_Edit)];\n            }),\n            _: 1\n            /* STABLE */\n\n          })];\n        }),\n        _: 1\n        /* STABLE */\n\n      })];\n    }),\n    _: 1\n    /* STABLE */\n\n  })])]), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementVNode\"])(\"div\", _hoisted_6, [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementVNode\"])(\"div\", _hoisted_7, [(Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"openBlock\"])(true), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementBlock\"])(vue__WEBPACK_IMPORTED_MODULE_1__[\"Fragment\"], null, Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"renderList\"])($data.groupList, function (item) {\n    return Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"openBlock\"])(), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementBlock\"])(\"div\", {\n      class: \"record-middle-list-row\",\n      key: item.id\n    }, [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_row, {\n      justify: \"space-between\"\n    }, {\n      default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n        return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_col, {\n          span: 19,\n          style: {\n            \"text-align\": \"left\"\n          }\n        }, {\n          default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n            return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementVNode\"])(\"span\", null, Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"toDisplayString\"])(item.id) + \" \" + Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"toDisplayString\"])(item.name), 1\n            /* TEXT */\n            )];\n          }),\n          _: 2\n          /* DYNAMIC */\n\n        }, 1024\n        /* DYNAMIC_SLOTS */\n        ), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_col, {\n          span: 5\n        }, {\n          default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n            return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementVNode\"])(\"span\", null, \"（\" + Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"toDisplayString\"])(item.counter) + \"）\", 1\n            /* TEXT */\n            )];\n          }),\n          _: 2\n          /* DYNAMIC */\n\n        }, 1024\n        /* DYNAMIC_SLOTS */\n        )];\n      }),\n      _: 2\n      /* DYNAMIC */\n\n    }, 1024\n    /* DYNAMIC_SLOTS */\n    )]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))]), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementVNode\"])(\"div\", _hoisted_8, [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_row, {\n    justify: \"space-between\"\n  }, {\n    default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n      return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_col, {\n        span: 18\n      }, {\n        default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n          return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_input, {\n            modelValue: $data.inputName,\n            \"onUpdate:modelValue\": _cache[0] || (_cache[0] = function ($event) {\n              return $data.inputName = $event;\n            }),\n            size: \"small\",\n            placeholder: \"自定义分组\",\n            minlength: \"1\",\n            clearable: \"\"\n          }, null, 8\n          /* PROPS */\n          , [\"modelValue\"])];\n        }),\n        _: 1\n        /* STABLE */\n\n      }), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_col, {\n        span: 5\n      }, {\n        default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n          return [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createVNode\"])(_component_el_button, {\n            id: \"add_group\",\n            type: \"primary\",\n            size: \"small\",\n            plain: \"\"\n          }, {\n            default: Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"withCtx\"])(function () {\n              return [_hoisted_9];\n            }),\n            _: 1\n            /* STABLE */\n\n          })];\n        }),\n        _: 1\n        /* STABLE */\n\n      })];\n    }),\n    _: 1\n    /* STABLE */\n\n  })])]), Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementVNode\"])(\"div\", _hoisted_10, [Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"createElementVNode\"])(\"span\", null, \"Copyright © 2019-\" + Object(vue__WEBPACK_IMPORTED_MODULE_1__[\"toDisplayString\"])(new Date().getFullYear()) + \" Hannah Han\", 1\n  /* TEXT */\n  )])]);\n}\n\n//# sourceURL=webpack:///./src/popup1/components/Record.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/popup1/components/Record.vue?vue&type=style&index=0&id=66e699d9&lang=less&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--11-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--11-oneOf-1-1!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src??ref--11-oneOf-1-2!./node_modules/less-loader/dist/cjs.js??ref--11-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/popup1/components/Record.vue?vue&type=style&index=0&id=66e699d9&lang=less&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./src/popup1/components/Record.vue?./node_modules/mini-css-extract-plugin/dist/loader.js??ref--11-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--11-oneOf-1-1!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src??ref--11-oneOf-1-2!./node_modules/less-loader/dist/cjs.js??ref--11-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1");

/***/ }),

/***/ "./src/assets/icon48.png":
/*!*******************************!*\
  !*** ./src/assets/icon48.png ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,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\"\n\n//# sourceURL=webpack:///./src/assets/icon48.png?");

/***/ }),

/***/ "./src/popup1/components/Record.vue":
/*!******************************************!*\
  !*** ./src/popup1/components/Record.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Record_vue_vue_type_template_id_66e699d9_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Record.vue?vue&type=template&id=66e699d9&scoped=true */ \"./src/popup1/components/Record.vue?vue&type=template&id=66e699d9&scoped=true\");\n/* harmony import */ var _Record_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Record.vue?vue&type=script&lang=js */ \"./src/popup1/components/Record.vue?vue&type=script&lang=js\");\n/* empty/unused harmony star reexport *//* harmony import */ var _Record_vue_vue_type_style_index_0_id_66e699d9_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Record.vue?vue&type=style&index=0&id=66e699d9&lang=less&scoped=true */ \"./src/popup1/components/Record.vue?vue&type=style&index=0&id=66e699d9&lang=less&scoped=true\");\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_vue_loader_v16_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader-v16/dist/exportHelper.js */ \"./node_modules/vue-loader-v16/dist/exportHelper.js\");\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_vue_loader_v16_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Users_hanshiqian_MyFiles_api_recorder_node_modules_vue_loader_v16_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\n\n\nconst __exports__ = /*#__PURE__*/_Users_hanshiqian_MyFiles_api_recorder_node_modules_vue_loader_v16_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3___default()(_Record_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_Record_vue_vue_type_template_id_66e699d9_scoped_true__WEBPACK_IMPORTED_MODULE_0__[\"render\"]],['__scopeId',\"data-v-66e699d9\"],['__file',\"src/popup1/components/Record.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack:///./src/popup1/components/Record.vue?");

/***/ }),

/***/ "./src/popup1/components/Record.vue?vue&type=script&lang=js":
/*!******************************************************************!*\
  !*** ./src/popup1/components/Record.vue?vue&type=script&lang=js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Record_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader-v16/dist??ref--1-1!./Record.vue?vue&type=script&lang=js */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/popup1/components/Record.vue?vue&type=script&lang=js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Record_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* empty/unused harmony star reexport */ \n\n//# sourceURL=webpack:///./src/popup1/components/Record.vue?");

/***/ }),

/***/ "./src/popup1/components/Record.vue?vue&type=style&index=0&id=66e699d9&lang=less&scoped=true":
/*!***************************************************************************************************!*\
  !*** ./src/popup1/components/Record.vue?vue&type=style&index=0&id=66e699d9&lang=less&scoped=true ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Record_vue_vue_type_style_index_0_id_66e699d9_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--11-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--11-oneOf-1-1!../../../node_modules/vue-loader-v16/dist/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--11-oneOf-1-2!../../../node_modules/less-loader/dist/cjs.js??ref--11-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader-v16/dist??ref--1-1!./Record.vue?vue&type=style&index=0&id=66e699d9&lang=less&scoped=true */ \"./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/popup1/components/Record.vue?vue&type=style&index=0&id=66e699d9&lang=less&scoped=true\");\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Record_vue_vue_type_style_index_0_id_66e699d9_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Record_vue_vue_type_style_index_0_id_66e699d9_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Record_vue_vue_type_style_index_0_id_66e699d9_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Record_vue_vue_type_style_index_0_id_66e699d9_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/popup1/components/Record.vue?");

/***/ }),

/***/ "./src/popup1/components/Record.vue?vue&type=template&id=66e699d9&scoped=true":
/*!************************************************************************************!*\
  !*** ./src/popup1/components/Record.vue?vue&type=template&id=66e699d9&scoped=true ***!
  \************************************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_v16_dist_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Record_vue_vue_type_template_id_66e699d9_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader-v16/dist??ref--1-1!./Record.vue?vue&type=template&id=66e699d9&scoped=true */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/popup1/components/Record.vue?vue&type=template&id=66e699d9&scoped=true\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_v16_dist_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Record_vue_vue_type_template_id_66e699d9_scoped_true__WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n\n\n//# sourceURL=webpack:///./src/popup1/components/Record.vue?");

/***/ }),

/***/ "./src/popup1/main.js":
/*!****************************!*\
  !*** ./src/popup1/main.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_hanshiqian_MyFiles_api_recorder_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_hanshiqian_MyFiles_api_recorder_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Users_hanshiqian_MyFiles_api_recorder_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var _Users_hanshiqian_MyFiles_api_recorder_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Users_hanshiqian_MyFiles_api_recorder_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n/* harmony import */ var _components_Record_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Record.vue */ \"./src/popup1/components/Record.vue\");\n/* harmony import */ var element_plus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! element-plus */ \"./node_modules/element-plus/es/index.mjs\");\n/* harmony import */ var element_plus_dist_index_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! element-plus/dist/index.css */ \"./node_modules/element-plus/dist/index.css\");\n/* harmony import */ var element_plus_dist_index_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(element_plus_dist_index_css__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _element_plus_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @element-plus/icons */ \"./node_modules/@element-plus/icons/es/index.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_9__);\n\n\n\n\n// vue项目的入口配置文件\n\n\n\n\n\n\nvar app = Object(vue__WEBPACK_IMPORTED_MODULE_4__[\"createApp\"])(_components_Record_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\napp.use(element_plus__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\napp.component('VideoPlay', _element_plus_icons__WEBPACK_IMPORTED_MODULE_8__[\"VideoPlay\"]);\napp.component('VideoPause', _element_plus_icons__WEBPACK_IMPORTED_MODULE_8__[\"VideoPause\"]);\napp.component('SwitchButton', _element_plus_icons__WEBPACK_IMPORTED_MODULE_8__[\"SwitchButton\"]);\napp.component('Edit', _element_plus_icons__WEBPACK_IMPORTED_MODULE_8__[\"Edit\"]);\napp.component('CaretRight', _element_plus_icons__WEBPACK_IMPORTED_MODULE_8__[\"CaretRight\"]);\nvar vm = app.mount('#app');\n/* 按钮操作相关 */\n\nfunction showButtons() {\n  for (var i = 0; i < arguments.length; i++) {\n    jquery__WEBPACK_IMPORTED_MODULE_9___default()(\"#\" + arguments[i]).show();\n  }\n}\n\nfunction hideButtons() {\n  for (var i = 0; i < arguments.length; i++) {\n    jquery__WEBPACK_IMPORTED_MODULE_9___default()(\"#\" + arguments[i]).hide();\n  }\n}\n\nfunction switchButtons(status) {\n  switch (status) {\n    case \"recording\":\n      hideButtons('resume', 'edit', 'start');\n      showButtons('pause', 'stop');\n      break;\n\n    case \"pause\":\n      hideButtons('pause', 'edit', 'start');\n      showButtons('stop', 'resume');\n      break;\n\n    case \"stopped\":\n      hideButtons('pause', 'stop', 'resume');\n      showButtons('start', 'edit');\n      break;\n  }\n}\n\nfunction updateButtons() {\n  window.chrome.runtime.sendMessage({\n    action: \"check_status\"\n  }, function (response) {\n    switchButtons(response.status);\n  });\n}\n\njquery__WEBPACK_IMPORTED_MODULE_9___default()(document).ready(function () {\n  updateButtons();\n  jquery__WEBPACK_IMPORTED_MODULE_9___default()('#start').click(function () {\n    switchButtons(\"recording\");\n    window.chrome.runtime.sendMessage({\n      action: \"start_recording\"\n    });\n    window.chrome.runtime.sendMessage({\n      action: \"update_buttons\"\n    });\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_9___default()('#pause').click(function () {\n    switchButtons(\"pause\");\n    window.chrome.runtime.sendMessage({\n      action: \"pause_recording\"\n    });\n    window.chrome.runtime.sendMessage({\n      action: \"update_buttons\"\n    });\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_9___default()('#resume').click(function () {\n    switchButtons(\"recording\");\n    window.chrome.runtime.sendMessage({\n      action: \"resume_recording\"\n    });\n    window.chrome.runtime.sendMessage({\n      action: \"update_buttons\"\n    });\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_9___default()('#stop').click(function () {\n    switchButtons(\"stopped\");\n    window.chrome.runtime.sendMessage({\n      action: \"stop_recording\"\n    });\n    window.chrome.runtime.sendMessage({\n      action: \"update_buttons\"\n    });\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_9___default()('#edit').click(function () {\n    window.chrome.tabs.create({\n      url: 'popup2.html'\n    }); // 跳转编辑保存页\n\n    window.chrome.tabs.query({}, function (tabs) {\n      // 关闭所有弹窗\n      for (var i = 0; i < tabs.length; i++) {\n        window.chrome.tabs.sendMessage(tabs[i].id, {\n          action: 'remove_popup1'\n        });\n      }\n    });\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_9___default()('#add_group').click(function () {\n    if (vm.$data.inputName.length !== 0) {\n      vm.$data.groupList.push({\n        id: vm.$data.groupList.length + 1,\n        name: vm.$data.inputName,\n        counter: 0\n      });\n      vm.$data.inputName = '';\n    }\n\n    window.chrome.runtime.sendMessage({\n      action: \"update_group_list\",\n      groupList: vm.$data.groupList\n    });\n  });\n  window.chrome.runtime.onMessage.addListener(function (request) {\n    switch (request.action) {\n      case \"update_buttons\":\n        updateButtons();\n        break;\n\n      case \"update_transactions\":\n        vm.$data.groupList = request.data;\n        vm.$forceUpdate();\n        break;\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/popup1/main.js?");

/***/ }),

/***/ 1:
/*!**********************************!*\
  !*** multi ./src/popup1/main.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/hanshiqian/MyFiles/api-recorder/src/popup1/main.js */\"./src/popup1/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/popup1/main.js?");

/***/ })

/******/ });