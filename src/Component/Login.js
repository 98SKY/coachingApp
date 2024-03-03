import React,{ useState,useEffect } from 'react';
import Reset from './Global';
import '../global.css';
import './login.css';
import { Link,useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation } from "react-router-dom";


const Login = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const language = params.get("language");
  const userType = params.get("userType");

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Please fill in both username and password fields.');
      return;
    }
    try {
      //Send login request to your server to authenticate user
      const response = await fetch('https://your-api-endpoint.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      // Save JWT token to local storage
      localStorage.setItem('token', data.token);

      // Navigate to the dashboard
      navigate('/controlPanel');
      
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Authentication failed. Please check your credentials.');
    }
      
  };
   
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Navigate to the dashboard if user is already authenticated
      navigate('/controlPanel');
    }else {
      setUsername('');
      setPassword('');
    }
  }, []);

  const handleCreateAccount = () => {
    if (userType !== "institute") {
      alert("Contact your institute to create an account.");
    } else {
      navigate("/SignUp");
    }
  };

  return (
    <div className='wrapper'>
    <div className='padding-all'>
      <div className="header">Login</div>
      <div className="body">
        <img src="/logo192.png" alt="Logo" className='body-img' />
        <div className="login-box">
          <input type="text" placeholder={userType === "institute" ? "Institute ID" : "Username"} value={username} onChange={(e) => setUsername(e.target.value)} />
          <div className="password-input">
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`} onClick={() => setShowPassword(!showPassword)}></i>
            </div>
          <button onClick={handleLogin}>Login</button>
          <div>
          <div className="create-account" onClick={handleCreateAccount}>Create account</div>
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
