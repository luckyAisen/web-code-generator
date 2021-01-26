import React, { Component } from "react";
import PropTypes from "prop-types";
import JsonEditor from "../../../components/JsonEditor";
import CodeEditor from "../../../components/CodeEditor/";
import styled from "styled-components";
import { Button, notification } from "antd";
import { validate, generator } from "./utils";

const CodeWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 800px;
  .code-editor {
    flex: 1;
    height: 100%;

    .CodeMirror {
      height: 100%;
    }
  }
`;

const JsonEditorWrapper = styled(JsonEditor)`
  flex: 1;
`;

const BtnWrapper = styled.div`
  flex: 0 0 100px;
  display: flex;
  justify-content: center;
`;

export default class Code extends Component {
  constructor() {
    super();
    this.jsonEditorComponentRef = React.createRef();
    this.codeEditorComponentRef = React.createRef();
    this.state = {
      value: "",
    };
  }
  async generatorCode() {
    try {
      const jsonstr = this.jsonEditorComponentRef.jsonEditor.getText();
      const json = await validate(jsonstr);
      const code = await generator(this.props.type, json);
      this.changeCode(code);
    } catch (error) {
      notification.error({
        message: "错误",
        description: error.message,
      });
    }
  }

  changeCode(value) {
    console.log(this);
    debugger;
    this.setState(() => ({ value }));
  }

  render() {
    return (
      <CodeWrapper>
        <JsonEditorWrapper
          ref={(elem) => (this.jsonEditorComponentRef = elem)}
        />
        <BtnWrapper>
          <Button
            type="primary"
            onClick={() => {
              this.generatorCode();
            }}
          >
            生成代码
          </Button>
        </BtnWrapper>
        <CodeEditor
          value={this.state.value}
          className="code-editor"
          ref={(elem) => (this.codeEditorComponentRef = elem)}
          handleValueChange={(value) => {
            this.changeCode(value);
          }}
        />
      </CodeWrapper>
    );
  }
}

Code.defaultProps = {
  type: "el-table",
};

Code.propTypes = {
  type: PropTypes.string,
};
