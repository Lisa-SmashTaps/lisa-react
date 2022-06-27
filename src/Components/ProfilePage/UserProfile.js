//------ User Profile Page ------
import React, { useState, useEffect } from 'react';
import LetteredAvatar from 'react-lettered-avatar';
import "./UserProfile.css";
import HttpCommon from "../../http-common";


//packages
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    GetEmployee(id);
  }, []);

  //get leave types
  function GetEmployee(id) {
    HttpCommon.get(`http://localhost:3005/api/employee/` + id).then((response) => {
      console.log(response.data.Item);
      setData(response.data.Item);
    });
  }

  return (
    <div className="profile__page">
      <div className="profile__container">
        <div className="profile__pic">
          <LetteredAvatar name={`${data.FName} ${data.LName}`} size={100} />
        </div>
        <div className="profile__heading">
          <p>PUBLIC PROFILE</p>
          <hr />
        </div>
        <div className="profile__details">
          <div className="profile__name">
            <div className="container">
              <h3>FIRST NAME</h3>
              <p2>{data.FName}</p2>
              <hr />
            </div>
            <div className="container">
              <h3>LAST NAME</h3>
              <p2>{data.LName}</p2>
              <hr />
            </div>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
