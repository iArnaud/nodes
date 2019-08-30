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
    var __deps__, __imports__, _imports__$grommet, Box, Text, Button, _imports__$utils, React, _, icons, JSONSchemaForm, Router, napi, iconSize, viewer, NodeView, view, pluginSchema, uiSchema, edit, icon, preview;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, Text = _imports__$grommet.Text, Button = _imports__$grommet.Button;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, icons = _imports__$utils.icons, JSONSchemaForm = _imports__$utils.JSONSchemaForm, Router = _imports__$utils.Router;
            napi = __deps__.napi, iconSize = __deps__.iconSize, viewer = __deps__.viewer, NodeView = __deps__.NodeView;

            view = function view(_ref3) {
              var node = _ref3.node;
              return React.createElement(Box, {
                align: "center",
                justify: "center",
                fill: true,
                overflow: "scroll",
                pad: "small"
              }, React.createElement(Text, {
                weight: "bold"
              }, "Plugin: ", node.name), React.createElement("pre", null, JSON.stringify(_.get(node, 'sides.plugin', {}))));
            };

            pluginSchema = {
              type: 'object',
              required: ['url'],
              properties: {
                url: {
                  type: 'string',
                  title: 'URL'
                },
                canAdd: {
                  type: 'boolean',
                  title: 'Can Add',
                  "default": true
                }
              }
            };
            uiSchema = {
              url: {
                'ui:autofocus': true,
                'ui:options': {
                  testid: 'url.input'
                }
              }
            };

            edit = function edit(_ref4) {
              var node = _ref4.node;

              var _$get = _.get(node, 'sides.plugin', {}),
                  url = _$get.url,
                  _$get$canAdd = _$get.canAdd,
                  canAdd = _$get$canAdd === void 0 ? true : _$get$canAdd;

              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(Box, {
                width: "large",
                overflow: "scroll"
              }, React.createElement(JSONSchemaForm, {
                formData: {
                  url: url,
                  canAdd: canAdd
                },
                schema: pluginSchema,
                uiSchema: uiSchema,
                onSubmit:
                /*#__PURE__*/
                function () {
                  var _ref6 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(_ref5) {
                    var formData;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            formData = _ref5.formData;
                            _context.next = 3;
                            return napi.updateNodeSide(node, 'plugin', formData);

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
                    return _ref6.apply(this, arguments);
                  };
                }()
              })));
            };

            icon = function icon(_ref7) {
              var node = _ref7.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Install, {
                size: iconSize
              }));
            };

            preview = function preview(_ref8) {
              var node = _ref8.node;
              return React.createElement(Button, {
                plain: true,
                icon: React.createElement(NodeView, {
                  node: node,
                  view: node.name,
                  mode: "icon",
                  napi: napi,
                  viewer: viewer,
                  plain: true
                }),
                label: node.name
              });
            };

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
