"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _detectPassiveEvents = require("detect-passive-events");

var _detectPassiveEvents2 = _interopRequireDefault(_detectPassiveEvents);

var _imgUrlGen = require("./imgUrlGen");

var _imgSettings = require("./imgSettings");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//use capture by default
var eventSettings = true;

if (_detectPassiveEvents2.default.hasSupport === true) {
    eventSettings = { capture: false, passive: true };
}

var listeners = [];
var pending = [];

var register = exports.register = function register(component) {
    if (listeners.length == 0) {
        bindEvents();
    }
    listeners.push(component);
    tryShowImage(component);
};

var bindEvents = function bindEvents() {
    window.addEventListener("scroll", checkVisible, eventSettings);
};

var checkVisible = function checkVisible() {
    for (var i = 0; i < listeners.length; ++i) {
        var listener = listeners[i];
        tryShowImage(listener);
    }
    purgePending();
};

var tryShowImage = function tryShowImage(component) {
    var node = _reactDom2.default.findDOMNode(component);
    if (node && shouldBeShown(node)) {
        var _component$props = component.props,
            id = _component$props.id,
            width = _component$props.width,
            height = _component$props.height,
            fileName = _component$props.fileName,
            quality = _component$props.quality,
            altText = _component$props.altText;

        var image = { id: id, width: width, height: height, fileName: fileName, quality: quality, altText: altText };
        component.src = (0, _imgUrlGen.getUrl)(node, image);
        component.visible = true;
        component.forceUpdate();
        pending.push(component);
    }
};

var shouldBeShown = function shouldBeShown(node) {
    //if a user is hidden by css or otherwise, the offset parent will be null https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent  
    if (!node.offsetParent) {
        return false;
    }
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docViewBottom = scrollTop + window.outerHeight;
    var elemTop = getYPosition(node);
    return elemTop - _imgSettings.imageSettings.lazyScrollThreshold <= docViewBottom;
};

var getYPosition = function getYPosition(node) {
    var yPosition = 0;
    var el = node;
    while (el) {
        yPosition += el.offsetTop - el.scrollTop + el.clientTop;
        el = el.offsetParent;
    }

    return yPosition;
};

var purgePending = function purgePending() {
    pending.forEach(function (component) {
        var index = listeners.indexOf(component);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    });

    pending = [];
};