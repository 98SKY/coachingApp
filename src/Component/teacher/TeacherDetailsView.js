import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import "./teacherDetailsView.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChalkboardTeacher,
  faUser,
  faPlus,
  faSearch,
  faTimes,
  faChevronLeft,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const TeacherDetailsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(location.search);
    let myCoachingId = params.get("myCoachingId");
    let userName = params.get("name")
  const [expandedCard, setExpandedCard] = useState(null); // To keep track of the currently expanded card

  // Sample data for cards (replace with actual data from API)
  const cardData = [
    { title: "Personal Info", data: { name: "John Doe", age: 30, email: "john.doe@example.com" } },
    { title: "Institute Info", data: { institute: "ABC Institute", address: "123 Street, City" } },
    { title: "Fee Info", data: { fees: 1000, paymentStatus: "Paid" } },
    { title: "Study Info", data: { subjects: ["Math", "Science"], grades: ["A", "B"] } }
  ];

  const handleExpandCard = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null); // Collapse the card if it's already expanded
    } else {
      setExpandedCard(index); // Expand the clicked card
    }
  };

  const handleSave = (index) => {
    // Implement save functionality for the card at the specified index
    console.log("Save data for card:", index);
  };

  const isFormValid = (formData) => {
    // Implement your form validation logic here
    // For example, check if all required fields are filled
    return Object.values(formData).every(value => value !== '');
  };
  

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
          <div>{userName}</div>
        </div>
        <div className="body">
          {cardData.map((card, index) => (
            <div key={index} className="card-detailsView">
              <div className="card-header" onClick={() => handleExpandCard(index)}>
                <div>{card.title}</div>
                <FontAwesomeIcon icon={expandedCard === index ? faChevronUp : faChevronDown} />
              </div>
              {expandedCard === index && (
                <div className="card-content">
                  {Object.entries(card.data).map(([key, value]) => (
                    <div key={key} className="input-field">
                      <label>{key}</label>
                      <input type="text" value={value} onChange={(e) => { /* Handle input changes */ }}/>
                    </div>
                  ))}
                  <button onClick={() => handleSave(index)} disabled={!isFormValid(card.data)}>
                    Save
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailsView;
