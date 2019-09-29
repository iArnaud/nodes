function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import * as buble from 'buble';

var transformCode = function transformCode(code) {
  var opts = {
    transforms: {
      dangerousForOf: true,
      dangerousTaggedTemplateString: true
    }
  };
  console.log('before', code);
  var newCode = buble.transform(code, opts).code;
  console.log('after', newCode);
  return newCode;
};

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref) {
    var __deps__, __imports__, Box, _imports__$utils, React, _, icons, CodeEditor, napi, NodeView, iconSize, viewer, createViewFromSrc, defaultSrc, Node, view, edit, icon, preview;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            Box = __imports__.grommet.Box;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, icons = _imports__$utils.icons, CodeEditor = _imports__$utils.CodeEditor;
            napi = __deps__.napi, NodeView = __deps__.NodeView, iconSize = __deps__.iconSize, viewer = __deps__.viewer; // eslint-disable-next-line no-new-func

            createViewFromSrc = function createViewFromSrc(fbody) {
              var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
              return function (props) {
                return Function('__props__', '__imports__', '__deps__', fbody)(props, __imports__, deps);
              };
            }; // const defaultSrc = `
            //   const { React } = __imports__.utils
            //   const { Box } = __imports__.grommet
            //   const { node } = __deps__
            //   const e = React.createElement
            //
            //   return e(Box, { align: 'center', justify: 'center', fill: true }, node.name)
            // `


            defaultSrc = "\n    const { React } = __imports__.utils\n    const { Box } = __imports__.grommet\n    const { node } = __deps__\n\n    return (\n      <Box fill align='center' justify='center'>\n        {node.name}\n      </Box>\n    )\n  ";

            Node = function Node(props) {
              return React.createElement(NodeView, _objectSpread({}, props, {
                napi: napi,
                plain: true
              }));
            };

            view = function view(_ref3) {
              var node = _ref3.node;
              return React.createElement(createViewFromSrc(transformCode(_.get(node.sides, 'web.src', defaultSrc)), {
                napi: napi,
                NodeView: NodeView,
                node: node,
                Node: Node
              }));
            };

            edit = function edit(_ref4) {
              var node = _ref4.node;
              var size = 'medium';

              var value = _.get(node, 'sides.web.src', defaultSrc);

              var background = _.get(node, 'sides.web.background', {
                color: 'black',
                opacity: 'strong'
              });

              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center",
                pad: "small"
              }, React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center",
                round: "small",
                background: background,
                direction: "row"
              }, React.createElement(Box, {
                fill: true,
                overflow: "scroll"
              }, React.createElement(NodeView, {
                node: node,
                view: "web",
                napi: napi,
                viewer: viewer
              })), React.createElement(Box, {
                fill: true,
                align: "start",
                justify: "start",
                pad: "small",
                overflow: "scroll"
              }, React.createElement(CodeEditor, {
                value: value,
                onChange: function onChange(newValue) {
                  return napi.updateNodeSide(node, 'web/src', newValue);
                },
                options: {
                  size: size,
                  language: 'javascript'
                }
              }))));
            };

            icon = function icon(_ref5) {
              var node = _ref5.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Code, {
                size: iconSize
              }));
            };

            preview = icon;
            return _context2.abrupt("return", {
              create: function () {
                var _create = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(_ref6) {
                  var node;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          node = _ref6.node;
                          return _context.abrupt("return", {
                            side: {
                              code: defaultSrc
                            }
                          });

                        case 2:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function create(_x2) {
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

          case 12:
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