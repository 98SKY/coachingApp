import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './assignments.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

// Example assignments data
const exampleAssignments = [
  {
    id: 1,
    title: 'Math Homework',
    description: 'Complete exercises from chapter 5.',
    dueDate: '2024-10-30',
    completed: false,
  },
  {
    id: 2,
    title: 'Science Project',
    description: 'Prepare a presentation on renewable energy.',
    dueDate: '2024-11-05',
    completed: false,
  },
  {
    id: 3,
    title: 'History Essay',
    description: 'Write a 1500-word essay on World War II.',
    dueDate: '2024-10-28',
    completed: true,
  },
];

function Assignments({ assignments = exampleAssignments }) { // Default to example assignments
  const [filter, setFilter] = useState('All');

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'All') return true;
    if (filter === 'Due Soon') 
      return new Date(assignment.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    if (filter === 'Completed') return assignment.completed;
    return false;
  });

  return (
    <div className="assignments-wrapper">
      <div className="assignments-header">
        <h2>Assignments</h2>
        <label htmlFor="filter">Filter:</label>
        <select id="filter" onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="Due Soon">Due Soon</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="assignments-list">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <h3><FontAwesomeIcon icon={faClipboardCheck} /> {assignment.title}</h3>
              <p><strong>Description:</strong> {assignment.description}</p>
              <p><strong><FontAwesomeIcon icon={faCalendarAlt} /> Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {assignment.completed ? 'Completed' : 'Pending'}</p>
            </div>
          ))
        ) : (
          <p>No assignments found.</p>
        )}
      </div>
    </div>
  );
}

Assignments.propTypes = {
  assignments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
};

export default Assignments;
