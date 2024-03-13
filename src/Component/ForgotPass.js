import React, { useState } from 'react';
import '../global.css';
import './forgotPass.css';
import { useNavigate } from 'react-router-dom';
import { recoverPassword } from './Global';

const ForgotPass = () => {
  const [accountType, setAccountType] = useState('user');
  const [instituteId, setInstituteId] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (
      (accountType === 'institute' && instituteId.trim() === '') ||
      (accountType === 'user' && userId.trim() === '') ||
      email.trim() === '' ||
      phone.trim() === '' ||
      newPassword.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      alert('Please fill all fields.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      alert('Please enter a valid phone number');
      return;
    }

    if (!validatePassword(newPassword)) {
      alert('Please enter a valid password. It must contain at least one uppercase letter, one digit, and one special character.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const userData = { accountType, instituteId, userId, email, phone, newPassword };
    try {
      console.log('userData', userData);
      const response = await recoverPassword(userData);
      alert(response.message);
      navigate(`/login?language=english&userType=${accountType}`)
    } catch (error) {
      console.error('Error:', error);
      alert(error);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return re.test(password);
  };

  return (
    <div className='myWrapper'>
      <div className='myPadding-all'>
        <div className='header'>Password Recovery</div>
        <div className='body'>
          <div>
            <input
              type='radio'
              id='institute'
              name='accountType'
              value='institute'
              checked={accountType === 'institute'}
              onChange={() => setAccountType('institute')}
            />
            <label htmlFor='institute'>Institute</label>
            <input
              type='radio'
              id='user'
              name='accountType'
              value='user'
              checked={accountType === 'user'}
              onChange={() => setAccountType('user')}
            />
            <label htmlFor='user'>User</label>
          </div>
          {accountType === 'institute' && (
            <>
              <input
                type='text'
                id='instituteId'
                name='instituteId'
                placeholder='Institute ID'
                value={instituteId}
                onChange={(e) => setInstituteId(e.target.value)}
                required
              />
            </>
          )}
          {accountType === 'user' && (
            <>
              <input
                type='text'
                id='userId'
                name='userId'
                placeholder='User ID'
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </>
          )}
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='tel'
            id='phone'
            name='phone'
            placeholder='Phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div className='password-input'>
            <input
              type={showNewPassword ? 'text' : 'password'}
              id='newPassword'
              name='newPassword'
              placeholder='New Password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <i
              className={`fa ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`}
              onClick={() => setShowNewPassword(!showNewPassword)}
            />
          </div>
          <div className='password-input'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <i
              className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          <button type='button' onClick={handleSubmit}>
            Update
          </button>
        </div>
        <div className='footer'></div>
      </div>
    </div>
  );
};

export default ForgotPass;
