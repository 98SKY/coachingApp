import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChalkboardTeacher,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../global.css";
import "./dashBoard.css";

const DashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const myCoachingId = params.get("myCoachingId");
  const userType = params.get("userType");
  const userCategory = params.get("userCategory");
  const [selectedIcon, setSelectedIcon] = useState("/controlPanel");

  const handleNavigation = (path) => {
    let currentPath = window.location.pathname;
    let newPath = `${path}?myCoachingId=${myCoachingId}&userType=${userType}`;

    if (currentPath === path || currentPath === newPath) {
      currentPath  = `${path}?myCoachingId=${myCoachingId}&userType=${userType}`;
      return;
    }

    setSelectedIcon(path);
    navigate(newPath);
  };

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">DashBoard</div>
        <div className="body">body</div>
        <div className="mainFooter">
          <div className="icon">
            <FontAwesomeIcon
              icon={faHome}
              className={selectedIcon === "/controlPanel" ? "selected" : ""}
              onClick={() => handleNavigation("/controlPanel")}
            />
            <span className="label">Home</span>
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faUsers}
              className={selectedIcon === "/student" ? "selected" : ""}
              onClick={() => handleNavigation("/student")}
            />
            <span className="label">Students</span>
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              className={selectedIcon === "/teacher" ? "selected" : ""}
              onClick={() => handleNavigation("/teacher")}
            />
            <span className="label">Teachers</span>
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faUser}
              className={selectedIcon === "/profile" ? "selected" : ""}
              onClick={() => handleNavigation("/profile")}
            />
            <span className="label">Profile</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashBoard;
