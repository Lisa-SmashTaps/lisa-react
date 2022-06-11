import React from "react";
import "antd/dist/antd.css";
import { Card, Col, Row } from 'antd';
const LEAVES = [
  "Annual Leave",
  "Casual Leave",
  "Medical Leave",
  "Paternity Leave",
  "Feeding Hours",
  "Lieu Leave",
];
const RemLeaves = () => {
  return (
    <div className="Leave_Main">
      <Row gutter={16}>
      {LEAVES.map((leave) => (
        <Col span={4}>
          <Card title={leave} bordered={false}>
            --
          </Card>
        </Col>
      ))}
      </Row>
    </div>
  );
};
export default RemLeaves;
