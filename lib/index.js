"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _photoswipe = _interopRequireDefault(require("photoswipe"));

var _photoswipeUiDefault = _interopRequireDefault(require("photoswipe/dist/photoswipe-ui-default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ImageViewer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ImageViewer, _Component);

  function ImageViewer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.open = function (index) {
      if (index === void 0) {
        index = 0;
      }

      var _this$props = _this.props,
          _this$props$imgs = _this$props.imgs,
          imgs = _this$props$imgs === void 0 ? [] : _this$props$imgs,
          _this$props$options = _this$props.options,
          options = _this$props$options === void 0 ? {} : _this$props$options;
      if (!imgs.length) return;
      var pswpElement = _this.el;
      var items = imgs.map(function (item) {
        return {
          src: item,
          w: 0,
          h: 0
        };
      }); // define options (if needed)

      var opts = _objectSpread({
        // optionName: 'option value'
        index: index
      }, options); // Initializes and opens PhotoSwipe
      // console.log(PhotoSwipeUIDefault);


      _this.gallery = new _photoswipe["default"](pswpElement, _photoswipeUiDefault["default"], items, opts);

      _this.gallery.listen('imageLoadComplete', function (galleryIndex, item) {
        if (!item.w || !item.h) {
          var img = new Image();
          img.src = item.src;

          img.onload = function () {
            item.w = img.width;
            item.h = img.height;

            _this.gallery.invalidateCurrItems();

            _this.gallery.updateSize(true);
          };
        }
      });

      _this.gallery.listen('close', function () {
        console.log('close gallery');
      });

      _this.gallery.listen('destroy', function () {
        console.log('destroy gallery');

        _this.props.onClose();
      });

      _this.gallery.init();
    };

    return _this;
  }

  var _proto = ImageViewer.prototype;

  _proto.render = function render() {
    var _this2 = this;

    return _react["default"].createElement("div", {
      className: "ImageViewer"
    }, _react["default"].createElement("div", {
      className: "pswp",
      tabIndex: "-1",
      role: "dialog",
      "aria-hidden": "true",
      ref: function ref(_ref) {
        _this2.el = _ref;
      }
    }, _react["default"].createElement("div", {
      className: "pswp__bg"
    }), _react["default"].createElement("div", {
      className: "pswp__scroll-wrap"
    }, _react["default"].createElement("div", {
      className: "pswp__container"
    }, _react["default"].createElement("div", {
      className: "pswp__item"
    }), _react["default"].createElement("div", {
      className: "pswp__item"
    }), _react["default"].createElement("div", {
      className: "pswp__item"
    })), _react["default"].createElement("div", {
      className: "pswp__ui pswp__ui--hidden"
    }, _react["default"].createElement("div", {
      className: "pswp__top-bar"
    }, _react["default"].createElement("div", {
      className: "pswp__counter"
    }), _react["default"].createElement("button", {
      className: "pswp__button pswp__button--close",
      title: "\u5173\u95ED"
    }), _react["default"].createElement("button", {
      className: "pswp__button pswp__button--zoom",
      title: "\u653E\u5927/\u7F29\u5C0F"
    }), _react["default"].createElement("div", {
      className: "pswp__preloader"
    }, _react["default"].createElement("div", {
      className: "pswp__preloader__icn"
    }, _react["default"].createElement("div", {
      className: "pswp__preloader__cut"
    }, _react["default"].createElement("div", {
      className: "pswp__preloader__donut"
    }))))), _react["default"].createElement("div", {
      className: "pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
    }, _react["default"].createElement("div", {
      className: "pswp__share-tooltip"
    })), _react["default"].createElement("button", {
      className: "pswp__button pswp__button--arrow--left",
      title: "\u4E0A\u4E00\u5F20"
    }), _react["default"].createElement("button", {
      className: "pswp__button pswp__button--arrow--right",
      title: "\u4E0B\u4E00\u5F20"
    }), _react["default"].createElement("div", {
      className: "pswp__caption"
    }, _react["default"].createElement("div", {
      className: "pswp__caption__center"
    }))))));
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.handleOpen();
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    this.handleOpen();
  };

  _proto.handleOpen = function handleOpen() {
    var visible = this.props.visible; // 不使用visible模式时 需要满足visible === 'undefined'

    if (visible || typeof visible === 'undefined') {
      this.open(this.props.index);
    }
  };

  return ImageViewer;
}(_react.Component);

ImageViewer.propTypes = process.env.NODE_ENV !== "production" ? {
  // 从0开始
  index: _propTypes["default"].number,
  imgs: _propTypes["default"].arrayOf(_propTypes["default"].string),
  onClose: _propTypes["default"].any,
  visible: _propTypes["default"].bool,
  options: _propTypes["default"].any
} : {};
var _default = ImageViewer;
exports["default"] = _default;