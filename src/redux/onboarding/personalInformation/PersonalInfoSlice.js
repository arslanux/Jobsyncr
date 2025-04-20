import { createSlice } from "@reduxjs/toolkit";
import {
  onboardingView,
  generalInfo,
  uploadProfileImg,
} from "./PersonalInfoAction";

const initialState = {
  onboardViewData: [],
  onboardViewDelay:true,
  profileData: [],
  profileImgeData: [],
};

const onboardSlice = createSlice({
  name: "onboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onboardingView.pending, (state) => {
      state.onboardViewDelay = true;
      state.error = null;
    });
    builder.addCase(onboardingView.fulfilled, (state, action) => {
      state.onboardViewDelay = false;
      state.onboardViewData = action.payload;
    });
    builder.addCase(onboardingView.rejected, (state, action) => {
      state.onboardViewDelay = false;
      state.error = action.payload;
    });

    builder.addCase(generalInfo.pending, (state) => {
      state.status = true;
      state.error = null;
    });
    builder.addCase(generalInfo.fulfilled, (state, action) => {
      state.status = false;
      state.profileData = action.payload;
    });
    builder.addCase(generalInfo.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload;
    });

    // UPLOAD PROFILE IMAGE
    builder.addCase(uploadProfileImg.pending, (state) => {
      state.status = true;
      state.error = null;
    });
    builder.addCase(uploadProfileImg.fulfilled, (state, action) => {
      state.status = false;
      state.profileImgeData = action.payload;
    });
    builder.addCase(uploadProfileImg.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload;
    });
  },
});
export default onboardSlice.reducer;
