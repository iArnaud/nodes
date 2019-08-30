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
    var __deps__, __imports__, _imports__$grommet, Box, Text, Button, _imports__$utils, React, icons, napi, iconSize, viewer, opBackgroundColors, view, icon, preview, edit;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, Text = _imports__$grommet.Text, Button = _imports__$grommet.Button;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, icons = _imports__$utils.icons;
            napi = __deps__.napi, iconSize = __deps__.iconSize, viewer = __deps__.viewer;
            opBackgroundColors = {
              add: 'status-ok',
              replace: 'status-warning',
              remove: 'status-error'
            };

            view = function view(_ref3) {
              var node = _ref3.node;

              var _React$useState = React.useState([]),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  diff = _React$useState2[0],
                  setDiff = _React$useState2[1];

              React.useEffect(function () {
                var getDiff =
                /*#__PURE__*/
                function () {
                  var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee() {
                    var _diff;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return napi.mergeFromClipboard(node, viewer);

                          case 2:
                            _diff = _context.sent;
                            setDiff(_diff);

                          case 4:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function getDiff() {
                    return _ref4.apply(this, arguments);
                  };
                }();

                getDiff();
              }, []);
              return React.createElement(Box, {
                align: "center",
                justify: "center",
                fill: true,
                pad: "xsmall",
                gap: "small"
              }, React.createElement(Box, {
                align: "center",
                justify: "start",
                width: "large",
                gap: "small",
                background: {
                  color: 'black',
                  opacity: 'medium'
                },
                pad: "small",
                round: true,
                overflow: "scroll"
              }, diff.map(function (_ref5, i) {
                var op = _ref5.op,
                    path = _ref5.path,
                    value = _ref5.value;
                return React.createElement(Box, {
                  key: "".concat(op, "-").concat(path, "-").concat(i),
                  fill: "horizontal",
                  background: {
                    color: 'black',
                    opacity: 'medium'
                  },
                  pad: "small",
                  round: true,
                  style: {
                    minHeight: '300px'
                  }
                }, React.createElement(Box, {
                  direction: "row",
                  align: "center",
                  justify: "between"
                }, React.createElement(Box, {
                  pad: "small",
                  round: true,
                  direction: "row",
                  gap: "xsmall",
                  align: "center",
                  justify: "center"
                }, React.createElement(Text, {
                  size: "medium",
                  weight: "bold"
                }, op)), React.createElement(Box, {
                  pad: "small",
                  round: true,
                  direction: "row",
                  gap: "xsmall",
                  align: "center",
                  justify: "center"
                }, React.createElement(Text, {
                  size: "medium"
                }, path)), React.createElement(Box, {
                  direction: "row"
                }, React.createElement(Button, {
                  icon: React.createElement(icons.Action, null),
                  onClick:
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2() {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!(path !== '/children')) {
                              _context2.next = 6;
                              break;
                            }

                            _context2.next = 3;
                            return napi.updateNode(node.id, [{
                              op: op,
                              path: path,
                              value: value
                            }]);

                          case 3:
                            setDiff(diff.filter(function (elm, _i) {
                              return _i !== i;
                            }));
                            _context2.next = 7;
                            break;

                          case 6:
                            console.log(op, path, value);

                          case 7:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }))
                }))), React.createElement(Box, {
                  fill: true,
                  overflow: "scroll",
                  align: "center",
                  justify: "center",
                  background: {
                    color: opBackgroundColors[op],
                    opacity: 'strong'
                  },
                  round: true
                }, React.createElement("pre", null, JSON.stringify(value, null, 2))));
              })));
            };

            icon = function icon(_ref7) {
              var node = _ref7.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Aggregate, {
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
