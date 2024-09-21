import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import "./teacherDetailsView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { userDetails as myDetailsApi } from "../Global";

const TeacherDetailsView = () => {
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
  const [teacherData, setTeacherDetails] = useState({
    personalInfo: {},
    instituteInfo: {},
    feeInfo: {},
    studyInfo: {},
    courses: [],
  });
  const [formData, setFormData] = useState({});

  const cardData = [
    {
      title: "Personal Info",
      data: {
        name: formData.name || "",
        email: formData.email || "",
        address: formData.address || "",
        EnterDate: formData.entered_date || "",
        gender: formData.gender || "",
        Mobile: formData.phone_no || "",
        status: formData.user_status || "",
      },
    },
    {
      title: "Institute Info",
      data: {
        institute: formData.institute_name || "",
        address: formData.institute_address || "",
        userName: formData.institute_userName || "",
        Status: formData.user_status || "",
        userType: formData.role_type || "",
      },
    },
    {
      title: "Courses",
      data: teacherData.courses,
    },
    {
      title: "Payment Info",
      data: {
        fees: formData.amount || "",
        paymentStatus: formData.description || "",
      },
    }
  ];

  const handleExpandCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleSave = async (index) => {
    console.log("Save data for card:", index);
  };

  const isFormValid = (formData) => {
    return Object.values(formData).every((value) => value !== "");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userData = {
      instituteID: myCoachingId,
      userCategory: userCategory ? userCategory : "teacher",
      userType: userType ? userType : "institute",
      userId: uuid,
    };
    setLoading(true);
    try {
      const response = await myDetailsApi(userData);
      const teacherDetails = response.userData[0];

      setTeacherDetails(teacherDetails);
      setFormData({
        name: teacherDetails.personalInfo.name || "",
        email: teacherDetails.personalInfo.email || "",
        address: teacherDetails.personalInfo.address || "",
        entered_date: teacherDetails.personalInfo.entered_date || "",
        gender: teacherDetails.personalInfo.gender || "",
        phone_no: teacherDetails.personalInfo.phone_no || "",
        user_status: teacherDetails.personalInfo.user_status || "",
        institute_name: teacherDetails.instituteInfo.institute_name || "",
        institute_address: teacherDetails.instituteInfo.institute_address || "",
        institute_userName: teacherDetails.instituteInfo.institute_userName || "",
        role_type: teacherDetails.instituteInfo.role_type || "",
        amount: teacherDetails.feeInfo.amount || "",
        description: teacherDetails.feeInfo.description || "",
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
                <FontAwesomeIcon
                  icon={expandedCard === index ? faChevronUp : faChevronDown}
                />
              </div>
              {expandedCard === index && (
                <div className="card-content">
                  {/* For non-courses data (e.g., personal details, institute details) */}
                  {card.title !== "Courses" ? (
                    Object.entries(card.data).map(([key, value]) => (
                      <div key={key} className="input-field">
                        <input
                          type="text"
                          value={value || ""}
                          placeholder={key} // Placeholder will be the field name
                          onFocus={(e) => e.target.placeholder = ""}
                          onBlur={(e) => e.target.placeholder = key} // Show placeholder when not focused
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                        />
                      </div>
                    ))
                  ) : (
                    // For course details
                    card.data.map((course, courseIndex) => (
                      <div key={courseIndex} className="course-details">
                        <div className="input-field">
                          <input
                            type="text"
                            value={course.course_name || ""}
                            placeholder="Course Name"
                            onFocus={(e) => e.target.placeholder = ""}
                            onBlur={(e) => e.target.placeholder = "Course Name"}
                            onChange={(e) => {
                              const newCourses = [...teacherData.courses];
                              newCourses[courseIndex].course_name = e.target.value;
                              setTeacherDetails({ ...teacherData, courses: newCourses });
                            }}
                          />
                        </div>
                        <div className="input-field">
                          <input
                            type="text"
                            value={course.course_status || ""}
                            placeholder="Course Status"
                            onFocus={(e) => e.target.placeholder = ""}
                            onBlur={(e) => e.target.placeholder = "Course Status"}
                            onChange={(e) => {
                              const newCourses = [...teacherData.courses];
                              newCourses[courseIndex].course_status = e.target.value;
                              setTeacherDetails({ ...teacherData, courses: newCourses });
                            }}
                          />
                        </div>
                        <div className="input-field">
                          <input
                            type="text"
                            value={course.course_enrolled_date || ""}
                            placeholder="Enrolled Date"
                            onFocus={(e) => e.target.placeholder = ""}
                            onBlur={(e) => e.target.placeholder = "Enrolled Date"}
                            onChange={(e) => {
                              const newCourses = [...teacherData.courses];
                              newCourses[courseIndex].course_enrolled_date = e.target.value;
                              setTeacherDetails({ ...teacherData, courses: newCourses });
                            }}
                          />
                        </div>
                        <div className="input-field">
                          <input
                            type="text"
                            value={course.experience || ""}
                            placeholder="Experience"
                            onFocus={(e) => e.target.placeholder = ""}
                            onBlur={(e) => e.target.placeholder = "Experience"}
                            onChange={(e) => {
                              const newCourses = [...teacherData.courses];
                              newCourses[courseIndex].experience = e.target.value;
                              setTeacherDetails({ ...teacherData, courses: newCourses });
                            }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                  <button
                    onClick={() => handleSave(index)}
                    disabled={card.title !== "Courses" && !isFormValid(card.data)}
                  >
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
