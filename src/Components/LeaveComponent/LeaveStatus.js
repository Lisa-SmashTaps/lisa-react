import React from "react";
import "antd/dist/antd.css";
import { Table, Button } from "antd";
import {CloseOutlined} from '@ant-design/icons';
const { Column } = Table;
const data = [
  {
    key: "1",
    LeaveType: "Annual Leave",
    S_date: "24/01/2022",
    E_date: "25/01/2022",
    Status: "Approved",
    Cancel: "Unavailable"
  },
  {
    key: "2",
    LeaveType: "Lieu Leave",
    S_date: "12/02/2022",
    E_date: "14/02/2022",
    Status: "Rejected",
    Cancel: "Unavailable"
  },
  {
    key: "3",
    LeaveType: "Lieu Leave",
    S_date: "04/03/2022",
    E_date: "05/03/2022",
    Status: "Approval Pending",
    Cancel: [<Button danger><CloseOutlined /> Cancel</Button>]
  },
];
function onChange(pagination, filters, sorter, extra) 
{
console.log('params', pagination, filters, sorter, extra);
}

const LeaveStatus = () => {
  return (
    <div>
      <h2 align="center">Leave Status</h2>
      <Table dataSource={data} onChange={onChange} tableLayout="fixed">
        <Column title="Leave Type" dataIndex="LeaveType" key="LeaveType" />
        <Column title="Start Date" dataIndex="S_date" key="S_date" />
        <Column title="End Date" dataIndex="E_date" key="E_date" />
        <Column title="Status" dataIndex="Status" key="Status" />
        <Column title="Cancel Leave" dataIndex="Cancel" key="Cancel" />
      </Table>
    </div>
  );
};
export default LeaveStatus;
