// StudentProfile.js
import React from 'react';
import PropTypes from 'prop-types';
import './studentProfile.css'; // Import CSS for styling
import { Doughnut } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

const StudentProfile = ({ student }) => {
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
