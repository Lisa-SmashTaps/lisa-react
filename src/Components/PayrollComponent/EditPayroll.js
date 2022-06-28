import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { Row, Col, Button, Input, Form } from "antd";
import HttpCommon from "../../http-common";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";

const EditPayroll = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [salaryData, setSalaryData] = React.useState({
    basic_salary: 0,
    allowance_salary: 0,
  });
  const [data, setData] = React.useState({});

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

  function getData(id) {
    HttpCommon.get(`http://localhost:3005/api/salary/` + id).then(
      (response) => {
        console.log(response.data.Item);
        setData(response.data.Item);
        setSalaryData({
          basic_salary: response.data.Item.BasicSal,
          allowance_salary: response.data.Item.Allowances,
        });
      }
    );
  }

  useEffect(() => {
    getData(id);
  }, [id]);

  const handleSubmit = (event) => {
    //call the axios
    event.preventDefault();
    setCalcData({ salaryData, calcData });
    console.log({ salaryData, calcData });

    HttpCommon.put(`/api/salary/`, {
      BasicSal: salaryData.basic_salary,
      EPFEmp: calcData.epf_employee,
      SheetID: id,
      EPFComp: calcData.epf_company,
      AdminID: "E002",
      ETF: calcData.etf,
      GrossSal: calcData.gross_salary,
      Allowances: salaryData.allowance_salary,
      TotalSal: calcData.gross_salary - (calcData.epf_employee + calcData.etf),
    }).then((response) => {
      console.log(response.data.data);
      Store.addNotification({
        title: "Successfully Done!",
        message: `Payroll Edited Successful!`,
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
      setSalaryData(response.data.data);
      navigate("/allpayroll", { replace: true });
    });
  };

  const handleDelete = (event) => {
    //call the axios
    event.preventDefault();
    console.log(id);

    HttpCommon.delete(`/api/salary/${id}`).then((response) => {
      console.log(response.data.data);
      Store.addNotification({
        title: "Successfully Done!",
        message: `Payroll Deleted Successful!`,
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
      navigate("/allpayroll", { replace: true });
    });
  };

  return (
    <div className="background">
      <Row>
        <Col span={24}>
          <h1 style={{color: "#356481",marginTop:"30px",textAlign:"center", fontWeight:"700",fontSize:"30px"}}>Payroll</h1>
        </Col>
      </Row>
      <div style={{ padding: "100px" }}>
        <Form className="login-form">
          <Row style={{ padding: "30px" }}>
            <Col span={12}>
              <Form.Item label="Basic Salary">
                <input
                  type="number"
                  placeholder="Rs."
                  style={{ width: "300px" }}
                  defaultValue={data.BasicSal}
                  onChange={handleChange("basic_salary")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Allowance">
                <input
                  defaultValue={data.Allowances}
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
            <Col span={12} style={{ padding: "30px" }}>
              <Button
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                update Paysheet
              </Button>
            </Col>
            <Col span={12} style={{ padding: "30px" }}>
              <Button
                type="submit"
                onClick={(e) => {
                  handleDelete(e);
                }}
              >
                delete Paysheet
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
export default EditPayroll;
