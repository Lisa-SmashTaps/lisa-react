import React, { useState, useEffect } from 'react';
import LetteredAvatar from 'react-lettered-avatar';
import { Button, Progress, Input, Space, Card, Col } from 'antd';
import { StarFilled } from '@ant-design/icons';
import "./UserProfile.css";
import HttpCommon from "../../http-common";
import { v4 as uuidv4 } from 'uuid'
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [rewardData, setRewardData] = React.useState({
    points: 0,
    shoutout: "",
  });
  const [rewardsData, setRewardsData] = React.useState([]);
  const [rewardForm, setRewardForm] = useState(false);

  useEffect(() => {
    getData(id);
    GetEmployee(id);
  }, []);

  function GetEmployee(id) {
    HttpCommon.get(`http://localhost:3005/api/employee/` + id).then((response) => {
      console.log(response.data.Item);
      setData(response.data.Item);
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    HttpCommon.post(`http://localhost:3005/api/reward/`, {
      Comment: rewardData.shoutout,
      Date: "2022-03-04",
      ReceivedBy: id,
      NoOfPoints: rewardData.points,
      SentBy: "E001",
      RewardID: uuidv4()

    }).then((response) => {
      console.log(response);
      getData(id);
      setRewardForm(!rewardForm);
    });
  };

  function getData(id) {
    HttpCommon.get(`http://localhost:3005/api/reward/getAllRewardByEmployeeId/` + id).then((response) => {
      console.log(response.data.data.Items);
      setRewardsData(response.data.data.Items);
    });
  }

  const handleChange = (prop) => (event) => {
    setRewardData({ ...rewardData, [prop]: event.target.value });
    console.log(rewardData);
  };




  return (
    <div className="profile__page">
      <div className="profile__container">
        <div className="profile__pic">
          <LetteredAvatar name={`${data.FName} ${data.LName}`} size={100} />
        </div>
        <div className="profile__heading">
          <p>{data.FName} {data.LName} </p>
          <hr />
        </div>
        <div className="profile__details">
          <div className="container">
            <h3>EMAIL</h3>
            <p2>{data.email}</p2>
            <hr />
          </div>
          <div className="bio">
            <div className="container">
              <h3>DESIGNATION</h3>
              <p2>{data.Designation}
              </p2>
              <hr />
            </div>
            <div style={{ align: "center" }}>
              <center> <Button onClick={() => setRewardForm(!rewardForm)} icon={<StarFilled/>} >Give Rewards</Button></center>
              {rewardForm ?
                <form style={{ padding: "20px" }}>
                  <Space direction="horizontal">
                    <h3>Offer points:</h3>
                    <Input type="number" min={1} max={10} onChange={handleChange("points")} />
                    <h3>Shoutout:</h3>
                    <Input.TextArea onChange={handleChange("shoutout")} />
                    <Button type="submit"  onClick={(e) => handleSubmit(e)}>
                      Submit
                    </Button></Space>
                </form>
                :
                <></>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="profile__container" style={{ padding: "20px", height:"fit-content" }}>
        {rewardsData &&
          rewardsData.map((data) => (
            <div key={data.RewardID.S}>
              <Col >
                <Card title={`Reward Points: ${data.NoOfPoints.S}`} bordered={false}>
                  Comment: {data.Comment.S}
                </Card>
              </Col>
            </div>
          ))
        }
      </div>
    </div >
  );
}

export default UserProfile;
