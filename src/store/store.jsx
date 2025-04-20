import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../redux/auth/AuthSlice';
import profileReducer from "../redux/onboarding/personalInformation/PersonalInfoSlice";
import CountrySlice from '../redux/commonApi/CountrySlice';

export default configureStore({
  reducer: {
    auth: AuthSlice,
    onboard:profileReducer,
    commoncontry:CountrySlice
  },
});
