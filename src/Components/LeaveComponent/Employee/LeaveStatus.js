import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import HttpCommon from "../../../http-common";
import "./Status.css"
const { Column } = Table;

const LeaveStatus = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetLeaves();
  }, []);

  //get leave types
  function GetLeaves() {
    HttpCommon.get(`http://localhost:3005/api/leaveRequest/getAllLeaveRequestByEmpID/E001`).then((response) => {
      setData(response.data.Items);
    });
  }

  const cancelRequest = (id) => {
    // console.log(id);
    HttpCommon.delete(`http://localhost:3005/api/leaveRequest/` + id).then((response) => {
      console.log(response);
      GetLeaves();
    });
  }


  return (
    <div>
      <h2 align="center">Leave Status</h2>
      {/* <Table dataSource={data} tableLayout="fixed">
        <Column title="Leave Type" dataIndex="TypeID" key="TypeID" />
        <Column title="Start Date" dataIndex="StartDate" key="StartDate" />
        <Column title="End Date" dataIndex="EndDate" key="EndDate" />
        <Column title="Comment" dataIndex="Comment" key="Comment" />
        <Column title="Status" dataIndex="True" key="Status" />
        <Column title="Cancel Leave" dataIndex="ReqID" key="Cancel" onCellClick={cancelRequest("ReqID")} />
        {/* {Status? <button/> : <></>} 
      </Table> */}
      <table>
        <thead>
          <tr>
            <th scope="col">Leave Type</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Comment</th>
            <th scope="col">Status</th>
            <th scope="col">Cancel Leave</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((req) => (
              <tr key={req.ReqID}>
                <td data-label="LeaveType"><h6>{props.leaveTypes.find((el)=> el.TypeID === req.TypeID) ? props.leaveTypes.find((el)=> el.TypeID === req.TypeID).LeaveName : req.TypeID}</h6> </td>
                <td data-label="StartDate"><h6>{req.StartDate}</h6></td>
                <td data-label="EndDate"><h6>{req.EndDate}</h6></td>
                <td data-label="Comment"><h6>{req.Comment}</h6></td>
                <td data-label="Status"><h6>{req.Approval}</h6></td>
                <td data-label="Cancel">{req.Approval === 'Pending' ? <button onClick={()=>cancelRequest(req.ReqID)}>Cancel</button> : '--'}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};
export default LeaveStatus;
