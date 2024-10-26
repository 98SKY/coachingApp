import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './attendance.css'; // Import CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles

const Attendance = ({ student }) => {
  // Default to a mock student object if student is undefined
  if (!student) {
    console.warn('No student data provided');
    student = { id: 'unknown', name: 'Unknown Student', class: 'N/A' }; // Default value
  }

  const [attendanceRecords] = useState([
    { date: '2024-10-01', status: 'Present' },
    { date: '2024-10-02', status: 'Absent' },
    { date: '2024-10-03', status: 'Present' },
    { date: '2024-10-04', status: 'Present' },
    { date: '2024-10-05', status: 'Absent' },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date()); // State to hold selected date

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="attendance-wrapper">
      <div className="student-profile">
        <h2>{student.name}'s Attendance Record</h2>
        <p><strong>Student ID:</strong> {student.id}</p>
        <p><strong>Class:</strong> {student.class}</p>
      </div>

      <div className="attendance-header">
        <h3>Attendance History</h3>
        <div className="attendance-calendar">
          <h4>
            <FontAwesomeIcon icon={faCalendarAlt} /> 
            <DatePicker 
              selected={selectedDate} 
              onChange={handleDateChange} 
              dateFormat="MMMM yyyy" 
              showMonthYearPicker 
              withPortal 
            />
          </h4>
        </div>
      </div>

      <div className="attendance-list">
        {attendanceRecords.length > 0 ? (
          attendanceRecords.map((record, index) => (
            <div key={index} className={`attendance-card ${record.status.toLowerCase()}`}>
              <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> 
                {record.status === 'Present' ? (
                  <span className="present"><FontAwesomeIcon icon={faCheckCircle} /> {record.status}</span>
                ) : (
                  <span className="absent"><FontAwesomeIcon icon={faTimesCircle} /> {record.status}</span>
                )}
              </p>
            </div>
          ))
        ) : (
          <p>No attendance records found.</p>
        )}
      </div>
    </div>
  );
}

Attendance.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
  }).isRequired,
};

export default Attendance;
