import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChalkboardTeacher,
  faUser,
  faChevronLeft,
  faEllipsisV,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState("/profile");
  const [showMenu, setShowMenu] = useState(false); // State to manage menu visibility
  const params = new URLSearchParams(location.search);
  let myCoachingId = params.get("myCoachingId");
  const userType = params.get("userType");
  const userCategory = params.get("userCategory");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    const currentPath = window.location.pathname;
    const newPath = `${path}?myCoachingId=${myCoachingId}`;
    if (currentPath === path || currentPath === newPath) {
      return;
    }
    setSelectedIcon(path);
    navigate(newPath);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowMenu(!showMenu);
    console.log("Menu toggled");
  };

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
          Profile
          <div className="kebab-menu" onClick={toggleMenu}>
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faEllipsisV} />
            )}
            {showMenu && (
              <div className={`menu-items ${showMenu ? "active" : ""}`}>
                <div
                  className="menu-item"
                  onClick={() => {
                    /* Handle settings click */
                  }}
                >
                  Settings
                </div>
                <div
                  className="menu-item"
                  onClick={() => {
                    /* Handle about click */
                  }}
                >
                  About
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="body">
          <div className="profile-card">
            <div className="avatar">
              {/* Add profile image here */}
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="details">
              <div className="detail-item">
                <span className="label">Username:</span> {/* Add username */}
              </div>
              <div className="detail-item">
                <span className="label">Name:</span> {/* Add name */}
              </div>
              <div className="detail-item">
                <span className="label">Phone:</span> {/* Add phone number */}
              </div>
              {/* Add more details as needed */}
            </div>
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

export default Profile;
