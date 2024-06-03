import React, { useState } from "react";
import "../global.css";
import "./signUp.css";
import { useNavigate } from "react-router-dom";
import { registerInstitute } from "./Global";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userTypeParam = params.get("userType");
  const userType = userTypeParam ? userTypeParam.split("?")[0] : null;
  const myCoachingId = params.get("myCoachingId");;
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const isStudent = userType === "student";
  const isTeacher = userType === "teacher";
  const isInstitute = userType === "institute";
  //  console.log('userTypeuserTypeuserTypeuserType',myCoachingId);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    std: "",
    medium: "",
    course: "",
    experienceInCourse: "",
    address: "",
  });
  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is 'course' and handle multiple selection
    if (name === 'course') {
        const selectedCourses = Array.from(e.target.selectedOptions, option => option.value);

        setFormData({
            ...formData,
            [name]: selectedCourses,
        });
    } else {
        setFormData({
            ...formData,
            [name]: value,
        });
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    if (
      isStudent &&
      (!formData.name ||
        !formData.email ||
        !formData.phoneNumber ||
        !formData.std ||
        !formData.medium ||
        !formData.course ||
        !formData.address)
    ) {
      isValid = false;
    } else if (
      isTeacher &&
      (!formData.name ||
        !formData.email ||
        !formData.phoneNumber ||
        !formData.course ||
        !formData.experienceInCourse ||
        !formData.address)
    ) {
      isValid = false;
    } else if (
      isInstitute &&
      (!formData.name ||
        !formData.phoneNumber ||
        !formData.email ||
        !formData.address)
    ) {
      isValid = false;
    }

    if (isValid) {
      setLoading(true);
      try {
        console.log("userType", userType, myCoachingId);
        const formDataWithUserType = { ...formData, userType, myCoachingId };
        const response = await registerInstitute(formDataWithUserType);
        setLoading(false);
        alert(
          `Check your email or phone for the user ID and one-time password.`
        );
        setFormValid(true);
        if (!userType === "institute") {
          navigate(`/login?language=english&userType=${userType}`);
        } else {
          window.history.back();
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
        alert(error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleVerifyEmail = () => {
    
    setIsEmailVerified(true);
  };
  const handleSendOtp = async () => {
    // Call API to send OTP to the email
    // For example, you can use a function like sendOtpEmail(formData.email)
    // Make sure to handle the API call and state update accordingly
    setOtpSent(true);
  };

  return (
    <div className="myWrapper">
      <div className="myPadding-all">
        <div className="header">
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
          {isStudent
            ? "Student Registration"
            : isTeacher
            ? "Teacher Registration"
            : "Register Myself"}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="body">
            {isStudent && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter student name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                

                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                <input
                  type="text"
                  name="std"
                  placeholder="Enter std"
                  value={formData.std}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                <select
                  name="medium"
                  value={formData.medium}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                >
                  <option value="">Select medium</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  multiple
                  className="myInput-field"
                >
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                </select>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email ID"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                {!isEmailVerified && (
                  <>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    onClick={handleVerifyEmail}
                    className="verify-icon"
                  />
                  <span className='verify-text'>Verify</span>
                  </>
                  )}
              </>
            )}
            {isTeacher && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter teacher name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email ID"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                {!isEmailVerified && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    onClick={handleVerifyEmail}
                    className="verify-icon"
                  />
                )}

                <input
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                <input
                  type="text"
                  name="course"
                  placeholder="Enter course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                <input
                  type="text"
                  name="experienceInCourse"
                  placeholder="Enter experience in course"
                  value={formData.experienceInCourse}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
              </>
            )}
            {!isStudent && !isTeacher && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter institute name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email ID"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                {!isEmailVerified && (
                  <>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    onClick={handleVerifyEmail}
                    className="verify-icon"
                  />
                  <span className='verify-text'>Verify</span>
                  </>
                  )}
              </>
            )}
            {loading && (
              <div className='loader-overlay'>
            <div className='loader'></div>
            </div>
            )}
            <button type="submit" disabled={!isEmailVerified}>
              Save
            </button>
          </div>
          <div className="footer"></div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
