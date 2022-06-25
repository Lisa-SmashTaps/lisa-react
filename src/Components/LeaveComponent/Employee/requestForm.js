import React, { useState } from "react";
import "antd/dist/antd.css";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Select, DatePicker, Space, Button, Input, Drawer } from "antd";
import moment from 'moment';

const { RangePicker } = DatePicker;

const { Option } = Select;
const { TextArea } = Input;
const LEAVES = [
  {name:"Annual Leave", count:14, value:'annual'},
  {name:"Casual Leave", count:7, value:'casual'},
  {name:"Medical Leave", count:7, value:'medical'},
  {name:"Maternity/Paternity Leave", count:7, value:'paternity'},
  {value:"lieu", name:"Lieu Leave"},
];
const LeaveReqForm = (props) => {

  const [visible, setVisible] = useState(false);
  const [formState, setFormState] = useState({
    leaveType:'',
    comment:'',
    startDate:'',
    endDate:''
  })

  const onChange=(e)=>{
    const {name, value} = e.target;

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    alert("Hello");
    console.log("Hello");
  }

  console.log(formState)

  return (
    <div className="leave_req_form">
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Request Leave
      </Button>
      <Drawer
        title="Leave Request Form"
        width={580}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose} icon={<CloseOutlined />}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} type="primary">
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
                name='leaveType'
                className="leaveType"
                placeholder="--Select--"
                style={{ width: "80%" }}
                onChange={(e)=> {
                  setFormState({ ...formState, leaveType: e})
                }}
                value={formState.leaveType}
              >
                {LEAVES.map((leave) => (
                  <Option value={leave.value} key={leave.value}>
                    {leave.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Leave Balance: " name="LEAVE_BAL">
              <div>
                {formState.leaveType ? formState.leaveType === 'lieu' ? 'Has to be accepted by a Manager' : (LEAVES.find((el)=> el.value === formState.leaveType).count - (props.remainLeaves[formState.leaveType] ? props.remainLeaves[formState.leaveType] : 0)) : ''}
              </div>
            </Form.Item>
            <Form.Item
              label="Time Period: "
              name="PERIOD"
              rules={[{ required: true }]}
            >
              <RangePicker 
              onChange={(e)=>{
                let data = {
                  startDate: moment(e[0]).format('YYYY-MM-DD'),
                  endDate: moment(e[1]).format('YYYY-MM-DD'),
                }

                setFormState({
                  ...formState,
                  ...data
                })
              }} 
              id="Period" 
              name='period' 
              />
            </Form.Item>
            <Form.Item label="Comment: " name="COMMENT">
              <TextArea 
              id="LeaveComment" 
              name='comment'
              onChange={onChange}
              value={formState.comment}
              />
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
    </div>
  );
};

export default LeaveReqForm;
