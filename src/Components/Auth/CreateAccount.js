import React, { useEffect, useState } from "react";
import { Form, Space, Input, Radio, Button } from "antd";
import HttpCommon from "../../http-common";
import { v4 as uuidv4 } from "uuid";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Store } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'

const options = [
  {
    label: "Employee",
    value: "Employee",
  },
  {
    label: "Manager",
    value: "Manager",
  },
  {
    label: "Admin",
    value: "Admin",
  },
];

const CreateAccount = () => {
  const [type, setType] = useState("Employee");
  const [gmail, setGmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [empID, setEmpID] = useState("");

  const onChange4 = ({ target: { value } }) => {
    console.log("radio4 checked", value);
    setType(value);
  };

  const onChangeGmail = ({ target: { value } }) => {
    console.log("gmail checked", value);
    setGmail(value);
  };

  const onChangeFirstName = ({ target: { value } }) => {
    console.log("firstName checked", value);
    setFirstName(value);
  };

  const onChangeLastName = ({ target: { value } }) => {
    console.log("lastName checked", value);
    setLastName(value);
  };

  const onChangePassword = ({ target: { value } }) => {
    console.log("password checked", value);
    setPassword(value);
  };

  useEffect(() => {
    setEmpID(uuidv4());
  }, []);

  const handleSubmit = (event) => {
    //call the axios
    event.preventDefault();

    HttpCommon.post(`/api/employee/`, {
      FName: firstName,
      email: gmail,
      password: password,
      EmpID: empID,
      RemPoints: 100,
      UserRole: type,
      LName: lastName,
      TotPoints: 0,
    }).then((response) => {
      console.log(response.data.data);
      Store.addNotification({
        title: "Successfully Added!",
        message: `New ${type} type user added. `,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    });
  };

  return (
    <div style={{ padding: 50 }} align="center">
      <h1>Create an Account</h1>
      <Space>
        <Form>
          <Form.Item label="Employee ID: ">
            <Input
              name="emailID"
              contentEditable="false"
              value={empID}
              placeholder="Employee ID"
            />
          </Form.Item>
          <Form.Item label="Gmail: ">
            <Input
              name="email"
              onChange={onChangeGmail}
              value={gmail}
              placeholder="Employee's gmail address"
            />
          </Form.Item>
          <Form.Item label="Password: ">
            <Input.Password
              placeholder="Password"
              onChange={onChangePassword}
              value={password}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item label="Name: ">
            <Space>
              <Input
                type="email"
                name="FName"
                onChange={onChangeFirstName}
                value={firstName}
                placeholder="Employee's First Name"
              />
              <Input
                name="LName"
                onChange={onChangeLastName}
                value={lastName}
                placeholder="Employee's Last Name"
              />
            </Space>
          </Form.Item>
          <Form.Item label=" Select User Role: ">
            <Radio.Group
              options={options}
              onChange={onChange4}
              value={type}
              optionType="button"
              buttonStyle="outline"
            />
            {/* <Radio.Group defaultValue="UserRole" style={{ marginTop: 16 }}>
                <Space>
                <Radio.Button>Employee</Radio.Button>
                <Radio.Button>Manager</Radio.Button>
                <Radio.Button>Admin</Radio.Button>
                </Space>
            </Radio.Group> */}
          </Form.Item>
          <Button
            type="primary"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Create Account
          </Button>
        </Form>
      </Space>
    </div>
  );
};

export default CreateAccount;
