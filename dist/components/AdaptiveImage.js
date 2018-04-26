"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx2 = require("babel-runtime/helpers/jsx");

var _jsx3 = _interopRequireDefault(_jsx2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _clientEvents = require("../utils/clientEvents");

var _imgUrlGen = require("../utils/imgUrlGen");

var _Image = require("./Image");

var _Image2 = _interopRequireDefault(_Image);

var _BackgroundImage = require("./BackgroundImage");

var _BackgroundImage2 = _interopRequireDefault(_BackgroundImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canUseDOM = typeof window !== "undefined";

var AdaptiveImage = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(AdaptiveImage, _React$Component);

    function AdaptiveImage(props) {
        (0, _classCallCheck3.default)(this, AdaptiveImage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AdaptiveImage.__proto__ || (0, _getPrototypeOf2.default)(AdaptiveImage)).call(this, props));

        _this.state = {
            visible: false,
            src: null
        };
        _this.loadImage = _this.loadImage.bind(_this);
        _this.handleClientLoad = _this.handleClientLoad.bind(_this);
        _this.handleServerLoad = _this.handleServerLoad.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(AdaptiveImage, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.loadImage(this.props);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            (0, _clientEvents.deregister)(this.props.id);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.fileName != nextProps.fileName || this.props.id != nextProps.id) {
                (0, _clientEvents.deregister)(this.props.id);
                this.loadImage(nextProps);
            }
        }
    }, {
        key: "loadImage",
        value: function loadImage(props) {
            var id = props.id,
                height = props.height,
                preLoad = props.preLoad,
                onShow = props.onShow,
                fileName = props.fileName,
                width = props.width,
                quality = props.quality,
                altText = props.altText;

            var image = { id: id, width: width, height: height, fileName: fileName, quality: quality, altText: altText };
            if (canUseDOM) {
                this.handleClientLoad(image);
            } else {
                this.handleServerLoad(image);
            }
        }
    }, {
        key: "handleServerLoad",
        value: function handleServerLoad(image) {
            var _props = this.props,
                preLoad = _props.preLoad,
                onShow = _props.onShow,
                src = _props.src;

            if (src) {
                this.showImage(src);
            } else if (preLoad) {
                this.showImage((0, _imgUrlGen.getStaticUrl)(image));
            }
        }
    }, {
        key: "handleClientLoad",
        value: function handleClientLoad(image) {
            var _props2 = this.props,
                preLoad = _props2.preLoad,
                onShow = _props2.onShow,
                src = _props2.src;

            if (src) {
                this.showImage(src);
            } else if (!preLoad) {
                (0, _clientEvents.register)(this, onShow);
            } else {
                var _src = (0, _imgUrlGen.getUrl)(_reactDom2.default.findDOMNode(this), image);
                this.showImage(_src);
            }
        }
    }, {
        key: "showImage",
        value: function showImage(src) {
            var onShow = this.props.onShow;

            this.setState({
                src: src,
                visible: true
            });
            onShow(src);
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                visible = _state.visible,
                src = _state.src;
            var _props3 = this.props,
                altText = _props3.altText,
                backgroundImage = _props3.backgroundImage,
                itemProp = _props3.itemProp,
                className = _props3.className;

            var ImgEl = backgroundImage ? _BackgroundImage2.default : _Image2.default;
            var hideImage = !visible || !src;
            var imgSrc = hideImage ? null : src;
            return (0, _jsx3.default)(ImgEl, {
                src: imgSrc,
                alt: altText,
                itemProp: itemProp,
                className: className
            });
        }
    }]);
    return AdaptiveImage;
}(_react2.default.Component), _class.defaultProps = {
    quality: 80,
    fileName: "image.jpg",
    onShow: function onShow() {}
}, _temp);


AdaptiveImage.propTypes = {
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    fileName: _propTypes2.default.string.isRequired,
    quality: _propTypes2.default.number,
    className: _propTypes2.default.string,
    preLoad: _propTypes2.default.bool,
    altText: _propTypes2.default.string,
    itemProp: _propTypes2.default.string,
    scrollThreshold: _propTypes2.default.number,
    onShow: _propTypes2.default.func,
    src: _propTypes2.default.string,
    backgroundImage: _propTypes2.default.bool
};

exports.default = AdaptiveImage;