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
        <h4>DOB :</h4>
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.DOB}</h4>
          )}
      </Row>
      <Row>
        <h4>Mobile Number :</h4>
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.DOB}</h4>
          )}
      </Row>
      <Row>
        <h4>Address :</h4>
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.DOB}</h4>
          )}
      </Row>
      <Row>
        <h4>Ordinary Level Results: </h4>
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.DOB}</h4>
          )}
      </Row>
      <Row>
        <h4>Advanced Level Results: </h4>
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.DOB}</h4>
          )}
      </Row>
      <Row>
        <h4>Higher Education: </h4>
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.DOB}</h4>
          )}
      </Row>
      <Row>
        <h4>Working Experince: </h4>
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.DOB}</h4>
          )}
      </Row>
      <Row>
        <h4>Achievements: </h4>
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.DOB}</h4>
          )}
      </Row>
      <Row>
        <h4>Interests: </h4>
        {EmpData !== null &&
          EmpData !== undefined &&
          EmpData.Item !== undefined && (
            <h4 style={{ marginRight: "50px" }}>{EmpData.Item.DOB}</h4>
          )}
      </Row>
    </div>
  );
};
export default DisplayProfile;
