import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table,Button } from "antd";
import HttpCommon from "../../../http-common";
import "./Status.css"

const LeaveStatus = (props) => {
//   const columns = [
//     {
//       title: 'Leave Type',
//       dataIndex: 'TypeID',
//       key: 'TypeID'
//     }, {
//       title: 'Start Date',
//       dataIndex: 'StartDate',
//       key: 'StartDate'
//     },{
//       title: 'End Date',
//       dataIndex: 'EndDate',
//       key: 'EndDate'
//     },{
//       title: 'Comment',
//       dataIndex: 'Comment',
//       key: 'Comment'
//     },{
//       title: 'Status',
//       dataIndex: 'Approval',
//       key: 'Approval'
//     },{
//       title: 'Cancel Leave',
//       dataIndex: 'Cancel',
//       key: 'Cancel',
//     render: (record)=> (<Button danger onClick={() => cancelRequest(record)}>Cancel</Button>)
//     }
//   ]
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
                <td data-label="LeaveType">{props.leaveTypes.find((el) => el.TypeID === req.TypeID) ? props.leaveTypes.find((el) => el.TypeID === req.TypeID).LeaveName : req.TypeID} </td>
                <td data-label="StartDate">{req.StartDate}</td>
                <td data-label="EndDate">{req.EndDate}</td>
                <td data-label="Comment">{req.Comment}</td>
                <td data-label="Status">{req.Approval}</td>
                <td data-label="Cancel">{req.Approval === 'Pending' ? <Button danger onClick={() => cancelRequest(req.ReqID)}>Cancel</Button> : '--'}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* <Table 
            dataSource={data}
            columns={columns}
            tableLayout="fixed"
        /> */}
    </div>
  );
};
export default LeaveStatus;
