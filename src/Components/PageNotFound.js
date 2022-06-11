import React from "react";
import { FrownOutlined } from "@ant-design/icons";
import { Layout } from "antd";
const { Content } = Layout;

const PageNotFound = () =>{
    return(
        <div className="PageNotFound">
            <Layout>
                <Content style={{ padding: '30%' }}>
                    <center>
                        <FrownOutlined />
                        <h2>Error 404: Page not found</h2>
                    </center>
                </Content>
            </Layout>
        </div>
    )
}
export default PageNotFound;