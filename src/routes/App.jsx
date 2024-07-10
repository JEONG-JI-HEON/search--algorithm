import React from "react";

import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const { Search } = Input;

const App = () => {
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
  };

  return (
    <Space direction="vertical">
      <Search placeholder="input search text" allowClear enterButton="Search" size="large" onSearch={onSearch} />
    </Space>
  );
};
export default App;
