import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { profileData as myDataApi } from "../Global";
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
import "../../global.css";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("/profile");
  const [showMenu, setShowMenu] = useState(false); 
  const params = new URLSearchParams(location.search);
  let myCoachingId = params.get("myCoachingId");
  const userType = params.get("userType");
  const username = localStorage.getItem('name');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});

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
  };

  const logOut = () =>{
    localStorage.clear();
    navigate(`/login?language=english&userType=institute`)
  }

  useEffect(() =>{
    loadMyData();
  },[]);

  const loadMyData = async () =>{
    if (loading) {
      return; // Return if already loading
    }
  
    const userData = {
      instituteID: myCoachingId,
      userType: userType ? userType : "institute",
      userID: username
    };
    setLoading(true);
    try {
      const response = await myDataApi(userData);
      if (response.userData && response.userData.length > 0) {
        setProfileDetails(response.userData[0]);
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = (phone) => {
    window.location.href = `tel:${phone}`;
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
                <div
                  className="menu-item"
                  onClick={logOut}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="body">
          <div className="profile-card">
            <div className="avatar">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="details">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  <div className="detail-item">
                    <span className="label">Username:</span> {profileDetails.username}
                  </div>
                  <div className="detail-item">
                    <span className="label">Email:</span>{" "}
                    <span className="clickable" onClick={() => handleEmailClick(profileDetails.email)}>{profileDetails.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Phone:</span>{" "}
                    <span className="clickable" onClick={() => handlePhoneClick(profileDetails.phone_no)}>{profileDetails.phone_no}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Institute Name:</span>{" "}
                    {profileDetails.institute_name}
                  </div>
                  <div className="detail-item">
                    <span className="label">Institute Status:</span>{" "}
                    {profileDetails.institute_status}
                  </div>
                  <div className="detail-item">
                    <span className="label">Address:</span>{" "}
                    {profileDetails.address || "Not provided"}
                  </div>
                </>
              )}
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
