import React from "react";
import Logo from "./Smashtaps-logo.png";
import {BrowserRouter as Router, Routes , Route , Link } from "react-router-dom";
import { Menu } from "antd";
import { SearchOutlined, HomeOutlined, DollarOutlined ,CalendarOutlined ,UserOutlined, StarOutlined ,ToolOutlined } from '@ant-design/icons';
import Home from "./Home";
import LeaveMainAdmin from "./LeaveComponent/Admin/AdminLeaves";
import LeaveMain from "./LeaveComponent/Employee/LeaveMain";
import AdminPayroll from "./PayrollComponent/AdminPayroll";
import PayrollSearch from "./PayrollComponent/payrollSearch";
import DisplayProfile from "./ProfileComponent/ProfileForm";
import RewardDisplay from "./RewardsComponent/RewardDisplay";
import UserProfile from "./ProfilePage/UserProfile";
import Search from "./ProfilePage/Search";
import PageNotFound from "./PageNotFound";

  const Head =() =>{
      return(
          <div>
        <Router>
            <Menu theme="dark" mode="horizontal" >
                    <Link to="/">
                        <Menu.Item key={'logo'}>
                            <img src={Logo} style={{height:"50px"}}/>
                        </Menu.Item>
                    </Link>
                    <Link to='/'>
                        <Menu.Item key={'home'}>
                            <HomeOutlined /> 
                            <span>Home</span>
                        </Menu.Item>
                    </Link>
                    <Link to='/myprofile'>
                        <Menu.Item>
                            <UserOutlined />
                            <span>My Profile</span>
                        </Menu.Item>
                    </Link>
                    <Link to='/mypayroll'>
                        <Menu.Item>
                            <DollarOutlined /> 
                            <span>My Payroll</span>
                        </Menu.Item>
                    </Link>
                    <Link to='/myleaves'>
                        <Menu.Item>
                            <CalendarOutlined /> 
                            <span>My Leaves</span>
                        </Menu.Item>
                    </Link>
                    <Link to='/myrewards'>
                        <Menu.Item>
                            <StarOutlined /> 
                            <span>My Reward Points</span>
                        </Menu.Item>
                    </Link>
                    <Menu.SubMenu title={ 
                    <>
                        <ToolOutlined />
                        <span>Admin Tools</span>
                        
                    </> } triggerSubMenuAction="hover"
                    >
                        <Link to='/adminpayroll'>
                            <Menu.Item>Payroll</Menu.Item>
                            </Link>
                        <Link to='/requestedleaves'>
                            <Menu.Item>Leaves</Menu.Item>
                        </Link>
                     </Menu.SubMenu>
                     <Link to='/searchuser'>
                     <Menu.Item>
                            <SearchOutlined /> 
                            <span>Search</span>
                    </Menu.Item>
                    </Link>
            </Menu>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/mypayroll' element={<PayrollSearch/>}/>
                <Route exact path='/myleaves' element={<LeaveMain/>} />
                <Route exact path='/myprofile' element={<DisplayProfile/>}/>
                <Route exact path='/myrewards' element={<RewardDisplay/>}/>
                <Route exact path='/adminpayroll' element={<AdminPayroll/>}/>
                <Route exact path='/requestedleaves' element={<LeaveMainAdmin/>}/>
                <Route exact path='/profile/:id' element={<UserProfile/>}/>
                <Route exact path='/searchuser' element={<Search/>}/>
                <Route exact path='*' element={<PageNotFound/>}/>
            </Routes>
        </Router>
        </div>
      )
  }

  export default Head;