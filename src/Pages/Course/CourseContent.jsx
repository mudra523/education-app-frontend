import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  Modal,
  Row,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../api";
import Layout from "../../Layouts/index";
import {
  PlayCircleFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import coursePlay from "../../Images/play.jpg";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51L3xn7SFw0ZLHaVHPq6KzVtF0HoRG2kBWv5mToHChqhB6bModQsuTViCrbnmw3WercAIv5Xvsj7SzQhjGQsCU7zK00axlnwt5d"
);
const { Panel } = Collapse;
function CourseContent() {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [courseContent, setCourseContent] = useState([]);
  const [addModelVisible, setAddModelVisible] = React.useState(false);
  const [addContentDataVisible, setAddContentDataVisible] = React.useState("");
  const [editCourseContent, setEditCourseContent] = useState("");
  const [courseContentInput, setCourseContentInput] = useState("");
  const [visible, setVisible] = React.useState("");
  const [editForm, setEditForm] = useState({});
  const [form] = Form.useForm();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  useEffect(() => {
    getRequest("course/" + params.courseId).then(({ data }) => {
      setCourse(data);
      getRequest("coursecontents?courseId=" + params.courseId).then(
        ({ data }) => {
          setCourseContent(data);
        }
      );
    });
  }, []);

  const showAddModal = (index) => {
    setAddModelVisible(true);
  };

  const showContentDataModal = (id) => {
    setAddContentDataVisible(id);
  };

  const handleAddCancel = () => {
    setAddModelVisible(false);
    form.resetFields();
  };

  const handleContentDataCancel = () => {
    setAddContentDataVisible("");
    form.resetFields();
  };

  const onAddFinish = async (values) => {
    await postRequest("course/content/create", {
      title: values?.title,
      course_id: course._id,
    }).then(({ data }) => {
      setCourseContent((courseContent) => [
        ...courseContent,
        ...[data.courseContent],
      ]);
      setAddModelVisible("");
      form.resetFields();
    });
  };

  const onContentDataFinish = async (values, contentId) => {
    await postRequest("course/contentdata/create", {
      title: values?.title,
      url: values.url,
      timeduration: values?.timeduration,
      course_content: contentId,
    }).then(({ data }) => {
      setCourseContent((item) =>
        item.map((element) => {
          if (contentId === element._id) {
            let courseContentData = element?.courseContentData || [];
            courseContentData.push(data.courseContentData);
            element.courseContentData = courseContentData;
          }
          return element;
        })
      );
      setAddContentDataVisible("");
      form.resetFields();
    });
  };

  const onAddFinishFailed = (errorInfo) => {
    form.resetFields();
    console.log("Failed:", errorInfo);
  };

  const onContentDataFinishFailed = (errorInfo) => {
    form.resetFields();
    console.log("Failed:", errorInfo);
  };

  const deleteCourseContenData = async (id) => {
    await deleteRequest("course/contentdata/delete/" + id).then(({ data }) => {
      setCourseContent((data) =>
        data.map((element) => {
          const courseContentData = element.courseContentData.filter(
            (item) => item._id !== id
          );
          element.courseContentData = courseContentData;
          return element;
        })
      );
    });
  };

  const editCourseContentHandle = (item) => {
    setEditCourseContent(item._id);
    setCourseContentInput(item.title);
  };

  const updateCourseContent = async (id) => {
    await putRequest("course/content/edit/" + id, {
      title: courseContentInput,
    }).then(({ data }) => {
      setCourseContent((items) =>
        items.map((element) => {
          if (element._id === data.courseContent._id) {
            return data.courseContent;
          } else {
            return element;
          }
        })
      );
      setEditCourseContent("");
      setCourseContentInput("");
    });
  };

  const deleteCourseContent = async (id) => {
    await deleteRequest("course/content/delete/" + id).then(({ data }) => {
      setCourseContent((data) => data.filter((element) => element._id !== id));
    });
  };

  const handleCancel = () => {
    setVisible("");
    setEditForm({});
    form.resetFields();
  };

  const onFinish = async (values, id) => {
    await putRequest("course/contentdata/edit/" + id, {
      title: editForm?.title,
      url: editForm?.url,
      timeduration: editForm?.timeduration,
    }).then(({ data }) => {
      setCourseContent((items) =>
        items.map((element) => {
          let courseContentData = element?.courseContentData || [];
          courseContentData = courseContentData?.map((el) => {
            if (el._id === id) {
              return data.courseContentData;
            } else {
              return el;
            }
          });
          element.courseContentData = courseContentData;
          return element;
        })
      );
      setVisible("");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", { errorInfo });
  };

  const EditModelOpen = (data) => {
    setVisible(data._id);
    setEditForm({
      title: data.title,
      url: data.url,
      timeduration: data.timeduration,
    });
  };

  const addToCart = async () => {
    await postRequest("cart/add", {
      category_id: params.categoryId,
      course_id: course._id,
      user_id: user._id,
    });
  };

  const buyNow = async () => {
    const stripe = await stripePromise;
    await postRequest("create-checkout-session", { courses: [course] }).then(
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

  return (
    <Layout>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "2% 15% 0% 15%",
          justifyContent: "space-between",
        }}
      >
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          lg={14}
          md={24}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>
              Course Content
            </Typography>

            {user?.role === "admin" ? (
              <Button
                className="button"
                onClick={showAddModal}
                style={{ height: "50px", width: "140px" }}
              >
                Add Content
              </Button>
            ) : null}
            <Modal
              title="Add Course Content"
              visible={addModelVisible}
              onCancel={handleAddCancel}
              footer={false}
            >
              <Form
                form={form}
                name="name"
                initialValues={{ remember: true }}
                onFinish={onAddFinish}
                onFinishFailed={onAddFinishFailed}
                autoComplete="off"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input course content title!",
                    },
                  ]}
                >
                  <Input
                    className="inputfield"
                    style={{ padding: "10px", borderRadius: "5px" }}
                    placeholder="Course Content Title"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{
                      fontSize: "15px",
                      height: "55px",
                      width: "100px",
                    }}
                    className="button"
                    htmlType="submit"
                  >
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <Collapse style={{ marginTop: "30px" }} accordion>
            {courseContent?.map((item, index) => (
              <Panel
                style={{
                  fontWeight: "bold",
                }}
                header={
                  <>
                    {editCourseContent === item._id ? (
                      <Input
                        style={{
                          width: "80%",
                          marginRight: "20px",
                        }}
                        placeholder="Basic usage"
                        value={courseContentInput}
                        onChange={(e) => setCourseContentInput(e.target.value)}
                      />
                    ) : (
                      <Typography style={{ marginRight: "20px" }}>
                        {item.title}
                      </Typography>
                    )}

                    {user?.role === "admin" ? (
                      editCourseContent === item._id ? (
                        <Button
                          className="button"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => updateCourseContent(item._id)}
                        >
                          save
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={() => showContentDataModal(item._id)}
                            className="coursecontentdatadelete"
                            shape="circle"
                            style={{
                              marginRight: "20px",
                              fontSize: "24px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            +
                          </Button>
                          <Button
                            onClick={() => editCourseContentHandle(item)}
                            className="coursecontentdatadelete"
                            shape="circle"
                            icon={<EditOutlined />}
                            style={{ marginRight: "20px" }}
                          />
                          <Button
                            onClick={() => deleteCourseContent(item._id)}
                            className="coursecontentdatadelete"
                            shape="circle"
                            icon={<DeleteOutlined />}
                          />
                        </>
                      )
                    ) : null}
                  </>
                }
                key={index}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {item?.courseContentData?.map((data) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <a
                        href={data.url}
                        className="coursecontentdata"
                        style={{ fontWeight: "normal", padding: "8px 5px" }}
                      >
                        <PlayCircleFilled style={{ marginRight: "15px" }} />
                        {data.title}
                      </a>
                      {user?.role === "admin" ? (
                        <div>
                          <Button
                            onClick={() => EditModelOpen(data)}
                            className="coursecontentdatadelete"
                            shape="circle"
                            icon={<EditOutlined />}
                            style={{ marginRight: "20px" }}
                          />
                          <Button
                            onClick={() => deleteCourseContenData(data._id)}
                            className="coursecontentdatadelete"
                            shape="circle"
                            icon={<DeleteOutlined />}
                          />
                          <Modal
                            title="Edit Course"
                            visible={visible === data._id}
                            onCancel={handleCancel}
                            footer={false}
                          >
                            <Form
                              form={form}
                              name="name"
                              initialValues={{ remember: true }}
                              onFinish={(values) => onFinish(values, data._id)}
                              onFinishFailed={onFinishFailed}
                              autoComplete="off"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Input
                                defaultValue={editForm.title}
                                className="inputfield"
                                style={{
                                  padding: "10px",
                                  borderRadius: "5px",
                                  margin: "10px 0px",
                                }}
                                placeholder="Title"
                                onChange={(e) =>
                                  setEditForm({
                                    title: e.target.value,
                                    url: editForm.url,
                                    timeduration: editForm.timeduration,
                                  })
                                }
                              />

                              <Input
                                defaultValue={editForm.url}
                                className="inputfield"
                                style={{
                                  padding: "10px",
                                  borderRadius: "5px",
                                  margin: "10px 0px",
                                }}
                                placeholder="Url"
                                onChange={(e) =>
                                  setEditForm({
                                    title: editForm.title,
                                    url: e.target.value,
                                    timeduration: editForm.timeduration,
                                  })
                                }
                              />

                              <Input
                                defaultValue={editForm.timeduration}
                                className="inputfield"
                                style={{
                                  padding: "10px",
                                  borderRadius: "5px",
                                  margin: "10px 0px",
                                }}
                                placeholder="Time Duration"
                                onChange={(e) =>
                                  setEditForm({
                                    title: editForm.title,
                                    url: editForm.url,
                                    timeduration: e.target.value,
                                  })
                                }
                              />

                              <Button
                                style={{
                                  fontSize: "15px",
                                  height: "55px",
                                  width: "160px",
                                  margin: "10px 0px",
                                }}
                                className="button"
                                htmlType="submit"
                              >
                                Edit
                              </Button>
                            </Form>
                          </Modal>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <Modal
                  title="Add Course Content"
                  visible={addContentDataVisible === item._id}
                  onCancel={handleContentDataCancel}
                  footer={false}
                >
                  <Form
                    form={form}
                    name="name"
                    initialValues={{ remember: true }}
                    onFinish={(values) => onContentDataFinish(values, item._id)}
                    onFinishFailed={onContentDataFinishFailed}
                    autoComplete="off"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Form.Item
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: "Please input title!",
                        },
                      ]}
                    >
                      <Input
                        className="inputfield"
                        style={{ padding: "10px", borderRadius: "5px" }}
                        placeholder="Title"
                      />
                    </Form.Item>

                    <Form.Item
                      name="url"
                      rules={[
                        {
                          required: true,
                          message: "Please input content url!",
                        },
                      ]}
                    >
                      <Input
                        className="inputfield"
                        style={{ padding: "10px", borderRadius: "5px" }}
                        placeholder="Url"
                      />
                    </Form.Item>

                    <Form.Item
                      name="timeduration"
                      rules={[
                        {
                          required: true,
                          message: "Please input time duration!",
                        },
                      ]}
                    >
                      <Input
                        className="inputfield"
                        style={{ padding: "10px", borderRadius: "5px" }}
                        placeholder="Time Duration"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        style={{
                          fontSize: "15px",
                          height: "55px",
                          width: "100px",
                        }}
                        className="button"
                        htmlType="submit"
                      >
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </Panel>
            ))}
          </Collapse>
        </Col>
        <Col md={24} lg={8}>
          <img src={coursePlay} alt="play" style={{ width: "100%" }} />
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "35px",
              padding: "15px 25px",
            }}
          >
            ${course?.price}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0px 25px",
              alignItems: "center",
            }}
          >
            {(course?.orders?.length || 0) > 0 ? (
              <Button
                disabled
                className="button1"
                style={{
                  height: "55px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginTop: "15px",
                  width: "100%",
                }}
              >
                Purchased
              </Button>
            ) : (
              <>
                <Button
                  onClick={addToCart}
                  className="button"
                  style={{
                    height: "55px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >
                  Add to cart
                </Button>
                <Button
                  onClick={buyNow}
                  className="button1"
                  style={{
                    height: "55px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginTop: "15px",
                    width: "100%",
                  }}
                >
                  Buy now
                </Button>
                <Typography style={{ marginTop: "10px" }}>
                  30-Day Money-Back Guarantee
                </Typography>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default CourseContent;
