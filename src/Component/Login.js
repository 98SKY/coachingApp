import React,{ useState,useEffect } from 'react';
import {login as loginApi} from './Global';
import '../global.css';
import './login.css';
import { Link,useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation } from "react-router-dom";


const Login = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const language = params.get("language");
  const userType = params.get("userType");
  const userCategory = params.get("userCategory");
  const getInstituteIdFromParam = params.get("instituteId")
  let myCoachingId = '';

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Please fill in both username and password fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await loginApi({ username, password, userType });
      // console.log('responseresponse',response?.getInstituteId);
       myCoachingId =  response?.getInstituteId;
      localStorage.setItem('token', response?.token);
       const token = localStorage.getItem('token');

    if (token) {
      navigate(`/controlPanel?language=${language}&userType=${userType}&myCoachingId=${myCoachingId}&userCategory=${userCategory}`);
    }
  
      setLoading(false);
     
      
    } catch (error) {
      setLoading(false);
      console.error('Login failed:', error.message);
      alert(error.message);
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
      navigate(`/SignUp?userType=${userType}`);
    }
  };

  return (
    <div className='wrapper'>
    <div className='padding-all'>
      <div className="header">Login</div>
      <div className="body">
        <img src="/logo.gif" alt="Logo" className='body-img' />
        <div className="login-box">
          <input type="text" placeholder={userType === "institute" ? "Institute ID" : "Username"} value={username} onChange={(e) => setUsername(e.target.value)} />
          <div className="password-input">
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`} onClick={() => setShowPassword(!showPassword)}></i>
            </div>
            {loading && <div className='loader'>Load...</div>}
          <button onClick={handleLogin}>Login</button>
          <div>
          <div className="create-account" onClick={handleCreateAccount}>Create account</div>
          <div className="forgot-password"><Link to={`/forgotPass?userType=${userType}&userCategory=${userCategory}&instituteId=${getInstituteIdFromParam}`}>Forgot password?</Link></div>
          </div>
        </div>
      </div>
      <div className="footer"> working</div>
    </div>
    </div>
  );
};

export default Login;
