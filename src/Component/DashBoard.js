import React, { useState, useEffect } from "react";
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
import { dashBoardCount as dashBoardCountApi } from "./Global";

const DashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(location.search);
  const myCoachingId = params.get("myCoachingId");
  const userType = params.get("userType");
  const [selectedIcon, setSelectedIcon] = useState("/controlPanel");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [studentsData, setStudentsData] = useState(0);
  const [teachersData, setTeachersData] = useState(0);
  const [instituteInfo, setInstituteInfo] = useState(0);

  useEffect(() => {
    fetchDashBoardCount(["students", "teachers"]);
  }, []);

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

  const handleDateChange = (date, type) => {
    if (type === "from") {
      setFromDate(date);
      setShowFromDatePicker(false);
      setShowToDatePicker(true);
    } else if (type === "to") {
      setToDate(date);
      setShowToDatePicker(false);
      setShowPopup(true);
    }
  };

  const handleConfirmDate = () => {
    if (selectedOption && fromDate && toDate) {
      setShowPopup(false);
      console.log("Selected From Date:", fromDate);
      console.log("Selected To Date:", toDate);
      console.log("Selected Option:", selectedOption);
      fetchDashBoardCount([selectedOption.toLowerCase()], fromDate, toDate);
      setFromDate(null);
      setToDate(null);
    } else {
      alert("Please select both dates and an option.");
    }
  };

  const handleCancelDate = () => {
    setShowPopup(false);
  };

  const fetchDashBoardCount = async (categories, fromDate, toDate) => {
    const dashBoardData = {
      instituteID: myCoachingId,
      categories,
      fromDate: fromDate?.toISOString(),
      toDate: toDate?.toISOString(), 
    };
    setLoading(true);
    try {
      const response = await dashBoardCountApi(dashBoardData);
      console.log("responseresponse", response.counts);
      const data = response.counts;
      if (categories.includes("students")) {
        setStudentsData(data.students || 0);
      }
      if (categories.includes("teachers")) {
        setTeachersData(data.teachers || 0);
      }
      if (categories.includes("instituteInfo")) {
        setInstituteInfo(data.instituteInfo || 0);
      }
      setLoading(false);
    } catch (error) {
      console.log("Failed to fetch dashBoardCount :", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getFirstDayOfMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  };

  const handleCardClick = (category) => {
    const currentDate = new Date();
    const firstDayOfMonth = getFirstDayOfMonth();
    fetchDashBoardCount([category], firstDayOfMonth, currentDate);
  };

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">
          DashBoard
          <div
            className="calendar-icon"
            onClick={() => setShowFromDatePicker(!showFromDatePicker)}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          {showFromDatePicker && (
            <div className="datepicker-container">
              <div className="datepicker-wrapper">
                <label>From Date:</label>
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => handleDateChange(date, "from")}
                />
              </div>
            </div>
          )}
          {showToDatePicker && (
            <div className="datepicker-container">
              <div className="datepicker-wrapper">
                <label>To Date:</label>
                <DatePicker
                  selected={toDate}
                  onChange={(date) => handleDateChange(date, "to")}
                />
              </div>
            </div>
          )}
        </div>

        <div className="body">
          <div className="card notification-card">
            <h3>Notifications</h3>
            <p>Latest updates and alerts will appear here.</p>
          </div>

          <div className="card-container">
            <div
              className="card"
              onClick={() => fetchDashBoardCount(["instituteInfo"])}
            >
              <h3>Institute Info</h3>
              <p>
                {loading && selectedOption === "institute"
                  ? "Loading..."
                  : instituteInfo}
              </p>
            </div>
            <div className="card" onClick={() => handleCardClick("students")}>
              <h3>Students</h3>
              <p>
                {loading && selectedOption === "students"
                  ? "Loading..."
                  : `${studentsData} Students`}
              </p>
            </div>
            <div className="card" onClick={() => handleCardClick("teachers")}>
              <h3>Teachers</h3>
              <p>
                {loading && selectedOption === "teachers"
                  ? "Loading..."
                  : `${teachersData} Teachers`}
              </p>
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
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="popUpHeader">Confirm Date</h3>
            <p>
              Do you want to apply the selected date range:{" "}
              {fromDate?.toDateString()} - {toDate?.toDateString()} for:
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
                  value="InstituteInfo"
                  checked={selectedOption === "InstituteInfo"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                Institute Info
              </label>
            </div>
            <div className="popup-actions">
              <button onClick={handleConfirmDate}>Confirm</button>
              <button onClick={handleCancelDate}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
