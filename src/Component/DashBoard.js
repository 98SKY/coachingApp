import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../global.css';
import './dashBoard.css'


const DashBoard = () => {
  const navigate = useNavigate();
  const [backButtonCount, setBackButtonCount] = useState(0);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

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

  const toggleSideDrawer = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };

  return (
    <div className='wrapper'>
      <div className='padding-all'>
        <div className="header-dashBoard">
          <button className="menu-button" onClick={toggleSideDrawer}>
            Menu
          </button>
          <div className='dashboard-heading'>DashBoard</div>
        </div>
        <div className='dashBoardBody'>body</div>
        {isSideDrawerOpen && <SideDrawer />}
      </div>
    </div>
  );
};

const SideDrawer = () => {
  return (
    <div className="side-drawer">
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
    </div>
  );
};

export default DashBoard
