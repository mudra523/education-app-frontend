import React, { useEffect } from "react";
import Layout from "../../Layouts/index";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { postRequest } from "../../api";
import { useAuth } from "../../components/Auth";
import { useDispatch } from "react-redux";
import { store } from "../../features/authTokenSlice";
const loginImage = require("../../Images/loginImage.jpg");

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirectPath = location.state?.path || "/category";
  const onFinish = async (values) => {
    await postRequest("login", values).then(({ data }) => {
      auth.login(data.token);
      dispatch(store({ token: data.token, user: JSON.stringify(data.user) }));
      navigate(redirectPath, { replace: true });
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/category");
    }
  }, []);

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
          <img
            src={loginImage}
            alt="loginImage"
            style={{ objectFit: "revert" }}
          />
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
              New User?{" "}
              <Link to="/register" className="text">
                Sign Up
              </Link>
            </p>
            <h2 style={{ fontWeight: "bold" }}>Welcome Back!</h2>
            <p>Login to continue</p>
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
            >
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
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  type="password"
                  // prefix={<LockFilled className="inputicon" />}
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
                  LOGIN
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Col>
      </Row>
    </Layout>
  );
}

export default Login;
