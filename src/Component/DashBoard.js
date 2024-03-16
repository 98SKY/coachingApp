import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../global.css';
import './dashBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faChalkboardTeacher, faUser } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";



const DashBoard = () => {
  const navigate = useNavigate();
  const [backButtonCount, setBackButtonCount] = useState(0);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let myCoachingId = params.get("myCoachingId");

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (backButtonCount >= 2) {
        event.preventDefault();
        navigate('/');
      } else {
        setBackButtonCount((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate, backButtonCount]);

  const handleNavigation = (path) => {
    const currentPath = window.location.pathname;
    const newPath = `${path}?myCoachingId=${myCoachingId}`
    if (currentPath === path || currentPath === newPath) {
      return;
    }
    
    navigate(newPath);
  };



  return (
    <div className='wrapper'>
      <div className='padding-all'>
          <div className='header'>DashBoard</div>
          <div className='body'>body</div>
          <div className='mainFooter'>
          <FontAwesomeIcon icon={faHome} onClick={() => handleNavigation('/controlPanel')} />
            <FontAwesomeIcon icon={faUsers} onClick={() => handleNavigation('/student')} />
            <FontAwesomeIcon icon={faChalkboardTeacher} onClick={() => handleNavigation('/teacher')} />
            <FontAwesomeIcon icon={faUser} onClick={() => handleNavigation('/profile')} />
          </div>
      </div>
    </div>
  );
};

export default DashBoard
