import axios from "axios";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { selectAuthToken } from "./features/authTokenSlice";
import store from "./app/store";
const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:2325/";

// const token = useSelector(selectAuthToken);

const token = store.getState().token.token;
console.log({ token: token });

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token || localStorage.getItem("token")}`,
};

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

// axiosClient.defaults.withCredentials = true;

export async function getRequest(URL) {
  return axiosClient
    .get(`/${URL}`)
    .then((response) => {
      // openNotificationWithIcon("success", "Login successfully");
      return response;
    })
    .catch((e) => {
      e?.response?.data?.errors?.map((err) =>
        openNotificationWithIcon("error", err.msg)
      );
    });
}

export async function postRequest(URL, payload) {
  return axiosClient
    .post(`/${URL}`, payload)
    .then((response) => {
      if (response?.data?.meta) {
        openNotificationWithIcon("success", response.data.meta.msg);
      }
      return response;
    })
    .catch((e) => {
      e?.response?.data?.errors?.map((err) =>
        openNotificationWithIcon("error", err.msg)
      );
    });
}

export async function putRequest(URL, payload) {
  return axiosClient
    .put(`/${URL}`, payload)
    .then((response) => {
      openNotificationWithIcon("success", response.data.meta.msg);
      return response;
    })
    .catch((e) => {
      e.response.data.errors.map((err) =>
        openNotificationWithIcon("error", err.msg)
      );
    });
}

export async function deleteRequest(URL) {
  return axiosClient
    .delete(`/${URL}`)
    .then((response) => {
      openNotificationWithIcon("success", response.data.meta.msg);
      return response;
    })
    .catch((e) => {
      e.response.data.errors.map((err) =>
        openNotificationWithIcon("error", err.msg)
      );
    });
}
