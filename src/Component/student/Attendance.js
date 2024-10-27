import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import "./attendance.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  faHome,
  faUser,
  faBookOpen,
  faClipboardCheck,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { StudentInternalRoutes } from "../../route/StudentRoute";

const Attendance = ({ student }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState(
    StudentInternalRoutes.STUDENT.ATTENDENCE
  );

  const handleNavigation = (path) => {
    setSelectedIcon(path);
    navigate(path);
  };

  const [announcements, setAnnouncements] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState(0);
  const [username, setUsername] = useState("");
  if (!student) {
    console.warn("No student data provided");
    student = { id: "unknown", name: "Unknown Student", class: "N/A" };
  }

  const [attendanceRecords] = useState([
    { date: "2024-10-01", status: "Present" },
    { date: "2024-10-02", status: "Absent" },
    { date: "2024-10-03", status: "Present" },
    { date: "2024-10-04", status: "Present" },
    { date: "2024-10-05", status: "Absent" },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">
          Attendance
          <div className="attendance-calendar">
            
              <FontAwesomeIcon icon={faCalendarAlt} />
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                withPortal
              />
            
          </div>
        </div>
        <div className="body">
          <div className="student-profile">
            <h2>{student.name}'s Attendance Record</h2>
            <p>
              <strong>Student ID:</strong> {student.id}
            </p>
            <p>
              <strong>Class:</strong> {student.class}
            </p>
          </div>

          <div className="attendance-header">
            <h3>Attendance History</h3>
          </div>

          <div className="attendance-list">
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((record, index) => (
                <div
                  key={index}
                  className={`attendance-card ${record.status.toLowerCase()}`}
                >
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(record.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    {record.status === "Present" ? (
                      <span className="present">
                        <FontAwesomeIcon icon={faCheckCircle} /> {record.status}
                      </span>
                    ) : (
                      <span className="absent">
                        <FontAwesomeIcon icon={faTimesCircle} /> {record.status}
                      </span>
                    )}
                  </p>
                </div>
              ))
            ) : (
              <p>No attendance records found.</p>
            )}
          </div>
        </div>
        {/* end of body */}
        <div className="mainFooter">
          <div
            className="icon"
            onClick={() => handleNavigation(StudentInternalRoutes.STUDENT.HOME)}
          >
            <FontAwesomeIcon
              icon={faHome}
              className={
                selectedIcon === StudentInternalRoutes.STUDENT.HOME
                  ? "selected"
                  : ""
              }
            />
            <span className="label">Home</span>
          </div>
          <div
            className="icon"
            onClick={() =>
              handleNavigation(StudentInternalRoutes.STUDENT.COURSE)
            }
          >
            <FontAwesomeIcon
              icon={faBookOpen}
              className={
                selectedIcon === StudentInternalRoutes.STUDENT.COURSE
                  ? "selected"
                  : ""
              }
            />
            <span className="label">Course</span>
          </div>
          <div
            className="icon"
            onClick={() =>
              handleNavigation(StudentInternalRoutes.STUDENT.ASSIGNMENT)
            }
          >
            <FontAwesomeIcon
              icon={faClipboardCheck}
              className={
                selectedIcon === StudentInternalRoutes.STUDENT.ASSIGNMENT
                  ? "selected"
                  : ""
              }
            />
            <span className="label">assignment</span>
          </div>
          <div
            className="icon"
            onClick={() =>
              handleNavigation(StudentInternalRoutes.STUDENT.ATTENDENCE)
            }
          >
            <FontAwesomeIcon
              icon={faChartLine}
              className={
                selectedIcon === StudentInternalRoutes.STUDENT.ATTENDENCE
                  ? "selected"
                  : ""
              }
            />
            <span className="label">Attendance</span>
          </div>
          <div
            className="icon"
            onClick={() =>
              handleNavigation(StudentInternalRoutes.STUDENT.PROFILE)
            }
          >
            <FontAwesomeIcon
              icon={faUser}
              className={
                selectedIcon === StudentInternalRoutes.STUDENT.PROFILE
                  ? "selected"
                  : ""
              }
            />
            <span className="label">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Attendance.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
  }).isRequired,
};

export default Attendance;
