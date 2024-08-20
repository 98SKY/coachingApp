import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import "./teacherDetailsView.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { userDetails as myDetailsApi } from "../Global";

const TeacherDetailsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(location.search);
    let myCoachingId = params.get("myCoachingId");
    let userName = params.get("name");
    const userType = params.get("userType");
    const uuid = params.get("uuid");
    const userCategory = params.get("userCategory");
  const [expandedCard, setExpandedCard] = useState(null);
  const [teacherData, setTeacherDetails] = useState([]);

  const cardData = [
    { title: "Personal Info", data: { name: teacherData.teacher_name, email: teacherData.email,address: teacherData.address, "Enter Date": teacherData.enterdate, gender:teacherData.gender, Mobile:teacherData.phone_no} },
    { title: "Institute Info", data: { institute: teacherData.institute_name, address: teacherData.institute_address, userName:teacherData.username, Status:teacherData.user_status, userType:teacherData.role_type} },
    // { title: "Fee Info", data: { fees: 1000, paymentStatus: "Paid" } },
    // { title: "Study Info", data: { subjects: ["Math", "Science"], grades: ["A", "B"] } }
  ];

  const handleExpandCard = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null); 
    } else {
      setExpandedCard(index); 
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

  useEffect(() =>{
    fetchData();
  },[]);

  const fetchData = async () =>{
    const userData = {
        instituteID : myCoachingId,
        userCategory: userCategory ? userCategory : "teacher",
        userType: userType ? userType : "institute",
        userId: uuid,
    };
    setLoading(true);
    try {
        const response = await myDetailsApi(userData);
        console.log('dddddd',response.userData[0]);
        setTeacherDetails(response.userData[0]);
        setLoading(false);
    } catch (error) {
        console.error("Failed to fetch Data:", error.message);
        alert(error.message);
    }finally{
        setLoading(false);
    }
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
