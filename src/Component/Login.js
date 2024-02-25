import React from 'react';
import Reset from './Global';
import '../global.css';
import './login.css';
import { Route } from './Route';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    const userExists = false;
    // Check your condition here

    if (userExists) {
      // Navigate to the dashboard
      navigate('/controlPannel');
    } else {
      // Show an error message or perform other actions
      alert('User does not exist');
    }
  };

  return (
    <div className='wrapper'>
    <div className='padding-all'>
      <div className="header">Login</div>
      <div className="body">
        <img src="/logo192.png" alt="Logo" className='body-img' />
        <div className="login-box">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button onClick={handleLogin}>Login</button>
          <div>
          <div className="create-account"><Link to={"SignUp"}>Create account</Link></div>
          <div className="forgot-password"><Link to={"ForgotPass"}>Forgot password?</Link></div>
          </div>
        </div>
      </div>
      <div className="footer"> working</div>
    </div>
    </div>
  );
};

export default Login;
