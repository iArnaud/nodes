function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
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
    var __deps__, __imports__, _imports__$grommet, Box, ResponsiveContext, Grid, Text, Anchor, _imports__$utils, React, _, icons, Router, _imports__$nodehub, NodePreview, NodeLink, napi, viewer, iconSize, view, icon, preview, edit;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, ResponsiveContext = _imports__$grommet.ResponsiveContext, Grid = _imports__$grommet.Grid, Text = _imports__$grommet.Text, Anchor = _imports__$grommet.Anchor;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, icons = _imports__$utils.icons, Router = _imports__$utils.Router;
            _imports__$nodehub = __imports__.nodehub, NodePreview = _imports__$nodehub.NodePreview, NodeLink = _imports__$nodehub.NodeLink;
            napi = __deps__.napi, viewer = __deps__.viewer, iconSize = __deps__.iconSize;

            view = function view(_ref3) {
              var node = _ref3.node;
              var screen = React.useContext(ResponsiveContext);
              var gridPad = screen === 'small' ? 'xsmall' : 'small';
              return React.createElement(Box, {
                fill: true,
                pad: gridPad,
                overflow: "scroll"
              }, React.createElement(Grid, {
                fill: true,
                columns: {
                  count: 'fill',
                  size: 'small'
                },
                rows: "small",
                gap: {
                  row: gridPad,
                  column: gridPad
                }
              }, React.createElement(Box, {
                "data-testid": "addSide.nstore",
                background: {
                  color: 'black',
                  opacity: 'medium'
                },
                round: "small",
                pad: "xsmall",
                align: "center",
                justify: "center"
              }, React.createElement(NodeLink, {
                node: "__nstore__",
                query: {
                  parent: Router.query.parent
                }
              }, React.createElement(Anchor, {
                icon: React.createElement(icons.Apps, null),
                label: "N S T O R E"
              }))), node.children.map(function (child) {
                return React.createElement(NodePreview, {
                  key: "".concat(child.name, "-").concat(child.id),
                  node: child,
                  showPreview: _.get(child.sides, 'settings.ui.background.image') !== _.get(node.sides, 'settings.ui.background.image'),
                  napi: napi,
                  viewer: viewer,
                  onClick:
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee() {
                    var parent;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return napi.getNode(Router.query.parent);

                          case 2:
                            parent = _context.sent;
                            _context.next = 5;
                            return napi.addNodeSide(parent, child.name, __deps__);

                          case 5:
                            Router.push({
                              pathname: Router.pathname,
                              query: _defineProperty({
                                node: Router.query.parent
                              }, "".concat(Router.query.parent, "-view"), "".concat(child.name, "-edit"))
                            });

                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }))
                });
              })));
            };

            icon = function icon(_ref5) {
              var node = _ref5.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Duplicate, {
                size: iconSize
              }));
            };

            preview = icon;
            edit = view;
            return _context2.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 10:
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
