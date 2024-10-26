import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentHome from "../Component/student/StudentHome";
import Assignment from '../Component/student/Assignments';
import Attendance from '../Component/student/Attendance';
import StudentCourse from '../Component/student/StudentCourse';
import StudentProfile from '../Component/student/StudentProfile';
const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<StudentHome />} />
      <Route path="assignment" element={<Assignment />}/>
      <Route path="attendence" element={<Attendance />}/>
      <Route path="course" element={<StudentCourse/>} />
      <Route path="profile" element={<StudentProfile />}/>
    </Routes>
  );
};

export default StudentRoutes;

export const StudentInternalRoutes = {
  STUDENT: {
    HOME: '/student/home',
    ASSIGNMENT: '/student/assignment',
    ATTENDENCE: '/student/attendence',
    COURSE: '/student/course',
    PROFILE: '/student/profile',
  },
  LOGIN: '/login',
  SIGN_UP: '/SignUp'
};
