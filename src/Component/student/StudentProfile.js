// StudentProfile.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './studentProfile.css'; // Import CSS for styling
import { Doughnut } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from "react-router-dom";
import {
  faHome,
  faBookOpen,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import {StudentInternalRoutes} from '../../route/StudentRoute';

const StudentProfile = ({ student }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState(StudentInternalRoutes.STUDENT.PROFILE);

  const handleNavigation = (path) => {
    setSelectedIcon(path);
    navigate(path);
  };

  const [announcements, setAnnouncements] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState(0);
  const [username, setUsername] = useState("");
  // Provide default values for the student object if it's undefined
  const defaultStudent = {
    id: 'unknown',
    name: 'Unknown Student',
    class: 'N/A',
  };

  const studentInfo = student || defaultStudent;

  // Sample data for academic performance
  const academicData = {
    labels: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
    datasets: [
      {
        label: 'Grades',
        data: [85, 78, 92, 88, 95],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0'],
      },
    ],
  };

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">Profile</div>
        <div className='body'>
    <div className="student-profile-wrapper">
      <div className="profile-header">
        <h2>
          <FontAwesomeIcon icon={faUser} /> {studentInfo.name}'s Profile
        </h2>
        <p><strong>Student ID:</strong> {studentInfo.id}</p>
        <p><strong>Class:</strong> {studentInfo.class}</p>
      </div>

      <div className="academic-performance">
        <h3><FontAwesomeIcon icon={faBook} /> Academic Performance</h3>
        <Doughnut data={academicData} options={{ responsive: true }} />
      </div>

      <div className="attendance-overview">
        <h3><FontAwesomeIcon icon={faClipboardCheck} /> Attendance Overview</h3>
        <p><strong>Total Classes:</strong> 20</p>
        <p><strong>Classes Attended:</strong> 18</p>
        <p><strong>Attendance Rate:</strong> 90%</p>
      </div>

      <div className="extracurricular-activities">
        <h3>Extracurricular Activities</h3>
        <ul>
          <li>Debate Club</li>
          <li>Science Olympiad</li>
          <li>Basketball Team</li>
        </ul>
      </div>

      <div className="personal-notes">
        <h3>Personal Notes</h3>
        <textarea placeholder="Write your notes here..."></textarea>
      </div>
    </div>
    </div>
    {/*body end */}
    <div className="mainFooter">
          <div
          className="icon"
            onClick={() => handleNavigation(StudentInternalRoutes.STUDENT.HOME)}
          >
          <FontAwesomeIcon
            icon={faHome}
            className={selectedIcon === StudentInternalRoutes.STUDENT.HOME ? "selected" : ""}
          />
          <span className="label">Home</span>
          </div>
          <div
          className="icon"
          onClick={() => handleNavigation(StudentInternalRoutes.STUDENT.COURSE)}
          >
          <FontAwesomeIcon
            icon={faBookOpen}
            className={selectedIcon === StudentInternalRoutes.STUDENT.COURSE ? "selected" : ""}
          />
          <span className="label">Course</span>
          </div>
          <div
          className="icon"
          onClick={() => handleNavigation(StudentInternalRoutes.STUDENT.ASSIGNMENT)}
          >
          <FontAwesomeIcon
            icon={faClipboardCheck}
            className={selectedIcon === StudentInternalRoutes.STUDENT.ASSIGNMENT ? "selected" : ""}
          />
          <span className="label">assignment</span>
          </div>
          <div
          className="icon"
          onClick={() => handleNavigation(StudentInternalRoutes.STUDENT.ATTENDENCE)}
          >
          <FontAwesomeIcon
            icon={faChartLine}
            className={selectedIcon === StudentInternalRoutes.STUDENT.ATTENDENCE ? "selected" : ""}
          />
          <span className="label">Attendance</span>
          </div>
          <div
          className="icon"
          onClick={() => handleNavigation(StudentInternalRoutes.STUDENT.PROFILE)}
          >
          <FontAwesomeIcon
            icon={faUser}
            className={selectedIcon === StudentInternalRoutes.STUDENT.PROFILE ? "selected" : ""}
          />
          <span className="label">Profile</span>
          </div>
        </div>
    </div>
    </div>
  );
};

StudentProfile.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
  }),
};

export default StudentProfile;
