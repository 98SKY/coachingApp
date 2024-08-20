import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChalkboardTeacher,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../../global.css";

const StudentHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState("/studentHome");

  const handleNavigation = (path) => {
    const currentPath = window.location.pathname;
    const newPath = `${path}`;

    if (currentPath === path || currentPath === newPath) {
      currentPath  = `${path}`;
      return;
    }

    setSelectedIcon(path);
    navigate(newPath);
  };
  return (
<div className="wrapper">
      <div className="padding-all">
        <div className="header">My DashBoard</div>
        <div className="body">body</div>
        <div className="mainFooter">
              <FontAwesomeIcon
                icon={faHome}
                className={selectedIcon === "/studentHome" ? "selected" : ""}
                onClick={() => handleNavigation("/studentHome")}
              />
              <FontAwesomeIcon
            icon={faUsers}
            // className={selectedIcon === "/student" ? "selected" : ""}
            onClick={() => handleNavigation("/student")}
          />
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            // className={selectedIcon === "/teacher" ? "selected" : ""}
            onClick={() => handleNavigation("/teacher")}
          />
          <FontAwesomeIcon
            icon={faUser}
            // className={selectedIcon === "/profile" ? "selected" : ""}
            onClick={() => handleNavigation("/profile")}
          />
        </div>
      </div>
    </div>
  )
}

export default StudentHome
