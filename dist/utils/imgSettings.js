"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initImages = exports.imageResolver = exports.imageSettings = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageSettings = exports.imageSettings = {
    noWidthReplacementSize: 200,
    maxWidth: 1366,
    resizeBreakpoints: [330, 480, 768, 1100, 1920, 2250],
    lazyScrollThreshold: 300
};

var imageResolver = exports.imageResolver = function imageResolver(image) {
    return "/" + image.id + "." + image.caption;
};

var initImages = exports.initImages = function initImages(settings) {
    exports.imageResolver = imageResolver = settings.imageResolver;
    exports.imageSettings = imageSettings = (0, _assign2.default)({}, imageSettings, settings.imageSettings);
};