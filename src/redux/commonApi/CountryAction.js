import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  CountryApi,
  StateApi,
  CityApi,
  referralSourceApi,
} from "../../config/ApiHandler";

export const countryGet = createAsyncThunk(
  "countryGet",
  async (data, { rejectWithValue }) => {
    try {
      const response = await CountryApi();
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const referralSourceGet = createAsyncThunk(
  "referralSourceGet",
  async (data, { rejectWithValue }) => {
    try {
      const response = await referralSourceApi();
      return response?.data?.data?.referralSources;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const stateGet = createAsyncThunk(
  "stateGet",
  async (data, { rejectWithValue }) => {
    try {
      const response = await StateApi(data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cityGet = createAsyncThunk(
  "cityGet",
  async (data, { rejectWithValue }) => {
    try {
      const response = await CityApi(data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
