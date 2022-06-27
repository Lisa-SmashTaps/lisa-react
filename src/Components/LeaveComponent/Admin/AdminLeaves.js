import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import HttpCommon from "../../../http-common";
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
        },
        {
            title:'Comment',
            dataIndex: 'Comment',
            key: 'Comment'
        } ,{
            title:'End Date',
            dataIndex: 'EndDate',
            key: 'EndDate'
        } ,{
            title:'Approve',
            dataIndex: 'Approve',
            key: 'Approve',
            render: (text, record)=>(
                <Button type="primary" onClick={()=> ProcessRequest(record, true)}>Approve</Button>
            )
        } ,{
            title:'Reject',
            dataIndex: 'Reject',
            key: 'Reject',
            render: (text, record)=>(
                <Button type="primary" danger onClick={()=> ProcessRequest(record, false)}>Reject</Button>
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
        </div>
    )
}
 export default LeaveMainAdmin;