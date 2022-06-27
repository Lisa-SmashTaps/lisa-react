import React from "react";
import "antd/dist/antd.css";
import { Card, Col, Row } from 'antd';
const RemLeaves = (props) => {
  console.log(props)
  return (
    <div className="Leave_Main">
      <Row gutter={16}>
      {props.leaveTypes.map((leave) => (
        <Col span={4}>
          <Card title={leave.LeaveName} bordered={false}>
            {leave.Count ? props.remainLeaves[leave.TypeID] ? leave.Count - props.remainLeaves[leave.TypeID] : leave.Count : "On approval of a manager"}
          </Card>
        </Col>
      ))}
      </Row>
    </div>
  );
};
export default RemLeaves;
