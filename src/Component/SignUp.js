import React, { useState } from 'react';
import '../global.css';
import './signUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    instituteName: '',
    phoneNumber: '',
    emailId: '',
  });
  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation here
    if (formData.instituteName && formData.phoneNumber && formData.emailId) {
      setFormValid(true);
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
