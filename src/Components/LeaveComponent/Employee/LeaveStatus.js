import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
const { Column } = Table;

// const data = [
//   {
//     key: "1",
//     LeaveType: "Annual Leave",
//     S_date: "24/01/2022",
//     E_date: "25/01/2022",
//     Status: "Approved",
//     Cancel: "Unavailable",
//   },
//   {
//     key: "2",
//     LeaveType: "Lieu Leave",
//     S_date: "12/02/2022",
//     E_date: "14/02/2022",
//     Status: "Rejected",
//     Cancel: "Unavailable",
//   },
//   {
//     key: "3",
//     LeaveType: "Lieu Leave",
//     S_date: "04/03/2022",
//     E_date: "05/03/2022",
//     Status: "Approval Pending",
//     Cancel: [
//       <Button danger>
//         <CloseOutlined /> Cancel
//       </Button>,
//     ],
//   },
// ];

const LeaveStatus = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/leaveRequest/")
      .then((res) => {
        console.log(res.data.data.Items);
        setData(res.data.data.Items);
      })
      .catch((err) => {
        console.log(err.body);
      });
  }, []);

  return (
    <div>
      <h2 align="center">Leave Status</h2>
      <Table dataSource={data} tableLayout="fixed">
        <Column title="Leave Type" dataIndex="TypeID" key="TypeID" />
        <Column title="Start Date" dataIndex="StartDate" key="StartDate" />
        <Column title="End Date" dataIndex="EndDate" key="EndDate" />
        <Column title="Status" dataIndex="Status" key="Status" />
        <Column title="Cancel Leave" dataIndex="Cancel" key="Cancel" />
      </Table>
    </div>
  );
};
export default LeaveStatus;
