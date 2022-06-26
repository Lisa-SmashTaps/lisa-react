import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import HttpCommon from "../../../http-common";

const { Column } = Table;

const LeaveMainAdmin = () =>{

    const columns = [
        {
            title:'Employee ID',
            dataIndex: 'EmpID',
            key: 'EmpID'
        }, {
            title:'Employee Name',
            dataIndex: 'EmpName',
            key: 'EmpName'
        }, {
            title:'Designation',
            dataIndex: 'Designation',
            key: 'Designation'
        } ,{
            title:'Leave Type',
            dataIndex: 'TypeID',
            key: 'TypeID'
        } ,{
            title:'Start Date',
            dataIndex: 'StartDate',
            key: 'StartDate'
        } ,{
            title:'End Date',
            dataIndex: 'EndDate',
            key: 'EndDate'
        } ,{
            title:'Approve',
            dataIndex: 'Approve',
            key: 'Approve',
            render: (text, record)=>(
                <Button onClick={()=> ProcessRequest(record, true)}>Approve</Button>
            )
        } ,{
            title:'Reject',
            dataIndex: 'Reject',
            key: 'Reject',
            render: (text, record)=>(
                <Button onClick={()=> ProcessRequest(record, false)}>Reject</Button>
            )
        }
    ]
const [data, setData] = useState([]);

  useEffect(() => {
    GetLeaves();
  }, []);

//get leave types
  function GetLeaves() {
    HttpCommon.get(`http://localhost:3005/api/leaveRequest/`).then((response) => {
      console.log(response.data.data.Items);
      setData(response.data.data.Items);
    });
  }

  function ProcessRequest(row, isApproved) {
    let data= row;

    data.Approval = isApproved ? "Approved" : "Rejected"

    HttpCommon.put(`http://localhost:3005/api/leaveRequest/`, data).then((response) => {
      GetLeaves();
    });
  }

    return(
        <div className="LeaveMainAdmin">
        <h1>Requested Leaves</h1>
        <Table 
            dataSource={data}
            columns={columns}
            tableLayout="fixed"
        />
            {/* <Column title="Employee ID" dataIndex="EmpID" key="EmpID" />
            <Column title="Employee Name" dataIndex="EmpName" key="EmpName" />
            <Column title="Designation" dataIndex="Designation" key="Designation" />
            <Column title="Leave Type" dataIndex="LeaveType" key="LeaveType" />
            <Column title="Start Date" dataIndex="S_date" key="S_date" />
            <Column title="End Date" dataIndex="E_date" key="E_date" />
            <Column title="Approve Leave" dataIndex="Approved" key="Approved" />
            <Column title="Reject Leave" dataIndex="Rejected" key="Rejected" /> */}
        {/* </Table> */}
        </div>
    )
}
 export default LeaveMainAdmin;