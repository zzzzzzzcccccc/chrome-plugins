"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _newArrowCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/newArrowCheck"));
var _common = require("@chrome-plugin/common");
var _this = void 0;
(0, _common.onMessage)(function (msg, messageSender, sendResponse) {
  (0, _newArrowCheck2["default"])(this, _this);
  console.log(msg);
}.bind(void 0));