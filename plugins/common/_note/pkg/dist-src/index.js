function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import createEditor from "./Editor/index.js";
export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref) {
    var __deps__, __imports__, Box, _imports__$utils, React, _, icons, napi, iconSize, viewer, Editor, getRandomColor, defaultContent, save, debouncedSave, _view, icon, preview, view, edit;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            getRandomColor = function _ref10() {
              return "#".concat(Math.floor(Math.random() * 16777215).toString(16));
            };

            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            Box = __imports__.grommet.Box;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, icons = _imports__$utils.icons;
            napi = __deps__.napi, iconSize = __deps__.iconSize, viewer = __deps__.viewer;
            Editor = createEditor({
              React: React,
              Box: Box
            });
            defaultContent = {
              document: {
                nodes: [{
                  object: 'block',
                  type: 'paragraph',
                  nodes: [{
                    object: 'text',
                    text: 'Note'
                  }]
                }]
              }
            };

            save =
            /*#__PURE__*/
            function () {
              var _ref3 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(node, change) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return napi.updateNodeSide(node, 'note/content', change.value.toJSON());

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function save(_x2, _x3) {
                return _ref3.apply(this, arguments);
              };
            }();

            debouncedSave = _.debounce(save, 500);

            _view = function _view(_ref4) {
              var size = _ref4.size;
              return function (_ref5) {
                var node = _ref5.node;
                var content = Editor.Value.fromJSON(_.get(node, 'sides.note.content', defaultContent));
                var background = _.get(node.sides, 'note.background') || {
                  color: 'black',
                  opacity: 'medium'
                };

                var _React$useState = React.useState(content),
                    _React$useState2 = _slicedToArray(_React$useState, 2),
                    value = _React$useState2[0],
                    setValue = _React$useState2[1];

                var emptySync = {
                  operations: [],
                  annotations: [],
                  value: null
                };

                var _React$useState3 = React.useState(emptySync),
                    _React$useState4 = _slicedToArray(_React$useState3, 2),
                    sync = _React$useState4[0],
                    setSync = _React$useState4[1];

                var editorRef = React.useRef(null);
                var colorRef = React.useRef(getRandomColor());

                var handleChange =
                /*#__PURE__*/
                function () {
                  var _ref6 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(change) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            setValue(change.value);

                            if (sync.operations.length || sync.annotations.length) {
                              setSync(emptySync);
                            } else {
                              emitChange(change);
                            }

                            if (change.value.document !== value.document) {
                              debouncedSave.cancel();
                              debouncedSave(node, change);
                            }

                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function handleChange(_x4) {
                    return _ref6.apply(this, arguments);
                  };
                }();

                var emitChange = function emitChange(change) {
                  var value = change.value.toJSON({
                    preserveSelection: true
                  }); // const key = napi.socket.id

                  var key = viewer.id;
                  var _value$selection = value.selection,
                      anchor = _value$selection.anchor,
                      focus = _value$selection.focus;
                  napi.emitNodeSideEvent(node, 'note', 'change', {
                    value: value,
                    operations: change.operations,
                    annotations: [{
                      key: key,
                      anchor: anchor,
                      focus: focus,
                      data: {
                        name: viewer.name,
                        color: colorRef.current
                      }
                    }]
                  });
                };

                var syncEditor = function syncEditor(_ref7) {
                  var _ref7$operations = _ref7.operations,
                      operations = _ref7$operations === void 0 ? [] : _ref7$operations,
                      _ref7$annotations = _ref7.annotations,
                      annotations = _ref7$annotations === void 0 ? [] : _ref7$annotations;

                  if (operations.length) {
                    editorRef.current.withoutSaving(function () {
                      operations.filter(function (op) {
                        return op.type !== 'set_selection';
                      }).forEach(function (op) {
                        editorRef.current.applyOperation(op);
                      });
                    });
                  } // Update all annotations


                  editorRef.current.value.annotations.forEach(function (annotation) {
                    if (annotation.type === Editor.ANNOTATION_TYPES.cursor) {
                      editorRef.current.removeAnnotation(annotation);
                    }
                  });
                  var documentKey = editorRef.current.value.document.key;
                  annotations.forEach(function (annotation) {
                    // Skip this client's annotation
                    // if (annotation.key === napi.socket.id) return
                    if (annotation.key === viewer.id) return; // Update the annotation key to match the client's document key

                    annotation.anchor.key = documentKey;
                    annotation.focus.key = documentKey;
                    editorRef.current.addAnnotation(_objectSpread({}, annotation, {
                      type: Editor.ANNOTATION_TYPES.cursor
                    }));
                  });
                };

                var handleRemoteChange = function handleRemoteChange(_ref8) {
                  var operations = _ref8.operations,
                      annotations = _ref8.annotations,
                      value = _ref8.value;
                  console.log('remote change', operations);
                  console.log('editor', editorRef.current);
                  setSync({
                    operations: operations,
                    annotations: annotations,
                    value: value
                  });
                };

                React.useEffect(function () {
                  napi.subscribeToNodeSideEvent(node, 'note', 'change', handleRemoteChange);
                  return function () {
                    napi.unsubscribeFromNodeSideEvent(node, 'note', 'change', handleRemoteChange);
                  };
                }, []);
                React.useEffect(function () {
                  if (sync.operations.length || sync.annotations.length) {
                    syncEditor(sync);
                  }
                }, [sync]);
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
                  overflow: "scroll"
                }, React.createElement(Box, {
                  fill: true,
                  align: "start",
                  justify: "start",
                  pad: "small"
                }, React.createElement(Editor.RichTextEditor, {
                  ref: editorRef,
                  value: value,
                  onChange: handleChange
                }))));
              };
            };

            icon = function icon(_ref9) {
              var node = _ref9.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Note, {
                size: iconSize
              }));
            };

            preview = _view({
              size: 'small'
            });
            view = _view({
              size: 'medium'
            });
            edit = view;
            return _context3.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 15:
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