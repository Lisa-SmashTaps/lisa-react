import "antd/dist/antd.css";
import React, { useState } from "react";
import {
  LoadingOutlined,
  PlusOutlined,
  CloseOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Space,
  DatePicker,
  message,
  Upload,
  Drawer,
} from "antd";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import HttpCommon from "../../http-common";
import moment from 'moment';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const { TextArea } = Input;

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const onFinish = (values) => {
  console.log(values);
};
const dateFormat = "YYYY/MM/DD";

class ProfileForm extends React.Component {
  state = {
    visible: false,
    loading: false,
    imageUrl: null,
    fname: "",
    lName: "",
    empID: "",
    type: "",
    password: "",
    designation: "",
    birthDay: "",
    mobileNo: "",
    address: "",
    gmail: "",
    olResult: "",
    alResult: "",
    HighEdu: "",
    WorkingEx: "",
    Achivements: "",
    Interests: "",
    RemPoints: 100,
    TotPoints: 0,
  };

  componentDidMount() {
    console.log("Component did mount");
    const type = localStorage.getItem("type");
    const EmpID = localStorage.getItem("EmpID");
    this.setState({
      type: type,
      empID: EmpID,
    });
    HttpCommon.get(`/api/employee/${EmpID}`).then((response) => {
      console.log(response.data);
      this.state.fname = response.data.Item.FName;
      this.state.gmail = response.data.Item.email;
      this.state.password = response.data.Item.password;
      this.state.empID = response.data.Item.EmpID;
      this.state.birthDay = response.data.Item.DOB;
      this.state.mobileNo = response.data.Item.PhoneNo;
      this.state.RemPoints = response.data.Item.RemPoints;
      this.state.type = response.data.Item.UserRole;
      this.state.designation = response.data.Item.Designation;
      this.state.lName = response.data.Item.LName;
      this.state.address = response.data.Item.address;
      this.state.TotPoints = response.data.Item.TotPoints;
      this.state.olResult = response.data.Item.olResult;
      this.state.alResult = response.data.Item.alResult;
      this.state.HighEdu = response.data.Item.HighEdu;
      this.state.WorkingEx = response.data.Item.WorkingEx;
      this.state.Achivements = response.data.Item.Achivements;
      this.state.Interests = response.data.Item.Interests;
    });
  }

  componentDidUpdate() {
    console.log(this.state);
    console.log("Component did update");
  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
      birthDay: dateString,
    });
  };

  handleSubmit = (event) => {
    //call the axios
    event.preventDefault();

    HttpCommon.put(`/api/employee/`, {
      FName: this.state.fname,
      email: this.state.gmail,
      password: this.state.password,
      EmpID: this.state.empID,
      DOB: this.state.birthDay,
      PhoneNo: this.state.mobileNo,
      address: this.state.address,
      RemPoints: this.state.RemPoints,
      UserRole: this.state.type,
      Designation: this.state.designation,
      LName: this.state.lName,
      TotPoints: this.state.TotPoints,
      olResult: this.state.olResult,
      alResult: this.state.alResult,
      HighEdu: this.state.HighEdu,
      WorkingEx: this.state.WorkingEx,
      Achivements: this.state.Achivements,
      Interests: this.state.Interests,
    }).then((response) => {
      console.log(response.data.data);
      Store.addNotification({
        title: "Successfully Done!",
        message: `User edited successfully. `,
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
    });
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({
        loading: true,
      });
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        this.setState({
          loading: false,
          imageUrl: url,
        });
      });
    }
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <center>
        <div style={{ padding: 50 }}>
          <Button
            type="primary"
            onClick={this.showDrawer}
            icon={<SettingOutlined />}
          >
            Edit Details
          </Button>
          <Drawer
            title="Profile Details Form"
            width={580}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
            extra={
              <Space>
                <Button onClick={this.onClose} icon={<CloseOutlined />}>
                  Cancel
                </Button>
                <Button onClick={this.onClose} type="primary">
                  <SettingOutlined />
                  Edit Profile
                </Button>
              </Space>
            }
          >
            <Space direction="horizontal">
              <Form
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {this.state.imageUrl ? (
                    <img
                      src={this.state.imageUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : (
                    <div>
                      {this.state.loading ? (
                        <LoadingOutlined />
                      ) : (
                        <PlusOutlined />
                      )}
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload your profile picture
                      </div>
                    </div>
                  )}
                </Upload>
                <Form.Item
                  name={"name"}
                  label="Name: "
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    name="FName"
                    style={{ width: "200px" }}
                    placeholder="First Name"
                    defaultValue={this.state.fname}
                    value={this.state.fname}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        fname: e.target.value,
                      });
                    }}
                  />
                  <Input
                    name="LName"
                    style={{ width: "200px" }}
                    placeholder="Last Name"
                    defaultValue={this.state.fname}
                    value={this.state.lName}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        lName: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="CurrentDesignation"
                  label="Current Designation: "
                  rules={[
                    {
                      required: true,
                      message: "Please input your Current Designation!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Current Designation"
                    style={{ width: "200px" }}
                    defaultValue={this.state.designation}
                    value={this.state.designation}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        designation: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item name="DOB" label="Date of Birth: ">
                  <DatePicker
                    placeholder="Date of Birth"
                    defaultValue={moment(this.state.birthDay, dateFormat)}
                    format={dateFormat}
                    value={this.state.birthDay}
                    onChange={this.onChange}
                  />
                </Form.Item>

                <Form.Item
                  label="Mobile Number: "
                  name="MobileNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Mobile Number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Mobile Number"
                    style={{ width: "200px" }}
                    defaultValue={this.state.mobileNo}
                    value={this.state.mobileNo}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        mobileNo: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Address: "
                  name="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Address!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Address"
                    style={{ width: "200px", height: "60px" }}
                    defaultValue={this.state.address}
                    value={this.state.address}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        address: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Gmail: "
                  name={"Gmail"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Gmail!",
                    },
                  ]}
                >
                  <Input
                    name="gmail"
                    placeholder="Gmail Input"
                    defaultValue={this.state.gmail}
                    value={this.state.gmail}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        gmail: e.target.value,
                      });
                    }}
                    style={{ width: "200px" }}
                  />
                </Form.Item>

                <Form.Item label="Ordinary Level Results : " name="OLResuls">
                  <TextArea
                    rows={4}
                    placeholder="Ordinary Level Results"
                    defaultValue={this.state.olResult}
                    value={this.state.olResult}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        olResult: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item label="Advanced Level Results : " name="ALResuls">
                  <TextArea
                    rows={4}
                    placeholder="Advanced Level Results"
                    defaultValue={this.state.alResult}
                    value={this.state.alResult}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        alResult: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item label="Higher Educattion : " name="HigherEducation">
                  <TextArea
                    rows={4}
                    placeholder="Higher Education"
                    defaultValue={this.state.HighEdu}
                    value={this.state.HighEdu}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        HighEdu: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item label="Working Experince : " name="WorkingExperince">
                  <TextArea
                    rows={4}
                    placeholder="Working Experince"
                    defaultValue={this.state.WorkingEx}
                    value={this.state.WorkingEx}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        WorkingEx: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item label="Achievements : " name="Achievements">
                  <TextArea
                    rows={4}
                    placeholder="Ahievements"
                    defaultValue={this.state.Achivements}
                    value={this.state.Achivements}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        Achivements: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item label="Interests : " name="Interests">
                  <TextArea
                    rows={4}
                    placeholder="Interests"
                    defaultValue={this.state.Interests}
                    value={this.state.Interests}
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        Interests: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </Drawer>
        </div>
      </center>
    );
  }
}
export default ProfileForm;
