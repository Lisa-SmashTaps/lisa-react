import React, { useEffect, useState } from "react";
import Logo from "./Smashtaps-logo.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import Home from "./Home";
import PayrollSearch from "./PayrollComponent/payrollSearch";
import DisplayProfile from "./ProfileComponent/DisplayProfile";
import LeaveMain from "./LeaveComponent/Employee/LeaveMain";
import RewardDisplay from "./RewardsComponent/RewardDisplay";
import PageNotFound from "./PageNotFound";
import Login from "../Components/Auth/Login";
import { CalendarOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const Head = () => {
  const [type, setType] = useState("Employee");

  useEffect(() => {
    const type = localStorage.getItem("type");
    setType(type);
  }, []);

  const handelOnClick = () => {
    if (type !== undefined || type !== null) {
      localStorage.clear();
    }
  };
  return (
    <div>
      <Router>
        <Menu theme="dark" mode="horizontal">
          <Link to="/">
            <Menu.Item>
              <img src={Logo} style={{ height: "50px" }} />
            </Menu.Item>
          </Link>
          <Link to="/">
            <Menu.Item>Home</Menu.Item>
          </Link>
          <Link to="/profile">
            <Menu.Item>Profile</Menu.Item>
          </Link>
          <Link to="/payroll">
            <Menu.Item>Payroll</Menu.Item>
          </Link>
          <Link to="/leave">
            <Menu.Item>Leave</Menu.Item>
          </Link>
          <Link to="/rewards">
            <Menu.Item>Reward</Menu.Item>
          </Link>
          <Link to="/login" onClick={handelOnClick}>
            <Menu.Item>
              <CalendarOutlined />
              {type !== undefined || type !== null ? (
                <span>Logout</span>
              ) : (
                <span>Login</span>
              )}
            </Menu.Item>
          </Link>
        </Menu>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/payroll" element={<PayrollSearch />} />
          <Route exact path="/leave" element={<LeaveMain />} />
          <Route exact path="/profile" element={<DisplayProfile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/rewards" element={<RewardDisplay />} />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Head;
