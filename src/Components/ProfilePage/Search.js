import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { Input, Space, Table, Tag } from 'antd';
import LetteredAvatar from 'react-lettered-avatar';
import React, { useEffect, useState } from 'react';
import HttpCommon from "../../http-common";
import './Search.css';

const { Search } = Input;



const Searchpage = () => {

    const [search, setSearch] = useState('');
    const onSearch = (value) => console.log(value);

    const [Employee, setEmployee] = useState([]);


    const handleEmployeeSort = () => {
        return Employee

            .filter((req) => {
                if (search == '') {
                    return Employee;
                } else if ((req.FName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || req.LName.toLocaleLowerCase().includes(search.toLocaleLowerCase()))) {
                    return Employee;
                }

            }


            )



    };



    useEffect(() => {
        GetEmployee();
    }, []);

    //get leave types
    function GetEmployee() {
        HttpCommon.get(`http://localhost:3005/api/employee/`).then((response) => {
            console.log(response.data.data.Items);
            setEmployee(response.data.data.Items);
        });
    }

    return (
        <div>
            <h2 align="center">Search Users</h2>
            <div align="center">
                <Space direction="vertical">
                    <Search
                        placeholder="input employee name"
                        value={search}
                        allowClear
                        enterButton="Search Employee"
                        size="large"
                        style={{ padding: "10px", marginLeft: "auto", marginRight: "auto" }}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        suffix={<SearchOutlined />}
                    />
                </Space>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">UserType</th>
                        <th scope="col">Designation</th>
                    </tr>
                </thead>
                <tbody>
                    {handleEmployeeSort().map((req) => (
                        <tr key={req.EmpID}>
                            <Link to={`/profile/${req.EmpID}`}><td data-label=""> <LetteredAvatar name={`${req.FName} ${req.LName}`} size={50} /></td></Link>
                            <td data-label="Name">{`${req.FName} ${req.LName}`}</td>
                            <td data-label="UserType">{req.UserRole}</td>
                            <td data-label="Designation">{req.Designation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default Searchpage;
