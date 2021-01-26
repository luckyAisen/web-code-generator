import React from "react";
import styled from "styled-components";
import { Tabs } from "antd";
import Code from "./component/Code";

const { TabPane } = Tabs;
const TabsList = [
  {
    id: "el-table",
    name: "el-table",
  },
  {
    id: "el-form",
    name: "el-form",
  },
  {
    id: "el-form-rule",
    name: "el-form-rule",
  },
];

const CodePageWrapper = styled.div`
  padding: 20px;
`;

const CodePage = () => {
  return (
    <CodePageWrapper>
      <Tabs>
        {TabsList.map((tabs) => (
          <TabPane tab={tabs.name} key={tabs.id}>
            <Code type={tabs.id}></Code>
          </TabPane>
        ))}
      </Tabs>
    </CodePageWrapper>
  );
};

export default CodePage;
