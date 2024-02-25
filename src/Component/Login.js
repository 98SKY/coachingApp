import React,{ useState,useEffect } from 'react';
import Reset from './Global';
import '../global.css';
import './login.css';
import { Link,useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Login = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Please fill in both username and password fields.');
      return;
    }
  
    let userExists = false;
    // Check your condition here
    console.log('Username:', username);
    console.log('Password:', password);
    if(username=='Sunil' && password=='321'){
      userExists = true;
    }

    if (userExists) {
      // Navigate to the dashboard
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/controlPanel');
    } else {
      // Show an error message or perform other actions
      alert('User does not exist');
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/controlPanel');
    }
  }, []);

  return (
    <div className='wrapper'>
    <div className='padding-all'>
      <div className="header">Login</div>
      <div className="body">
        <img src="/logo192.png" alt="Logo" className='body-img' />
        <div className="login-box">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <div className="password-input">
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`} onClick={() => setShowPassword(!showPassword)}></i>
            </div>
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
