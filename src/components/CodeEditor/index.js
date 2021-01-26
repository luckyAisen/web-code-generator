import React, { Component } from "react";
import PropTypes from "prop-types";
import { UnControlled as CodeMirrorControl } from "react-codemirror2";
import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/jsx/jsx";
import "./defineMode";

export default class CodeEditor extends Component {
  constructor() {
    super();
    this.options = {
      lineNumbers: true,
      // theme: "material",
      mode: "jsx",
    };
  }
  render() {
    return (
      <CodeMirrorControl
        className={"code-mirror " + this.props.className}
        value={this.props.value}
        options={this.options}
        onChange={(editor, data, value) => {
          this.props.handleValueChange(value);
        }}
      />
    );
  }
}

CodeEditor.defaultProps = {
  value: "",
};

CodeEditor.propTypes = {
  value: PropTypes.string,
  handleValueChange: PropTypes.func,
};
