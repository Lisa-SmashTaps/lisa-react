import React from "react";
import "antd/dist/antd.css";
import { Carousel } from "antd";
const LEAVES = [
  "Annual Leave",
  "Casual Leave",
  "Medical Leave",
  "Paternity Leave",
  "Feeding Hours",
  "Lieu Leave",
];
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#282c34",
};
const RemLeaves = () => {
  return (
    <div className="Leave_Main">
      <div>
        <Carousel autoplay effect='fade' dotPosition="bottom" speed="0.75x" >
          {LEAVES.map((leave) => (
            <div>
              <h3 style={contentStyle} value={leave} key={leave}>
                {leave}: --
              </h3>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default RemLeaves;
