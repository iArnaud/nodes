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
    var __deps__, __imports__, _imports__$grommet, Box, Text, Button, CheckBox, Anchor, _imports__$utils, React, Avatar, icons, _imports__$nodehub, NodeUsersProvider, NodeLink, NodeSelect, napi, iconSize, _view, icon, preview, view, edit;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, Text = _imports__$grommet.Text, Button = _imports__$grommet.Button, CheckBox = _imports__$grommet.CheckBox, Anchor = _imports__$grommet.Anchor;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, Avatar = _imports__$utils.Avatar, icons = _imports__$utils.icons;
            _imports__$nodehub = __imports__.nodehub, NodeUsersProvider = _imports__$nodehub.NodeUsersProvider, NodeLink = _imports__$nodehub.NodeLink, NodeSelect = _imports__$nodehub.NodeSelect;
            napi = __deps__.napi, iconSize = __deps__.iconSize;

            _view = function _view(_ref3) {
              var node = _ref3.node,
                  users = _ref3.users;

              var _React$useState = React.useState({
                addUser: false,
                newUser: {
                  role: 'user',
                  id: undefined
                }
              }),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  state = _React$useState2[0],
                  setState = _React$useState2[1];

              return React.createElement(Box, {
                align: "center",
                justify: "center",
                fill: true,
                pad: "xsmall",
                gap: "small"
              }, React.createElement(Box, {
                align: "center",
                justify: "center",
                width: "large",
                gap: "small",
                background: {
                  color: 'black',
                  opacity: 'medium'
                },
                pad: "small",
                round: true
              }, users.map(function (user, i) {
                return React.createElement(Box, {
                  "data-testid": "addUser.".concat(user.name, ".user"),
                  key: user.id,
                  direction: "row",
                  align: "center",
                  justify: "between",
                  fill: "horizontal",
                  background: {
                    color: 'black',
                    opacity: 'medium'
                  },
                  pad: "small",
                  round: true
                }, React.createElement(Box, {
                  pad: "small",
                  round: true,
                  direction: "row",
                  gap: "xsmall",
                  align: "center",
                  justify: "center"
                }, React.createElement(Avatar, {
                  round: true,
                  name: user.name,
                  src: user.avatar,
                  size: 36
                }), React.createElement(NodeLink, {
                  node: user.id,
                  view: "user"
                }, React.createElement(Anchor, null, React.createElement(Text, {
                  size: "medium",
                  weight: "bold"
                }, user.name)))), React.createElement(Box, {
                  direction: "row"
                }, React.createElement(CheckBox, {
                  disabled: users.length < 2,
                  label: React.createElement(Text, {
                    weight: user.role === 'admin' ? 'bold' : null,
                    color: user.role === 'admin' ? 'control' : null
                  }, user.role),
                  reverse: true,
                  onChange:
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return napi.updateNode(node.id, [{
                              op: 'replace',
                              path: "/sides/users/".concat(i, "/role"),
                              value: user.role === 'admin' ? 'user' : 'admin'
                            }]);

                          case 2:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  })),
                  toggle: true,
                  checked: user.role === 'admin'
                }), React.createElement(Button, {
                  disabled: users.length < 2,
                  icon: React.createElement(icons.Close, null),
                  onClick:
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2() {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return napi.updateNode(node.id, [{
                              op: 'remove',
                              path: "/sides/users/".concat(i)
                            }]);

                          case 2:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }))
                })));
              }), state.addUser && React.createElement(Box, {
                direction: "row",
                align: "center",
                justify: "between",
                fill: "horizontal",
                background: {
                  color: 'black',
                  opacity: 'medium'
                },
                pad: "small",
                round: true
              }, React.createElement(Box, {
                pad: "small",
                round: true,
                direction: "row",
                gap: "xsmall",
                align: "center",
                justify: "center"
              }, React.createElement(NodeSelect, {
                napi: napi,
                users: true,
                onSelect: function onSelect(user) {
                  return setState(_objectSpread({}, state, {
                    newUser: _objectSpread({}, state.newUser, {
                      id: user.id
                    })
                  }));
                }
              })), React.createElement(Box, {
                direction: "row"
              }, React.createElement(CheckBox, {
                label: React.createElement(Text, {
                  weight: state.newUser.role === 'admin' ? 'bold' : null,
                  color: state.newUser.role === 'admin' ? 'control' : null
                }, state.newUser.role),
                reverse: true,
                onChange:
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          setState(_objectSpread({}, state, {
                            newUser: _objectSpread({}, state.newUser, {
                              role: state.newUser.role === 'admin' ? 'user' : 'admin'
                            })
                          }));

                        case 1:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                })),
                toggle: true,
                checked: state.newUser.role === 'admin'
              }), React.createElement(Button, {
                "data-testid": "addUser.confirm.action",
                disabled: !state.newUser.id,
                icon: React.createElement(icons.Checkmark, {
                  color: "status-ok"
                }),
                onClick:
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee4() {
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return napi.updateNode(node.id, [{
                            op: 'add',
                            path: "/sides/users/".concat(users.length),
                            value: state.newUser
                          }]);

                        case 2:
                          setState({
                            addUser: false,
                            newUser: {
                              role: 'user',
                              id: undefined
                            }
                          });

                        case 3:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }))
              }))), React.createElement(Button, {
                "data-testid": "addUser.action",
                label: "Add User",
                icon: React.createElement(icons.Add, null),
                primary: true,
                onClick: function onClick() {
                  return setState(_objectSpread({}, state, {
                    addUser: true
                  }));
                }
              })));
            };

            icon = function icon(_ref8) {
              var node = _ref8.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Group, {
                size: iconSize
              }));
            };

            preview = icon;

            view = function view(_ref9) {
              var node = _ref9.node;
              return React.createElement(NodeUsersProvider, {
                node: node,
                napi: napi
              }, React.createElement(_view, {
                node: node
              }));
            };

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