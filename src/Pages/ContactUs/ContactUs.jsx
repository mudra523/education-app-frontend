import { Button, Col, List, Row, Typography, Input, Form, Avatar } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layouts/index";
import {
  HeatMapOutlined,
  MailFilled,
  PhoneFilled,
  ClockCircleOutlined,
} from "@ant-design/icons";

function ContactUs() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <div
        style={{
          padding: "100px 200px 0px 200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontSize: "1.2rem",
            fontFamily: "cursive",
          }}
          className="text"
        >
          --------- GET IN TOUCH ---------
        </Typography>
        <Typography
          style={{
            fontSize: "3.0rem",
            lineHeight: "1.2",
            fontFamily: "cursive",
            marginBottom: "0.2em",
            marginTop: "0.1em",
          }}
        >
          Contact Us For Any Query
        </Typography>
        <Row style={{ display: "flex", marginTop: "40px" }}>
          <Col
            span={15}
            style={{
              width: "100%",
            }}
          >
            <Col span={22}>
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
                }}
              >
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input
                    className="inputfield"
                    style={{ padding: "10px", borderRadius: "5px" }}
                    placeholder="Your Name"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input
                    type="email"
                    className="inputfield"
                    style={{ padding: "10px", borderRadius: "5px" }}
                    placeholder="Your Email"
                  />
                </Form.Item>

                <Form.Item
                  name="subject"
                  rules={[
                    { required: true, message: "Please input your subject!" },
                  ]}
                >
                  <Input
                    className="inputfield"
                    style={{ padding: "10px", borderRadius: "5px" }}
                    placeholder="Subject"
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  rules={[
                    { required: true, message: "Please input your message!" },
                  ]}
                >
                  <Input.TextArea
                    className="inputfield"
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      minHeight: "150px",
                    }}
                    placeholder="Message"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{
                      fontSize: "15px",
                      height: "55px",
                      width: "160px",
                    }}
                    className="button"
                    htmlType="submit"
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Col>
          <Col
            span={9}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>
              Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo
              dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo.
              Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est
              dolor. Invidunt lorem justo sanctus clita. Erat lorem labore ea,
              justo dolor lorem ipsum ut sed eos.
            </p>
            <List itemLayout="horizontal">
              <List.Item>
                <List.Item.Meta
                  avatar={<HeatMapOutlined className="contactus" />}
                  title={
                    <span style={{ fontSize: "19px" }} className="text">
                      Address
                    </span>
                  }
                  description="123 Street, New York, USA"
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<MailFilled className="contactus" />}
                  title={
                    <span style={{ fontSize: "19px" }} className="text">
                      Email
                    </span>
                  }
                  description="mail@domain.com"
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<PhoneFilled className="contactus" />}
                  title={
                    <span style={{ fontSize: "19px" }} className="text">
                      Phone
                    </span>
                  }
                  description="+012 345 67890"
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<ClockCircleOutlined className="contactus" />}
                  title={
                    <span style={{ fontSize: "19px" }} className="text">
                      Opening Hours
                    </span>
                  }
                  description={
                    <span>
                      Sunday - Friday: <br /> 08:00 AM - 05:00 PM
                    </span>
                  }
                />
              </List.Item>
            </List>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default ContactUs;
