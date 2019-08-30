function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import * as Babel from '@babel/standalone';

var transformCode = function transformCode(source) {
  return Babel.transform(source, {
    presets: ['es2017', 'react'],
    parserOpts: {
      allowImportExportEverywhere: true,
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true
    }
  }).code;
};

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref) {
    var __deps__, __imports__, Box, _imports__$utils, React, _, Router, PreviewEditor, icons, napi, NodeView, iconSize, viewer, defaultSrc, Node, view, edit, icon, preview;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            Box = __imports__.grommet.Box;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, Router = _imports__$utils.Router, PreviewEditor = _imports__$utils.PreviewEditor, icons = _imports__$utils.icons;
            napi = __deps__.napi, NodeView = __deps__.NodeView, iconSize = __deps__.iconSize, viewer = __deps__.viewer;
            defaultSrc = "\n    const { React } = __imports__.utils\n    const { Box } = __imports__.grommet\n    const { node } = __deps__\n\n    return (\n    <Box fill align='center' justify='center'>\n      {node.name} Custom View\n    </Box>\n  )";

            Node = function Node(props) {
              return React.createElement(NodeView, _objectSpread({}, props, {
                napi: napi,
                plain: true
              }));
            }; // FIXME: move napi.createViewFromSrc to this side, then remove from napi


            view = function view(_ref3) {
              var node = _ref3.node;
              return React.createElement(napi.createViewFromSrc(transformCode(_.get(node.sides, 'custom.code', defaultSrc)), {
                napi: napi,
                NodeView: NodeView,
                node: node,
                Node: Node
              }));
            };

            edit = function edit(_ref4) {
              var node = _ref4.node;
              return React.createElement(PreviewEditor, {
                value: _.get(node, 'sides.custom.code', defaultSrc),
                onCancel: function onCancel() {
                  return Router.push({
                    pathname: Router.pathname,
                    query: _objectSpread({}, Router.query, _defineProperty({}, "".concat(node.id, "-view"), 'custom'))
                  });
                },
                onSave: function onSave(value) {
                  return napi.updateNodeSide(node, 'custom/code', value);
                },
                onSaveAndQuit:
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(value) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return napi.updateNodeSide(node, 'custom/code', value);

                          case 2:
                            Router.push({
                              pathname: Router.pathname,
                              query: _objectSpread({}, Router.query, _defineProperty({}, "".concat(node.id, "-view"), 'custom'))
                            });

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref5.apply(this, arguments);
                  };
                }(),
                options: _objectSpread({}, _.get(node, 'sides.settings.ui.editor', {}), {
                  readOnly: false,
                  mode: 'jsx'
                }) // Preview={({ value }) => React.createElement(view, { node })}
                ,
                Preview: function Preview(_ref6) {
                  var value = _ref6.value;
                  return React.createElement(NodeView, {
                    node: node,
                    napi: napi,
                    viewer: viewer,
                    plain: true,
                    view: "custom"
                  });
                }
              });
            };

            icon = function icon(_ref7) {
              var node = _ref7.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Code, {
                size: iconSize
              }));
            };

            preview = icon;
            return _context3.abrupt("return", {
              create: function () {
                var _create = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee2(_ref8) {
                  var node;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          node = _ref8.node;
                          return _context2.abrupt("return", {
                            side: {
                              code: defaultSrc
                            }
                          });

                        case 2:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                function create(_x3) {
                  return _create.apply(this, arguments);
                }

                return create;
              }(),
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 11:
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