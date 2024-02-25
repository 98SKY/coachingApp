import React from 'react'
import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const DashBoard = () => {
  
  const navigate = useNavigate();
  const [backButtonCount, setBackButtonCount] = useState(0);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (backButtonCount >= 2) { // Change this threshold as needed
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

  return (
    <div>
      <p>DashBoard</p>
    </div>
  )
}

export default DashBoard
