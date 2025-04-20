import { createSlice } from "@reduxjs/toolkit";
import { login, signup, forgetPassword } from "./AuthAction";
import { enqueueSnackbar } from "notistack";
import { getUser } from "../../config/ApiHandler";

const getUserData = async () => {
  try {
    const user = await getUser();
    if (user) {
      return {
        isLoggedIn: true,
        userData: user,
      };
    }
    return {
      isLoggedIn: false,
      userData: null,
    };
  } catch (error) {
    return {
      isLoggedIn: false,
      userData: null,
    };
  }
};

const initialState = {
  loginData: [],
  signupData: [],
  status: false,
  error: null,
  forgetData: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = false;
      state.loginData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload;
    });

    builder.addCase(signup.pending, (state) => {
      state.status = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.status = false;
      state.signupData = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload;
    });

    builder.addCase(forgetPassword.pending, (state) => {
      state.status = true;
      state.error = null;
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.status = false;
      state.forgetData = action.payload;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
