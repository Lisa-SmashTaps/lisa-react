import React from "react";
import {Input } from "antd";
import { InputNumber, Button, Progress } from "antd";
import "./Reward.css";
import {RewardCancelButton} from "./RewardButton";
import ShoutoutArea from "./ShoutoutArea";


 
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

    
      <ShoutoutArea />

</div>

            <div  style={{ display:"inline-block"}}>
            <Button type="primary" htmlType="submit" style={{marginTop:"50px", marginLeft:"53%", width:"150px" }} >
            Submit </Button>
            <RewardCancelButton /></div>
           
          
           </div>
    );}


export default RewardDisplay;