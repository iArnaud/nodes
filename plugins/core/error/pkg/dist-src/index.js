function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var __deps__, __imports__, Box, _imports__$utils, React, icons, _, NodeMessage, iconSize, view, icon, preview, edit;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            Box = __imports__.grommet.Box;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, icons = _imports__$utils.icons, _ = _imports__$utils.lodash;
            NodeMessage = __imports__.nodehub.NodeMessage;
            iconSize = __deps__.iconSize;

            view = function view(_ref3) {
              var node = _ref3.node;

              var error = _.get(node, 'sides.error', {});

              return React.createElement(NodeMessage, {
                node: node,
                message: error.message,
                color: "status-error"
              });
            };

            icon = function icon(_ref4) {
              var node = _ref4.node;
              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(icons.StatusCritical, {
                size: iconSize,
                color: "status-error"
              }));
            };

            preview = view;
            edit = view;
            return _context.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 10:
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