import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBookOpen,
  faBell,
  faClipboardCheck,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import "./studentHome.css";

const StudentHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState("/studentHome");

  const handleNavigation = (path) => {
    setSelectedIcon(path);
    navigate(path);
  };

  const [announcements, setAnnouncements] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("name") || "Student";
    setUsername(storedUsername);

    setAnnouncements([
      { id: 1, title: "New Course Available", date: "2024-10-15" },
      { id: 2, title: "Mid-Term Exams Announced", date: "2024-10-12" },
    ]);

    setCourses([
      { id: 1, name: "Mathematics", progress: 80 },
      { id: 2, name: "Physics", progress: 60 },
      { id: 3, name: "Chemistry", progress: 30 },
    ]);

    setAssignments([
      { id: 1, title: "Math Homework 5", dueDate: "2024-10-20" },
      { id: 2, title: "Physics Lab Report", dueDate: "2024-10-22" },
    ]);

    setAttendance(85);
  }, []);

  const getProgressColorClass = (progress) => {
    if (progress < 50) {
      return "red";
    } else if (progress >= 50 && progress <= 70) {
      return "orange";
    } else {
      return "green";
    }
  };

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">Student Dashboard</div>
        <div className="body">
          {/* Overview Section */}
          <div className="overview-section">
            <h2>Welcome, {username}!</h2>

            <div className="stats">
              <div className="stat-item">
                <FontAwesomeIcon icon={faBookOpen} />
                <p>{courses.length} Courses Enrolled</p>
              </div>
              <div className="stat-item">
                <FontAwesomeIcon icon={faClipboardCheck} />
                <p>{assignments.length} Upcoming Assignments</p>
              </div>
              <div className="stat-item">
                <FontAwesomeIcon icon={faChartLine} />
                <p>{attendance}% Attendance</p>
              </div>
            </div>
          </div>

          {/* Card Sections */}
          <div className="card-sections">
            {/* Announcements Section */}
            <div className="student-card">
              <div className="student-card-header">
                <div className="student-details">
                  <h3>Announcements</h3>
                </div>
              </div>
              <div className="student-card-body">
                <ul>
                  {announcements.map((announcement) => (
                    <li key={announcement.id}>
                      <strong>{announcement.title}</strong> - {announcement.date}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Courses Section */}
            <div className="student-card">
              <div className="student-card-header">
                <div className="student-details">
                  <h3>Enrolled Courses</h3>
                </div>
              </div>
              <div className="student-card-body">
                <ul>
                  {courses.map((course) => (
                    <li key={course.id}>
                      {course.name} - {course.progress}% Complete
                      <div className="progress-bar">
                        <div
                          className={`progress-bar-fill ${getProgressColorClass(course.progress)}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{course.progress}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Assignments Section */}
            <div className="student-card">
              <div className="student-card-header">
                <div className="student-details">
                  <h3>Upcoming Assignments</h3>
                </div>
              </div>
              <div className="student-card-body">
                <ul>
                  {assignments.map((assignment) => (
                    <li key={assignment.id}>
                      <strong>{assignment.title}</strong> - Due: {assignment.dueDate}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Navigation */}
        <div className="mainFooter">
          <FontAwesomeIcon
            icon={faHome}
            className={selectedIcon === "/studentHome" ? "selected" : ""}
            onClick={() => handleNavigation("/studentHome")}
          />
          <FontAwesomeIcon
            icon={faBookOpen}
            className={selectedIcon === "/student" ? "selected" : ""}
            onClick={() => handleNavigation("/student")}
          />
          <FontAwesomeIcon
            icon={faClipboardCheck}
            className={selectedIcon === "/teacher" ? "selected" : ""}
            onClick={() => handleNavigation("/teacher")}
          />
          <FontAwesomeIcon
            icon={faChartLine}
            className={selectedIcon === "/profile" ? "selected" : ""}
            onClick={() => handleNavigation("/profile")}
          />
          <FontAwesomeIcon
            icon={faUser}
            className={selectedIcon === "/notifications" ? "selected" : ""}
            onClick={() => handleNavigation("/notifications")}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
