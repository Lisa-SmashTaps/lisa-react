import React, { useEffect, useState } from "react";
import LeaveReqForm from "./requestForm";
import RemLeaves from "./RemainingLeaves";
import LeaveStatus from "./LeaveStatus";
import { Layout, Row, Col } from "antd";
import HttpCommon from "../../../http-common";

const { Content } = Layout;

const LeaveMain =() => {

  const [remainLeaves, setRemainLeaves] = useState({})

  useEffect(()=>{
    getRemainData();
  },[])


  function getRemainData() {
    HttpCommon.get(`/api/leaveRequest/getRemainLeaveCountByEmpID/E001`)
    .then((response) => {
      setRemainLeaves(response.data);
    });
  }

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
                <LeaveReqForm remainLeaves={remainLeaves} />
              </Col>
          </Row>
          <RemLeaves remainLeaves={remainLeaves} />
          <LeaveStatus />
        </div>
      </Content>
  </Layout>
    </div> 
  );
}

export default LeaveMain;
