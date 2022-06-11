import React from "react";
import LeaveMain from "./LeaveComponent/Employee/LeaveMain";
import Home from "./Home";
import Logo from "./Smashtaps-logo.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import PayrollSearch from "./PayrollComponent/payrollSearch";
import DisplayProfile from "./ProfileComponent/DisplayProfile";
import RewardDisplay from "./RewardsComponent/RewardDisplay";
import PageNotFound from "./PageNotFound";
const { Header, Content } = Layout;

  const Head =() =>{
      return(
          <div>
        <Router>
            <Menu theme="dark" mode="horizontal">
                    <Link to="/"><Menu.Item><img src={Logo} style={{height:"50px"}}/></Menu.Item></Link>
                    <Link to='/'><Menu.Item>Home</Menu.Item></Link>
                    <Link to='/profile'><Menu.Item>Profile</Menu.Item></Link>
                    <Link to='/payroll'><Menu.Item>Payroll</Menu.Item></Link>
                    <Link to='/leave'><Menu.Item>Leave</Menu.Item></Link>
                    <Link to='/rewards'><Menu.Item>Reward</Menu.Item></Link>
            </Menu>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/payroll' element={<PayrollSearch/>}/>
                <Route exact path='/leave' element={<LeaveMain/>} />
                <Route exact path='/profile' element={<DisplayProfile/>}/>
                <Route exact path='/rewards' element={<RewardDisplay/>}/>
                <Route exact path='*' element={<PageNotFound/>}/>
            </Routes>
        </Router>
        </div>
      )
  }

  export default Head;