import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  OnboardingViewApi,
  PROFILEIMAGEUPLOADApi,
  PersonalInfoApi,
  ProfilePersonalInfoApi,
  ProfileViewApi,
} from "../../../config/ApiHandler";

export const onboardingView = createAsyncThunk(
  "view",
  async (data, { rejectWithValue }) => {
    try {
      const response = await OnboardingViewApi();
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const ProfileView = createAsyncThunk(
  "view",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ProfileViewApi();
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const generalInfo = createAsyncThunk(
  "generalInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await PersonalInfoApi(data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profileGeneralInfo = createAsyncThunk(
  "generalInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ProfilePersonalInfoApi(data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadProfileImg = createAsyncThunk(
  "uploadProfileImg",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await PROFILEIMAGEUPLOADApi(formData);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
