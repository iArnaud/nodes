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
  regeneratorRuntime.mark(function _callee2(_ref) {
    var __deps__, __imports__, _imports__$grommet, Box, Text, _imports__$utils, React, CoolBox, JSONSchemaForm, Router, _, NodehubLogo, icons, napi, iconSize, LoginForm, view, icon, preview, edit;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, Text = _imports__$grommet.Text;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, CoolBox = _imports__$utils.CoolBox, JSONSchemaForm = _imports__$utils.JSONSchemaForm, Router = _imports__$utils.Router, _ = _imports__$utils.lodash, NodehubLogo = _imports__$utils.NodehubLogo, icons = _imports__$utils.icons;
            napi = __deps__.napi, iconSize = __deps__.iconSize;

            LoginForm = function LoginForm(_ref3) {
              var node = _ref3.node,
                  setError = _ref3.setError;
              var loginSchema = {
                type: 'object',
                required: ['login', 'password'],
                properties: {
                  login: {
                    type: 'string',
                    title: 'Login'
                  },
                  password: {
                    type: 'string',
                    title: 'Password'
                  }
                }
              };
              var uiSchema = {
                login: {
                  'ui:autofocus': true,
                  'ui:emptyValue': '',
                  'ui:options': {
                    testid: 'login.input'
                  }
                },
                password: {
                  'ui:widget': 'password',
                  'ui:options': {
                    testid: 'password.input'
                  }
                }
              };
              return React.createElement(JSONSchemaForm, {
                schema: loginSchema,
                uiSchema: uiSchema,
                onSubmit:
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(_ref4) {
                    var formData, login, password, user;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            formData = _ref4.formData;
                            login = formData.login, password = formData.password;
                            _context.next = 4;
                            return napi.login(login, password);

                          case 4:
                            user = _context.sent;

                            if (user) {
                              Router.push({
                                pathname: Router.pathname,
                                query: {
                                  node: node.parentId || user.node
                                }
                              });
                            } else {
                              setError({
                                message: 'Invalid email or password.'
                              });
                            }

                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref5.apply(this, arguments);
                  };
                }()
              });
            };

            view = function view(_ref6) {
              var node = _ref6.node;

              var background = _.get(node, 'sides.settings.ui.background', {});

              var defaultBackground = 'background';

              var _React$useState = React.useState(),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  error = _React$useState2[0],
                  setError = _React$useState2[1];

              return React.createElement(CoolBox, {
                background: background.video ? null : napi.getNodeBackground(node),
                align: "center",
                justify: "center"
              }, React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center",
                gap: "small",
                background: napi.getNodeBackground(node) ? {
                  color: 'black',
                  opacity: 'medium'
                } : {
                  image: defaultBackground
                }
              }, React.createElement(Box, {
                round: "medium",
                height: "small",
                width: "small",
                align: "center",
                justify: "center",
                background: napi.getNodeBackground(node) ? {
                  color: 'black',
                  opacity: 'medium'
                } : null
              }, React.createElement(NodehubLogo, null)), React.createElement(Text, {
                weight: "bold"
              }, node.name), error && React.createElement(Text, {
                "data-testid": "login.error",
                color: "status-error"
              }, error.message), React.createElement(Box, {
                width: "medium",
                align: "center",
                justify: "center"
              }, React.createElement(LoginForm, {
                node: node,
                setError: setError
              }))));
            };

            icon = function icon(_ref7) {
              var node = _ref7.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Login, {
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