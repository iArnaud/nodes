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
  regeneratorRuntime.mark(function _callee(_ref) {
    var __deps__, __imports__, Box, _imports__$utils, React, _, icons, CodeEditor, napi, iconSize, _view, icon, preview, view, edit;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            Box = __imports__.grommet.Box;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, icons = _imports__$utils.icons, CodeEditor = _imports__$utils.CodeEditor;
            napi = __deps__.napi, iconSize = __deps__.iconSize;

            _view = function _view(_ref3) {
              var size = _ref3.size;
              return function (_ref4) {
                var node = _ref4.node;

                var value = _.get(node, 'sides.note.content', 'Type your note here..');

                var background = _.get(node, 'sides.note.background', {
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
                  overflow: "scroll"
                }, React.createElement(Box, {
                  fill: true,
                  align: "start",
                  justify: "start",
                  pad: "small",
                  overflow: "scroll"
                }, React.createElement(CodeEditor, {
                  value: value,
                  onChange: function onChange(newValue) {
                    return napi.updateNodeSide(node, 'note/content', newValue);
                  },
                  options: {
                    size: size,
                    language: null
                  }
                }))));
              };
            };

            icon = function icon(_ref5) {
              var node = _ref5.node;
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

export default index;
