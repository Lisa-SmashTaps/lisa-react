import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../index.css";
import { Form, Input, Button, Checkbox, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Store } from "react-notifications-component";
import HttpCommon from "../../http-common";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeGmail = ({ target: { value } }) => {
    console.log("gmail checked", value);
    setGmail(value);
  };

  const onChangePassword = ({ target: { value } }) => {
    console.log("password checked", value);
    setPassword(value);
  };

  const handleSubmit = (event) => {
    //call the axios
    event.preventDefault();

    HttpCommon.post(`/api/employee/login`, {
      email: gmail,
      password: password,
    }).then((response) => {
      console.log(response.data.data);
      console.log(response.data.data.Items);
      
      if (
        response.data.data.Count !== undefined &&
        response.data.data.Count > 0
      ) {
        localStorage.setItem('type', response.data.data.Items[0].UserRole.S);
        localStorage.setItem('EmpID', response.data.data.Items[0].EmpID.S);
        navigate('/');
        Store.addNotification({
          title: "Login Successful!",
          message: `Entered details are correct `,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      } else {
        Store.addNotification({
          title: "Cannot Login",
          message: `Entered credentials are not valid`,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    });
  };

  return (
    <div style={{ padding: 50, marginTop: 50 }} align="center">
      <h1>Login</h1>
      <Space>
        <Form
          name="login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="user-icon" />}
              placeholder="Gmail"
              onChange={onChangeGmail}
              value={gmail}
              style={{ width: "200px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="pw-icon" />}
              type="password"
              onChange={onChangePassword}
              value={password}
              placeholder="Password"
              style={{ width: "200px" }}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a
              className="login-form-forgot"
              href="https://support.google.com/accounts/answer/41078?hl=en&co=GENIE.Platform%3DDesktop"
            >
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default Login;
