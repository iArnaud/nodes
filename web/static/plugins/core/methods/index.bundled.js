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
  regeneratorRuntime.mark(function _callee3(_ref) {
    var __deps__, __imports__, _imports__$grommet, Button, Box, _imports__$utils, React, icons, JSONSchemaForm, _, Router, napi, iconSize, viewer, view, edit, icon, preview;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Button = _imports__$grommet.Button, Box = _imports__$grommet.Box;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, icons = _imports__$utils.icons, JSONSchemaForm = _imports__$utils.JSONSchemaForm, _ = _imports__$utils.lodash, Router = _imports__$utils.Router;
            napi = __deps__.napi, iconSize = __deps__.iconSize, viewer = __deps__.viewer;

            view = function view(_ref3) {
              var node = _ref3.node;

              var _React$useState = React.useState(),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  state = _React$useState2[0],
                  setState = _React$useState2[1];

              return React.createElement(Box, {
                fill: true,
                direction: "row"
              }, React.createElement(Box, {
                align: "center",
                justify: "center",
                fill: true
              }, Object.keys(_.get(node, 'sides.methods.methods', {})).map(function (method) {
                return React.createElement(Button, {
                  key: method,
                  label: method,
                  onClick:
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee() {
                    var res;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return napi.execMethod(node, method, {
                              someArgs: true
                            }, {
                              napi: napi,
                              viewer: viewer
                            });

                          case 2:
                            res = _context.sent;
                            setState(res);

                          case 4:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }))
                });
              })), React.createElement(Box, {
                fill: true,
                overflow: "scroll"
              }, React.createElement("pre", null, JSON.stringify(state, null, 2))));
            };

            edit = function edit(_ref5) {
              var node = _ref5.node;

              var methods = _.get(node, 'sides.methods.methods');

              var schema = {
                type: 'object',
                properties: {
                  methods: {
                    type: 'array',
                    title: 'Methods',
                    items: {
                      type: 'object',
                      required: ['methodName', 'methodCode'],
                      properties: {
                        methodName: {
                          title: 'Method name',
                          type: 'string'
                        },
                        methodCode: {
                          type: 'string',
                          title: 'Method code'
                        }
                      }
                    }
                  }
                }
              };
              var uiSchema = {
                methods: {
                  items: {
                    methodCode: {
                      'ui:widget': 'CodeWidget'
                    }
                  }
                }
              };
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(Box, {
                width: "large",
                overflow: "scroll"
              }, React.createElement(JSONSchemaForm, {
                formData: methods ? {
                  methods: Object.keys(methods).map(function (key) {
                    return {
                      methodName: key,
                      methodCode: methods[key]
                    };
                  })
                } : null,
                schema: schema,
                uiSchema: uiSchema,
                onSubmit:
                /*#__PURE__*/
                function () {
                  var _ref7 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(_ref6) {
                    var formData, methods;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            formData = _ref6.formData;
                            methods = formData.methods.reduce(function (obj, method) {
                              obj[method.methodName] = method.methodCode;
                              return obj;
                            }, {});
                            _context2.next = 4;
                            return napi.updateNodeSide(node, 'methods/methods', methods);

                          case 4:
                            Router.push({
                              pathname: Router.pathname,
                              query: _objectSpread({}, Router.query, _defineProperty({
                                node: node.id
                              }, "".concat(node.id, "-view"), 'methods'))
                            });

                          case 5:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x2) {
                    return _ref7.apply(this, arguments);
                  };
                }()
              })));
            };

            icon = function icon(_ref8) {
              var node = _ref8.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Calculator, {
                size: iconSize
              }));
            };

            preview = icon;
            return _context3.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 9:
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

export default index;
