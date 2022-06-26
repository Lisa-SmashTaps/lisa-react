import "antd/dist/antd.css";
import { DatePicker, Row, Col, Button, Card } from "antd";
import HttpCommon from "../../http-common";
import React, { useEffect } from "react";
import { CaretRightOutlined } from "@ant-design/icons";

const SheetItem = ({ title, data }) => {
  return (
    <Col span={12}>
      <Row>
        <Col span={12}>
          <Row>
            <CaretRightOutlined />
            <h5>{title}</h5>
          </Row>
        </Col>
        <Col span={12}>
          <h5>{data}</h5>
        </Col>
      </Row>
    </Col>
  );
};

const PayrollSearch = () => {
  const [salaryData, setSalaryData] = React.useState([]);
  const [month, setMonth] = React.useState(null);

  const handleMonth = (event, newValue) => {
    setMonth(newValue);
  };

  function getData() {
    // let arr = [];
    console.log(month);
    HttpCommon.post(`/api/salary/getAllSalaryByEmpIdAndMonth`, {
      EmpID: "E001",
      Month: month,
    }).then((response) => {
      console.log(response.data.data);

      setSalaryData(response.data.data);
    });
  }

  const handleClick = (event) => {
    getData();
  };

  useEffect(() => {
    console.log("drgdfgd");
    // getData();
  }, []);
  return (
    <div>
      <Row>
        <Col span={24}>
          <h1>My Payroll</h1>
        </Col>
      </Row>
      <div style={{ padding: "100px" }}>
        <Row>
          {/* <Col span={12}>
            <DatePicker
              picker="year"
              bordered={true}
              style={{ width: "300px", height: "50px" }}
            />
          </Col> */}
          <Col span={12}>
            <DatePicker
              picker="month"
              bordered={true}
              disabledDate={(current)=>{
                return current>new Date()
              }}
              onChange={handleMonth}
              style={{ width: "300px", height: "50px" }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ padding: "30px" }}>
            <Button type="primary" onClick={handleClick}>
              Get My Paysheet
            </Button>
          </Col>
        </Row>
      </div>
      <Row>
        {salaryData.Items !== undefined &&
          salaryData.Items.map((element) => {
            return (
              <Col span={24}>
                <Card
                  type="inner"
                  style={{ margin: "20px" }}
                  title="Salary Sheet"
                  hoverable
                >
                  <Row>
                    <SheetItem title="Sheet ID" data={element.SheetID.S} />
                    <SheetItem
                      title="Basic Salary"
                      data={`Rs.${
                        element.BasicSal.N === undefined
                          ? element.BasicSal.S
                          : element.BasicSal.N
                      }`}
                    />
                    <SheetItem
                      title="EPF Employee Amount"
                      data={`Rs.${element.EPFEmp.N}`}
                    />
                    <SheetItem
                      title="EPF Company Amount"
                      data={`Rs.${element.EPFComp.N}`}
                    />
                    <SheetItem
                      title="ETF Amount"
                      data={`Rs.${element.ETF.N}`}
                    />
                    <SheetItem
                      title="Gross Salary"
                      data={`Rs.${element.GrossSal.N}`}
                    />
                    <SheetItem
                      title="Allowances"
                      data={`Rs.${element.Allowances.N === undefined
                        ? element.Allowances.S
                        : element.Allowances.N}`}
                    />
                    <SheetItem
                      title="Total Salary"
                      data={`Rs.${element.TotalSal.N}`}
                    />
                  </Row>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
export default PayrollSearch;
