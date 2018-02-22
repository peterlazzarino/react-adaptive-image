"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStaticUrl = exports.getUrl = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _imgSettings = require("./imgSettings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUrl = exports.getUrl = function getUrl(node, image) {
    var width = image.width,
        height = image.height;

    var calcWidth = width;
    if (!calcWidth) {
        calcWidth = Math.max(node.offsetWidth, 250);
    }
    var finalWidth = resolutionValue(calcWidth);
    //image magick will resize image to aspect ratio if 0 is given as a height parameter.
    var finalHeight = height ? resolutionValue(height) : 0;
    return (0, _imgSettings.imageResolver)((0, _assign2.default)({}, image, {
        width: finalWidth,
        height: finalHeight
    }));
};

var getStaticUrl = exports.getStaticUrl = function getStaticUrl(image) {
    if (!image.width) {
        console.warn("react-adaptive-image: You must provide a width to server render src attributes or use preload");
    }
    return (0, _imgSettings.imageResolver)(image);
};

var resolutionValue = function resolutionValue(val) {
    var realPixelRatio = Math.floor(window.devicePixelRatio);
    return (realPixelRatio || 1) > 1 ? val * realPixelRatio : val;
};