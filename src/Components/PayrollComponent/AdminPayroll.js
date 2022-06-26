import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { DatePicker, Row, Col, Button, Input, Form } from "antd";
import HttpCommon from "../../http-common";
import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";
import {v4 as uuidv4} from 'uuid'
// {
//     "BasicSal": 50000,
//     "EPFEmp": 500,
//     "SheetID": "S003",
//     "EPFComp": 600,
//     "AdminID": "E002",
//     "EmpID": "E003",
//     "ETF": 300,
//     "Month": "2022-02",
//     "GrossSal": 55000,
//     "Allowances": 5000,
//     "TotalSal": 53000
// }
const AdminPayroll = () => {
  const [salaryData, setSalaryData] = React.useState({
    e_name: "",
    month_date: "",
    basic_salary: 0,
    allowance_salary: 0
  });

  const [calcData, setCalcData] = React.useState({
    gross_salary: 0,
    epf_employee: 0,
    epf_company: 0,
    etf: 0,
  });

  // calculate salaries
  useEffect(() => {
    //calcualate gross_salary
    let gross_salary =
      parseInt(salaryData.basic_salary) + parseInt(salaryData.allowance_salary);
    setCalcData((prev) => ({
      ...prev,
      gross_salary: gross_salary,
    }));

    //calcualate employee epf
    let epf_employee = parseInt(salaryData.basic_salary) * 0.12;
    setCalcData((prev) => ({
      ...prev,
      epf_employee: epf_employee,
    }));

    //calcualate company epf
    let epf_company = parseInt(salaryData.basic_salary) * 0.08;
    setCalcData((prev) => ({
      ...prev,
      epf_company: epf_company,
    }));

    //calcualate company epf
    let etf = parseInt(salaryData.basic_salary) * 0.03;
    setCalcData((prev) => ({
      ...prev,
      etf: etf,
    }));
  }, [salaryData]);

  const handleChange = (prop) => (event) => {
    setSalaryData({ ...salaryData, [prop]: event.target.value });
    console.log(salaryData);
  };
  const dateChange = (date, dataString) => {
    setSalaryData((prev) => ({
      ...prev,
      month_date: dataString,
    }));
  };

  const handleSubmit = (event) => {
    //call the axios
    event.preventDefault();
    setCalcData({ salaryData, calcData });
    console.log({ salaryData, calcData });


    HttpCommon.post(`/api/salary/`, {
      BasicSal: salaryData.basic_salary,
      EPFEmp: calcData.epf_employee,
      SheetID: uuidv4(),
      EPFComp: calcData.epf_company,
      AdminID: "E002",
      EmpID: salaryData.e_name,
      ETF: calcData.etf,
      Month: salaryData.month_date,
      GrossSal: calcData.gross_salary,
      Allowances: salaryData.allowance_salary,
      TotalSal: calcData.gross_salary - (calcData.epf_employee + calcData.etf),
    }).then((response) => {
      console.log(response.data.data);

      setSalaryData(response.data.data);
    });
  };
  return (
    <div>
      <Row>
        <Col span={24}>
          <h1>Payroll</h1>
        </Col>
      </Row>
      <div style={{ padding: "100px" }}>
        <Form>
          <Row>
            <Col span={8}>
              <Input
                onChange={handleChange("e_name")}
                placeholder="Enter Employee ID"
                key={"name"}
              />
            </Col>

            <Col span={8}>
              <DatePicker
                picker="month"
                bordered={true}
                onChange={dateChange}
              />
            </Col>
          </Row>
          <Row style={{ padding: "30px" }}>
            <Col span={12}>
              <Form.Item label="Basic Salary">
                <Input
                  type="number"
                  placeholder="Rs."
                  style={{ width: "300px" }}
                  onChange={handleChange("basic_salary")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Allowance">
                <Input
                  type="number"
                  placeholder="Rs."
                  style={{ width: "300px" }}
                  onChange={handleChange("allowance_salary")}
                  required
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ padding: "30px" }}>
            <Col span={12}>
              <Form.Item label="Gross Salary">
                <Input
                  type="number"
                  placeholder="Rs."
                  style={{ width: "300px" }}
                  disabled
                  value={calcData.gross_salary}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="EPF (Employee)">
                <Input
                  type="number"
                  placeholder="Rs."
                  style={{ width: "300px" }}
                  disabled
                  value={calcData.epf_employee}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ padding: "30px" }}>
            <Col span={12}>
              <Form.Item label="EPF (Company)">
                <Input
                  type="number"
                  placeholder="Rs."
                  style={{ width: "300px" }}
                  disabled
                  value={calcData.epf_company}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ETF">
                <Input
                  type="number"
                  placeholder="Rs."
                  style={{ width: "300px" }}
                  disabled
                  value={calcData.etf}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ padding: "30px" }}>
            <Col span={24}>
              <Form.Item label="Total Earning">
                <Input
                  placeholder="Rs."
                  style={{ width: "300px" }}
                  disabled
                  value={
                    calcData.gross_salary -
                    (calcData.epf_employee + calcData.etf)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ padding: "30px" }}>
              <Button
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Create Paysheet
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
export default AdminPayroll;
