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
  Rate,
  Divider,
} from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../../Layouts/index";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined, RightOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Search } = Input;

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
  const [editForm, setEditForm] = useState({});
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  useEffect(() => {
    getRequest("category/" + params.categoryId).then(({ data }) => {
      setCategory(data);
    });
    getRequest("courses?categoryId=" + params.categoryId).then(({ data }) => {
      setCourses(data);
    });
  }, []);

  //   const handleSearch = (value) => {
  //     getRequest(
  //       "courses?categoryId=" + params.categoryId + "&key=" + value
  //     ).then(({ data }) => {
  //       setCourses(data);
  //     });
  //   };

  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState("");
  const [addModelVisible, setAddVisible] = React.useState(false);

  const showAddModal = (index) => {
    setAddVisible(true);
  };
  const showModal = (data) => {
    setVisible(data._id);
    setEditForm({
      name: data.name,
      description: data.description,
      author: data.author,
      price: data.price,
      image: "",
    });
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
    setEditForm({});
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
    courseData.append("name", editForm?.name);
    courseData.append("description", editForm?.description);
    courseData.append("author", editForm?.author);
    courseData.append("price", editForm?.price);
    courseData.append("image", editForm?.image || "");
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

    setEditForm({
      name: editForm.name,
      description: editForm.description,
      author: editForm.author,
      price: editForm.price,
      image: info.file.originFileObj,
    });
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

  const handleCard = (data) => {
    navigate(`${data._id}`);
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2% 5% 0% 5%",
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
          {user?.role === "admin" ? (
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
          {/* <Input
            placeholder="input search text"
            onChange={(e) => handleSearch(e.target.value)}
            className="inputfield"
            style={{ padding: "10px", borderRadius: "5px" }}
          /> */}

          <Row
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              shape="circle"
              style={{
                marginTop: "60px",
              }}
            >
              <LeftOutlined />
            </Button>
            {courses?.map((data, index) => {
              return (
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px",
                  }}
                >
                  <Card
                    style={{ width: "240px" }}
                    cover={
                      <img
                        onClick={() => handleCard(data)}
                        alt="example"
                        style={{
                          width: "240px",
                          height: "135px",
                        }}
                        src={data.image}
                      />
                    }
                  >
                    <div onClick={() => handleCard(data)}>
                      <Typography
                        style={{
                          fontWeight: "bold",
                          fontSize: "15px",
                          margin: "3px 0px",
                        }}
                      >
                        {data.name}
                      </Typography>
                      <Typography
                        style={{ fontSize: "12px", margin: "3px 0px" }}
                      >
                        {data.author}
                      </Typography>

                      <span style={{ fontWeight: "bold", color: "#E59818" }}>
                        4.2
                        <Rate
                          disabled
                          value={4.2}
                          style={{
                            fontSize: "16px",
                            margin: "0px 10px",
                            padding: "0px",
                            color: "#E59818",
                          }}
                        />
                      </span>
                      <Typography
                        style={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          margin: "3px 0px",
                        }}
                      >
                        &#8377;{data.price}
                      </Typography>
                    </div>
                    {user?.role === "admin" ? (
                      <div
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Divider
                          style={{
                            borderColor: "lightgrey",
                            margin: "10px 0px",
                          }}
                        />
                        <Typography
                          className="categoryText"
                          onClick={() => showModal(data)}
                        >
                          Edit
                        </Typography>
                        <Divider
                          style={{
                            borderColor: "lightgrey",
                            margin: "10px 0px",
                          }}
                        />

                        <Typography
                          className="categoryText"
                          onClick={() => deleteCourse(data._id)}
                        >
                          Delete
                        </Typography>
                      </div>
                    ) : null}
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
                      <Input
                        defaultValue={editForm.name}
                        className="inputfield"
                        style={{
                          padding: "10px",
                          borderRadius: "5px",
                          margin: "10px 0px",
                        }}
                        placeholder="Course Name"
                        onChange={(e) =>
                          setEditForm({
                            name: e.target.value,
                            description: editForm.description,
                            author: editForm.author,
                            price: editForm.price,
                            image: editForm.image,
                          })
                        }
                      />
                      <Input
                        defaultValue={editForm.description}
                        className="inputfield"
                        style={{
                          padding: "10px",
                          borderRadius: "5px",
                          margin: "10px 0px",
                        }}
                        placeholder="Course Description"
                        onChange={(e) =>
                          setEditForm({
                            name: editForm.name,
                            description: e.target.value,
                            author: editForm.author,
                            price: editForm.price,
                            image: editForm.image,
                          })
                        }
                      />
                      <Input
                        defaultValue={editForm.author}
                        className="inputfield"
                        style={{
                          padding: "10px",
                          borderRadius: "5px",
                          margin: "10px 0px",
                        }}
                        placeholder="Course Author"
                        onChange={(e) =>
                          setEditForm({
                            name: editForm.name,
                            description: editForm.description,
                            author: e.target.value,
                            price: editForm.price,
                            image: editForm.image,
                          })
                        }
                      />
                      <Input
                        defaultValue={editForm.price}
                        className="inputfield"
                        style={{
                          padding: "10px",
                          borderRadius: "5px",
                          margin: "10px 0px",
                        }}
                        placeholder="Course Price"
                        onChange={(e) =>
                          setEditForm({
                            name: editForm.name,
                            description: editForm.description,
                            author: editForm.author,
                            price: e.target.value,
                            image: editForm.image,
                          })
                        }
                      />
                      <Upload
                        name="image"
                        customRequest={dummyRequest}
                        listType="text"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        fileList={fileList}
                        accept=".png,.jpg"
                      >
                        <Button
                          style={{ margin: "10px 0px" }}
                          icon={<UploadOutlined />}
                        >
                          Change Image
                        </Button>
                      </Upload>
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
                        Edit Course
                      </Button>
                    </Form>
                  </Modal>
                </Col>
              );
            })}
            <Button
              style={{
                marginTop: "60px",
              }}
              shape="circle"
            >
              <RightOutlined />
            </Button>
          </Row>
        </div>
      </div>
    </Layout>
  );
}

export default Course;
