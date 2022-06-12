import "antd/dist/antd.css";
import React from "react";
import { DatePicker, Row, Col, Button, Input, Form } from 'antd';
const PayrollData = () =>{
    return(
        <div>
            <Row>
                <Col span={24}>
                    <h1>Payroll</h1>
                </Col>
            </Row>
            <div style={{padding:"100px"}}>
                <Form>
                    <Row>
                        <Col span={8}>
                            <Input placeholder="Enter Employee Name" key={"name"}/>
                        </Col>
                        <Col span={8}>
                            <DatePicker picker="year" bordered={true} />   
                        </Col>
                        <Col span={8}>
                            <DatePicker picker="month" bordered={true} />
                        </Col>
                    </Row>
                    <Row style={{padding:"30px"}}>
                        <Col span={12}>
                            <Form.Item label="Basic Salary"> 
                                <Input placeholder="Rs." style={{width:"300px"}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Allowance"> 
                                <Input placeholder="Rs." style={{width:"300px"}}/>
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row style={{padding:"30px"}}>
                        <Col span={12}>
                            <Form.Item label="Gross Salary">
                                <Input placeholder="Rs." style={{width:"300px"}} disabled/>
                            </Form.Item> 
                        </Col>
                        <Col span={12}>
                            <Form.Item label="EPF (Employee)">
                                <Input placeholder="Rs." style={{width:"300px"}} disabled/>
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row style={{padding:"30px"}}>
                        <Col span={12}>
                            <Form.Item label="EPF (Company)">
                                <Input placeholder="Rs." style={{width:"300px"}} disabled/>
                            </Form.Item> 
                        </Col>
                        <Col span={12}>
                            <Form.Item label="ETF">
                                <Input placeholder="Rs." style={{width:"300px"}} disabled/>
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row style={{padding:"30px"}}>
                        <Col span={24}>
                            <Form.Item label="Total Earning">
                                <Input placeholder="Rs." style={{width:"300px"}} disabled/>
                            </Form.Item> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{padding:"30px"}}>
                            <Button type="primary">Create Paysheet</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};
export default PayrollData;