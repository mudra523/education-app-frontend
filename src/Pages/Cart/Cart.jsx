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
import { deleteRequest, getRequest, postRequest } from "../../api";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(
  "pk_test_51L3xn7SFw0ZLHaVHPq6KzVtF0HoRG2kBWv5mToHChqhB6bModQsuTViCrbnmw3WercAIv5Xvsj7SzQhjGQsCU7zK00axlnwt5d"
);
const { Meta } = Card;

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
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

  const buyNow = async () => {
    const courses = cart.map((data) => {
      return data.course;
    });

    const stripe = await stripePromise;
    await postRequest("create-checkout-session", { courses }).then(
      async ({ data }) => {
        const result = await stripe.redirectToCheckout({
          sessionId: data.id,
        });
        if (result.error) {
          console.log(result.error);
        }
      }
    );
  };

  const openCourse = (item) => {
    navigate("/category/" + item.category._id + "/courses/" + item.course._id);
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
                <Col onClick={() => openCourse(item)}>
                  <img
                    style={{
                      height: "140px",
                      width: "200px",
                      borderRadius: "10px 10px 10px 10px",
                      cursor: "pointer",
                    }}
                    alt="course"
                    src={item.course.image}
                  />
                </Col>
                <Col style={{ marginLeft: "30px" }}>
                  <Typography
                    onClick={() => openCourse(item)}
                    className="cardItemTitle"
                  >
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
            onClick={buyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
