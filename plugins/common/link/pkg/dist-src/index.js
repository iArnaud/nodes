function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import urlParser from 'js-video-url-parser';
export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref) {
    var __deps__, __imports__, _imports__$grommet, Box, Image, Anchor, Text, Button, _imports__$utils, React, _, icons, JSONSchemaForm, Router, Link, napi, iconSize, IframeView, guessUrlType, _view, pluginSchema, uiSchema, edit, icon, preview, view;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, Image = _imports__$grommet.Image, Anchor = _imports__$grommet.Anchor, Text = _imports__$grommet.Text, Button = _imports__$grommet.Button;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, icons = _imports__$utils.icons, JSONSchemaForm = _imports__$utils.JSONSchemaForm, Router = _imports__$utils.Router, Link = _imports__$utils.Link;
            napi = __deps__.napi, iconSize = __deps__.iconSize;

            IframeView = function IframeView(_ref3) {
              var url = _ref3.url;
              return React.createElement(Box, {
                pad: {
                  bottom: '56.25%'
                },
                style: {
                  position: 'relative'
                },
                fill: true
              }, React.createElement("iframe", {
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0
                },
                width: "100%",
                height: "100%",
                src: url,
                frameBorder: "0",
                allowFullScreen: true
              }));
            };

            guessUrlType = function guessUrlType(url) {
              var type = 'default';

              if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.webp') || url.endsWith('.png')) {
                type = 'image';
              } else if (url.endsWith('.pdf')) {
                type = 'pdf';
              } else if (urlParser.parse(url)) {
                type = 'video';
              }

              return type;
            };

            _view = function _view(_ref4) {
              var size = _ref4.size;
              return function (_ref5) {
                var node = _ref5.node;

                var url = _.get(node, 'sides.link.url');

                var urlObj = new URL(url);
                var modes = {
                  video: React.createElement(Box, {
                    fill: true,
                    pad: size === 'small' ? null : 'small'
                  }, React.createElement(IframeView, {
                    url: urlParser.create({
                      videoInfo: urlParser.parse(url),
                      format: 'embed',
                      params: {
                        controls: '1'
                      }
                    })
                  })),
                  pdf: React.createElement(Box, {
                    overflow: "auto",
                    fill: true,
                    align: "center",
                    justify: "center"
                  }, React.createElement(IframeView, {
                    url: url
                  })),
                  image: React.createElement(Box, {
                    fill: true,
                    pad: "small",
                    align: "center",
                    justify: "center"
                  }, React.createElement(Image, {
                    src: url,
                    fit: size === 'small' ? 'contain' : 'cover',
                    style: {
                      height: '100%',
                      width: '100%'
                    }
                  })),
                  "default": React.createElement(Box, {
                    fill: true,
                    align: "center",
                    justify: "center"
                  }, window.location.hostname === urlObj.hostname ? React.createElement(Link, {
                    href: urlObj.pathname + urlObj.search
                  }, React.createElement(Anchor, {
                    size: size === 'small' ? 'xsmall' : size,
                    label: node.name
                  })) : React.createElement(Anchor, {
                    size: size === 'small' ? 'xsmall' : size,
                    label: size === 'small' ? "".concat(urlObj.hostname, "...") : url,
                    href: url,
                    target: "_blank"
                  }))
                };
                return React.createElement(Box, {
                  align: "center",
                  justify: "center",
                  fill: true,
                  overflow: "scroll",
                  pad: "small"
                }, modes[guessUrlType(url)]);
              };
            };

            pluginSchema = {
              type: 'object',
              required: ['url'],
              properties: {
                url: {
                  type: 'string',
                  title: 'URL'
                }
              }
            };
            uiSchema = {
              url: {
                'ui:autofocus': true,
                'ui:options': {
                  testid: 'url.input'
                }
              }
            };

            edit = function edit(_ref6) {
              var node = _ref6.node;

              var _$get = _.get(node, 'sides.link', {}),
                  url = _$get.url;

              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(Box, {
                width: "large",
                overflow: "scroll"
              }, React.createElement(JSONSchemaForm, {
                formData: {
                  url: url
                },
                schema: pluginSchema,
                uiSchema: uiSchema,
                onSubmit:
                /*#__PURE__*/
                function () {
                  var _ref8 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(_ref7) {
                    var formData;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            formData = _ref7.formData;
                            _context.next = 3;
                            return napi.updateNodeSide(node, 'link', formData);

                          case 3:
                            Router.push({
                              pathname: Router.pathname,
                              query: {
                                node: node.id
                              }
                            });

                          case 4:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref8.apply(this, arguments);
                  };
                }()
              })), React.createElement(Box, {
                align: "start",
                justify: "start",
                gap: "small",
                pad: "small"
              }, React.createElement(Text, null, React.createElement("i", null, "To use the bookmarklet drag this to your bookmarks toolbar:")), React.createElement(Box, {
                round: "xsmall",
                pad: "small",
                background: {
                  color: 'black',
                  opacity: 'medium'
                }
              }, React.createElement(Button, {
                plain: true,
                href: "javascript:void(location.href=\"".concat(window.location.origin).concat(window.location.pathname, "?node=\"+encodeURIComponent(location.href)+\"&title=\"+encodeURIComponent(document.title))")
              }, React.createElement(Text, {
                weight: "bold"
              }, "Create Node")))));
            };

            icon = function icon(_ref9) {
              var node = _ref9.node;
              var linkIcons = {
                video: React.createElement(icons.CirclePlay, {
                  size: iconSize
                }),
                pdf: React.createElement(icons.DocumentPdf, {
                  size: iconSize
                }),
                image: React.createElement(icons.Image, {
                  size: iconSize
                }),
                "default": React.createElement(icons.Link, {
                  size: iconSize
                })
              };

              var url = _.get(node, 'sides.link.url');

              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, linkIcons[url ? guessUrlType(url) : 'default']);
            };

            preview = _view({
              size: 'small'
            });
            view = _view({
              size: 'medium'
            });
            return _context2.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 14:
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