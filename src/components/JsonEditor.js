import React, { Component } from "react";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import { notification } from "antd";

export class JsonEditor extends Component {
  constructor() {
    super();
    this.container = "";
    this.jsonEditor = "";
  }

  initEditor() {
    const editorOptions = {
      container: this.container,
      options: {
        mode: "code",
      },
      error: (error) => {
        notification.error({
          message: "错误",
          description: error.toString(),
        });
      },
      default: {
        _DATANAME: "dataList",
        _RULENAME: "rule",
        code: "标识码",
        createdBy: "创建人id",
        createdTime: "创建时间",
        description: "描述",
      },
    };
    this.jsonEditor = new JSONEditor(
      editorOptions.container,
      editorOptions.options,
      editorOptions.default
    );
  }

  componentDidMount() {
    this.initEditor();
  }

  render() {
    return (
      <div
        id="jsoneditor"
        className={"jsoneditor " + this.props.className}
        ref={(elem) => (this.container = elem)}
      ></div>
    );
  }
}

export default JsonEditor;
