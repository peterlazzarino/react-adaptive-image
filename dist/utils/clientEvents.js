"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deregister = exports.register = undefined;

var _detectPassiveEvents = require("detect-passive-events");

var _detectPassiveEvents2 = _interopRequireDefault(_detectPassiveEvents);

var _imgUrlGen = require("./imgUrlGen");

var _imgSettings = require("./imgSettings");

var _elValidation = require("./elValidation");

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

var register = exports.register = function register(component, callback) {
    if (listeners.length == 0) {
        bindEvents();
    }
    listeners.push({
        component: component,
        callback: callback
    });
    tryShowImage(component, callback);
};

var deregister = exports.deregister = function deregister(id) {
    removeListener(id);
};

var bindEvents = function bindEvents() {
    window.addEventListener("scroll", checkVisible, eventSettings);
};

var checkVisible = function checkVisible() {
    for (var i = 0; i < listeners.length; ++i) {
        var listener = listeners[i];
        tryShowImage(listener.component, listener.callback);
    }
    purgePending();
};

var tryShowImage = function tryShowImage(component, callback) {
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
        var nextUrl = (0, _imgUrlGen.getUrl)(node, image);
        component.setState({
            src: nextUrl,
            visible: true
        });
        component.forceUpdate();
        callback(nextUrl);
        pending.push(component);
    }
};

var shouldBeShown = function shouldBeShown(node) {
    if (!(0, _elValidation.isValidDOMElement)(node)) {
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

var removeListener = function removeListener(id) {
    var index = listeners.findIndex(function (x) {
        return x.component.props.id == id;
    });
    if (index !== -1) {
        listeners.splice(index, 1);
    }
};

var purgePending = function purgePending() {
    pending.forEach(function (component) {
        removeListener(component.props.id);
    });

    pending = [];
};