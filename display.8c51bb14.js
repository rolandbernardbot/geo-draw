(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{51:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);\n/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);\n/* harmony import */ var lit_html_directives_until__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(22);\n/* harmony import */ var _map_map_renderer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(25);\n\n\n\n\n\n\n\n\nfunction _templateObject2() {\n  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\\n            <div class=\\"display-view-root\\">\\n                <map-renderer .data=\\"", "\\"></map-renderer>\\n            </div>\\n        "]);\n\n  _templateObject2 = function _templateObject2() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _templateObject() {\n  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\\n            div.display-view-root {\\n                width: 100%;\\n                height: 100%;\\n                background: var(--background-dark);\\n                display: flex;\\n                align-items: center;\\n                justify-content: center;\\n                color: white;\\n            }\\n        "]);\n\n  _templateObject = function _templateObject() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\n\n\nvar DisplayView = /*#__PURE__*/function (_LitElement) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(DisplayView, _LitElement);\n\n  var _super = _createSuper(DisplayView);\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(DisplayView, [{\n    key: "fetchData",\n    value: function fetchData() {\n      var path = window.location.hash || \'#/\';\n      var data_match = path.match(new RegExp(\'#/?view/(.+)\'));\n\n      if (data_match) {\n        var data = data_match === null || data_match === void 0 ? void 0 : data_match[1];\n\n        if (!data) {\n          window.location.hash = \'#/404\';\n        } else {\n          try {\n            this.data = JSON.parse(atob(data));\n          } catch (e) {\n            window.location.hash = \'#/404\';\n          }\n        }\n      }\n    }\n  }], [{\n    key: "properties",\n    get: function get() {\n      return {\n        data: {\n          type: Object\n        }\n      };\n    }\n  }, {\n    key: "styles",\n    get: function get() {\n      return Object(lit_element__WEBPACK_IMPORTED_MODULE_7__[/* css */ "b"])(_templateObject());\n    }\n  }]);\n\n  function DisplayView() {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, DisplayView);\n\n    _this = _super.call(this);\n\n    _this.fetchData();\n\n    window.addEventListener(\'hashchange\', _this.fetchData.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this)));\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(DisplayView, [{\n    key: "render",\n    value: function render() {\n      return Object(lit_element__WEBPACK_IMPORTED_MODULE_7__[/* html */ "c"])(_templateObject2(), this.data);\n    }\n  }]);\n\n  return DisplayView;\n}(lit_element__WEBPACK_IMPORTED_MODULE_7__[/* LitElement */ "a"]);\n\ncustomElements.define(\'display-view\', DisplayView);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9kaXNwbGF5LXZpZXcuanM/NmJkZCJdLCJuYW1lcyI6WyJEaXNwbGF5VmlldyIsInBhdGgiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhhc2giLCJkYXRhX21hdGNoIiwibWF0Y2giLCJSZWdFeHAiLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsImUiLCJ0eXBlIiwiT2JqZWN0IiwiY3NzIiwiZmV0Y2hEYXRhIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJpbmQiLCJodG1sIiwiTGl0RWxlbWVudCIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFFQTs7SUFFTUEsVzs7Ozs7OztnQ0FzQlU7QUFDUixVQUFNQyxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsSUFBaEIsSUFBd0IsSUFBckM7QUFDQSxVQUFNQyxVQUFVLEdBQUdKLElBQUksQ0FBQ0ssS0FBTCxDQUFXLElBQUlDLE1BQUosQ0FBVyxjQUFYLENBQVgsQ0FBbkI7O0FBQ0EsVUFBR0YsVUFBSCxFQUFlO0FBQ1gsWUFBTUcsSUFBSSxHQUFHSCxVQUFILGFBQUdBLFVBQUgsdUJBQUdBLFVBQVUsQ0FBRyxDQUFILENBQXZCOztBQUNBLFlBQUcsQ0FBQ0csSUFBSixFQUFVO0FBQ05OLGdCQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLE9BQXZCO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsY0FBSTtBQUNBLGlCQUFLSSxJQUFMLEdBQVlDLElBQUksQ0FBQ0MsS0FBTCxDQUFXQyxJQUFJLENBQUNILElBQUQsQ0FBZixDQUFaO0FBQ0gsV0FGRCxDQUVFLE9BQU1JLENBQU4sRUFBUztBQUNQVixrQkFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixPQUF2QjtBQUNIO0FBQ0o7QUFDSjtBQUNKOzs7d0JBbkN1QjtBQUNwQixhQUFPO0FBQ0hJLFlBQUksRUFBRTtBQUFDSyxjQUFJLEVBQUVDO0FBQVA7QUFESCxPQUFQO0FBR0g7Ozt3QkFFbUI7QUFDaEIsYUFBT0MsK0RBQVA7QUFXSDs7O0FBbUJELHlCQUFjO0FBQUE7O0FBQUE7O0FBQ1Y7O0FBQ0EsVUFBS0MsU0FBTDs7QUFDQWQsVUFBTSxDQUFDZSxnQkFBUCxDQUF3QixZQUF4QixFQUFzQyxNQUFLRCxTQUFMLENBQWVFLElBQWYsNEZBQXRDO0FBSFU7QUFJYjs7Ozs2QkFFUTtBQUNMLGFBQU9DLGdFQUFQLHFCQUUrQixLQUFLWCxJQUZwQztBQUtIOzs7O0VBbkRxQlksOEQ7O0FBdUQxQkMsY0FBYyxDQUFDQyxNQUFmLENBQXNCLGNBQXRCLEVBQXNDdEIsV0FBdEMiLCJmaWxlIjoiNTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IGNzcywgaHRtbCwgTGl0RWxlbWVudCB9IGZyb20gJ2xpdC1lbGVtZW50J1xuaW1wb3J0IHsgdW50aWwgfSBmcm9tICdsaXQtaHRtbC9kaXJlY3RpdmVzL3VudGlsJztcblxuaW1wb3J0ICcuLi9tYXAvbWFwLXJlbmRlcmVyJztcblxuY2xhc3MgRGlzcGxheVZpZXcgZXh0ZW5kcyBMaXRFbGVtZW50IHtcblxuICAgIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHt0eXBlOiBPYmplY3R9LFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBzdHlsZXMoKSB7XG4gICAgICAgIHJldHVybiBjc3NgXG4gICAgICAgICAgICBkaXYuZGlzcGxheS12aWV3LXJvb3Qge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLWRhcmspO1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgZmV0Y2hEYXRhKCkge1xuICAgICAgICBjb25zdCBwYXRoID0gd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgJyMvJztcbiAgICAgICAgY29uc3QgZGF0YV9tYXRjaCA9IHBhdGgubWF0Y2gobmV3IFJlZ0V4cCgnIy8/dmlldy8oLispJykpO1xuICAgICAgICBpZihkYXRhX21hdGNoKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gZGF0YV9tYXRjaD8uWzFdO1xuICAgICAgICAgICAgaWYoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcjLzQwNCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IEpTT04ucGFyc2UoYXRvYihkYXRhKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyMvNDA0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mZXRjaERhdGEoKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLmZldGNoRGF0YS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBodG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc3BsYXktdmlldy1yb290XCI+XG4gICAgICAgICAgICAgICAgPG1hcC1yZW5kZXJlciAuZGF0YT1cIiR7dGhpcy5kYXRhfVwiPjwvbWFwLXJlbmRlcmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZGlzcGxheS12aWV3JywgRGlzcGxheVZpZXcpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///51\n')}}]);