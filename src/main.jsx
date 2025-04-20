import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { ToastContainer, toast } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { configuration } from "./config/microsoftConfig.js";

const pca = new PublicClientApplication(configuration);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MsalProvider instance={pca}>
      <GoogleOAuthProvider clientId="1085482238427-tn03o6c6f6bvip8f9bece2dn10li3ebr.apps.googleusercontent.com">
        <ToastContainer />
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </MsalProvider>
  </BrowserRouter>
);
