import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPass from './ForgotPass';

const Navigate = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/forgot' element={<ForgotPass/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default Navigate
