function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref) {
    var __deps__, __imports__, _imports__$grommet, Box, Button, _imports__$utils, React, icons, Router, CoolBox, napi, iconSize, e, view, icon;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, Button = _imports__$grommet.Button;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, icons = _imports__$utils.icons, Router = _imports__$utils.Router, CoolBox = _imports__$utils.CoolBox;
            napi = __deps__.napi, iconSize = __deps__.iconSize;
            e = React.createElement;

            view = function view(_ref3) {
              var node = _ref3.node;
              return e(CoolBox, {
                filter: 'grayscale(100%)',
                background: napi.getNodeBackground(node),
                fill: true,
                align: 'center',
                justify: 'center'
              }, e(Button, {
                'data-testid': 'confirmDelete.node.action',
                label: "Delete ".concat(node.name),
                icon: e(icons.Trash),
                primary: true,
                color: 'status-error',
                onClick: function () {
                  var _onClick = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return napi.deleteNode(node.id);

                          case 2:
                            Router.push({
                              pathname: Router.pathname,
                              query: {
                                node: node.parentId
                              }
                            });

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  function onClick() {
                    return _onClick.apply(this, arguments);
                  }

                  return onClick;
                }()
              }));
            };

            icon = function icon(_ref4) {
              var node = _ref4.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.Trash, {
                size: iconSize
              }));
            };

            return _context2.abrupt("return", {
              modes: {
                icon: icon,
                view: view
              }
            });

          case 8:
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