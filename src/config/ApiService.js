import axios from "axios";
import { BASE_URL } from "./UrlConfig";
import { userData } from "../utils/localStorage";

const HEADERS = {
  "Api-Version": "v1",
  responseType: "application/json",
  "Content-Type": "application/json",
  Accept: "application/json",
};

const HEADERSMULTIPART = {
  "Api-Version": "v1",
  responseType: "application/json",
  "Content-Type": "multipart/form-data",
  // Accept: "application/json",
};

export const UnAuthApiService = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

export const ApiService = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

export const FileUploadService = axios.create({
  baseURL: BASE_URL,
  headers: HEADERSMULTIPART,
});

ApiService.interceptors.request.use(
  (config) => {
    const token = userData();
    if (token != null || token != undefined) {
      config.headers.Authorization = `Bearer ${token?.access_token}`;
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls

ApiService.interceptors.response.use(
  (response) => {
    //   printResponseLog("Success", response);
    return response;
  },
  (error) => {
    //   printResponseLog("Error", error);
    //   printLog("responseerror=>>>>>>>>>>", error.response.data.message);
    if (error.response.status === 401 && error.response.message !== 'Password is incorrect, enter correct password!') {
      // showErrorMessage(error.response.data.message, ToastBottomRight);
      window.location.href = "/auth/login";
      localStorage.removeItem("login");
      return error.response;
    } else if (error.response.status === 404) {
      // printLog('ApiService Error ===>> ', error.response.data);
      return error.response;
    } else {
      return error.response;
    }
  }
);

FileUploadService.interceptors.request.use(
  (config) => {
    const token = userData();
    if (token != null) {
      config.headers.Authorization = `Bearer ${token?.access_token}`;
    }

    return config;
  },
  async (error) => {
    console.error("Error=>", error);
    return Promise.reject(error);
  }
);
