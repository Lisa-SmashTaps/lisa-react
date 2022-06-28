import React, { useEffect, useState } from "react";
import LeaveReqForm from "./requestForm";
import RemLeaves from "./RemainingLeaves";
import LeaveStatus from "./LeaveStatus";
import { Layout, Row, Col } from "antd";
import HttpCommon from "../../../http-common";

const { Content } = Layout;

const LeaveMain = () => {
  const [remainLeaves, setRemainLeaves] = useState({});
  const [leaveTypes, setLeaveTypes] = useState({});
  const [EmpID, setEmpID] = useState(null);

  useEffect(() => {
    const EmpID = localStorage.getItem("EmpID");
    setEmpID(EmpID);
    getRemainData();
    GetLeaveTypes();
  }, []);

  function getRemainData() {
    HttpCommon.get(
      `/api/leaveRequest/getRemainLeaveCountByEmpID/${EmpID}`
    ).then((response) => {
      console.log(response.data);
      setRemainLeaves(response.data);
    });
  }
  console.log(remainLeaves);

  //get leave types
  function GetLeaveTypes() {
    HttpCommon.get(`http://localhost:3005/api/leaveType/`).then((response) => {
      console.log(response.data.data);
      setLeaveTypes(response.data.data);
    });
  }

  return (
    <div style={{ height: 100 }} className="LeaveMain">
      <Layout className="Leave-layout">
        <Content style={{ padding: "0 50px" }}>
          <div className="Leave-layout-content">
            <Row style={{ padding: "10px" }}>
              <Col span={20}>
                <h1 align="center">My Leaves</h1>
              </Col>
              <Col span={4} style={{ padding: "6px" }}>
                <LeaveReqForm
                  remainLeaves={remainLeaves}
                  leaveTypes={leaveTypes.Items ? leaveTypes.Items : []}
                />
              </Col>
            </Row>
            <RemLeaves
              remainLeaves={remainLeaves}
              leaveTypes={leaveTypes.Items ? leaveTypes.Items : []}
            />
            <LeaveStatus
              leaveTypes={leaveTypes.Items ? leaveTypes.Items : []}
            />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default LeaveMain;
