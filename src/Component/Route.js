import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPass from './ForgotPass';
import DashBoard from './DashBoard'

const Navigate = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/forgotPass' element={<ForgotPass/>}/>
            <Route path='/controlPanel' element={<DashBoard/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default Navigate
