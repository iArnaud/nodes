function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var __deps__, __imports__, _imports__$grommet, Box, ResponsiveContext, Menu, _imports__$utils, React, Router, _, icons, DnD, _imports__$nodehub, NodeBar, NodeLink, NodeDragTypes, napi, NodeView, viewer, iconSize, Menubar, NodeSide, Bottombar, view, icon;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, ResponsiveContext = _imports__$grommet.ResponsiveContext, Menu = _imports__$grommet.Menu;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, Router = _imports__$utils.Router, _ = _imports__$utils.lodash, icons = _imports__$utils.icons, DnD = _imports__$utils.DnD;
            _imports__$nodehub = __imports__.nodehub, NodeBar = _imports__$nodehub.NodeBar, NodeLink = _imports__$nodehub.NodeLink, NodeDragTypes = _imports__$nodehub.NodeDragTypes;
            napi = __deps__.napi, NodeView = __deps__.NodeView, viewer = __deps__.viewer, iconSize = __deps__.iconSize;

            Menubar = function Menubar(_ref3) {
              var node = _ref3.node;
              var screen = React.useContext(ResponsiveContext);
              return React.createElement(Box, {
                fill: "horizontal",
                direction: "row",
                align: "center",
                pad: screen === 'small' ? 'small' : 'xsmall',
                background: _.get(node.sides, 'settings.ui.menubar.background', {
                  opacity: 'medium',
                  color: 'black'
                })
              }, React.createElement(NodeBar, {
                node: node,
                napi: napi,
                viewer: viewer,
                showViewer: true
              }));
            };

            NodeSide = function NodeSide(_ref4) {
              var node = _ref4.node,
                  side = _ref4.side,
                  _ref4$mode = _ref4.mode,
                  mode = _ref4$mode === void 0 ? 'icon' : _ref4$mode,
                  viewer = _ref4.viewer,
                  napi = _ref4.napi,
                  _ref4$height = _ref4.height,
                  height = _ref4$height === void 0 ? '30px' : _ref4$height,
                  _ref4$width = _ref4.width,
                  width = _ref4$width === void 0 ? '30px' : _ref4$width;

              var _DnD$useDrag = DnD.useDrag({
                item: {
                  type: NodeDragTypes.SIDE,
                  node: node,
                  side: side
                }
              }),
                  _DnD$useDrag2 = _slicedToArray(_DnD$useDrag, 2),
                  dragRef = _DnD$useDrag2[1];

              return React.createElement(NodeLink, {
                node: node.id,
                query: Router.query,
                view: side
              }, React.createElement(Box, {
                ref: function ref(node) {
                  return dragRef(node);
                },
                "data-testid": "changeSide:".concat(side, ".action"),
                style: {
                  cursor: 'pointer'
                },
                height: height,
                width: width,
                round: "xsmall",
                pad: "xsmall"
              }, React.createElement(NodeView, {
                node: node,
                view: side,
                mode: mode,
                viewer: viewer,
                napi: napi,
                plain: true
              })));
            };

            Bottombar = function Bottombar(_ref5) {
              var node = _ref5.node;
              return React.createElement(Box, {
                fill: "horizontal"
              }, React.createElement(Box, {
                fill: "horizontal",
                align: "center",
                justify: "between",
                direction: "row",
                pad: "small"
              }, napi.hasPermission(viewer, node, 'changeSide') && React.createElement(Box, {
                direction: "row",
                gap: "xsmall",
                overflow: "scroll",
                align: "center",
                justify: "center",
                fill: "horizontal",
                wrap: true
              }, Object.keys(node.sides).filter(function (key) {
                return key !== 'layout';
              }).map(function (key) {
                var isActive = Router.query["".concat(node.id, "-view")] ? key === Router.query["".concat(node.id, "-view")].split('-')[0] : key === napi.getNodeView(node, false);
                return React.createElement(Box, {
                  elevation: isActive ? 'large' : null,
                  key: key,
                  align: "center",
                  justify: "center",
                  round: "xsmall",
                  background: {
                    color: 'black',
                    opacity: 'medium'
                  },
                  pad: "xsmall",
                  direction: "row",
                  gap: "xsmall"
                }, React.createElement(NodeSide, {
                  node: node,
                  side: key,
                  napi: napi,
                  viewer: viewer
                }), isActive && React.createElement(Menu, {
                  dropAlign: {
                    bottom: 'top',
                    left: 'left'
                  },
                  items: [{
                    icon: React.createElement(Box, {
                      align: "center",
                      justify: "center"
                    }, React.createElement(icons.Edit, null)),
                    onClick: function () {
                      var _onClick = _asyncToGenerator(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                return _context.abrupt("return", Router.push({
                                  pathname: Router.pathname,
                                  query: _objectSpread({}, Router.query, _defineProperty({}, "".concat(node.id, "-view"), "".concat(key, "-edit")))
                                }));

                              case 1:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }));

                      function onClick() {
                        return _onClick.apply(this, arguments);
                      }

                      return onClick;
                    }()
                  }, {
                    icon: React.createElement(Box, {
                      align: "center",
                      justify: "center"
                    }, React.createElement(icons.Pin, null)),
                    onClick: function () {
                      var _onClick2 = _asyncToGenerator(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee2() {
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                return _context2.abrupt("return", napi.updateNodeSide(node, 'settings/defaultView', key));

                              case 1:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, _callee2);
                      }));

                      function onClick() {
                        return _onClick2.apply(this, arguments);
                      }

                      return onClick;
                    }()
                  }, {
                    icon: React.createElement(Box, {
                      fill: true,
                      align: "center"
                    }, React.createElement(icons.Next, null)),
                    onClick: function () {
                      var _onClick3 = _asyncToGenerator(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee3() {
                        var newNode;
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                _context3.next = 2;
                                return napi.createNode(null, {
                                  parentId: node.id,
                                  sides: _defineProperty({}, key, node.sides[key])
                                });

                              case 2:
                                newNode = _context3.sent;
                                Router.push({
                                  pathname: Router.pathname,
                                  query: _objectSpread({}, Router.query, {
                                    node: newNode.id,
                                    parent: node.parentId
                                  })
                                });
                                _context3.next = 6;
                                return napi.deleteNodeSide(node, key, __deps__);

                              case 6:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, _callee3);
                      }));

                      function onClick() {
                        return _onClick3.apply(this, arguments);
                      }

                      return onClick;
                    }()
                  }, {
                    icon: React.createElement(Box, {
                      align: "center",
                      justify: "center"
                    }, React.createElement(icons.Trash, null)),
                    onClick: function () {
                      var _onClick4 = _asyncToGenerator(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee4() {
                        var _Router$query, _ref6, _view, newQuery;

                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                _context4.next = 2;
                                return napi.deleteNodeSide(node, key, __deps__);

                              case 2:
                                _Router$query = Router.query, _ref6 = "".concat(node.id, "-view"), _view = _Router$query[_ref6], newQuery = _objectWithoutProperties(_Router$query, [_ref6].map(_toPropertyKey));
                                Router.push({
                                  pathname: Router.pathname,
                                  query: newQuery
                                });

                              case 4:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        }, _callee4);
                      }));

                      function onClick() {
                        return _onClick4.apply(this, arguments);
                      }

                      return onClick;
                    }()
                  }]
                }, React.createElement(Box, {
                  align: "center",
                  justify: "center"
                }, React.createElement(icons.More, {
                  color: "control"
                }))));
              }))), _.get(node, 'sides.settings.ui.background.audio') && React.createElement(Box, {
                fill: "horizontal"
              }, React.createElement("audio", {
                style: {
                  width: '100%',
                  height: '30px'
                },
                src: node.sides.settings.ui.background.audio,
                controls: true,
                loop: true
              })));
            };

            view = function view(_ref7) {
              var node = _ref7.node;
              var routerView = Router.query["".concat(node.id, "-view")];
              var view = routerView && routerView !== 'ui' ? routerView : napi.getNodeView(node, false);
              return React.createElement(Box, {
                fill: true,
                background: napi.getNodeBackground(node)
              }, React.createElement(Box, {
                fill: "horizontal"
              }, React.createElement(Menubar, {
                node: node
              })), React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(NodeView, {
                node: node,
                view: view,
                napi: napi,
                viewer: viewer
              })), React.createElement(Box, {
                fill: "horizontal"
              }, React.createElement(Bottombar, {
                node: node
              })));
            };

            icon = function icon(_ref8) {
              var node = _ref8.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Template, {
                size: iconSize
              }));
            };

            return _context5.abrupt("return", {
              modes: {
                icon: icon,
                view: view
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