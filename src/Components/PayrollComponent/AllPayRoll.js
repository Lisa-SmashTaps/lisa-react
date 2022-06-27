import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { DatePicker, Row, Col, Button, Card } from "antd";
import HttpCommon from "../../http-common";
import { CaretRightOutlined } from "@ant-design/icons";
import { Link} from "react-router-dom";

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

const AllPayRoll = () => {
  const [salaryData, setSalaryData] = React.useState([]);

  function getData() {
    HttpCommon.get(`http://localhost:3005/api/salary/`).then((response) => {
      console.log(response.data.data);
      setSalaryData(response.data.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Row>
        {salaryData.Items !== undefined &&
          salaryData.Items.map((element) => {
            return (
              <Col span={24}>
                <Link to={`/editpayroll/${element.SheetID}`}>
                <Card
                  type="inner"
                  style={{ margin: "20px" }}
                  title="Salary Sheet"
                  hoverable

                >
                  <Row>
                    <SheetItem title="Sheet ID" data={element.SheetID} />
                    <SheetItem
                      title="Basic Salary"
                      data={`Rs.${
                        element.BasicSal === undefined
                          ? element.BasicSal
                          : element.BasicSal
                      }`}
                    />
                    <SheetItem
                      title="EPF Employee Amount"
                      data={`Rs.${element.EPFEmp}`}
                    />
                    <SheetItem
                      title="EPF Company Amount"
                      data={`Rs.${element.EPFComp}`}
                    />
                    <SheetItem title="ETF Amount" data={`Rs.${element.ETF}`} />
                    <SheetItem
                      title="Gross Salary"
                      data={`Rs.${element.GrossSal}`}
                    />
                    <SheetItem
                      title="Allowances"
                      data={`Rs.${
                        element.Allowances === undefined
                          ? element.Allowances
                          : element.Allowances
                      }`}
                    />
                    <SheetItem
                      title="Total Salary"
                      data={`Rs.${element.TotalSal}`}
                    />
                  </Row>
                </Card>
                </Link>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default AllPayRoll;
