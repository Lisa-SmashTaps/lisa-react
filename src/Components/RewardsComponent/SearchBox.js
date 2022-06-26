import React from "react";
import { Input, Space } from 'antd';
const { Search } = Input;


const onSearch = (value) => console.log(value);

const SearchBox = () => (
  <Space direction="vertical">
    <Search
      placeholder="input employee name"
      allowClear
      enterButton="Search Employee"
      size="large"
      style={{padding:"10px", marginLeft:"100px"}}
      onSearch={onSearch}
    />
  </Space>
);

export default SearchBox;