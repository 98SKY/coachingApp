import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPass from './ForgotPass';
import DashBoard from './DashBoard';
import Decide from './Decide';
import Student from './student/Student';
import StudentHome from './student/StudentHome';
import StudentDetailsView from './student/StudentDetailsView';
import TeacherDetailsView from './teacher/TeacherDetailsView'
import Teacher from './teacher/Teacher';
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
            <Route path='/controlPanel' element={<DashBoard/>}/>
            <Route path='/student' element={<Student/>}/>
            <Route path='/studentHome'element={<StudentHome/>}/>
            <Route path='/teacher' element={<Teacher/>}/>
            <Route path='/teacherDetails' element={<TeacherDetailsView/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/studentDetails' element={<StudentDetailsView/>}/>

        </Routes>
      </Router>
    </div>
  )
}

export default Navigate
