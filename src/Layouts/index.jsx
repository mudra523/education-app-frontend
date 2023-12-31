import { Layout } from "antd";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./index.scss";
const { Content } = Layout;

function index(props) {
  return (
    <Layout
      style={{ display: "flex", height: "100vh", flexDirection: "column" }}
    >
      <div>
        <Header />
      </div>
      <div style={{ flex: "1" }}>
        <Content>{props.children}</Content>
      </div>
      <div>
        <Footer />
      </div>
    </Layout>
  );
}

export default index;
