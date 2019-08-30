function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// import { Editor } from 'slate-react'
import { Value } from 'slate';
import createRenderAnnotation from "./renderAnnotation.js";
export default (function (_ref) {
  var React = _ref.React,
      Box = _ref.Box;

  var _require = require('slate-react'),
      Editor = _require.Editor;

  var _createRenderAnnotati = createRenderAnnotation({
    React: React,
    Box: Box
  }),
      renderAnnotation = _createRenderAnnotati.renderAnnotation,
      ANNOTATION_TYPES = _createRenderAnnotati.ANNOTATION_TYPES;

  var RichTextEditor = React.forwardRef(function (props, ref) {
    return React.createElement(Editor, _extends({
      ref: ref
    }, props, {
      renderAnnotation: renderAnnotation
    }));
  });
  return {
    RichTextEditor: RichTextEditor,
    Value: Value,
    ANNOTATION_TYPES: ANNOTATION_TYPES
  };
});