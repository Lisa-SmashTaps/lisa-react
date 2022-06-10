import React from "react";
import "antd/dist/antd.css";
import { DatePicker, Row, Col, Button } from 'antd';
const PayrollSearch = () =>{
    return(
        <div>
            <Row>
                <Col span={24}>
                    <h1>My Payroll</h1>
                </Col>
            </Row>
            <div style={{padding:"100px"}}>
                <Row>
                    <Col span={12}>
                        <DatePicker picker="year" bordered={true} style={{width:"300px",height:"50px"}} />   
                    </Col>
                    <Col span={12}>
                        <DatePicker picker="month" bordered={true} style={{width:"300px",height:"50px"}} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{padding:"30px"}}>
                        <Button type="primary">Get My Paysheet</Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default PayrollSearch;