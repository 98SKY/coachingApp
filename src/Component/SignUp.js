import React, { useState } from 'react';
import '../global.css';
import './signUp.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
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
      filteredValue = value.replace(/[^a-zA-Z ]/g, ''); // Allow only letters and spaces
    } else if (name === 'phoneNumber') {
      filteredValue = value.replace(/\D/g, ''); // Allow only digits
      filteredValue = filteredValue.slice(0, 10); // Limit length to 10 characters
    }
  
    setFormData({
      ...formData,
      [name]: filteredValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation here
    if (formData.instituteName && formData.phoneNumber && formData.emailId) {
      try {
        const response = await fetch('your_api_endpoint_here', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error('Failed to create user.');
        }
        const data = await response.json();
        
        // Assuming API response contains userId and oneTimePassword
        const { userId, oneTimePassword } = data;
  
        alert(`Check your email or phone for the  user ID and one-time password.`);
        setFormValid(true);
        navigate('/login');
      } catch (error) {
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
              placeholder='Enter institute name 1'
              value={formData.instituteName}
              onChange={handleChange}
              required
              className='myInput-field'
            />
            <input
              type='tel'
              name='phoneNumber'
              placeholder='Enter phone number 2'
              value={formData.phoneNumber}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
              className='myInput-field'
            />
            <input
              type='email'
              name='emailId'
              placeholder='Enter email ID 3'
              value={formData.emailId}
              onChange={handleChange}
              required
              className='myInput-field'
            />
            {/* <div className="buttonWrapper"> */}
            <button type='submit' onClick={handleChange}>
              Save
            </button>
            {/* </div> */}
          </div>
          <div className='footer'>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
