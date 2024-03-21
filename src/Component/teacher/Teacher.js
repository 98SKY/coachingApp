import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import "./teacher.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChalkboardTeacher,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Teacher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState("/teacher");
  const params = new URLSearchParams(location.search);
  let myCoachingId = params.get("myCoachingId");
  const userType = params.get("userType");
  const userCategory = params.get("userCategory");

  const handleNavigation = (path) => {
    const currentPath = window.location.pathname;
    const newPath = `${path}?myCoachingId=${myCoachingId}&userType=${userType}&userCategory=${userCategory}`;
    if (currentPath === path || currentPath === newPath) {
      return;
    }
    setSelectedIcon(path);
    navigate(newPath);
  };
  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">Teacher's</div>
        <div className="body">
          body
          <div
            className="plushIcon"
            onClick={() => handleNavigation(`/SignUp?userType=teacher`)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <div className="mainFooter">
          <FontAwesomeIcon
            icon={faHome}
            className={selectedIcon === "/controlPanel" ? "selected" : ""}
            onClick={() => handleNavigation("/controlPanel")}
          />
          <FontAwesomeIcon
            icon={faUsers}
            className={selectedIcon === "/student" ? "selected" : ""}
            onClick={() => handleNavigation("/student")}
          />
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            className={selectedIcon === "/teacher" ? "selected" : ""}
            onClick={() => handleNavigation("/teacher")}
          />
          <FontAwesomeIcon
            icon={faUser}
            className={selectedIcon === "/profile" ? "selected" : ""}
            onClick={() => handleNavigation("/profile")}
          />
        </div>
      </div>
    </div>
  );
};

export default Teacher;
