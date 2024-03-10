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
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if ((accountType === 'institute' && instituteId.trim() === '') || (accountType === 'user' && userId.trim() === '') || email.trim() === '' || phone.trim() === '') {
      alert('Please fill in all fields.');
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

    const userData = { accountType, instituteId, userId, email, phone };
    try {
      console.log('userData',userData);
      const response = await recoverPassword(userData);
      alert(response.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Facing issue to communicate with backend');
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

