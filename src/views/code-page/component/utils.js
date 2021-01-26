export const validate = (jsonstr) => {
  return new Promise((resolve, reject) => {
    try {
      if (jsonstr.trim().length === 0) {
        throw new Error("源对象不能为空");
      }
      const params = JSON.parse(jsonstr);
      resolve(params);
    } catch (err) {
      console.dir(err);
      reject(err);
    }
  });
};

export const generator = (type = "el-table", json) => {
  switch (type) {
    case "el-table":
      return elTable(json);
    case "el-form":
      return elForm(json);
    case "el-form-rule":
      return elFormRule(json);
    default:
      return elTable(json);
  }
};

export const elTable = (json) => {
  return new Promise((resolve, reject) => {
    try {
      const dataName = json["_DATANAME"] ? json["_DATANAME"] : "tableData";
      let str = `<el-table :data="${dataName}">`;
      Object.keys(json).forEach((key) => {
        if (key !== "_DATANAME" && key !== "_RULENAME") {
          str += `\n  <el-table-column prop="${key}" label="${json[key]}">
  </el-table-column>`;
        }
      });
      str += "\n</el-table>";
      resolve(str);
    } catch (error) {
      reject(error);
    }
  });
};

export const elForm = (json) => {
  return new Promise((resolve, reject) => {
    try {
      const dataName = json["_DATANAME"] ? json["_DATANAME"] : "form";
      let str = `<el-form :model="${dataName}" label-width="200px">`;
      Object.keys(json).forEach((key) => {
        if (key !== "_DATANAME" && key !== "_RULENAME") {
          str += `\n  <el-form-item label="${json[key]}">
    <el-input v-model="${dataName}.${key}" placeholder="请输入${key}"></el-input>
  </el-form-item>`;
        }
      });
      str += "\n</el-form>";
      resolve(str);
    } catch (error) {
      reject(error);
    }
  });
};

export const elFormRule = (json) => {
  return new Promise((resolve, reject) => {
    try {
      const dataName = json["_DATANAME"] ? json["_DATANAME"] : "form";
      const rulesName = json["_RULENAME"] ? json["_RULENAME"] : "rules";
      let str = `<el-form :model="${dataName}" :rules="${rulesName}" label-width="200px">`,
        ruleStr = `${rulesName}:{`,
        rulejSON = {};
      Object.keys(json).forEach((key) => {
        if (key !== "_DATANAME" && key !== "_RULENAME") {
          str += `\n  <el-form-item label="${json[key]}" prop="${key}">
    <el-input v-model="${dataName}.${key}" placeholder="请输入${key}"></el-input>
  </el-form-item>`;
          rulejSON[key] = [
            { required: true, message: `请输入${key}`, trigger: "blur" },
          ];
        }
      });
      str += "\n</el-form>";

      str += "\n\n";

      str += `<!----- 以下是生成的rules ----->`;

      str += "\n\n";

      for (let item in rulejSON) {
        ruleStr += `\n  ${item}:${JSON.stringify(rulejSON[item])}`;
      }
      ruleStr += `\n}`;

      str += `\n${ruleStr}`;

      resolve(str);
    } catch (error) {
      reject(error);
    }
  });
};
