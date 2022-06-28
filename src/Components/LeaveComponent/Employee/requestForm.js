import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Select, DatePicker, Space, Button, Input, Drawer } from "antd";
import HttpCommon from "../../../http-common";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const { RangePicker } = DatePicker;

const { Option } = Select;
const { TextArea } = Input;
const LEAVES = [
  { name: "Annual Leave", count: 14, value: "annual" },
  { name: "Casual Leave", count: 7, value: "casual" },
  { name: "Medical Leave", count: 7, value: "medical" },
  { name: "Maternity/Paternity Leave", count: 7, value: "paternity" },
  { value: "lieu", name: "Lieu Leave" },
];

const LeaveReqForm = (props) => {
  console.log(props.leaveTypes);
  const [visible, setVisible] = useState(false);
  const [formState, setFormState] = useState({
    TypeID: "",
    Comment: "",
    StartDate: "",
    EndDate: "",
    EmpID: "E001",
    ReqID: uuidv4(),
  });

  const [leaveTypes, setLeaveTypes] = useState(props.leaveTypes);
  const [EmpID, setEmpID] = useState(null);

  useEffect(() => {
    const EmpID = localStorage.getItem("EmpID");
    setEmpID(EmpID);
    setFormState({ ...formState, EmpID: EmpID });
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    console.log(formState);
    HttpCommon.post(`http://localhost:3005/api/leaveRequest/`, {
      formState,
    }).then((response) => {
      console.log(response.data.data);
      onClose();
    });
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return (
      (current && current < moment().endOf("day")) ||
      current > moment("2023-01-01")
    );
  };

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
                name="leaveType"
                className="leaveType"
                placeholder="--Select--"
                style={{ width: "80%" }}
                onChange={(e) => {
                  setFormState({ ...formState, TypeID: e });
                }}
                value={formState.TypeID}
              >
                {props.leaveTypes.map((leave) => (
                  <Option value={leave.TypeID}>{leave.LeaveName}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Leave Balance: " name="LEAVE_BAL">
              <div>
                {formState.TypeID
                  ? formState.TypeID === "T006"
                    ? "Has to be accepted by a Manager"
                    : props.leaveTypes.find(
                        (el) => el.TypeID === formState.TypeID
                      ).Count -
                      (props.remainLeaves[formState.TypeID]
                        ? props.remainLeaves[formState.TypeID]
                        : 0)
                  : ""}
              </div>
            </Form.Item>
            <Form.Item
              label="Time Period: "
              name="PERIOD"
              rules={[{ required: true }]}
            >
              <RangePicker
                onChange={(e) => {
                  let data = {
                    StartDate: e[0] ? moment(e[0]).format("YYYY-MM-DD") : "",
                    EndDate: e[1] ? moment(e[1]).format("YYYY-MM-DD") : "",
                  };

                  setFormState({
                    ...formState,
                    ...data,
                  });
                }}
                id="Period"
                name="period"
                disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item label="Comment: " name="COMMENT">
              <TextArea
                id="LeaveComment"
                name="Comment"
                onChange={onChange}
                value={formState.Comment}
              />
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
    </div>
  );
};

export default LeaveReqForm;
