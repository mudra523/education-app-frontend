import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Upload,
  message,
  Typography,
  PageHeader,
} from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../../Layouts/index";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Meta } = Card;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function Course() {
  const navigate = useNavigate();
  const params = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState(null);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState(null);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  useEffect(() => {
    getRequest("category/" + params.categoryId).then(({ data }) => {
      setCategory(data);
      getRequest("courses?categoryId=" + params.categoryId).then(({ data }) => {
        setCourses(data);
      });
    });
  }, []);

  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState("");
  const [addModelVisible, setAddVisible] = React.useState(false);

  const showAddModal = (index) => {
    setAddVisible(true);
  };
  const showModal = (data) => {
    setVisible(data._id);
  };

  const deleteCourse = async (id) => {
    await deleteRequest("course/delete/" + id).then(({ data }) => {
      setCourses((data) => data.filter((el) => el._id !== id));
    });
  };

  const addCourse = async (id) => {
    await postRequest("cart/add", {
      category_id: params.categoryId,
      course_id: id,
      user_id: user._id,
    }).then(({ data }) => {
      console.log(data);
    });
  };

  const handleAddCancel = () => {
    setVisible("");
    setAddVisible(false);
    form.resetFields();
    setFileList(null);
  };

  const handleCancel = () => {
    setVisible("");
    setAddVisible(false);
    setFileList(null);
  };

  const onAddFinish = async (values) => {
    let courseData = new FormData();
    courseData.append("name", values?.name);
    courseData.append("description", values?.description);
    courseData.append("author", values?.author);
    courseData.append("price", values?.price);
    courseData.append("image", values?.image?.file?.originFileObj || "");
    courseData.append("categoryId", category._id);
    await postRequest("course/create", courseData).then(({ data }) => {
      setCourses((course) => [...course, ...[data.course]]);
      setAddVisible("");
      form.resetFields();
      setFileList(null);
    });
  };

  const onAddFinishFailed = (errorInfo) => {
    form.resetFields();
    setFileList(null);
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values, id) => {
    let courseData = new FormData();
    courseData.append("name", values?.name);
    courseData.append("description", values?.description);
    courseData.append("author", values?.author);
    courseData.append("price", values?.price);
    courseData.append("image", values?.image?.file?.originFileObj || "");
    courseData.append("categoryId", category._id);

    await putRequest("course/edit/" + id, courseData).then(({ data }) => {
      setCourses((course) =>
        course.map((el) => (el._id === id ? data.course : el))
      );
      setVisible("");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", { errorInfo });
  };

  const handleChange = (info) => {
    let fileListId = [...info.fileList];
    fileListId = fileListId.slice(-1);
    fileListId = fileListId.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileListId);

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl);
        setLoading(false);
      });
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2% 7% 0% 7%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PageHeader
            className="site-page-header"
            onBack={() => window.history.back()}
            title={category?.name}
          />
          {user?.role == "admin" ? (
            <Button
              className="button"
              onClick={showAddModal}
              style={{ height: "50px", width: "140px" }}
            >
              Add Course
            </Button>
          ) : null}
        </div>
        <div>
          <Modal
            title="Add Course"
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
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input course name!",
                  },
                ]}
              >
                <Input
                  className="inputfield"
                  style={{ padding: "10px", borderRadius: "5px" }}
                  placeholder="Course Name"
                />
              </Form.Item>

              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input course description!",
                  },
                ]}
              >
                <Input
                  className="inputfield"
                  style={{ padding: "10px", borderRadius: "5px" }}
                  placeholder="Course Description"
                />
              </Form.Item>

              <Form.Item
                name="author"
                rules={[
                  {
                    required: true,
                    message: "Please input course author!",
                  },
                ]}
              >
                <Input
                  className="inputfield"
                  style={{ padding: "10px", borderRadius: "5px" }}
                  placeholder="Course Author"
                />
              </Form.Item>

              <Form.Item
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input course price!",
                  },
                ]}
              >
                <Input
                  type="number"
                  className="inputfield"
                  style={{ padding: "10px", borderRadius: "5px" }}
                  placeholder="Course Price"
                />
              </Form.Item>

              <Form.Item
                name="image"
                rules={[
                  {
                    required: true,
                    message: "Please input course image!",
                  },
                ]}
              >
                <Upload
                  customRequest={dummyRequest}
                  listType="text"
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  fileList={fileList}
                  // accept=".png,.jpg"
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
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
                  Add Course
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5%",
            }}
          >
            {courses?.map((data, index) => {
              return (
                <Col
                  lg={6}
                  md={8}
                  sm={12}
                  xs={24}
                  style={{
                    marginBottom: "35px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    hoverable
                    style={{ width: 240, borderRadius: "10px" }}
                    cover={
                      <img
                        alt="example"
                        style={{
                          height: "180px",
                          borderRadius: "10px 10px 0px 0px",
                        }}
                        src={`http://localhost:2325/${data.image}`}
                      />
                    }
                    actions={
                      user?.role == "admin"
                        ? [
                            <span
                              onClick={() => showModal(data)}
                              className="cardtext"
                            >
                              Edit
                            </span>,
                            <span
                              className="cardtext"
                              onClick={() => deleteCourse(data._id)}
                            >
                              Delete
                            </span>,
                          ]
                        : [
                            <span
                              onClick={() => addCourse(data._id)}
                              className="cardtext"
                            >
                              Add to Cart
                            </span>,
                          ]
                    }
                  >
                    <Meta title={data.name} description={data.description} />
                    <Typography
                      style={{
                        margin: "12px 0px 0px 0px",
                      }}
                    >
                      Author : {data.author}
                    </Typography>
                    <Typography
                      style={{
                        margin: "5px 0px 0px 0px",
                        fontWeight: "bold",
                      }}
                    >
                      Price : {data.price}
                    </Typography>
                  </Card>
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
                      <Form.Item
                        name="name"
                        initialValue={data.name}
                        rules={[
                          {
                            required: true,
                            message: "Please input course name!",
                          },
                        ]}
                      >
                        <Input
                          className="inputfield"
                          style={{ padding: "10px", borderRadius: "5px" }}
                          placeholder="Course Name"
                        />
                      </Form.Item>

                      <Form.Item
                        name="description"
                        initialValue={data.description}
                        rules={[
                          {
                            required: true,
                            message: "Please input course description!",
                          },
                        ]}
                      >
                        <Input
                          className="inputfield"
                          style={{ padding: "10px", borderRadius: "5px" }}
                          placeholder="Course Description"
                        />
                      </Form.Item>

                      <Form.Item
                        name="author"
                        initialValue={data.author}
                        rules={[
                          {
                            required: true,
                            message: "Please input course author!",
                          },
                        ]}
                      >
                        <Input
                          className="inputfield"
                          style={{ padding: "10px", borderRadius: "5px" }}
                          placeholder="Course Author"
                        />
                      </Form.Item>

                      <Form.Item
                        name="price"
                        initialValue={data.price}
                        rules={[
                          {
                            required: true,
                            message: "Please input course price!",
                          },
                        ]}
                      >
                        <Input
                          className="inputfield"
                          style={{ padding: "10px", borderRadius: "5px" }}
                          placeholder="Course Price"
                        />
                      </Form.Item>

                      <Form.Item name="image">
                        <Upload
                          customRequest={dummyRequest}
                          listType="text"
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                          fileList={fileList}
                          accept=".png,.jpg"
                        >
                          <Button icon={<UploadOutlined />}>
                            Change Image
                          </Button>
                        </Upload>
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
                          Edit Course
                        </Button>
                      </Form.Item>
                    </Form>
                  </Modal>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </Layout>
  );
}

export default Course;
