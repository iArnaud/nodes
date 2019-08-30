function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref) {
    var __deps__, __imports__, _imports__$grommet, Button, Box, TextInput, Paragraph, Anchor, Text, Image, _imports__$utils, React, icons, _, NodePreview, napi, iconSize, viewer, Search, view, icon, preview, edit;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Button = _imports__$grommet.Button, Box = _imports__$grommet.Box, TextInput = _imports__$grommet.TextInput, Paragraph = _imports__$grommet.Paragraph, Anchor = _imports__$grommet.Anchor, Text = _imports__$grommet.Text, Image = _imports__$grommet.Image;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, icons = _imports__$utils.icons, _ = _imports__$utils.lodash;
            NodePreview = __imports__.nodehub.NodePreview;
            napi = __deps__.napi, iconSize = __deps__.iconSize, viewer = __deps__.viewer;

            Search = function Search(_ref3) {
              var onSubmit = _ref3.onSubmit,
                  q = _ref3.q;

              var _React$useState = React.useState(q),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  val = _React$useState2[0],
                  setVal = _React$useState2[1];

              return React.createElement(Box, {
                fill: true,
                direction: "row",
                gap: "xsmall"
              }, React.createElement(Button, {
                plain: true,
                onClick: function onClick() {
                  return onSubmit(val);
                }
              }, React.createElement(icons.Search, null)), React.createElement(TextInput, {
                onKeyPress: function onKeyPress(e) {
                  return e.key === 'Enter' && onSubmit(val);
                },
                placeholder: "Search",
                defaultValue: q,
                autoFocus: true,
                onChange: function onChange(event) {
                  setVal(event.target.value);
                }
              }));
            };

            view =
            /*#__PURE__*/
            function (_React$Component) {
              _inherits(view, _React$Component);

              function view(props) {
                var _this;

                _classCallCheck(this, view);

                _this = _possibleConstructorReturn(this, _getPrototypeOf(view).call(this, props));
                var node = _this.props.node;

                var _$get = _.get(node, 'sides.search', {}),
                    q = _$get.q,
                    _$get$results = _$get.results,
                    results = _$get$results === void 0 ? [] : _$get$results,
                    top = _$get.top,
                    provider = _$get.provider;

                _this.state = {
                  top: top,
                  results: results,
                  q: q,
                  provider: provider
                };
                _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
                _this.makeSearch = _this.makeSearch.bind(_assertThisInitialized(_this));
                return _this;
              }

              _createClass(view, [{
                key: "onSubmit",
                value: function onSubmit(q) {
                  this.setState({
                    q: q
                  }); // window.open(`https://google.com/search?q=${q}`, '_blank')
                }
              }, {
                key: "makeSearch",
                value: function () {
                  var _makeSearch = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee() {
                    var node, q, provider, result;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            node = this.props.node;
                            q = this.state.q;
                            provider = null;

                            if (q.startsWith('g:')) {
                              // window.open(`https://google.com/search?q=${q}`, '_blank')
                              provider = 'google';
                            } else if (q.startsWith('d:')) {
                              provider = 'duckduckgo';
                            }

                            _context.next = 6;
                            return napi.search(q, provider);

                          case 6:
                            result = _context.sent;

                            if (!napi.hasPermission(viewer, node, 'editSide')) {
                              _context.next = 10;
                              break;
                            }

                            _context.next = 10;
                            return napi.updateNodeSide(node, 'search', _objectSpread({}, result, {
                              q: q,
                              provider: provider
                            }));

                          case 10:
                            return _context.abrupt("return", _objectSpread({}, result, {
                              provider: provider
                            }));

                          case 11:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  function makeSearch() {
                    return _makeSearch.apply(this, arguments);
                  }

                  return makeSearch;
                }()
              }, {
                key: "componentDidMount",
                value: function () {
                  var _componentDidMount = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2() {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  function componentDidMount() {
                    return _componentDidMount.apply(this, arguments);
                  }

                  return componentDidMount;
                }()
              }, {
                key: "componentDidUpdate",
                value: function () {
                  var _componentDidUpdate = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3(prevProps, prevState) {
                    var q, _ref4, top, results, provider;

                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            q = this.state.q;

                            if (!(q && q !== prevState.q)) {
                              _context3.next = 9;
                              break;
                            }

                            _context3.next = 4;
                            return this.makeSearch();

                          case 4:
                            _ref4 = _context3.sent;
                            top = _ref4.top;
                            results = _ref4.results;
                            provider = _ref4.provider;
                            this.setState({
                              results: results,
                              top: top,
                              provider: provider
                            });

                          case 9:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, this);
                  }));

                  function componentDidUpdate(_x2, _x3) {
                    return _componentDidUpdate.apply(this, arguments);
                  }

                  return componentDidUpdate;
                }()
              }, {
                key: "render",
                value: function render() {
                  var node = this.props.node;
                  var _this$state = this.state,
                      results = _this$state.results,
                      q = _this$state.q,
                      top = _this$state.top,
                      provider = _this$state.provider;
                  return React.createElement(Box, {
                    align: "center",
                    justify: top ? 'start' : 'center',
                    fill: true,
                    gap: "small",
                    pad: "small"
                  }, React.createElement(Box, {
                    fill: "horizontal",
                    style: {
                      minHeight: '50px'
                    },
                    pad: "small",
                    round: true,
                    background: {
                      color: 'black',
                      opacity: 'medium'
                    }
                  }, React.createElement(Search, {
                    q: q,
                    onSubmit: this.onSubmit
                  })), top && React.createElement(Box, {
                    direction: "row",
                    align: "center",
                    justify: "center",
                    fill: "horizontal",
                    height: "medium",
                    round: true,
                    background: {
                      color: 'black',
                      opacity: 'medium'
                    }
                  }, top.image && React.createElement(Box, {
                    height: "small",
                    width: "small"
                  }, React.createElement(Image, {
                    src: top.image,
                    height: "small",
                    width: "small",
                    fit: "contain"
                  })), React.createElement(Box, null, React.createElement(Text, {
                    weight: "bold"
                  }, top.title), React.createElement(Paragraph, null, top.description), React.createElement(Anchor, {
                    href: top.url,
                    target: "_blank"
                  }, top.url))), React.createElement(Box, {
                    overflow: "scroll",
                    gap: "small",
                    fill: top,
                    background: {
                      color: 'black',
                      opacity: 'medium'
                    },
                    round: true,
                    pad: results.length ? 'small' : null
                  }, results.map(function (result) {
                    return provider ? React.createElement(Box, {
                      key: result.url,
                      fill: "horizontal",
                      align: "start",
                      justify: "start",
                      gap: "xsmall",
                      style: {
                        minHeight: '50px'
                      },
                      background: {
                        color: 'black',
                        opacity: 'strong'
                      },
                      round: true,
                      pad: "small"
                    }, React.createElement(Box, {
                      fill: true,
                      align: "center",
                      justify: "between",
                      direction: "row"
                    }, React.createElement(Box, null, React.createElement(Text, null, result.description), React.createElement(Anchor, {
                      size: "small",
                      href: result.url,
                      target: "_blank"
                    }, result.url)), React.createElement(Box, null, React.createElement(Button, {
                      plain: true,
                      onClick:
                      /*#__PURE__*/
                      _asyncToGenerator(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee4() {
                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                napi.createNode(null, {
                                  parentId: node.id,
                                  name: result.title,
                                  sides: {
                                    link: {
                                      url: result.url,
                                      preview: true
                                    }
                                  }
                                });

                              case 1:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        }, _callee4);
                      }))
                    }, React.createElement(icons.LinkBottom, {
                      color: "control"
                    }))))) : React.createElement(Box, {
                      key: result.id,
                      width: "small"
                    }, React.createElement(NodePreview, {
                      node: result,
                      viewer: viewer,
                      napi: napi,
                      showPreview: _.get(result.sides, 'settings.ui.background.image') !== _.get(node.sides, 'settings.ui.background.image')
                    }));
                  })));
                }
              }]);

              return view;
            }(React.Component);

            icon = function icon(_ref6) {
              var node = _ref6.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Search, {
                size: iconSize
              }));
            };

            preview = icon;
            edit = view;
            return _context5.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();