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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
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
  regeneratorRuntime.mark(function _callee9(_ref) {
    var __deps__, __imports__, _imports__$grommet, Box, ResponsiveContext, _imports__$utils, React, _, icons, DnD, lib, Router, _imports__$nodehub, NodePreview, NodeDragTypes, NodeGrid, napi, viewer, iconSize, NodeView, useNodeChildren, handleNodeDrop, handleURLDrop, handleFilesDrop, DragNodePreview, GridItem, view, preview, icon, edit;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, ResponsiveContext = _imports__$grommet.ResponsiveContext;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, icons = _imports__$utils.icons, DnD = _imports__$utils.DnD, lib = _imports__$utils.lib, Router = _imports__$utils.Router;
            _imports__$nodehub = __imports__.nodehub, NodePreview = _imports__$nodehub.NodePreview, NodeDragTypes = _imports__$nodehub.NodeDragTypes, NodeGrid = _imports__$nodehub.NodeGrid;
            napi = __deps__.napi, viewer = __deps__.viewer, iconSize = __deps__.iconSize, NodeView = __deps__.NodeView;

            useNodeChildren = function useNodeChildren(node) {
              var _React$useState = React.useState([]),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  nodeChildren = _React$useState2[0],
                  setNodeChildren = _React$useState2[1];

              var lastId = React.useRef(null);
              var hasMore = React.useRef(false);
              var parentNode = node;
              React.useEffect(function () {
                var unmounted = false;

                var getNodeChildren =
                /*#__PURE__*/
                function () {
                  var _ref3 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee() {
                    var result, children;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return napi.getNodeChildren(node, 32);

                          case 2:
                            result = _context.sent;
                            children = result.items; // console.log(node.name, 'initial children', children)

                            if (!unmounted) {
                              lastId.current = result.lastId;
                              hasMore.current = result.hasMore;
                              setNodeChildren(children.filter(function (child) {
                                return _.get(node, 'sides.settings.ui.showHidden') || !child.name.startsWith('.');
                              }));
                            }

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function getNodeChildren() {
                    return _ref3.apply(this, arguments);
                  };
                }();

                getNodeChildren();
                return function () {
                  unmounted = true;
                };
              }, [node.id]);
              React.useEffect(function () {
                var handleNodeChildrenUpdates =
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(_ref4) {
                    var node, type;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            node = _ref4.node, type = _ref4.type;

                            if (type === 'update') {
                              console.log(parentNode.name, 'child updated', node.name);
                              setNodeChildren(function (nodeChildren) {
                                return nodeChildren.map(function (child) {
                                  return child.id === node.id ? node : child;
                                });
                              });
                            } else if (type === 'add') {
                              console.log(parentNode.name, 'child added', node.name);
                              setNodeChildren(function (nodeChildren) {
                                return [].concat(_toConsumableArray(nodeChildren), [node]);
                              });
                            } else if (type === 'remove') {
                              console.log(parentNode.name, 'child removed', node.name);
                              setNodeChildren(function (nodeChildren) {
                                return nodeChildren.filter(function (child) {
                                  return child.id !== node.id;
                                });
                              });
                            }

                          case 2:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function handleNodeChildrenUpdates(_x2) {
                    return _ref5.apply(this, arguments);
                  };
                }();

                napi.subscribeToNodeChildrenUpdates(node.id, handleNodeChildrenUpdates);
                return function () {
                  napi.unsubscribeFromNodeChildrenUpdates(node.id, handleNodeChildrenUpdates);
                };
              });
              var onMore = !hasMore.current ? null :
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3() {
                var result, newNodes;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return napi.findNodes({
                          parentId: node.id,
                          limit: 32,
                          lastId: lastId.current
                        });

                      case 2:
                        result = _context3.sent;
                        newNodes = result.items;
                        lastId.current = result.lastId;
                        hasMore.current = result.hasMore;

                        if (newNodes.length) {
                          setNodeChildren([].concat(_toConsumableArray(nodeChildren), _toConsumableArray(newNodes)));
                        }

                      case 7:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));
              return [nodeChildren, onMore];
            };

            handleNodeDrop =
            /*#__PURE__*/
            function () {
              var _ref7 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee4(item, node) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        console.log("moving ".concat(item.node.id, " to ").concat(node.id));
                        _context4.next = 3;
                        return napi.moveNode(item.node, node.id);

                      case 3:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function handleNodeDrop(_x3, _x4) {
                return _ref7.apply(this, arguments);
              };
            }();

            handleURLDrop =
            /*#__PURE__*/
            function () {
              var _ref8 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee5(item, node) {
                var url, dropedHtml, titleFromHtml, name, _node;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        url = item.urls[0];
                        dropedHtml = item.dataTransfer.getData('text/html');
                        titleFromHtml = dropedHtml ? lib.elementFromHTML(dropedHtml).textContent : null;
                        name = titleFromHtml && titleFromHtml !== '' ? titleFromHtml : url;
                        _node = {
                          name: name,
                          parentId: node.id,
                          sides: {
                            link: {
                              url: url,
                              preview: true
                            }
                          }
                        };
                        console.log('creating node from URL drop', _node);
                        _context5.next = 8;
                        return napi.createNode(null, _node);

                      case 8:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function handleURLDrop(_x5, _x6) {
                return _ref8.apply(this, arguments);
              };
            }();

            handleFilesDrop =
            /*#__PURE__*/
            function () {
              var _ref9 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee6(item, node) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        console.log('creating node from files drop', item.files);
                        console.log(item.items);

                      case 2:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function handleFilesDrop(_x7, _x8) {
                return _ref9.apply(this, arguments);
              };
            }();

            DragNodePreview = function DragNodePreview(props) {
              var _DnD$useDrag = DnD.useDrag({
                item: {
                  type: NodeDragTypes.NODE,
                  node: props.node
                }
              }),
                  _DnD$useDrag2 = _slicedToArray(_DnD$useDrag, 2),
                  dragRef = _DnD$useDrag2[1];

              var _DnD$useDrop = DnD.useDrop({
                accept: [NodeDragTypes.NODE, NodeDragTypes.SIDE, DnD.NativeTypes.URL, DnD.NativeTypes.FILE, DnD.NativeTypes.TEXT],
                drop: function () {
                  var _drop = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee7(item, monitor) {
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            console.log('drop on node preview', item, monitor);

                            if (!(item.type === NodeDragTypes.NODE && item.node.id !== props.node.id)) {
                              _context7.next = 6;
                              break;
                            }

                            _context7.next = 4;
                            return handleNodeDrop(item, props.node);

                          case 4:
                            _context7.next = 27;
                            break;

                          case 6:
                            if (!(item.type === NodeDragTypes.SIDE)) {
                              _context7.next = 19;
                              break;
                            }

                            console.log('add side from side drop', item);

                            if (!item.node.sides[item.side]) {
                              _context7.next = 17;
                              break;
                            }

                            if (!_.get(props.node, ['sides', item.side])) {
                              _context7.next = 14;
                              break;
                            }

                            _context7.next = 12;
                            return napi.updateNodeSide(props.node, item.side, item.node.sides[item.side]);

                          case 12:
                            _context7.next = 16;
                            break;

                          case 14:
                            _context7.next = 16;
                            return napi.addNodeSide(props.node, item.side, __deps__, item.node.sides[item.side]);

                          case 16:
                            Router.push({
                              pathname: Router.pathname,
                              query: _defineProperty({
                                node: props.node.id
                              }, "".concat(props.node.id, "-view"), "".concat(item.side, "-edit"))
                            });

                          case 17:
                            _context7.next = 27;
                            break;

                          case 19:
                            if (!(item.type === DnD.NativeTypes.URL)) {
                              _context7.next = 24;
                              break;
                            }

                            _context7.next = 22;
                            return handleURLDrop(item, props.node);

                          case 22:
                            _context7.next = 27;
                            break;

                          case 24:
                            if (!(item.type === DnD.NativeTypes.FILE)) {
                              _context7.next = 27;
                              break;
                            }

                            _context7.next = 27;
                            return handleFilesDrop(item, props.node);

                          case 27:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  function drop(_x9, _x10) {
                    return _drop.apply(this, arguments);
                  }

                  return drop;
                }()
              }),
                  _DnD$useDrop2 = _slicedToArray(_DnD$useDrop, 2),
                  dropRef = _DnD$useDrop2[1];

              return React.createElement(Box, {
                ref: function ref(node) {
                  return dragRef(dropRef(node));
                }
              }, React.createElement(NodePreview, props));
            };

            GridItem = function GridItem(parent) {
              return function (_ref10) {
                var node = _ref10.node;
                return React.createElement(DragNodePreview, {
                  showPreview: _.get(node.sides, 'settings.ui.background.image') !== _.get(parent.sides, 'settings.ui.background.image'),
                  node: node,
                  napi: napi,
                  viewer: viewer
                });
              };
            };

            view = function view(_ref11) {
              var node = _ref11.node;
              var screen = React.useContext(ResponsiveContext);

              var _DnD$useDrop3 = DnD.useDrop({
                accept: [NodeDragTypes.NODE, NodeDragTypes.SIDE, DnD.NativeTypes.URL, DnD.NativeTypes.FILE, DnD.NativeTypes.TEXT],
                drop: function () {
                  var _drop2 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee8(item, monitor) {
                    var _node, newNode;

                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            if (!monitor.didDrop()) {
                              _context8.next = 2;
                              break;
                            }

                            return _context8.abrupt("return");

                          case 2:
                            console.log('drop on desktop!', item);

                            if (!(item.type === NodeDragTypes.NODE)) {
                              _context8.next = 13;
                              break;
                            }

                            if (!(item.node.id !== node.id && item.node.parentId !== node.id)) {
                              _context8.next = 9;
                              break;
                            }

                            _context8.next = 7;
                            return handleNodeDrop(item, node);

                          case 7:
                            _context8.next = 11;
                            break;

                          case 9:
                            _context8.next = 11;
                            return napi.copyNode(item.node, node.id);

                          case 11:
                            _context8.next = 30;
                            break;

                          case 13:
                            if (!(item.type === NodeDragTypes.SIDE)) {
                              _context8.next = 22;
                              break;
                            }

                            _node = {
                              parentId: node.id,
                              sides: _defineProperty({}, item.side, node.sides[item.side])
                            };
                            console.log('creating node from side drop', _node);
                            _context8.next = 18;
                            return napi.createNode(null, _node);

                          case 18:
                            newNode = _context8.sent;
                            Router.push({
                              pathname: Router.pathname,
                              query: _defineProperty({
                                node: newNode.id
                              }, "".concat(newNode.id, "-view"), "".concat(item.side, "-edit"))
                            });
                            _context8.next = 30;
                            break;

                          case 22:
                            if (!(item.type === DnD.NativeTypes.URL)) {
                              _context8.next = 27;
                              break;
                            }

                            _context8.next = 25;
                            return handleURLDrop(item, node);

                          case 25:
                            _context8.next = 30;
                            break;

                          case 27:
                            if (!(item.type === DnD.NativeTypes.FILE)) {
                              _context8.next = 30;
                              break;
                            }

                            _context8.next = 30;
                            return handleFilesDrop(item, node);

                          case 30:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8);
                  }));

                  function drop(_x11, _x12) {
                    return _drop2.apply(this, arguments);
                  }

                  return drop;
                }()
              }),
                  _DnD$useDrop4 = _slicedToArray(_DnD$useDrop3, 2),
                  dropRef = _DnD$useDrop4[1];

              var _useNodeChildren = useNodeChildren(node),
                  _useNodeChildren2 = _slicedToArray(_useNodeChildren, 2),
                  nodeChildren = _useNodeChildren2[0],
                  onMore = _useNodeChildren2[1];

              return React.createElement(Box, {
                fill: true,
                pad: screen === 'small' ? 'xsmall' : 'small',
                overflow: "scroll",
                ref: dropRef
              }, React.createElement(NodeGrid, {
                step: 20,
                nodes: nodeChildren,
                Item: GridItem(node),
                onMore: onMore
              }));
            };

            preview = function preview(_ref12) {
              var node = _ref12.node;

              var _useNodeChildren3 = useNodeChildren(node),
                  _useNodeChildren4 = _slicedToArray(_useNodeChildren3, 1),
                  nodeChildren = _useNodeChildren4[0];

              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(Box, {
                round: "xsmall",
                pad: "xsmall",
                fill: true,
                direction: "row",
                wrap: true,
                gap: "xsmall",
                background: {
                  color: 'black',
                  opacity: 'weak'
                },
                justify: "center",
                align: "center",
                overflow: "scroll"
              }, nodeChildren.map(function (child) {
                return React.createElement(Box, {
                  key: child.id,
                  width: "30px",
                  height: "30px",
                  pad: "xsmall",
                  round: "xsmall",
                  background: {
                    color: 'black',
                    opacity: 'weak'
                  }
                }, React.createElement(NodeView, {
                  node: child,
                  view: napi.getNodeView(child, false),
                  mode: "icon",
                  napi: napi,
                  viewer: viewer,
                  iconSize: "small"
                }));
              })));
            };

            icon = function icon(_ref13) {
              var node = _ref13.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Desktop, {
                size: iconSize
              }));
            };

            edit = view;
            return _context9.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();

export default index;
