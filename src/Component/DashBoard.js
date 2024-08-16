import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import {
  faCalendarAlt,
  faHome,
  faUsers,
  faChalkboardTeacher,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../global.css";
import "./dashBoard.css";
import "react-datepicker/dist/react-datepicker.css";

const DashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const myCoachingId = params.get("myCoachingId");
  const userType = params.get("userType");
  const userCategory = params.get("userCategory");
  const [selectedIcon, setSelectedIcon] = useState("/controlPanel");
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleNavigation = (path) => {
    let currentPath = window.location.pathname;
    let newPath = `${path}?myCoachingId=${myCoachingId}&userType=${userType}`;

    if (currentPath === path || currentPath === newPath) {
      currentPath = `${path}?myCoachingId=${myCoachingId}&userType=${userType}`;
      return;
    }

    setSelectedIcon(path);
    navigate(newPath);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setShowDatePicker(false); 
    setShowPopup(true);

  };

  const handleConfirmDate = () => {
    if (selectedOption) {
      setShowPopup(false);
      console.log("Selected Date:", startDate);
      console.log("Selected Option:", selectedOption);
      // Add your logic here (e.g., API call) to handle the selected option
    } else {
      alert("Please select an option.");
    }

  };
  const handleCancelDate = () => {
    setShowPopup(false); 
  };

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">
          DashBoard
          <div
            className="calendar-icon"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          {showDatePicker && (
            <div className="datepicker-container">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                inline
              />
            </div>
          )}
        </div>
        
        <div className="body">
          <div className="card notification-card">
            <h3>Notifications</h3>
            <p>Latest updates and alerts will appear here.</p>
          </div>

          <div className="card-container">
            {/* Institute Info Card */}
            <div className="card">
              <h3>Institute Info</h3>
              <p>Details about the institute.</p>
            </div>

            {/* Students Card */}
            <div className="card">
              <h3>Students</h3>
              <p>Manage and view student details.</p>
            </div>

            {/* Teachers Card */}
            <div className="card">
              <h3>Teachers</h3>
              <p>Manage and view teacher details.</p>
            </div>
          </div>
        </div>

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

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="popUpHeader">Confirm Date</h3>
            <p>
              Do you want to apply the selected date:{" "}
              {startDate.toDateString()} for:
            </p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="Students"
                  checked={selectedOption === "Students"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                Students
              </label>
              <label>
                <input
                  type="radio"
                  value="Teachers"
                  checked={selectedOption === "Teachers"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                Teachers
              </label>
              <label>
                <input
                  type="radio"
                  value="Other"
                  checked={selectedOption === "Other"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                Other
              </label>
            </div>
            <button onClick={handleConfirmDate}>Confirm</button>
            <button onClick={handleCancelDate}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
