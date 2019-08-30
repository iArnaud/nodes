function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    if (i % 2) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i]));
    }
  }

  return target;
}

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
  regeneratorRuntime.mark(function _callee5(_ref) {
    var __deps__, __imports__, _imports__$grommet, Box, Grid, ResponsiveContext, Button, Anchor, Text, _imports__$utils, React, http, icons, Avatar, NodePreview, iconSize, napi, viewer, getPluginsFromGithub, view;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, Grid = _imports__$grommet.Grid, ResponsiveContext = _imports__$grommet.ResponsiveContext, Button = _imports__$grommet.Button, Anchor = _imports__$grommet.Anchor, Text = _imports__$grommet.Text;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, http = _imports__$utils.http, icons = _imports__$utils.icons, Avatar = _imports__$utils.Avatar;
            NodePreview = __imports__.nodehub.NodePreview;
            iconSize = __deps__.iconSize, napi = __deps__.napi, viewer = __deps__.viewer;

            getPluginsFromGithub =
            /*#__PURE__*/
            function () {
              var _ref3 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var res, plugins;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return http.get('https://api.github.com/search/repositories?q=topic:nodes-plugin&sort=stars&order=desc', {
                          headers: {
                            Accept: 'application/vnd.github.mercy-preview+json'
                          }
                        });

                      case 2:
                        res = _context.sent;
                        plugins = res.data.items;
                        return _context.abrupt("return", plugins.map(function (p) {
                          return {
                            name: p.name,
                            sides: {
                              plugin: {
                                canAdd: true,
                                url: "https://cdn.jsdelivr.net/gh/".concat(p.full_name, "/").concat(p.name, ".js"),
                                description: p.description,
                                homepage: p.homepage,
                                metadata: {
                                  provider: 'github',
                                  stars: p.stargazers_count,
                                  owner: p.owner,
                                  repoUrl: p.html_url,
                                  createdAt: p.created_at
                                }
                              }
                            }
                          };
                        }));

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function getPluginsFromGithub() {
                return _ref3.apply(this, arguments);
              };
            }();

            view = function view(_ref4) {
              var node = _ref4.node;

              var _React$useState = React.useState([]),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  plugins = _React$useState2[0],
                  setPlugins = _React$useState2[1];

              React.useEffect(function () {
                var getPlugins =
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3() {
                    var _plugins;

                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return getPluginsFromGithub();

                          case 2:
                            _plugins = _context3.sent;
                            _context3.next = 5;
                            return Promise.all(_plugins.map(
                            /*#__PURE__*/
                            function () {
                              var _ref6 = _asyncToGenerator(
                              /*#__PURE__*/
                              regeneratorRuntime.mark(function _callee2(p) {
                                var res;
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                  while (1) {
                                    switch (_context2.prev = _context2.next) {
                                      case 0:
                                        _context2.next = 2;
                                        return napi.findNode({
                                          name: p.name,
                                          parentId: 'plugins'
                                        });

                                      case 2:
                                        res = _context2.sent;
                                        return _context2.abrupt("return", res.status === 'ok' ? res : p);

                                      case 4:
                                      case "end":
                                        return _context2.stop();
                                    }
                                  }
                                }, _callee2);
                              }));

                              return function (_x2) {
                                return _ref6.apply(this, arguments);
                              };
                            }()));

                          case 5:
                            _plugins = _context3.sent;
                            console.log('plugins', _plugins);
                            setPlugins(_plugins);

                          case 8:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function getPlugins() {
                    return _ref5.apply(this, arguments);
                  };
                }();

                getPlugins();
              }, []);
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
              }, plugins.map(function (plugin) {
                if (plugin.id) {
                  return React.createElement(NodePreview, {
                    key: "".concat(plugin.name, "-").concat(plugin.id),
                    node: plugin,
                    showPreview: false,
                    napi: napi,
                    viewer: viewer
                  });
                }

                return React.createElement(Box, {
                  key: plugin.name,
                  height: "small",
                  width: "small",
                  align: "center",
                  justify: "between",
                  round: "small",
                  background: {
                    color: 'black',
                    opacity: 'medium'
                  }
                }, React.createElement(Box, {
                  fill: true,
                  align: "start",
                  justify: "between",
                  direction: "row",
                  pad: "xsmall"
                }, React.createElement(Box, {
                  align: "center",
                  justify: "center",
                  direction: "row",
                  gap: "xsmall"
                }, React.createElement(Anchor, {
                  style: {
                    padding: '0px'
                  },
                  size: "small",
                  href: "".concat(plugin.sides.plugin.metadata.repoUrl, "/stargazers"),
                  icon: React.createElement(icons.Star, {
                    color: "plain"
                  }),
                  target: "_blank"
                }), React.createElement(Text, {
                  size: "small"
                }, plugin.sides.plugin.metadata.stars)), React.createElement(Box, {
                  align: "center",
                  justify: "center",
                  direction: "row",
                  gap: "xsmall"
                }, React.createElement(Avatar, {
                  round: true,
                  size: 25,
                  src: plugin.sides.plugin.metadata.owner.avatar_url
                }), React.createElement(Text, {
                  size: "small"
                }, plugin.sides.plugin.metadata.owner.login))), React.createElement(Box, {
                  fill: true,
                  align: "center",
                  justify: "center"
                }, React.createElement(Anchor, {
                  href: plugin.sides.plugin.homepage,
                  target: "_blank"
                }, plugin.name), React.createElement(Text, {
                  size: "small"
                }, plugin.sides.plugin.description)), React.createElement(Box, {
                  fill: true,
                  align: "end",
                  justify: "end"
                }, React.createElement(Button, {
                  icon: React.createElement(icons.InstallOption, {
                    color: "control",
                    onClick:
                    /*#__PURE__*/
                    _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee4() {
                      var newPlugin;
                      return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              console.log("installing plugin ".concat(plugin.name, "..."));
                              _context4.next = 3;
                              return napi.createNode(null, _objectSpread({}, plugin, {
                                parentId: 'plugins',
                                sides: _objectSpread({}, plugin.sides, {
                                  users: [{
                                    id: viewer.node,
                                    role: 'admin'
                                  }]
                                })
                              }));

                            case 3:
                              newPlugin = _context4.sent;
                              console.log("plugin ".concat(newPlugin.name, " installed."));
                              setPlugins(plugins.map(function (p) {
                                return p.name === newPlugin.name ? newPlugin : p;
                              }));

                            case 6:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    }))
                  })
                })));
              })));
            };

            return _context5.abrupt("return", {
              modes: {
                icon: function icon() {
                  return React.createElement(Box, {
                    align: "center",
                    justify: "center"
                  }, React.createElement(icons.Apps, {
                    size: iconSize
                  }));
                },
                preview: view,
                view: view,
                edit: view
              }
            });

          case 8:
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

export default index;
