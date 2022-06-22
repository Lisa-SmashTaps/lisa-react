import React from "react";
import { Form, Space, Input, Radio, Button } from "antd";

const CreateAccount = () =>{
    return(
    <div style={{padding:50}} align="center">
    <h1>Create an Account</h1>
    <Space>
    <Form>
        <Form.Item 
        label="Gmail: ">
            <Input name='email' placeholder="Employee's gmail address" />
        </Form.Item>
        <Form.Item
        label="Name: ">
            <Space>
            <Input type="email" name='FName' placeholder="Employee's First Name"  />
            <Input name='LName' placeholder="Employee's Last Name" />
            </Space>
        </Form.Item>
        <Form.Item label=" Select User Role: ">
            <Radio.Group defaultValue="UserRole" style={{ marginTop: 16 }}>
                <Space>
                <Radio.Button>Employee</Radio.Button>
                <Radio.Button>Manager</Radio.Button>
                <Radio.Button>Admin</Radio.Button>
                </Space>
            </Radio.Group>
        </Form.Item>
        <Button type="primary">Create Account</Button>
    </Form>
    </Space>
    </div>
    )
}

export default CreateAccount;