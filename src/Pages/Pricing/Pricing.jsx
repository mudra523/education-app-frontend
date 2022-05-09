import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Typography,
  Input,
  Form,
  Select,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React from "react";
import Layout from "../../Layouts/index";
import Pricing1 from "../../Images/pricing1.jpg";
import Pricing2 from "../../Images/pricing2.jpg";
import Pricing3 from "../../Images/pricing3.jpg";
import About1 from "../../Images/about1.jpg";
import About2 from "../../Images/about2.jpg";
import { List } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const pricingData = [
  {
    title: "Drawing Class",
    image: Pricing1,
  },
  {
    title: "Language Learning",
    image: Pricing2,
  },
  {
    title: "Basic Science",
    image: Pricing3,
  },
];

function Pricing() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <Layout>
      <div
        style={{
          padding: "100px 150px 0px 150px",
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
          --------- POPULAR CLASSES ---------
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
          Classes for Your Kids
        </Typography>
        <Row
          style={{
            justifyContent: "center",
            textAlign: "center",
            paddingTop: "35px",
          }}
          gutter={20}
        >
          {pricingData.map((data) => {
            return (
              <Col>
                <Card
                  style={{
                    width: 350,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  cover={
                    <img
                      style={{
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                      }}
                      alt="example"
                      src={data.image}
                    />
                  }
                >
                  <Typography
                    style={{
                      fontSize: "1.5rem",
                      fontFamily: "cursive",
                    }}
                    className="text"
                  >
                    {data.title}
                  </Typography>
                  <Typography>
                    Justo ea diam stet diam ipsum no sit, ipsum vero et et diam
                    ipsum duo et no et, ipsum ipsum erat duo amet clita duo
                  </Typography>
                  <Divider style={{ borderColor: "#dee2e6", width: "100%" }} />
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <table>
                      <tr style={{ padding: "5px" }}>
                        <td
                          style={{
                            borderBottom: "1px solid #dee2e6",
                            borderRight: "1px solid #dee2e6",
                            padding: "5px 15px 5px 45px",
                            fontWeight: "bold",
                          }}
                        >
                          Age of Kids
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid #dee2e6",
                            padding: "5px 45px 5px 15px",
                          }}
                        >
                          3 - 6 Years
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            borderBottom: "1px solid #dee2e6",
                            borderRight: "1px solid #dee2e6",
                            padding: "5px 15px 5px 45px",
                            fontWeight: "bold",
                          }}
                        >
                          Total Seats
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid #dee2e6",
                            padding: "5px 45px 5px 15px",
                          }}
                        >
                          3 - 6 Years
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            borderBottom: "1px solid #dee2e6",
                            borderRight: "1px solid #dee2e6",
                            padding: "5px 15px 5px 45px",
                            fontWeight: "bold",
                          }}
                        >
                          Class Time
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid #dee2e6",
                            padding: "5px 45px 5px 15px",
                          }}
                        >
                          3 - 6 Years
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            padding: "5px 15px 5px 45px",
                            fontWeight: "bold",
                          }}
                        >
                          Tution Fee
                        </td>
                        <td style={{ padding: "5px 45px 5px 15px" }}>
                          3 - 6 Years
                        </td>
                      </tr>
                    </table>
                  </div>
                  <Button
                    style={{
                      fontSize: "15px",
                      height: "45px",
                      width: "115px",
                      marginTop: "20px",
                    }}
                    className="button"
                    htmlType="submit"
                  >
                    Join Now
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col
            span={14}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "140px 0px 140px 0px",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <h4
              style={{
                fontSize: "1.2rem",
                fontFamily: "cursive",
              }}
              className="text"
            >
              BOOK A SEAT -------
            </h4>
            <h1
              style={{
                fontSize: "3.0rem",
                lineHeight: "1.2",
                fontFamily: "cursive",
                marginBottom: "0.2em",
              }}
            >
              Book A Seat For Your Kid
            </h1>
            <p>
              Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo
              dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo.
              Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est
              dolor. Invidunt lorem justo sanctus clita. Erat lorem labore ea,
              justo dolor lorem ipsum ut sed eos.
            </p>
            <Row style={{ alignItems: "center" }}>
              <Col sm={12}>
                <List style={{ width: "100%" }}>
                  <List.Item>
                    <CheckOutlined
                      className="text"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bolder",
                        paddingRight: "12px",
                      }}
                    />
                    Labore eos amet dolor amet diam
                  </List.Item>
                  <List.Item>
                    <CheckOutlined
                      className="text"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bolder",
                        paddingRight: "12px",
                      }}
                    />
                    Etsea et sit dolor amet ipsum
                  </List.Item>
                  <List.Item>
                    <CheckOutlined
                      className="text"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bolder",
                        paddingRight: "12px",
                      }}
                    />
                    Diam dolor diam elitripsum vero.
                  </List.Item>
                </List>
              </Col>
            </Row>
            <Button
              style={{
                fontSize: "15px",
                height: "55px",
                width: "135px",
                marginTop: "20px",
              }}
              className="button"
              htmlType="submit"
            >
              Book Now
            </Button>
          </Col>
          <Col
            span={10}
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              padding: "60px 40px",
              flexDirection: "column",
            }}
          >
            <Typography
              style={{
                fontSize: "2.5rem",
                lineHeight: "1.2",
                fontFamily: "cursive",
                padding: "20px",
                color: "white",
                textAlign: "center",
                width: "100%",
                borderRadius: "8px 8px 0px 0px",
              }}
              className="pricingFormParent"
            >
              Book A Seat
            </Typography>
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
                padding: "55px",
                width: "100%",
                borderRadius: "0px 0px 8px 8px",
              }}
              className="pricingForm"
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
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
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  type="email"
                  className="inputfield"
                  style={{ padding: "10px", borderRadius: "5px" }}
                  placeholder="Your Email"
                />
              </Form.Item>

              <Form.Item name="select">
                <Select
                  defaultValue="1"
                  // style={{ width: "100%" }}
                  onChange={handleChange}
                  className="inputfield"
                >
                  <Select.Option value="1">Select A Class</Select.Option>
                  <Select.Option value="2">Class 1</Select.Option>
                  <Select.Option value="3">Class 2</Select.Option>
                  <Select.Option value="4">Class 3</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{
                    fontSize: "15px",
                    height: "55px",
                    width: "100%",
                  }}
                  className="button"
                  htmlType="submit"
                >
                  Book Now
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Pricing;
