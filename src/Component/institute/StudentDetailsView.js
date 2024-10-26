import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import "./studentDetailsView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import  {userDetails}   from "../Api/Institute/instituteApi";

const StudentDetailsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(location.search);
  const myCoachingId = params.get("myCoachingId");
  const userName = params.get("name");
  const userType = params.get("userType");
  const uuid = params.get("uuid");
  const userCategory = params.get("userCategory");
  const [expandedCard, setExpandedCard] = useState(null);
  const [studentData, setStudentDetails] = useState({});
  const [formData, setFormData] = useState({});
  const [initialData, setInitialData] = useState({});

  const cardData = [
    {
      title: "Personal Info",
      data: {
        Name: formData.name,
        Age: formData.age,
        Email: formData.email,
        Address: formData.address,
        EnterDate: formData.EnterDate,
        Gender: formData.gender,
        Mobile: formData.Mobile,
      },
    },
    {
      title: "Institute Info",
      data: {
        Institute: formData.institute,
        Address: formData.institute_address,
        UserName: formData.userName,
        Status: formData.Status,
        UserType: formData.userType,
      },
    },
    {
      title: "Fee Info",
      data: { Fees: formData.fees, PaymentStatus: formData.paymentStatus },
    },
    {
      title: "Courses",
      data: studentData.courses || [],
    },
  ];

  const handleExpandCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
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

      const response = await userDetails({
        uuid,
        myCoachingId,
        cardName: cardData[index].title,
        changedData,
      });
      console.log("Saved data:", response.data);
      setInitialData(formData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const fetchData = async () => {
    const userData = {
      instituteID: myCoachingId,
      userCategory: userCategory ? userCategory : "student",
      userType: userType ? userType : "institute",
      userId: uuid,
    };
    setLoading(true);
    try {
      const response = await userDetails(userData);
      const studentDetails = response.userData[0];
      setStudentDetails(studentDetails);
      setFormData({
        name: studentDetails.personalInfo.name || "",
        age: studentDetails.personalInfo.dob || "",
        email: studentDetails.personalInfo.email || "",
        address: studentDetails.personalInfo.address || "",
        EnterDate: studentDetails.personalInfo.entered_date || "",
        gender: studentDetails.personalInfo.gender || "",
        Mobile: studentDetails.personalInfo.phone_no || "",
        institute: studentDetails.instituteInfo.institute_name || "",
        institute_address: studentDetails.instituteInfo.institute_address || "",
        userName: studentDetails.instituteInfo.institute_userName || "",
        Status: studentDetails.personalInfo.user_status || "",
        userType: studentDetails.instituteInfo.role_type || "",
        fees: studentDetails.feeInfo.amount || "",
        paymentStatus: studentDetails.feeInfo.description || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
          <div>{userName?.charAt(0).toUpperCase() + userName.slice(1)}</div>
        </div>
        <div className="body">
          {cardData.map((card, index) => (
            <div key={index} className="card-detailsView">
              <div
                className="card-header"
                onClick={() => handleExpandCard(index)}
              >
                <div>{card.title}</div>
                <FontAwesomeIcon
                  icon={expandedCard === index ? faChevronUp : faChevronDown}
                />
              </div>
              {expandedCard === index && (
                <div className="card-content">
                  {card.title !== "Courses"
                    ? Object.entries(card.data).map(([key, value]) => (
                        <div key={key} className="input-field">
                          <input
                            type="text"
                            placeholder=" "
                            value={value || ""}
                            onChange={(e) =>
                              handleInputChange(key, e.target.value)
                            }
                          />
                          <label>{key}</label>
                        </div>
                      ))
                    : card.data.map((course, courseIndex) => (
                        <div key={courseIndex} className="course-details">
                          {[
                            "course_name",
                            "course_status",
                            "course_enrolled_date",
                          ].map((field, idx) => (
                            <div key={idx} className="input-field">
                              <input
                                type="text"
                                placeholder=" "
                                value={course[field] || ""}
                                onChange={(e) => {
                                  const newCourses = [...studentData.courses];
                                  newCourses[courseIndex][field] =
                                    e.target.value;
                                  setStudentDetails({
                                    ...studentData,
                                    courses: newCourses,
                                  });
                                }}
                              />
                              <label>{field.replace("_", " ")}</label>
                            </div>
                          ))}
                        </div>
                      ))}
                  <button onClick={() => handleSave(index)}>Save</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsView;
