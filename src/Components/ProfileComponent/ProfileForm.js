import "antd/dist/antd.css";
import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined, CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { Form, Input, Button, Space, DatePicker, message, Upload, Drawer } from 'antd';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const { TextArea } = Input;

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
};

const onFinish = (values) => {
  console.log(values);
};

class ProfileForm extends React.Component {


  state = { visible: false, loading: false, imageUrl: null };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({
        loading: true,
      });
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        this.setState({
          loading: false,
          imageUrl: url
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
          <Button type="primary" onClick={this.showDrawer} icon={<SettingOutlined />}>
            Edit Details
          </Button>
          <Drawer title="Profile Details Form"
            width={580}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
            extra={
              <Space>
                <Button onClick={this.onClose} icon={<CloseOutlined />}>Cancel</Button>
                <Button onClick={this.onClose} type="primary">
                  <SettingOutlined />Edit Profile
                </Button>
              </Space>
            }
          >
            <Space direction="horizontal">
              <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} >
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
                        width: '100%',
                      }}
                    />
                  ) : (
                    <div>
      {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
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
                  name={'name'}
                  label="Name: "
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input name='FName'
                    style={{ width: "200px" }} placeholder="First Name" />
                  <Input name='LName'
                    style={{ width: "200px" }} placeholder="Last Name" />
                </Form.Item>

                <Form.Item
                  name="CurrentDesignation"
                  label="Current Designation: "
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Current Designation!',
                    },
                  ]}
                >
                  <Input placeholder="Current Designation" style={{ width: "200px" }} />
                </Form.Item>

                <Form.Item name="DOB" label="Date of Birth: " >
                  <DatePicker placeholder="Date of Birth" />
                </Form.Item>

                <Form.Item
                  label="Mobile Number: "
                  name="MobileNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Mobile Number!',
                    },
                  ]}
                >
                  <Input placeholder="Mobile Number" style={{ width: "200px" }} />
                </Form.Item>

                <Form.Item
                  label="Address: "
                  name="Address"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Address!',
                    },
                  ]}
                >
                  <Input placeholder="Address" style={{ width: "200px", height: "60px" }} />
                </Form.Item>

                <Form.Item
                  label="Gmail: "
                  name="Gmail"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Gmail!',
                    },
                  ]}
                >
                  <Input placeholder="Gmail" style={{ width: "200px" }} />
                </Form.Item>

                <Form.Item
                  label="Ordinary Level Results : "
                  name="OLResuls"

                >
                  <TextArea rows={4} placeholder="Ordinary Level Results" />
                </Form.Item>

                <Form.Item
                  label="Advanced Level Results : "
                  name="ALResuls"

                >
                  <TextArea rows={4} placeholder="Advanced Level Results" />
                </Form.Item>

                <Form.Item
                  label="Higher Educattion : "
                  name="HigherEducation"

                >
                  <TextArea rows={4} placeholder="Higher Education" />
                </Form.Item>

                <Form.Item
                  label="Working Experince : "
                  name="WorkingExperince"

                >
                  <TextArea rows={4} placeholder="Working Experince" />
                </Form.Item>

                <Form.Item
                  label="Achievements : "
                  name="Achievements"

                >
                  <TextArea rows={4} placeholder="Ahievements" />
                </Form.Item>

                <Form.Item
                  label="Interests : "
                  name="Interests"

                >
                  <TextArea rows={4} placeholder="Interests" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </Drawer>
        </div>
      </center>
    );

  };
};
export default ProfileForm;