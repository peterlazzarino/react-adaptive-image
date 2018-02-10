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

var _class, _class2, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _clientEvents = require("../utils/clientEvents");

var _imgUrlGen = require("../utils/imgUrlGen");

var _clientComponent = require("client-component");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdaptiveImage = (0, _clientComponent.clientOnly)(_class = (_temp = _class2 = function (_React$Component) {
    (0, _inherits3.default)(AdaptiveImage, _React$Component);

    function AdaptiveImage(props) {
        (0, _classCallCheck3.default)(this, AdaptiveImage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AdaptiveImage.__proto__ || (0, _getPrototypeOf2.default)(AdaptiveImage)).call(this, props));

        _this.visible = false;
        _this.src = null;
        return _this;
    }

    (0, _createClass3.default)(AdaptiveImage, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (!this.props.preLoad) {
                (0, _clientEvents.register)(this);
            } else {
                var _props = this.props,
                    id = _props.id,
                    width = _props.width,
                    height = _props.height,
                    fileName = _props.fileName,
                    quality = _props.quality,
                    fileExtension = _props.fileExtension,
                    altText = _props.altText;

                var image = { id: id, width: width, height: height, fileName: fileName, quality: quality, fileExtension: fileExtension, altText: altText };
                this.src = (0, _imgUrlGen.getUrl)(_reactDom2.default.findDOMNode(this), image);
                this.visible = true;
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.visible || !this.src) {
                var noscript = null;
                return (0, _jsx3.default)("img", {
                    className: this.props.className
                });
            }
            return (0, _jsx3.default)("img", {
                src: this.src,
                className: this.props.className
            });
        }
    }]);
    return AdaptiveImage;
}(_react2.default.Component), _class2.defaultProps = {
    quality: 80,
    fileName: "image",
    fileExtension: "jpg"
}, _temp)) || _class;

AdaptiveImage.propTypes = {
    id: _propTypes2.default.string.isRequired,
    width: _propTypes2.default.number,
    height: _propTypes2.default.string,
    fileName: _propTypes2.default.string,
    quality: _propTypes2.default.number,
    className: _propTypes2.default.string,
    preLoad: _propTypes2.default.bool,
    fileExtension: _propTypes2.default.string,
    altText: _propTypes2.default.string,
    scrollThreshold: _propTypes2.default.number
};

exports.default = AdaptiveImage;