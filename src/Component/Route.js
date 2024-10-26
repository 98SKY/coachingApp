import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPass from './ForgotPass';
import InstituteRoutes from '../route/InstituteRoute';

import Decide from './Decide';

import StudentHome from './student/StudentHome';

import Profile from './profile/Profile';

const Navigate = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Decide/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/forgotPass' element={<ForgotPass/>}/>
            {/* <Route path='/controlPanel' element={<DashBoard/>}/>
            <Route path='/student' element={<Student/>}/> */}
            <Route path='/studentHome'element={<StudentHome/>}/>
            {/* <Route path='/teacher' element={<Teacher/>}/>
            <Route path='/teacherDetails' element={<TeacherDetailsView/>}/> */}
            <Route path='/profile' element={<Profile/>}/>
            {/* <Route path='/studentDetails' element={<StudentDetailsView/>}/> */}

        </Routes>
        <InstituteRoutes></InstituteRoutes>
      </Router>
    </div>
  )
}

export default Navigate
