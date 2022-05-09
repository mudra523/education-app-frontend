import { Button, Card, Col, Row } from "antd";
import React from "react";
import Layout from "../../Layouts/index";
import homeImage1 from "../../Images/homeImage1.png";
import Meta from "antd/lib/card/Meta";
import Avatar from "antd/lib/avatar/avatar";
import {
  PlayCircleOutlined,
  ScheduleOutlined,
  GroupOutlined,
  PieChartOutlined,
  CarOutlined,
  HeatMapOutlined,
} from "@ant-design/icons";

function Home() {
  return (
    <Layout>
      <Row
        style={{
          backgroundColor: "#9c82dd",
        }}
      >
        <Col
          span={12}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "140px 70px",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <h4 style={{ fontSize: "1.5rem", fontFamily: "cursive" }}>
            Kids Learning Center
          </h4>
          <h1
            style={{
              fontSize: "4.5rem",
              lineHeight: "1.2",
              fontFamily: "cursive",
              marginBottom: "0.2em",
            }}
          >
            New Approach to Kids Education
          </h1>
          <p>
            Sea ipsum kasd eirmod kasd magna, est sea et diam ipsum est amet sed
            sit. ipsum dolor no justo dolor et, lorem ut dolor erat dolore sed
            ipsum at ipsum nonumy amet. Clita lorem dolore sed stet et est justo
            dolore.
          </p>
          <Button
            style={{
              fontSize: "15px",
              height: "55px",
              width: "135px",
            }}
            className="button"
            htmlType="submit"
          >
            Learn more
          </Button>
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px 50px",
          }}
        >
          <img style={{ width: "550px" }} src={homeImage1} />
        </Col>
      </Row>
      <Row style={{ padding: "20px 120px 0px 120px" }}>
        <Col
          span={8}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "50px",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Card>
            <Meta
              avatar={<GroupOutlined className="homeIcon" />}
              title="Play Ground"
              description="Kasd labore kasd et dolor est rebum dolor ut, clita dolor vero lorem amet elitr vero..."
            />
          </Card>
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <Card>
            <Meta
              avatar={<PlayCircleOutlined className="homeIcon" />}
              title="Music and Dance"
              description="Kasd labore kasd et dolor est rebum dolor ut, clita dolor vero lorem amet elitr vero..."
            />
          </Card>
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <Card>
            <Meta
              avatar={<PieChartOutlined className="homeIcon" />}
              title="Arts and Crafts"
              description="Kasd labore kasd et dolor est rebum dolor ut, clita dolor vero lorem amet elitr vero..."
            />
          </Card>
        </Col>
      </Row>
      <Row style={{ padding: "0px 120px" }}>
        <Col
          span={8}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "50px",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Card>
            <Meta
              avatar={<CarOutlined className="homeIcon" />}
              title="Safe Transportation"
              description="Kasd labore kasd et dolor est rebum dolor ut, clita dolor vero lorem amet elitr vero..."
            />
          </Card>
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <Card>
            <Meta
              avatar={<HeatMapOutlined className="homeIcon" />}
              title="Healthy food"
              description="Kasd labore kasd et dolor est rebum dolor ut, clita dolor vero lorem amet elitr vero..."
            />
          </Card>
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <Card>
            <Meta
              avatar={<ScheduleOutlined className="homeIcon" />}
              title="Educational Tour"
              description="Kasd labore kasd et dolor est rebum dolor ut, clita dolor vero lorem amet elitr vero..."
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default Home;
