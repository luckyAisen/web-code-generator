const tabHeaderOptions = [
  {
    id: "el-table",
    name: "el-table",
  },
  {
    id: "el-form",
    name: "el-form",
  },
];

let jsonEditor;

let currentTab;

let codeEditor;

window.onload = () => {
  initEditor();
  // initTab();
  initCodeMirror();
};

const initEditor = () => {
  const editorOptions = {
    container: document.querySelector("#jsoneditor"),
    options: {
      mode: "code",
    },
    default: getHistory()
      ? getHistory()
      : {
          code: "标识码",
          createdBy: "创建人id",
          createdTime: "创建时间",
          description: "描述",
        },
  };

  try {
  } catch (err) {}

  jsonEditor = new JSONEditor(
    editorOptions.container,
    editorOptions.options,
    editorOptions.default
  );
};

const initTab = () => {
  const tabHeader = $(".tab-header");
  tabHeaderOptions.forEach((item, index) => {
    let tabItem = $(`<div class="tab-item">${item.name}</div>`);
    index === 0 && tabItem.addClass("active");
    tabItem.on("click", () => {
      currentTab = item.id;
      generatorCode(item.id);
    });
    tabHeader.append(tabItem);
  });
};

const initCodeMirror = () => {
  codeEditor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    mode: "jsx",
  });
};

const generatorCode = (type = "el-table") => {
  const content = jsonEditor.getText();
  if (content.trim().length == 0) {
    return false;
  }
  try {
    let code;
    const params = JSON.parse(content);
    switch (type) {
      case "el-table":
        code = elTable(params);
        break;
      default:
        code = elTable(params);
    }
    codeEditor.setValue(code);
  } catch (e) {
    $("#warning")
      .html('<div class="alert alert-danger">JSON 数据错误：' + e + "</div>")
      .show()
      .delay(5000)
      .fadeOut();
  }
};

const elTable = (obj) => {
  let str = `<el-table :data="tableData">`;
  Object.keys(obj).forEach((key) => {
    str += `\n  <el-table-column prop="${key}" label="${obj[key]}">
  </el-table-column>`;
  });
  str += "\n</el-table>";
  return str;
};

const elForm = (obj) => {
  let str = `<el-table :data="tableData">`;
  Object.keys(obj).forEach((key) => {
    str += `\n  <el-table-column prop="${key}" label="${obj[key]}">
  </el-table-column>`;
  });
  str += "\n</el-table>";
  return str;
};

const getHistory = (type) => {
  try {
    const data = localStorage.getItem("APPEAL_JSONEDITOR");
    if (!isDef(data) || data !== null || !JSON.parse(data)[type]) {
      throw new Error("history is not found");
    }
    return JSON.parse(data)[type];
  } catch (err) {
    return false;
  }
};
