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
    var __deps__, __imports__, _imports__$grommet, Box, Button, Text, _imports__$utils, React, Peer, icons, hooks, lib, iconSize, viewer, napi, getNodeTree, view;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, Button = _imports__$grommet.Button, Text = _imports__$grommet.Text;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, Peer = _imports__$utils.Peer, icons = _imports__$utils.icons, hooks = _imports__$utils.hooks, lib = _imports__$utils.lib;
            iconSize = __deps__.iconSize, viewer = __deps__.viewer, napi = __deps__.napi;

            getNodeTree =
            /*#__PURE__*/
            function () {
              var _ref3 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(node) {
                var nodes,
                    _ref4,
                    items,
                    _iteratorNormalCompletion,
                    _didIteratorError,
                    _iteratorError,
                    _iterator,
                    _step,
                    _node,
                    _args = arguments;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        nodes = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
                        nodes.push(node);
                        _context.next = 4;
                        return napi.getNodeChildren(node);

                      case 4:
                        _ref4 = _context.sent;
                        items = _ref4.items;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 9;
                        _iterator = items[Symbol.iterator]();

                      case 11:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                          _context.next = 18;
                          break;
                        }

                        _node = _step.value;
                        _context.next = 15;
                        return getNodeTree(_node, nodes);

                      case 15:
                        _iteratorNormalCompletion = true;
                        _context.next = 11;
                        break;

                      case 18:
                        _context.next = 24;
                        break;

                      case 20:
                        _context.prev = 20;
                        _context.t0 = _context["catch"](9);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                      case 24:
                        _context.prev = 24;
                        _context.prev = 25;

                        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                          _iterator["return"]();
                        }

                      case 27:
                        _context.prev = 27;

                        if (!_didIteratorError) {
                          _context.next = 30;
                          break;
                        }

                        throw _iteratorError;

                      case 30:
                        return _context.finish(27);

                      case 31:
                        return _context.finish(24);

                      case 32:
                        return _context.abrupt("return", nodes);

                      case 33:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[9, 20, 24, 32], [25,, 27, 31]]);
              }));

              return function getNodeTree(_x2) {
                return _ref3.apply(this, arguments);
              };
            }();

            view = function view(_ref5) {
              var node = _ref5.node;

              var _React$useState = React.useState(),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  peer = _React$useState2[0],
                  setPeer = _React$useState2[1];

              var _React$useState3 = React.useState(false),
                  _React$useState4 = _slicedToArray(_React$useState3, 2),
                  copied = _React$useState4[0],
                  setCopied = _React$useState4[1]; // const [loaded] = hooks.useScript('https://cdn.jsdelivr.net/npm/webtorrent@latest/webtorrent.min.js')
              // React.useEffect(() => {
              //   loaded && console.log(window.WebTorrent)
              // }, [loaded])


              React.useEffect(function () {
                var _peer = new Peer();

                _peer.on('open', function (id) {
                  console.log('My peer ID is: ', _peer.id);
                  setPeer(_peer);
                });

                _peer.on('connection', function (conn) {
                  console.log('New connection!', conn);
                  conn.on('open',
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2() {
                    var nodes;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return getNodeTree(node);

                          case 2:
                            nodes = _context2.sent;
                            conn.send({
                              nodes: nodes,
                              viewer: viewer
                            });

                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  })));
                });
              }, []);
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, peer ? React.createElement(Box, {
                direction: "row",
                gap: "small",
                align: "center",
                justify: "center",
                pad: "small",
                round: "xsmall",
                background: {
                  color: 'black',
                  opacity: 'medium'
                }
              }, React.createElement(Box, null, React.createElement(Text, {
                weight: "bold",
                color: copied && 'control'
              }, peer.id)), React.createElement(Button, {
                icon: React.createElement(icons.Copy, {
                  color: "control"
                }),
                onClick: function onClick() {
                  return lib.clipboardCopy(peer.id).then(function () {
                    return setCopied(true);
                  });
                }
              })) : 'loading...');
            };

            return _context3.abrupt("return", {
              modes: {
                icon: function icon() {
                  return React.createElement(Box, {
                    align: "center",
                    justify: "center"
                  }, React.createElement(icons.Upload, {
                    size: iconSize
                  }));
                },
                preview: view,
                view: view,
                edit: view
              }
            });

          case 7:
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
