function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var __deps__, __imports__, _imports__$grommet, Box, Text, React, iconSize, view;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, Text = _imports__$grommet.Text;
            React = __imports__.utils.React;
            iconSize = __deps__.iconSize;

            view = function view(_ref3) {
              var node = _ref3.node;
              return React.createElement(Box, {
                fill: true,
                background: {
                  color: 'black',
                  opacity: 'medium'
                },
                overflow: "scroll"
              }, React.createElement("pre", null, JSON.stringify(node, null, 2)));
            };

            return _context.abrupt("return", {
              modes: {
                icon: function icon() {
                  return React.createElement(Box, {
                    align: "center",
                    justify: "center"
                  }, React.createElement(Text, {
                    size: iconSize
                  }, '{}'));
                },
                preview: view,
                view: view,
                edit: view
              }
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();