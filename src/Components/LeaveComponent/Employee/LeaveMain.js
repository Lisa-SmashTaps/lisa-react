import React from "react";
import LeaveReqForm from "./requestForm";
import RemLeaves from "./RemainingLeaves";
import LeaveStatus from "./LeaveStatus";
import { Layout, Row, Col } from "antd";
const { Content } = Layout;

const LeaveMain =() => {
  return (
    <div className="LeaveMain">
    <Layout className="Leave-layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="Leave-layout-content">
            <Row style={{padding:"10px"}}>
              <Col span={20}>
                <h1 align="center">My Leaves</h1>
              </Col>
              <Col span={4} style={{padding:"6px"}}>
                <LeaveReqForm />
              </Col>
          </Row>
          <RemLeaves />
          <LeaveStatus />
        </div>
      </Content>
  </Layout>
    </div> 
  );
}

export default LeaveMain;
