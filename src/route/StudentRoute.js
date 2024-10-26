import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentHome from "../Component/student/StudentHome";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="studentHome" element={<StudentHome />} />
    </Routes>
  );
};

export default StudentRoutes;
