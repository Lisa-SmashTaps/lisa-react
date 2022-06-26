import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Row, Col, Progress} from "antd";
import ProfileForm from "./ProfileForm";
// import CommentList from "../RewardsComponent/ShoutoutArea";
import RewardPageButton from "../RewardsComponent/RewardButton";




function DisplayProfile() {
  return (
    <div style={{ padding: 50 }}>
      <Row style={{ padding: "10px" }}>
        <Col span={20}>
          <center>
            <Avatar size={100} icon={<UserOutlined />} />
            <h2>Name</h2>
            <h3>Designation</h3>
            <h4>gmail</h4>
          </center>
        </Col>
        <Col span={4} style={{ padding: "6px" }}>
          <ProfileForm />
        </Col>
      </Row>
      <Row>
        <h4>DOB</h4>
      </Row>
      <Row>
        <h4>Mobile Number</h4>
      </Row>
      <Row>
        <h4>Address</h4>
      </Row>
      <Row>
        <h4>Ordinary Level Results: </h4>
      </Row>
      <Row>
        <h4>Advanced Level Results: </h4>
      </Row>
      <Row>
        <h4>Higher Education: </h4>
      </Row>
      <Row>
        <h4>Working Experince: </h4>
      </Row>
      <Row>
        <h4>Achievements: </h4>
      </Row>
      <Row>
        <h4>Interests: </h4>
      </Row>
      <span>
      <h4>Professional achievements: </h4>
      <Progress
      type="circle"
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068', }}
      width="150px"
      percent={60} 
      style={{ marginLeft: "40px", marginBottom:"45px"}}
 
      />
      </span>

      <Row>
      <RewardPageButton /></Row>
      {/* <Row> <CommentList /></Row> */}
    </div>
  );
  
}







 export default DisplayProfile;