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
    var __deps__, __imports__, _imports__$grommet, Box, ResponsiveContext, Grid, Text, Stack, _imports__$utils, React, _, icons, Router, NodePreview, napi, viewer, iconSize, view, icon, preview, edit;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, ResponsiveContext = _imports__$grommet.ResponsiveContext, Grid = _imports__$grommet.Grid, Text = _imports__$grommet.Text, Stack = _imports__$grommet.Stack;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, icons = _imports__$utils.icons, Router = _imports__$utils.Router;
            NodePreview = __imports__.nodehub.NodePreview;
            napi = __deps__.napi, viewer = __deps__.viewer, iconSize = __deps__.iconSize;

            view = function view(_ref3) {
              var node = _ref3.node;

              var handleFileInputChange =
              /*#__PURE__*/
              function () {
                var _ref4 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(e) {
                  var _files, createdNodes, files, i, _i, _files2, file, folders, prevFolder, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, folder, parentId, newNode;

                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _files = e.target.files;
                          console.log('file input', _files);
                          createdNodes = {};
                          files = [];

                          for (i = 0; i < _files.length; i++) {
                            files.push(_files[i]);
                          }

                          _i = 0, _files2 = files;

                        case 6:
                          if (!(_i < _files2.length)) {
                            _context.next = 49;
                            break;
                          }

                          file = _files2[_i];

                          if (!file.webkitRelativePath) {
                            _context.next = 46;
                            break;
                          }

                          console.log("Processing file ".concat(file.webkitRelativePath));
                          folders = file.webkitRelativePath.split('/');
                          console.log('created nodes:', createdNodes);
                          prevFolder = null;
                          _iteratorNormalCompletion = true;
                          _didIteratorError = false;
                          _iteratorError = undefined;
                          _context.prev = 16;
                          _iterator = folders[Symbol.iterator]();

                        case 18:
                          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 32;
                            break;
                          }

                          folder = _step.value;

                          if (createdNodes[folder]) {
                            _context.next = 28;
                            break;
                          }

                          console.log('creating node', folder);
                          console.log('prev folder', prevFolder);
                          parentId = prevFolder ? createdNodes[prevFolder].id : node.parentId;
                          _context.next = 26;
                          return napi.createNode(null, {
                            name: folder,
                            parentId: parentId,
                            sides: {
                              desktop: true
                            }
                          });

                        case 26:
                          newNode = _context.sent;
                          createdNodes[folder] = newNode;

                        case 28:
                          prevFolder = folder;

                        case 29:
                          _iteratorNormalCompletion = true;
                          _context.next = 18;
                          break;

                        case 32:
                          _context.next = 38;
                          break;

                        case 34:
                          _context.prev = 34;
                          _context.t0 = _context["catch"](16);
                          _didIteratorError = true;
                          _iteratorError = _context.t0;

                        case 38:
                          _context.prev = 38;
                          _context.prev = 39;

                          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                            _iterator["return"]();
                          }

                        case 41:
                          _context.prev = 41;

                          if (!_didIteratorError) {
                            _context.next = 44;
                            break;
                          }

                          throw _iteratorError;

                        case 44:
                          return _context.finish(41);

                        case 45:
                          return _context.finish(38);

                        case 46:
                          _i++;
                          _context.next = 6;
                          break;

                        case 49:
                          Router.push({
                            pathname: Router.pathname,
                            query: {
                              node: node.parentId
                            }
                          });

                        case 50:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[16, 34, 38, 46], [39,, 41, 45]]);
                }));

                return function handleFileInputChange(_x2) {
                  return _ref4.apply(this, arguments);
                };
              }();

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
              }, React.createElement(Box, {
                "data-testid": "addNode.dropzone",
                style: {
                  border: '2px dashed',
                  cursor: 'pointer'
                },
                background: {
                  color: 'black',
                  opacity: 'medium'
                },
                round: "small",
                pad: "xsmall",
                align: "center",
                justify: "center"
              }, React.createElement(Stack, {
                fill: true
              }, React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(Text, null, "Drop or click to create node from files or directories")), React.createElement("input", {
                "data-testid": "upload.input",
                style: {
                  opacity: 0,
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer'
                },
                type: "file",
                multiple: true,
                directory: "true",
                webkitdirectory: "true",
                allowdirs: "true",
                onChange: handleFileInputChange
              }))), node.children.map(function (child) {
                return React.createElement(NodePreview, {
                  key: "".concat(child.name, "-").concat(child.id),
                  node: child,
                  showPreview: _.get(child.sides, 'settings.ui.background.image') !== _.get(node.sides, 'settings.ui.background.image'),
                  napi: napi,
                  viewer: viewer,
                  onClick:
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2() {
                    var newNode;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return napi.copyNode(child, node.parentId, 'Untitled node');

                          case 2:
                            newNode = _context2.sent;
                            Router.push({
                              pathname: Router.pathname,
                              query: _objectSpread({}, Router.query, _defineProperty({
                                node: newNode.id
                              }, "".concat(newNode.id, "-view"), "".concat(napi.getNodeView(newNode, false), "-edit")))
                            });

                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }))
                });
              })));
            };

            icon = function icon(_ref6) {
              var node = _ref6.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Add, {
                size: iconSize
              }));
            };

            preview = icon;
            edit = view;
            return _context3.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 10:
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
