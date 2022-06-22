import React from "react";
import { Table, Button } from "antd";
const { Column } = Table;

const LeaveMainAdmin = () =>{
    return(
        <div className="LeaveMainAdmin">
        <Table tableLayout="fixed">
            <Column title="Employee ID" dataIndex="EmpID" key="EmpID" />
            <Column title="Employee Name" dataIndex="EmpName" key="EmpName" />
            <Column title="Designation" dataIndex="Designation" key="Designation" />
            <Column title="Leave Type" dataIndex="LeaveType" key="LeaveType" />
            <Column title="Start Date" dataIndex="S_date" key="S_date" />
            <Column title="End Date" dataIndex="E_date" key="E_date" />
            <Column title="Approve Leave" dataIndex="Approved" key="Approved" />
            <Column title="Reject Leave" dataIndex="Rejected" key="Rejected" />
        </Table>
        </div>
    )
}
 export default LeaveMainAdmin;