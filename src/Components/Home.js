import React from "react";
import "antd/dist/antd.css";
import Cover from "./cover.jpeg";
import { Card, Row, Layout } from 'antd';
const { Content } = Layout;

const { Meta } = Card;

function Home(){
    return (
        <div>
            <Layout>
                   <img src={Cover} style={{height:600}}/>
                <Content style={{padding:50}}>
                <h2>About Lisa</h2>
                <h4>'Lisa' is the Human Resource Management System of SmashTaps pvt. Ltd.</h4>
                <h2>New to Lisa? Here are some tips for getting started.</h2>
                <Row align="center">
                    <div style={{padding: 20}}>
                        <Card style={{ width: 240, height: 320}}
                        cover={<img alt="Reward" src="https://fptraffic.com/wp-content/uploads/2020/05/Using-Your-Facebook-Personal-Profile-to-Boost-Your-Facebook-Page.png" />}>
                            <Meta title="My Profile" description="Complete your profile by filling out the necessary information." />
                        </Card>
                    </div>
                    <div style={{padding: 20}}>
                        <Card style={{ width: 240, height: 320 }}
                        cover={<img alt="Payroll" src="https://thumbs.dreamstime.com/b/payroll-text-light-box-pink-coffee-mug-gray-background-145177104.jpg" />}>
                            <Meta title="My Payroll" description="To take a copy of your past payslips visit 'My Payroll'." />
                        </Card>
                        </div>
                    <div style={{padding: 20}}>
                        <Card style={{ width: 240, height: 320}}
                        cover={<img alt="Leave" src="https://www.scnsoft.com/_default_upload_bucket/leave-management-software.png" />}>
                            <Meta title="My Leaves" description="To check your available leave balance and request leaves visit 'My Leaves'." />
                        </Card>
                    </div>
                    <div style={{padding: 20}}>
                        <Card style={{ width: 240, height: 320}}
                        cover={<img alt="Reward" src="https://images.ctfassets.net/4w8qvp17lo47/1fnONK6KJf37PPkkZqlreq/412c146662ed3c46fce3ba72ab715074/Rewarding_yourself_is_important_when_it_comes_to_diabetes_management_prediabetes_type_2_diabetes.jpg" />}>
                            <Meta title="My Reward Points" description="To award point to your colleagues or see your received points visit 'My Reward Points'" />
                        </Card>
                    </div>
                </Row>
                </Content>
            </Layout>
        </div>
    )
}

export default Home;