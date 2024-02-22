import React from 'react';
import Reset from './Global';
import '../global.css';
import './login.css';

const Login = () => {
  Reset(5, 2);
  return (
    <div className='padding-all'>
      <div className="header">Login</div>
      <div className="body">
        <img src="/logo192.png" alt="Logo" className='body-img' />
        <div className="login-box">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
          <div className="create-account">Create account</div>
          <div className="forgot-password">Forgot password?</div>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default Login;
