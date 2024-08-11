import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpSignIn from "./pages/signup";
import Dashboard from "./pages/dashboard";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
   <>
    <Router>
        <Routes>
          <Route path="/" element={<SignUpSignIn/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </Router>
       <ToastContainer />
   </>
  )
}

export default App;
