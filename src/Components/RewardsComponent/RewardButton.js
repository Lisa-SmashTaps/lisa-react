import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "antd";


function RewardPageButton() {
    let navigate = useNavigate();
    return (
      <div>
        <Button type="primary" style={{marginLeft:"50%", marginBottom:"45px"}}
          onClick={() => {
            navigate("/rewards");
          }}
        >
         {" "}
        Offer points
        </Button>

      </div>
    );
  }



  function RewardCancelButton() {
    let navigate = useNavigate();
    return (
        <div>
            <Button htmlType="submit" style={{marginTop:"10px", marginLeft:"52%", width:"150px"}} 
                onClick={() => {
                    navigate("/profile");
                } }
            >
                {" "}
                Cancel

            </Button>
        </div>
    );
}

export default RewardPageButton;
export {RewardCancelButton};
