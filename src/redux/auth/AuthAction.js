import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ForgotPasswordApi,
  LoginApi,
  signupApi,
} from "../../config/ApiHandler";

export const login = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await LoginApi(data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signupApi(data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "getUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await LoginApi(data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "forgetpassword",
  async (data) => {
    try {
      const response = await ForgotPasswordApi(data);

      // if (response.data.status === true) {
      //   notify("success", response.data.message);
      // }
      return response;
    } catch (err) {
      console.error("updateProfileApi error", err);
      throw new Error(
        "Failed to update profile: " + (err.message || "Unknown error")
      );
    }
  }
);
