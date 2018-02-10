"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initImages = undefined;

var _AdaptiveImage = require("./components/AdaptiveImage");

var _AdaptiveImage2 = _interopRequireDefault(_AdaptiveImage);

var _imgSettings = require("./utils/imgSettings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.initImages = _imgSettings.initImages;
exports.default = _AdaptiveImage2.default;