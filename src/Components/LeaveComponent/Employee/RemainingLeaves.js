import React from "react";
import "antd/dist/antd.css";
import { Card, Col, Row } from 'antd';
const LEAVES = [
  {name:"Annual Leave", count:14, value:'annual'},
  {name:"Casual Leave", count:7, value:'casual'},
  {name:"Medical Leave", count:7, value:'medical'},
  {name:"Paternity Leave", count:7, value:'paternity'},
];
const RemLeaves = (props) => {
  console.log(props)
  return (
    <div className="Leave_Main">
      <Row gutter={16}>
      {props.leaveTypes.map((leave) => (
        <Col span={4}>
          <Card title={leave.LeaveName} bordered={false}>
            {leave.Count ? props.remainLeaves[leave.TypeID] ? leave.Count - props.remainLeaves[leave.TypeID] : leave.Count : "Has to be approved by a manager"}
          </Card>
        </Col>
      ))}
      </Row>
    </div>
  );
};
export default RemLeaves;
