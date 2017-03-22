var AdClientLibrary =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use-strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdClientLibrary = function () {
  function AdClientLibrary(props) {
    _classCallCheck(this, AdClientLibrary);

    this.containerId = props.containerId;
    this.updateInterval = props.updateInterval;
    this.ads = new Array();
  }

  _createClass(AdClientLibrary, [{
    key: 'appendAds',
    value: function appendAds() {
      var _this = this;

      var index = 0;

      setInterval(function () {
        var element = document.createElement('div');
        var node = document.getElementById(_this.containerId);

        element.innerHTML = _this.ads[index++];

        if (node.hasChildNodes()) {
          node.removeChild(node.firstChild);
        }

        node.appendChild(element);

        if (index == _this.ads.length) {
          index = 0;
        }
      }, this.updateInterval * 1000);
    }
  }, {
    key: 'runAd',
    value: function runAd() {
      if (this.ads.length) {
        this.appendAds();
      } else {
        this.prefetchAd();
        this.appendAds();
      }
    }
  }, {
    key: 'prefetchAd',
    value: function prefetchAd() {
      var _this2 = this;

      var url = 'https://5xhlcfzk8c.execute-api.eu-west-1.amazonaws.com/prod/mock-engine';

      fetch(url, {
        method: 'get',
        mode: 'cors'
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.ads.push(json.ad);
      });
    }
  }, {
    key: 'setUpdateInterval',
    value: function setUpdateInterval(timeInMins) {
      this.updateInterval = timeInMins;
    }
  }]);

  return AdClientLibrary;
}();

module.exports = AdClientLibrary;

/***/ })
/******/ ]);