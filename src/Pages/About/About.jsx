import Layout from "../../Layouts/index";
import React from "react";
import { Button, Col, Row } from "antd";
import About1 from "../../Images/about1.jpg";
import About2 from "../../Images/about2.jpg";
import { List } from "antd";
import { CheckOutlined } from "@ant-design/icons";
const { Item } = List;

function About() {
  return (
    <Layout>
      <Row>
        <Col
          span={10}
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            padding: "60px 40px",
          }}
        >
          <img style={{ width: "445px", borderRadius: "5px" }} src={About1} />
        </Col>
        <Col
          span={14}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "140px 140px 140px 0px",
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
            LEARN ABOUT US -------
          </h4>
          <h1
            style={{
              fontSize: "3.0rem",
              lineHeight: "1.2",
              fontFamily: "cursive",
              marginBottom: "0.2em",
            }}
          >
            Best School For Your Kids
          </h1>
          <p>
            Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo
            dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo. Erat
            justo sed sed diam. Ea et erat ut sed diam sea ipsum est dolor
            Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo
            dolor lorem ipsum ut sed eos.
          </p>
          <Row style={{ alignItems: "center" }}>
            <Col sm={7}>
              <img
                style={{ width: "191px", borderRadius: "5px" }}
                src={About2}
              />
            </Col>
            <Col sm={12}>
              <List style={{ width: "100%" }}>
                <List.Item style={{ borderTop: "1px solid #dee2e6" }}>
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
                <List.Item style={{ borderTop: "1px solid #dee2e6" }}>
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
                <List.Item
                  style={{
                    borderTop: "1px solid #dee2e6",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
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
            Learn More
          </Button>
        </Col>
      </Row>
    </Layout>
  );
}

export default About;
