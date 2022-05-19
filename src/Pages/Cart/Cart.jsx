import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  List,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../../Layouts/index";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { deleteRequest, getRequest } from "../../api";

const { Meta } = Card;

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getRequest("carts/").then(({ data }) => {
      setCart(data);
    });
  }, []);

  const removeCourse = async (id) => {
    await deleteRequest("cart/remove/" + id).then(() => {
      setCart((data) => data.filter((el) => el._id !== id));
    });
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
          dataSource={cart}
          renderItem={(item) => (
            <List.Item>
              <Row style={{ width: "100%" }}>
                <Col>
                  <img
                    style={{
                      height: "140px",
                      width: "200px",
                      borderRadius: "10px 10px 10px 10px",
                    }}
                    alt="course"
                    src={"http://localhost:2325/" + item.course.image}
                  />
                </Col>
                <Col style={{ marginLeft: "30px" }}>
                  <Typography style={{ padding: "2px 0px" }}>
                    {item.course.name}
                  </Typography>
                  <Typography
                    style={{ padding: "2px 0px", color: "#00000073" }}
                  >
                    {"By " + item.course.author}
                  </Typography>
                  <Typography style={{ padding: "2px 0px" }}>
                    {item.course.description}
                  </Typography>
                  <Typography
                    style={{ padding: "2px 0px", fontWeight: "bold" }}
                  >
                    {"Price : " + item.course.price}
                  </Typography>
                  <Button
                    className="button"
                    style={{
                      height: "40px",
                      width: "90px",
                      marginTop: "5px",
                    }}
                    onClick={() => removeCourse(item._id)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </List.Item>
          )}
        />
        <Divider style={{ borderColor: "#dee2e6", width: "100%" }} />

        <div>
          <Typography style={{ fontWeight: "bold" }}>
            Total Amount :{" "}
            {cart.reduce((a, b) => a + parseInt(b.course.price), 0)}
          </Typography>

          <Button
            className="button"
            style={{
              height: "40px",
              width: "100px",
              marginTop: "15px",
            }}
            //   onClick={() => removeCourse(item._id)}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
