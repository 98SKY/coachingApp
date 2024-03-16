import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import "./student.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChalkboardTeacher,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Student = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let myCoachingId = params.get("myCoachingId");
  
  const handleNavigation = (path) => {
    const currentPath = window.location.pathname;
    const newPath = `${path}?myCoachingId=${myCoachingId}`
    if (currentPath === path || currentPath === newPath) {
      return;
    }
    
    navigate(newPath);
  };

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">Student's</div>
        <div className="body">
          body
          <div className="plushIcon" onClick={() => handleNavigation(`/SignUp?userType=student`)}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <div className="mainFooter">
          <FontAwesomeIcon
            icon={faHome}
            onClick={() => handleNavigation("/controlPanel")}
          />
          <FontAwesomeIcon
            icon={faUsers}
            onClick={() => handleNavigation("/student")}
          />
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            onClick={() => handleNavigation("/teacher")}
          />
          <FontAwesomeIcon
            icon={faUser}
            onClick={() => handleNavigation("/profile")}
          />
        </div>
      </div>
    </div>
  );
};

export default Student;
