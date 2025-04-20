import { Navigate, useRoutes } from "react-router-dom";
import Test from "./test";
import Components from "./Components";
import AuthLayout from "./layout/auth";
import Login from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgotPassword";
import EmailVerification from "./pages/auth/emailVerification";
import ResetPassword from "./pages/auth/resetPassword";
import Signup from "./pages/auth/signup";
import DashboardLayout from "./layout/dashboard";
import Onboard from "./pages/dashboard/Onboard";
import Home from "./pages/dashboard/home";
import Profile from "./pages/dashboard/profile";
import AccountSettings from "./pages/dashboard/accountSettings";
import { useSelector } from "react-redux";
import OtpVerifiction from "./pages/auth/otpVerification/OtpVerifiction";
import JobBoard from "./pages/dashboard/GateWayJobBoard";
import Welcome from "./welcomPage/Welcome";
import TermsConditions from "./pages/termsandconditions/termsandconditions";
import { BsEmojiAngry, BsEye } from "react-icons/bs";
import { Dashboard, EmojiNatureSharp } from "@mui/icons-material";
import WelcomeCandidatePage from "./pages/WelcomeCandidatePage";
import GatewayJobDescription from "./pages/gatewayJobDescription/GatewayJobDescription";
import LoginNew from "./components/auth/LoginNew";
import Dashboardzz from "./components/dashboard/Dashboardzz";
import SignUp from "./components/auth/SignUp";
import ProfileDashboard from "./pages/dashboardnew/ProfileNew/ProfileDashboardnew";
import ProfileDashboardnew from "./pages/dashboardnew/ProfileNew/ProfileDashboardnew";
import ProfilenewViewPage from "./pages/dashboardnew/ProfilenewViewPage";

// ----------------------------------------------------------------------

export default function Router() {
  // const { isLoggedIn, userData } = useSelector((state) => state.auth.loginData);
  const isLoggedIn = localStorage.getItem("login");

  return useRoutes([
    {
      path: "/loginew",
      element: <LoginNew />,
    },
    // {
    //   path: "/signup",
    //   element: <SignUp />,
    // },

    {
      path: "/welcome",
      element: <WelcomeCandidatePage />,
    },
    {
      path: "/components",
      element: <Components />,
    },
    {
      path: "/terms-and-conditions",
      element: <TermsConditions />,
    },
    {
      path: "/job-description",
      element: <GatewayJobDescription />,
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "signup",
          element: isLoggedIn ? <Navigate to="/" /> : <Signup />,
        },
        {
          path: "login",
          element: isLoggedIn ? <Navigate to="/" /> : <Login />,
        },
        {
          path: "forgot-password",
          element: isLoggedIn ? <Navigate to="/" /> : <ForgotPassword />,
        },
        {
          path: "email-verification",
          element: <EmailVerification />,
        },
        {
          path: "reset-password",
          element: isLoggedIn ? <Navigate to="/" /> : <ResetPassword />,
        },
        {
          path: "otp-verification",
          element: <OtpVerifiction />,
        },
      ],
    },
    {
      path: "/employee",
      // element: isLoggedIn ? <DashboardLayout /> : <Navigate to='/auth/login' />,
      element: <DashboardLayout />,
      children: [
        // {
        //   path: 'onboard',
        //   element: userData?.data?.data?.user_data?.is_profile_completed ? (
        //     <Navigate to='/dashboard/home' />
        //   ) : (
        //     <Onboard />
        //   ),
        // },
        {
          path: "onboard",
          element: <Onboard />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "account",
          element: <AccountSettings />,
        },
      ],
    },

    {
      path: "/dashboard",
      // element: isLoggedIn ? <DashboardLayout /> : <Navigate to='/auth/login' />,
      element: <DashboardLayout />,
      children: [
        // {
        //   path: 'onboard',
        //   element: userData?.data?.data?.user_data?.is_profile_completed ? (
        //     <Navigate to='/dashboard/home' />
        //   ) : (
        //     <Onboard />
        //   ),
        // },
        {
          path: "zzdashboard",
          element: <Dashboardzz />,
        },
        {
          path: "profilenew",
          element: <ProfileDashboardnew />,
        },
        {
          path: "profilenewview",
          element: <ProfilenewViewPage />,
        },
        {
          path: "onboard",
          element: <Onboard />,
        },

        {
          path: "home",
          // element: <Home />,
          element: <Dashboardzz />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "account",
          element: <AccountSettings />,
        },
        {
          path: "job-board",
          element: <JobBoard />,
        },
      ],
    },
    {
      path: "/",
      element: <Navigate to={isLoggedIn ? "/dashboard/home" : "/welcome"} />,
    },
  ]);
}

