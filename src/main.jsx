import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import AuthContextProvider from "./context/auth.jsx";
// import ModalContextProvider from "./context/modal.jsx";
import FollowUp from "./components/FollowUp/FollowUp.jsx";
import RiskAnalysis from "./components/RiskAnalysis/RiskAnalysis.jsx";
import PastData from "./components/RiskAnalysis/PastData.jsx";
import PastDataDetail from "./components/RiskAnalysis/PastDataDetail.jsx";
import RiskReport from "./components/RIskReport/RiskReport.jsx";
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
          <Route path="/risk-report" element={<RiskReport />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  </Router>
);
