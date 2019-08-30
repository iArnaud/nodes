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
    var __deps__, __imports__, Box, _imports__$utils, React, JSONSchemaForm, icons, _, Router, napi, iconSize, routeSchema, uiSchema, edit, view, icon, preview;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            Box = __imports__.grommet.Box;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, JSONSchemaForm = _imports__$utils.JSONSchemaForm, icons = _imports__$utils.icons, _ = _imports__$utils.lodash, Router = _imports__$utils.Router;
            napi = __deps__.napi, iconSize = __deps__.iconSize;
            routeSchema = {
              type: 'object',
              required: ['path'],
              properties: {
                path: {
                  type: 'string',
                  title: 'Path'
                }
              }
            };
            uiSchema = {
              path: {
                'ui:autofocus': true,
                'ui:options': {
                  testid: 'path.input'
                }
              }
            };

            edit = function edit(_ref3) {
              var node = _ref3.node;

              var _$get = _.get(node, 'sides.route', {}),
                  path = _$get.path;

              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(Box, {
                width: "large",
                overflow: "scroll"
              }, React.createElement(JSONSchemaForm, {
                formData: {
                  path: path
                },
                schema: routeSchema,
                uiSchema: uiSchema,
                onSubmit:
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(_ref4) {
                    var formData;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            formData = _ref4.formData;
                            _context.next = 3;
                            return napi.updateNodeSide(node, 'route/path', formData.path);

                          case 3:
                            Router.push({
                              pathname: Router.pathname,
                              query: {
                                node: node.id
                              }
                            });

                          case 4:
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
              })));
            };

            view = edit;

            icon = function icon(_ref6) {
              var node = _ref6.node;
              return React.createElement(Box, {
                align: "center",
                justify: "center",
                fill: true
              }, React.createElement(icons.Directions, {
                size: iconSize
              }));
            };

            preview = icon;
            return _context2.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 11:
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
