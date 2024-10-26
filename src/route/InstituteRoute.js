import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../Component/institute/DashBoard";
import Student from "../Component/institute/Student";
import StudentDetailsView from "../Component/institute/StudentDetailsView";
import Teacher from "../Component/institute/Teacher";
import TeacherDetailsView from "../Component/institute/TeacherDetailsView";

const InstituteRoutes = () => {
  return (
    <Routes>
      <Route path="controlPanel" element={<DashBoard />} />
      <Route path="student" element={<Student />} />
      <Route path="teacher" element={<Teacher />} />
      <Route path="teacherDetails" element={<TeacherDetailsView />} />
      <Route path="studentDetails" element={<StudentDetailsView />} />
    </Routes>
  );
};

export default InstituteRoutes;
