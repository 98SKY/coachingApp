import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPass from "./ForgotPass";
import InstituteRoutes from "../route/InstituteRoute";
import StudentRoutes from "../route/StudentRoute";
import Decide from "./Decide";
import Profile from "./profile/Profile";

const Navigate = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Decide />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route path="/profile" element={<Profile />} />
          {/* Wildcard route for student routes */}
          <Route path="/student/*" element={<StudentRoutes />} />
          <Route path="/institute/*" element={<InstituteRoutes />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Navigate;
