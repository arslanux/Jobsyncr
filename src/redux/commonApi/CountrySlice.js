import { createSlice } from "@reduxjs/toolkit";

import {
  countryGet,
  stateGet,
  cityGet,
  referralSourceGet,
} from "./CountryAction";

const initialState = {
  countryData: [],
  stateData: [],
  cityData: [],
  referralData: [],
};

const onboardSlice = createSlice({
  name: "onboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(countryGet.pending, (state) => {
      state.status = true;
      state.error = null;
    });
    builder.addCase(countryGet.fulfilled, (state, action) => {
      state.status = false;
      state.countryData = action.payload;
    });
    builder.addCase(countryGet.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload;
    });

    builder.addCase(referralSourceGet.pending, (state) => {
      state.status = true;
      state.error = null;
    });
    builder.addCase(referralSourceGet.fulfilled, (state, action) => {
      state.status = false;
      state.referralData = action.payload;
    });
    builder.addCase(referralSourceGet.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload;
    });

    builder.addCase(stateGet.pending, (state) => {
      state.status = true;
      state.error = null;
    });
    builder.addCase(stateGet.fulfilled, (state, action) => {
      state.status = false;
      state.stateData = action.payload;
    });
    builder.addCase(stateGet.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload;
    });

    // UPLOAD PROFILE IMAGE
    builder.addCase(cityGet.pending, (state) => {
      state.status = true;
      state.error = null;
    });
    builder.addCase(cityGet.fulfilled, (state, action) => {
      state.status = false;
      state.cityData = action.payload;
    });
    builder.addCase(cityGet.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload;
    });
  },
});
export default onboardSlice.reducer;
