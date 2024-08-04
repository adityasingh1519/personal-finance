import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={Signup}></Route>
        <Route path="/dashboard" element={Dashboard}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
