import React from "react";
import Layout from "../../Layouts/index";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { LockFilled, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { postRequest } from "../../api";
const loginImage = require("../../Images/loginImage.jpg");

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    await postRequest("register", values).then(({ data }) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/category");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <Layout>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Col span={12}>
          <img src={loginImage} style={{ objectFit: "revert" }} />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Col span={12}>
            <p style={{ textAlign: "end", padding: "50px 0px" }}>
              Already you have account?{" "}
              <Link to="/login" className="text">
                Login
              </Link>
            </p>
            <h2 style={{ fontWeight: "bold" }}>Welcome!</h2>
            <p>SignUp to continue</p>

            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                marginTop: "35px",
                //   alignItems:"center"
              }}
              validateMessages={validateMessages}
            >
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Col span={11}>
                  <Form.Item
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your firstname!",
                      },
                    ]}
                  >
                    <Input
                      className="inputfield"
                      // prefix={<UserOutlined className="inputicon" />}
                      style={{ padding: "10px" }}
                      placeholder="Enter FirstName"
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your lastname!",
                      },
                    ]}
                  >
                    <Input
                      className="inputfield"
                      // prefix={<UserOutlined className="inputicon" />}
                      style={{ padding: "10px" }}
                      placeholder="Enter LastName"
                    />
                  </Form.Item>
                </Col>
              </Col>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  className="inputfield"
                  // prefix={<UserOutlined className="inputicon" />}
                  style={{ padding: "10px" }}
                  placeholder="Enter UserName"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email" },
                ]}
              >
                <Input
                  className="inputfield"
                  style={{ padding: "10px" }}
                  placeholder="Enter Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  type="password"
                  className="inputfield"
                  style={{ padding: "10px" }}
                  placeholder="Enter Password"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{
                    fontSize: "15px",
                    height: "45px",
                    width: "125px",
                  }}
                  className="button"
                  htmlType="submit"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Col>
      </Row>
    </Layout>
  );
}

export default Register;
