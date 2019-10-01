function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref) {
    var __deps__, __imports__, _imports__$grommet, Box, Button, _imports__$utils, React, _, Avatar, icons, Router, JSONSchemaForm, dimport, NodeLink, iconSize, viewer, napi, _view, icon, preview, view, userSchema, uiSchema, edit;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, Button = _imports__$grommet.Button;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, Avatar = _imports__$utils.Avatar, icons = _imports__$utils.icons, Router = _imports__$utils.Router, JSONSchemaForm = _imports__$utils.JSONSchemaForm, dimport = _imports__$utils.dimport;
            NodeLink = __imports__.nodehub.NodeLink;
            iconSize = __deps__.iconSize, viewer = __deps__.viewer, napi = __deps__.napi;

            _view = function _view(_ref3) {
              var showControls = _ref3.showControls;
              return function (_ref4) {
                var node = _ref4.node;

                var user = _.get(node, 'sides.user', {});

                return React.createElement(Box, {
                  fill: true,
                  align: "center",
                  justify: "center",
                  pad: {
                    top: 'xsmall',
                    left: 'xsmall',
                    right: 'xsmall'
                  }
                }, React.createElement(Box, {
                  fill: true,
                  align: "center",
                  justify: "center",
                  round: "small",
                  overflow: "auto",
                  background: {
                    color: 'black',
                    opacity: 'medium'
                  }
                }, React.createElement(Box, {
                  fill: true
                }, showControls && viewer && user.name === viewer.name && React.createElement(Box, {
                  fill: "horizontal",
                  direction: "row",
                  pad: "small",
                  gap: "small",
                  align: "center",
                  justify: "end"
                }, React.createElement(NodeLink, {
                  node: viewer.node,
                  view: "user-edit"
                }, React.createElement(Box, {
                  align: "center",
                  justify: "center"
                }, React.createElement(icons.UserSettings, null))), React.createElement(Box, {
                  align: "center",
                  justify: "center",
                  onClick:
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return napi.logout();

                          case 2:
                            document.location.reload();

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }))
                }, React.createElement(Button, {
                  "data-testid": "logout.action",
                  icon: React.createElement(icons.Logout, null),
                  plain: true
                }))), React.createElement(Box, {
                  fill: true,
                  align: "center",
                  justify: "center"
                }, React.createElement(Avatar, {
                  src: user.avatar,
                  name: user.name,
                  email: user.email,
                  round: true
                })))));
              };
            };

            icon = function icon(_ref6) {
              var node = _ref6.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.User, {
                size: iconSize
              }));
            };

            preview = _view({
              showControls: false
            });
            view = _view({
              showControls: true
            });
            userSchema = {
              type: 'object',
              required: [],
              properties: {
                name: {
                  type: ['string', 'null'],
                  title: 'Name'
                },
                email: {
                  type: ['string', 'null'],
                  title: 'Email'
                },
                avatar: {
                  type: ['string', 'null'],
                  title: 'Avatar URL'
                }
              }
            };
            uiSchema = {
              name: {
                'ui:emptyValue': null,
                'ui:options': {
                  testid: 'name.input'
                }
              },
              email: {
                'ui:emptyValue': null,
                'ui:options': {
                  testid: 'email.input'
                }
              },
              avatar: {
                'ui:emptyValue': null,
                'ui:options': {
                  testid: 'avatar.input'
                }
              }
            };

            edit = function edit(_ref7) {
              var node = _ref7.node;

              var user = _.get(node, 'sides.user', {});

              var name = user.name,
                  email = user.email,
                  avatar = user.avatar; // React.useEffect(() => {
              //   const load = async () => {
              //     const Widget = await dimport('https://unpkg.com/remotestorage-widget@1.4.0/build/widget.js')
              //     console.log('Widget', Widget)
              //     const widget = new Widget(window.remotestorage)
              //   }
              //   load()
              // }, [])

              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(Box, {
                width: "large",
                overflow: "scroll"
              }, React.createElement(JSONSchemaForm, {
                formData: {
                  name: name,
                  email: email,
                  avatar: avatar
                },
                schema: userSchema,
                uiSchema: uiSchema,
                onSubmit:
                /*#__PURE__*/
                function () {
                  var _ref9 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(_ref8) {
                    var formData;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            formData = _ref8.formData;
                            _context2.next = 3;
                            return napi.updateNodeSide(node, 'user', _objectSpread({}, user, {}, formData));

                          case 3:
                            Router.push({
                              pathname: Router.pathname,
                              query: {
                                node: node.id
                              }
                            });

                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x2) {
                    return _ref9.apply(this, arguments);
                  };
                }()
              })));
            };

            return _context3.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();