function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref) {
    var __deps__, __imports__, _imports__$grommet, Box, TextInput, Button, _imports__$utils, React, Peer, Router, icons, iconSize, viewer, napi, SetupConnection, view;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, TextInput = _imports__$grommet.TextInput, Button = _imports__$grommet.Button;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, Peer = _imports__$utils.Peer, Router = _imports__$utils.Router, icons = _imports__$utils.icons;
            iconSize = __deps__.iconSize, viewer = __deps__.viewer, napi = __deps__.napi;

            SetupConnection = function SetupConnection(_ref3) {
              var node = _ref3.node,
                  peer = _ref3.peer;

              var _React$useState = React.useState(),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  remoteId = _React$useState2[0],
                  setRemoteId = _React$useState2[1];

              var handleClick = function handleClick() {
                var conn = peer.connect(remoteId, {
                  serialization: 'json',
                  metadata: {
                    node: node.id,
                    viewer: viewer
                  }
                });
                conn.on('data',
                /*#__PURE__*/
                function () {
                  var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(data) {
                    var _data$nodes, firstNode, rest, _node, syncNode, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _node2;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            console.log('Received', data);
                            _data$nodes = _toArray(data.nodes), firstNode = _data$nodes[0], rest = _data$nodes.slice(1);
                            _node = _objectSpread({}, firstNode, {
                              parentId: node.id,
                              sides: _objectSpread({}, firstNode.sides, {
                                users: [{
                                  id: viewer.node,
                                  role: 'admin'
                                }]
                              })
                            });
                            _context.next = 5;
                            return napi.createNode(null, _node);

                          case 5:
                            syncNode = _context.sent;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 9;
                            _iterator = rest[Symbol.iterator]();

                          case 11:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                              _context.next = 18;
                              break;
                            }

                            _node2 = _step.value;
                            _context.next = 15;
                            return napi.createNode(null, _objectSpread({}, _node2, {
                              sides: _objectSpread({}, _node2.sides, {
                                users: [{
                                  id: viewer.node,
                                  role: 'admin'
                                }]
                              })
                            }));

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
                            console.log('synced', syncNode);
                            Router.push({
                              pathname: Router.pathname,
                              query: {
                                node: syncNode.id
                              }
                            });

                          case 34:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[9, 20, 24, 32], [25,, 27, 31]]);
                  }));

                  return function (_x2) {
                    return _ref4.apply(this, arguments);
                  };
                }());
              };

              return React.createElement(Box, null, React.createElement(Box, {
                direction: "row",
                gap: "small"
              }, React.createElement(TextInput, {
                onChange: function onChange(event) {
                  return setRemoteId(event.target.value);
                }
              }), React.createElement(Button, {
                primary: true,
                label: "Import",
                onClick: handleClick
              })));
            };

            view = function view(_ref5) {
              var node = _ref5.node;

              var _React$useState3 = React.useState(),
                  _React$useState4 = _slicedToArray(_React$useState3, 2),
                  peer = _React$useState4[0],
                  setPeer = _React$useState4[1];

              React.useEffect(function () {
                var _peer = new Peer();

                _peer.on('open', function (id) {
                  console.log('My peer ID is: ', _peer.id);
                  setPeer(_peer);
                });

                _peer.on('connection', function (conn) {
                  console.log('New connection!', conn);
                  conn.on('open', function () {
                    conn.send({
                      node: node,
                      viewer: viewer
                    });
                  });
                });
              }, []);
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, peer ? React.createElement(SetupConnection, {
                node: node,
                peer: peer
              }) : 'loading...');
            };

            return _context2.abrupt("return", {
              modes: {
                icon: function icon() {
                  return React.createElement(Box, {
                    align: "center",
                    justify: "center"
                  }, React.createElement(icons.Download, {
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
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();