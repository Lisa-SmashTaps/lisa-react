import React from "react";
import "antd/dist/antd.css";
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Select, DatePicker, Space, Button, Input, Drawer } from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const LEAVES = [
  "Annual Leave",
  "Casual Leave",
  "Medical Leave",
  "Paternity Leave",
  "Feeding Hours",
  "Lieu Leave",
];
class LeaveReqForm extends React.Component {
  state = { visible: false };
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
    render(){
      return (
        <div className="leave_req_form">
          <Button type="primary" onClick={this.showDrawer} icon={<PlusOutlined />}>
              Request Leave
          </Button>
          <Drawer title="Leave Request Form"
              width={580}
              onClose={this.onClose}
              visible={this.state.visible}
              bodyStyle={{ paddingBottom: 80 }}
              extra={
                <Space>
                  <Button onClick={this.onClose} icon={<CloseOutlined/>}>Cancel</Button>
                  <Button onClick={this.onClose} type="primary">
                    Request Leave
                  </Button>
                </Space>
              }
            >
          <Form>
            <Space direction="vertical">
              <Form.Item
                label="Leave Type: "
                name="LEAVE_TYPE"
                rules={[{ required: true }]}
              >
                <Select
                  className="leaveType"
                  placeholder="--Select--"
                  style={{ width: "80%" }}
                >
                  {LEAVES.map((leave) => (
                    <Option value={leave} key={leave}>
                      {leave}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Leave Balance: " name="LEAVE_BAL">
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Time Period: "
                name="PERIOD"
                rules={[{ required: true }]}
              >
                <RangePicker id="Period" />
              </Form.Item>
              <Form.Item label="Comment: " name="COMMENT">
                <TextArea id="LeaveComment" />
              </Form.Item>
            </Space>
          </Form>
          </Drawer>
        </div>
      );
    };
  };

export default LeaveReqForm;
