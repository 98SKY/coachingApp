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
import { userDetails as myDetailsApi } from ".././Global";

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
  const [studentData, setStudentDetails] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
    EnterDate: "",
    gender: "",
    Mobile: "",
    institute: "",
    institute_address: "",
    userName: "",
    Status: "",
    userType: "",
    fees: "",
    paymentStatus: "",
    subjects: ""
  });

  const [initialData, setInitialData] = useState({});

  const cardData = [
    { title: "Personal Info", data: { name: formData.name, age: formData.age, email: formData.email, address: formData.address, EnterDate: formData.EnterDate, gender: formData.gender, Mobile: formData.Mobile } },
    { title: "Institute Info", data: { institute: formData.institute, address: formData.institute_address, userName: formData.userName, Status: formData.Status, userType: formData.userType } },
    { title: "Fee Info", data: { fees: formData.fees, paymentStatus: formData.paymentStatus } },
    { title: "Study Info", data: { subjects: formData.subjects } }
  ];  

  const handleExpandCard = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  const handleSave = async (index) => {
  try {
    const changedData = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (formData[key] !== initialData[key]) {
        changedData[key] = value;
      }
    });

    if (Object.keys(changedData).length === 0) {
      console.log("No changes to save.");
      return;
    }

    const response = await myDetailsApi({
      uuid,
      myCoachingId,
      cardName: cardData[index].title,
      changedData
    });
    console.log("Saved data:", response.data);
    setInitialData(formData);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};


  const isFormValid = (formData) => {
    return Object.values(formData).every(value => value !== '');
  };

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userData = {
      instituteID: myCoachingId,
      userCategory: userCategory ? userCategory : "student",
      userType: userType ? userType : "institute",
      userId: uuid,
    };
    setLoading(true);
    try {
      const response = await myDetailsApi(userData);
      const studentDetails = response.userData[0];
      setStudentDetails(studentDetails);
      setInitialData(studentDetails);
      setFormData({
        name: studentDetails.student_name,
        age: studentDetails.age,
        email: studentDetails.email,
        address: studentDetails.address,
        EnterDate: studentDetails.enterdate,
        gender: studentDetails.gender,
        Mobile: studentDetails.phone_no,
        institute: studentDetails.institute_name,
        institute_address: studentDetails.institute_address,
        userName: studentDetails.username,
        Status: studentDetails.user_status,
        userType: studentDetails.role_type,
        fees: studentDetails.amount,
        paymentStatus: studentDetails.description,
        subjects: studentDetails.course,
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch Data:", error.message);
      alert(error.message);
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
                      <input type="text" value={value} onChange={(e) => handleInputChange(key, e.target.value)} />
                    </div>
                  ))}
                  <button onClick={() => handleSave(index)} disabled={!isFormValid(formData)}>
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

export default StudentDetailsView;
