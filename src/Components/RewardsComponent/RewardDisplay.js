import React from "react";
import {Input } from "antd";
import { InputNumber, Button, Progress } from "antd";
import "./Reward.css";

  function onChange(value) {
    console.log("changed", value);
  } 
const RewardDisplay =() =>{
    return(
    <div > 
          <div><h2 className="txt"> Your current avaliable points:</h2></div>
          <div className = "ProgressB">
      <Progress
      type="circle"
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068', }}
      width="250px"
      percent={80} 
      /></div> <div>

     <h2 className="txt"> Offer points:</h2>
       <InputNumber min={1} max={10} onChange={onChange} style={{marginTop:"50px", marginLeft:"100px"}} />  </div>
    <h2 className="txt" name="Shoutout"> Shoutout:</h2>

<Input.TextArea
              style={{
                width: "50%",
                marginLeft:"150px",
                height:"100px",
              }}
            />
            <space >
          <Button type="primary" htmlType="submit" style={{marginTop:"50px", marginLeft:"60%"}}  >
            Submit
          </Button></space> </div>
    );}
export default RewardDisplay;