### web-code-generator

这是一个前端生成代码的工具，用于解决日常项目开发过程中那些需要重复编写的代码，例如：el-table、el-form 等等。

目前仅支持生成 el-table 表格、el-form 表单、el-form-rule 包含基本校验的表单。

页面如下：

![操作页面](https://img-blog.csdnimg.cn/2021012613544976.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMwMDMzMjEz,size_16,color_FFFFFF,t_70)

其中左边为数据源，右边为生成的代码。

**参数说明：**

数据源必须为json格式，其中：

- ```_DATANAME``` 为组件或者实例中的变量名称

- ```_RULENAME``` el-form-rule 模式中的 rules 变量名称

如有好的想法，可以在issues中和我分享。
