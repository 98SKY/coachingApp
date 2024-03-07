import React, { useState } from 'react';
import '../global.css';
import './signUp.css';
import { useNavigate } from 'react-router-dom';
import { registerInstitute } from './Global';

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    instituteName: '',
    phoneNumber: '',
    emailId: '',
  });
  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let filteredValue = value;
    if (name === 'instituteName') {
      filteredValue = value.replace(/[^a-zA-Z ]/g, ''); 
    } else if (name === 'phoneNumber') {
      filteredValue = value.replace(/\D/g, ''); 
      filteredValue = filteredValue.slice(0, 10); 
    }
  
    setFormData({
      ...formData,
      [name]: filteredValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.instituteName && formData.phoneNumber && formData.emailId) {
      setLoading(true);
      try {
        const response = await registerInstitute(formData);
        
        // const { userId, oneTimePassword } = response;
        setLoading(false);
  
        alert(`Check your email or phone for the  user ID and one-time password.`);
        setFormValid(true);
        navigate('/login');
      } catch (error) {
        setLoading(false);
        console.error(error);
        alert('Failed to create user. Please try again.');
      }
    }
  };
  
  const handleKeyPress = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
      alert('You can only enter numbers.');
    }
  };

  return (
    <div className='myWrapper'>
      <div className='myPadding-all'>
        <div className='header'>Register Myself</div>
        <form onSubmit={handleSubmit}>
          <div className='body'>
            <input
              type='text'
              name='instituteName'
              placeholder='Enter institute name'
              value={formData.instituteName}
              onChange={handleChange}
              required
              className='myInput-field'
            />
            <input
              type='tel'
              name='phoneNumber'
              placeholder='Enter phone number'
              value={formData.phoneNumber}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
              className='myInput-field'
            />
            <input
              type='email'
              name='emailId'
              placeholder='Enter email ID'
              value={formData.emailId}
              onChange={handleChange}
              required
              className='myInput-field'
            />
            {loading && <div className='loader'>Load...</div>}
            <button type='submit'>Save</button>
          </div>
          <div className='footer'></div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
