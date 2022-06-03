import { Button, Col, Divider, List, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../../api";
import Layout from "../../Layouts/index";

function Order() {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getRequest("orders").then(({ data }) => {
      setOrder(data);
    });
  }, []);

  const openCourse = (item) => {
    navigate("/category/" + item.category_id + "/courses/" + item._id);
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2% 20% 0% 20%",
        }}
      >
        <List
          itemLayout="vertical"
          dataSource={order}
          renderItem={(item) => (
            <>
              <List.Item>
                <Row style={{ width: "100%" }}>
                  <Col style={{ marginLeft: "30px" }}>
                    <Typography
                      style={{ padding: "2px 0px", fontWeight: "bold" }}
                    >
                      {"Order Id : " + item.order_id}
                    </Typography>

                    <Typography style={{ padding: "2px 0px" }}>
                      {"Qty : " + item?.courses?.length || 0}
                    </Typography>
                    <Typography
                      style={{ padding: "2px 0px", fontWeight: "bold" }}
                    >
                      {"Total Amount : " + item.amount}
                    </Typography>
                  </Col>
                </Row>
                <List
                  style={{ marginLeft: "50px" }}
                  itemLayout="vertical"
                  dataSource={item.orderCourses}
                  renderItem={(course) => (
                    <List.Item>
                      <Row style={{ width: "100%" }}>
                        <Col>
                          <img
                            style={{
                              height: "70px",
                              width: "100px",
                              borderRadius: "10px 10px 10px 10px",
                              cursor: "pointer",
                            }}
                            onClick={() => openCourse(course)}
                            alt="course"
                            src={course.image}
                          />
                        </Col>
                        <Col style={{ marginLeft: "30px" }}>
                          <Typography
                            className="cardItemTitle"
                            onClick={() => openCourse(course)}
                          >
                            {course.name}
                          </Typography>
                          {/* <Typography
                          style={{ padding: "2px 0px", color: "#00000073" }}
                        >
                          {"By " + course.author}
                        </Typography>
                        <Typography style={{ padding: "2px 0px" }}>
                          {course.description}
                        </Typography> */}
                          <Typography
                            style={{ padding: "2px 0px", fontWeight: "bold" }}
                          >
                            {"Price : " + course.price}
                          </Typography>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              </List.Item>
              <Divider />
            </>
          )}
        />
      </div>
    </Layout>
  );
}

export default Order;
