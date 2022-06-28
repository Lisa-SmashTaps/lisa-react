import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Row, Col } from "antd";
import ProfileForm from "./ProfileForm";
import HttpCommon from "../../http-common";

const DisplayProfile = () => {
  const [EmpId, setEmpId] = useState(null);
  const [EmpData, setEmpData] = useState(null);

  useEffect(() => {
    const empId = localStorage.getItem("EmpID");
    console.log(empId);
    setEmpId(empId);
    HttpCommon.get(`/api/employee/${empId}`).then((response) => {
      console.log(response.data);
      setEmpData(response.data);
    });
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <Row style={{ padding: "10px" }}>
        <Col span={20}>
          <center>
            <Avatar size={100} icon={<UserOutlined />} />
            <Row style={{ padding: "10px" }}>
              <h2 style={{ marginRight: "50px" }}>Name :</h2>
              {EmpData !== null &&
                EmpData !== undefined &&
                EmpData.Item !== undefined && (
                  <h2 style={{ marginRight: "50px" }}>
                    {EmpData.Item.FName + " " + EmpData.Item.LName}
                  </h2>
                )}
            </Row>
            <Row style={{ padding: "10px" }}>
              <h4 style={{ marginRight: "50px" }}>UserRole :</h4>
              {EmpData !== null &&
                EmpData !== undefined &&
                EmpData.Item !== undefined && (
                  <h4 style={{ marginRight: "50px" }}>
                    {EmpData.Item.UserRole}
                  </h4>
                )}
            </Row>
            <Row style={{ padding: "10px" }}>
              <h4 style={{ marginRight: "50px" }}>gmail :</h4>
              {EmpData !== null &&
                EmpData !== undefined &&
                EmpData.Item !== undefined && (
                  <h4 style={{ marginRight: "50px" }}>{EmpData.Item.email}</h4>
                )}
            </Row>
          </center>
        </Col>
        <Col span={4} style={{ padding: "6px" }}>
          <ProfileForm />
        </Col>
      </Row>
      <Row>
        <h4 style={{marginLeft:"20px",marginBottom:"25px"}}>DOB :</h4>
        &nbsp;&nbsp;&nbsp;
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.DOB}</h4>
          )}
      </Row>
      <Row>
        <h4 style={{marginLeft:"20px",marginBottom:"25px"}}>Mobile Number :</h4>
        &nbsp;&nbsp;&nbsp;
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.PhoneNo}</h4>
          )}
      </Row>
      <Row>
        <h4 style={{marginLeft:"20px",marginBottom:"25px"}}>Address :</h4>
        &nbsp;&nbsp;&nbsp;
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.address}</h4>
          )}
      </Row>
      <Row>
        <h4 style={{marginLeft:"20px",marginBottom:"25px"}}>Ordinary Level Results: </h4>
        &nbsp;&nbsp;&nbsp;
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.olResult}</h4>
          )}
      </Row>
      <Row>
        <h4 style={{marginLeft:"20px",marginBottom:"25px"}}>Advanced Level Results: </h4>
        &nbsp;&nbsp;&nbsp;
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.alResult}</h4>
          )}
      </Row>
      <Row>
        <h4 style={{marginLeft:"20px",marginBottom:"25px"}}>Higher Education: </h4>
        &nbsp;&nbsp;&nbsp;
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.HighEdu}</h4>
          )}
      </Row>
      <Row>
        <h4 style={{marginLeft:"20px",marginBottom:"25px"}}>Working Experince: </h4>
        &nbsp;&nbsp;&nbsp;
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.WorkingEx}</h4>
          )}
      </Row>
      <Row>
        <h4 style={{marginLeft:"20px",marginBottom:"25px"}}>Achievements: </h4>
        &nbsp;&nbsp;&nbsp;
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.Achivements}</h4>
          )}
      </Row>
      <Row>
        <h4 style={{marginLeft:"20px",marginBottom:"25px"}}>Interests: </h4>
        &nbsp;&nbsp;&nbsp;
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.Interests}</h4>
          )}
      </Row>
    </div>
  );
};
export default DisplayProfile;
