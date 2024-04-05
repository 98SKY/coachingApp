import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import "./studentDetailsView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import {userDetails as myDetailsApi} from ".././Global";

const StudentDetailsView = () => {
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
  const [studentData, setStudentDetails] = useState([]);


  const cardData = [
    { title: "Personal Info", data: { name: studentData.student_name, age: 30, email: studentData.email,address: studentData.address, EnterDate: studentData.enterdate, gender:studentData.gender, Mobile:studentData.phone_no} },
    { title: "Institute Info", data: { institute: studentData.institute_name, address: studentData.institute_address, userName:studentData.username, Status:studentData.user_status, userType:studentData.role_type} },
    { title: "Fee Info", data: { fees: studentData.amount, paymentStatus: studentData.description } },
    { title: "Study Info", data: { subjects:studentData.course, } }
  ];

  const handleExpandCard = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null); 
    } else {
      setExpandedCard(index); 
    }
  };

  const handleSave = (index) => {
    
    console.log("Save data for card:", index);
  };

  const isFormValid = (formData) => {
 
    return Object.values(formData).every(value => value !== '');
  };

  useEffect(() =>{
    fetchData();
  },[]);

  const fetchData = async () =>{
    const userData = {
        instituteID : myCoachingId,
        userCategory: userCategory ? userCategory : "student",
        userType: userType ? userType : "institute",
        userId: uuid,
    };
    setLoading(true);
    try {
        const response = await myDetailsApi(userData);
        // console.log('dddddd',response.userData[0]);
        setStudentDetails(response.userData[0]);
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
}

export default StudentDetailsView
