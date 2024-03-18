import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
// import ModalContextProvider from "./context/modal.jsx";
import FollowUp from "./components/FollowUp/FollowUp.jsx";
import RiskAnalysis from "./components/RiskAnalysis/RiskAnalysis.jsx";
import PastData from "./components/RiskAnalysis/PastData.jsx";
import PastDataDetail from "./components/RiskAnalysis/PastDataDetail.jsx";
import RiskModelling from "./components/RIskReport/RiskModelling.jsx";
import { Amplify } from "aws-amplify";
import { sessionStorage } from "aws-amplify/utils";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import SignInContextProvider from "./components/Auth/SignInContext.jsx";
import Auth from "./components/Auth/Auth.jsx";
import SignIn from "./components/Auth/SignIn.jsx";
import ConfirmPassword from "./components/Auth/ConfirmPassword.jsx";
import MfaSetup from "./components/Auth/MfaSetup.jsx";
import Mfa from "./components/Auth/Mfa.jsx";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-south-1_kIxAGCGrc",
      userPoolClientId: "5dc82mnj2nu3m7dr76tl20a1up",
    },
  },
});
cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router basename={import.meta.env.VITE_BASENAME}>
    <Routes>
      <Route
        path="/"
        element={
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        }
      >
        <Route path="/" element={<Home />}>
          <Route path="/" element={<FollowUp />} />
          <Route path="/risk-analysis" element={<RiskAnalysis />} />
          <Route
            path="/risk-analysis/past-data/customer-group/:custGroup"
            element={<PastData />}
          />
          <Route
            path="/risk-analysis/past-data/:id"
            element={<PastDataDetail />}
          />
          <Route path="/risk-modelling" element={<RiskModelling />} />
        </Route>
        <Route
          path="/auth"
          element={
            <SignInContextProvider>
              <Auth />
            </SignInContextProvider>
          }
        >
          <Route path="signin" element={<SignIn />} />
          <Route path="confirm-password" element={<ConfirmPassword />} />
          <Route path="mfa-setup" element={<MfaSetup />} />
          <Route path="mfa" element={<Mfa />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);
