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
  faTimes,
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
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [iconToggle, setIconToggle] = useState(false);
  const [studentsData, setStudentsData] = useState({
    totalStudents: 0,
    activeStudents: 0,
    inactiveStudents: 0,
  });
  const [teachersData, setTeachersData] = useState({
    totalTeachers: 0,
    activeTeachers: 0,
    inactiveTeachers: 0,
  });
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
    if (selectedOptions.length > 0 && fromDate && toDate) {
      setShowPopup(false);
      // console.log("selectedOptions", selectedOptions);
      const lowercaseOptions = selectedOptions.map((option) =>
        option.toLowerCase()
      );
      fetchDashBoardCount(lowercaseOptions, fromDate, toDate);
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
      const data = response.counts;
      if (categories.includes("students")) {
        setStudentsData({
          totalStudents: data.totalStudents || 0,
          activeStudents: data.activeStudents || 0,
          inactiveStudents: data.inactiveStudents || 0,
        });
      }
      if (categories.includes("teachers")) {
        setTeachersData({
          totalTeachers: data.totalTeachers || 0,
          activeTeachers: data.activeTeachers || 0,
          inactiveTeachers: data.inactiveTeachers || 0,
        });
      }
      if (categories.includes("instituteInfo")) {
        setInstituteInfo(data.instituteInfo || 0);
      }
      setLoading(false);
    } catch (error) {
      // console.log("Failed to fetch dashBoardCount :", error);
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

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">
          DashBoard
          <div
            className="calendar-icon"
            onClick={() => {
              setShowFromDatePicker(!showFromDatePicker);
              setIconToggle(!iconToggle);
            }}
          >
            <FontAwesomeIcon icon={iconToggle ? faTimes : faCalendarAlt} />
          </div>
          {showFromDatePicker && (
            <div className="datepicker-container">
              <div className="datepicker-wrapper">
                <label>From Date:</label>
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => handleDateChange(date, "from")}
                  maxDate={new Date()}
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
                  minDate={fromDate}
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
              <h3 className="dashBoardCardHeader">INSTITUTE INFO</h3>
              <div className={`dasboardCardItems`}>
                {loading && selectedOption === "institute"
                  ? "Loading..."
                  : `info ${instituteInfo}`}
              </div>
            </div>
            <div className="card" onClick={() => handleCardClick("students")}>
              <h3 className="dashBoardCardHeader">STUDENTS</h3>
              <div className={`dasboardCardItems total`}>
                {loading && selectedOption === "students"
                  ? "Loading..."
                  : ` Total ${studentsData.totalStudents}`}
              </div>
              <div className={`dasboardCardItems active`}>
                {loading && selectedOption === "students"
                  ? "Loading..."
                  : `Active ${studentsData.activeStudents}`}
              </div>
              <div className={`dasboardCardItems inactive`}>
                {loading && selectedOption === "students"
                  ? "Loading..."
                  : `Inactive ${studentsData.inactiveStudents}`}
              </div>
            </div>
            <div className="card" onClick={() => handleCardClick("teachers")}>
              <h3 className="dashBoardCardHeader">TEACHERS</h3>
              <div className={`dasboardCardItems total`}>
                {loading && selectedOption === "teachers"
                  ? "Loading..."
                  : `Total ${teachersData.totalTeachers}`}
              </div>
              <div className={`dasboardCardItems active`}>
                {loading && selectedOption === "teachers"
                  ? "Loading..."
                  : `Active ${teachersData.activeTeachers}`}
              </div>
              <div className={`dasboardCardItems inactive`}>
                {loading && selectedOption === "teachers"
                  ? "Loading..."
                  : `Inactive ${teachersData.inactiveTeachers}`}
              </div>
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
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  value="Students"
                  checked={selectedOptions.includes("Students")}
                  onChange={(e) => handleOptionChange(e)}
                />
                Students
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Teachers"
                  checked={selectedOptions.includes("Teachers")}
                  onChange={(e) => handleOptionChange(e)}
                />
                Teachers
              </label>
              <label>
                <input
                  type="checkbox"
                  value="InstituteInfo"
                  checked={selectedOptions.includes("InstituteInfo")}
                  onChange={(e) => handleOptionChange(e)}
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
