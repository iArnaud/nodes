function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var index = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref) {
    var __deps__, __imports__, _imports__$grommet, Box, Text, Image, Table, Anchor, Markdown, Paragraph, _imports__$utils, React, _, icons, CodeEditor, Link, NodeLink, napi, NodeView, iconSize, viewer, Node, components, _view, view, _edit, edit, icon, preview;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, Text = _imports__$grommet.Text, Image = _imports__$grommet.Image, Table = _imports__$grommet.Table, Anchor = _imports__$grommet.Anchor, Markdown = _imports__$grommet.Markdown, Paragraph = _imports__$grommet.Paragraph;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, icons = _imports__$utils.icons, CodeEditor = _imports__$utils.CodeEditor, Link = _imports__$utils.Link;
            NodeLink = __imports__.nodehub.NodeLink;
            napi = __deps__.napi, NodeView = __deps__.NodeView, iconSize = __deps__.iconSize, viewer = __deps__.viewer;

            Node = function Node(_ref3) {
              var id = _ref3.id,
                  view = _ref3.view,
                  rest = _objectWithoutProperties(_ref3, ["id", "view"]);

              var _React$useState = React.useState(),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  node = _React$useState2[0],
                  setNode = _React$useState2[1];

              React.useEffect(function () {
                var getNode =
                /*#__PURE__*/
                function () {
                  var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(id) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.t0 = setNode;
                            _context.next = 3;
                            return napi.getNode(id);

                          case 3:
                            _context.t1 = _context.sent;
                            return _context.abrupt("return", (0, _context.t0)(_context.t1));

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function getNode(_x2) {
                    return _ref4.apply(this, arguments);
                  };
                }();

                getNode(id);
              }, [id]);
              return node ? React.createElement(Box, rest, React.createElement(NodeView, {
                node: node,
                view: view,
                viewer: viewer,
                napi: napi
              })) : null;
            };

            components = function components() {
              var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                  _ref5$size = _ref5.size,
                  size = _ref5$size === void 0 ? 'medium' : _ref5$size;

              return {
                p: {
                  component: Paragraph,
                  props: {
                    size: size
                  }
                },
                a: {
                  component: Anchor,
                  props: {
                    size: size
                  }
                },
                Box: {
                  component: Box
                },
                Node: {
                  component: Node
                },
                Link: {
                  component: Link
                },
                NodeLink: {
                  component: NodeLink
                },
                Text: {
                  component: Text,
                  props: {
                    size: size
                  }
                },
                Image: {
                  component: Image
                },
                Table: {
                  component: Table
                },
                Anchor: {
                  component: Anchor
                }
              };
            };

            _view = function _view(_ref6) {
              var align = _ref6.align,
                  justify = _ref6.justify,
                  pad = _ref6.pad,
                  size = _ref6.size;
              return function (_ref7) {
                var node = _ref7.node;

                var content = _.get(node.sides, 'markdown.content', "# ".concat(node.name));

                var background = _.get(node.sides, 'markdown.background') || {
                  color: 'black',
                  opacity: 'medium'
                };
                return React.createElement(Box, {
                  fill: true,
                  align: "center",
                  justify: "center",
                  pad: pad
                }, React.createElement(Box, {
                  fill: true,
                  align: "center",
                  justify: "center",
                  round: "small",
                  background: background,
                  overflow: "scroll"
                }, React.createElement(Box, {
                  fill: true,
                  align: "start",
                  justify: "start",
                  pad: "small"
                }, React.createElement(Markdown, {
                  components: components({
                    size: size
                  })
                }, content))));
              };
            };

            view = _view({
              align: 'center',
              justify: 'center',
              pad: 'small',
              size: 'medium'
            });

            _edit = function _edit(_ref8) {
              var size = _ref8.size;
              return function (_ref9) {
                var node = _ref9.node;

                var value = _.get(node, 'sides.markdown.content', "# ".concat(node.name));

                var background = _.get(node, 'sides.markdown.background', {
                  color: 'black',
                  opacity: 'strong'
                });

                return React.createElement(Box, {
                  fill: true,
                  align: "center",
                  justify: "center",
                  pad: "small"
                }, React.createElement(Box, {
                  fill: true,
                  align: "center",
                  justify: "center",
                  round: "small",
                  background: background,
                  direction: "row"
                }, React.createElement(Box, {
                  fill: true,
                  overflow: "scroll"
                }, view({
                  node: node
                })), React.createElement(Box, {
                  fill: true,
                  align: "start",
                  justify: "start",
                  pad: "small",
                  overflow: "scroll"
                }, React.createElement(CodeEditor, {
                  value: value,
                  onChange: function onChange(newValue) {
                    return napi.updateNodeSide(node, 'markdown/content', newValue);
                  },
                  options: {
                    size: size,
                    language: 'markup'
                  }
                }))));
              };
            };

            edit = _edit({
              size: 'medium'
            });

            icon = function icon(_ref10) {
              var node = _ref10.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.DocumentText, {
                size: iconSize
              }));
            };

            preview = _view({
              align: 'start',
              justify: 'start',
              pad: 'none',
              size: 'small'
            });
            return _context2.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();

export default index;
