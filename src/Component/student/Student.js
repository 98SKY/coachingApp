import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../global.css';
import './student.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faChalkboardTeacher, faUser } from '@fortawesome/free-solid-svg-icons';

const Student = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='wrapper'>
    <div className='padding-all'>
        <div className='header'>Student's</div>
        <div className='body'>body</div>
        <div className='mainFooter'>
        <FontAwesomeIcon icon={faHome} onClick={() => handleNavigation('/controlPanel')} />
          <FontAwesomeIcon icon={faUsers} onClick={() => handleNavigation('/student')} />
          <FontAwesomeIcon icon={faChalkboardTeacher} onClick={() => handleNavigation('/teacher')} />
          <FontAwesomeIcon icon={faUser} onClick={() => handleNavigation('/profile')} />
        </div>
    </div>
  </div>
  )
}

export default Student
