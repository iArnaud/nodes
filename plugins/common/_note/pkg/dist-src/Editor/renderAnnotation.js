function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

export default (function (_ref) {
  var React = _ref.React,
      Box = _ref.Box;
  var ANNOTATION_TYPES = {
    cursor: 'cursor'
  };

  var renderAnnotation = function renderAnnotation(props, editor, next) {
    var children = props.children,
        annotation = props.annotation,
        attributes = props.attributes;
    var type = annotation.type,
        data = annotation.data;

    var _data$toJS = data.toJS(),
        color = _data$toJS.color,
        name = _data$toJS.name;

    switch (type) {
      case ANNOTATION_TYPES.cursor:
        return React.createElement(Box, _extends({
          as: "span"
        }, attributes, {
          style: {
            backgroundColor: color,
            display: 'inline-block'
          },
          width: "2px"
        }), children, React.createElement(Box, {
          as: "span",
          style: {
            backgroundColor: color,
            paddingRight: '2px',
            position: 'relative',
            display: 'inline-block'
          }
        }, React.createElement(Box, {
          as: "span",
          style: {
            position: 'absolute',
            bottom: '100%',
            left: '100%',
            color: color,
            fontSize: '12px',
            display: 'inline-block',
            direction: 'row',
            overflowWrap: 'normal',
            whiteSpace: 'nowrap'
          }
        }, name)));

      default:
        return next();
    }
  };

  return {
    renderAnnotation: renderAnnotation,
    ANNOTATION_TYPES: ANNOTATION_TYPES
  };
});