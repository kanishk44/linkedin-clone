import React from "react";
import { Space, Spin } from "antd";

export default function Loader() {
  return (
    <div className="loader">
      <Space size="middle">
        <Spin size="large" />
      </Space>
      <p className="loading">Loading...</p>
    </div>
  );
}
