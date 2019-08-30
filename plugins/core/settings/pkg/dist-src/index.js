function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref) {
    var __deps__, __imports__, Box, _imports__$utils, React, _, Router, JSONSchemaForm, icons, napi, iconSize, e, settingsSchema, uiSchema, edit, view, icon;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            Box = __imports__.grommet.Box;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, Router = _imports__$utils.Router, JSONSchemaForm = _imports__$utils.JSONSchemaForm, icons = _imports__$utils.icons;
            napi = __deps__.napi, iconSize = __deps__.iconSize;
            e = React.createElement;

            settingsSchema = function settingsSchema(node) {
              return {
                type: 'object',
                title: "".concat(node.name, " Settings"),
                properties: {
                  defaultView: {
                    type: ['string', 'null'],
                    title: 'default view',
                    "default": _.get(node, 'sides.settings.defaultView') || 'auto',
                    "enum": ['auto'].concat(_toConsumableArray(Object.keys(node.sides)))
                  },
                  "public": {
                    type: 'boolean',
                    title: 'public',
                    description: 'Anyone can view this node.',
                    "default": _.get(node, 'sides.settings.public', false)
                  },
                  ui: {
                    type: 'object',
                    title: 'UI',
                    properties: {
                      background: {
                        type: 'object',
                        title: 'Background',
                        properties: {
                          image: {
                            type: ['string', 'null'],
                            "default": _.get(node, 'sides.settings.ui.background.image', null)
                          },
                          color: {
                            type: 'string',
                            "default": _.get(node, 'sides.settings.ui.background.color', 'background')
                          },
                          dark: {
                            type: 'boolean',
                            "default": _.get(node, 'sides.settings.ui.background.dark', true)
                          },
                          video: {
                            type: ['string', 'null'],
                            "default": _.get(node, 'sides.settings.ui.background.video', null)
                          },
                          audio: {
                            type: ['string', 'null'],
                            "default": _.get(node, 'sides.settings.ui.background.audio', null)
                          }
                        }
                      },
                      showHidden: {
                        type: 'boolean',
                        title: 'Show hidden',
                        "default": _.get(node, 'sides.settings.ui.showHidden', false)
                      }
                    }
                  }
                }
              };
            };

            uiSchema = {
              defaultView: {
                'ui:emptyValue': 'auto'
              },
              ui: {
                background: {
                  image: {
                    'ui:emptyValue': null
                  },
                  video: {
                    'ui:emptyValue': null
                  },
                  audio: {
                    'ui:emptyValue': null
                  }
                }
              }
            };

            edit = function edit(_ref3) {
              var node = _ref3.node;
              return e(Box, {
                fill: true
              }, e(Box, {
                overflow: 'scroll',
                fill: true,
                align: 'center',
                justify: 'center',
                gap: 'small'
              }, e(Box, {
                width: 'large'
              }, e(JSONSchemaForm, {
                schema: settingsSchema(node),
                uiSchema: uiSchema,
                onSubmit: function () {
                  var _onSubmit = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(_ref4) {
                    var formData, defaultView, _Router$query, _ref5, view, newQuery;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            formData = _ref4.formData;
                            defaultView = formData.defaultView === 'auto' ? null : formData.defaultView;
                            _context.next = 4;
                            return napi.updateNodeSide(node, 'settings', _objectSpread({}, formData, {
                              defaultView: defaultView
                            }));

                          case 4:
                            _Router$query = Router.query, _ref5 = "".concat(node.id, "-view"), view = _Router$query[_ref5], newQuery = _objectWithoutProperties(_Router$query, [_ref5].map(_toPropertyKey));
                            Router.push({
                              pathname: Router.pathname,
                              query: _objectSpread({}, newQuery, {
                                node: node.id
                              })
                            });

                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  function onSubmit(_x2) {
                    return _onSubmit.apply(this, arguments);
                  }

                  return onSubmit;
                }()
              }))));
            };

            view = edit;

            icon = function icon(_ref6) {
              var node = _ref6.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Services, {
                size: iconSize
              }));
            };

            return _context2.abrupt("return", {
              modes: {
                icon: icon,
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