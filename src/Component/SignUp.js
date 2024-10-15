import React, { useState, useEffect } from "react";
import "../global.css";
import "./signUp.css";
import { useNavigate } from "react-router-dom";
import { registerInstitute, courseName } from "./Global";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const params = new URLSearchParams(location.search);
  const userTypeParam = params.get("userType");
  const userType = userTypeParam ? userTypeParam.split("?")[0] : null;
  const myCoachingId = params.get("myCoachingId");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const isStudent = userType === "student";
  const isTeacher = userType === "teacher";
  const isInstitute = userType === "institute";
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    std: "",
    medium: "",
    course: [],
    experienceInCourse: "",
    address: "",
    fee: "",
  });
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (myCoachingId) {
      const getCourses = async () => {
        const coursesData = await fetchCourses(myCoachingId);
        setCourses(coursesData);
      };

      getCourses();
    }
  }, [myCoachingId]);

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const selectedValues = Array.from(
        selectedOptions,
        (option) => option.value
      );
      setFormData({
        ...formData,
        [name]: selectedValues,
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
        formData.course.length === 0 ||
        !formData.address ||
        !formData.fee)
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
        const formDataWithUserType = { ...formData, userType, myCoachingId };
        console.log("formDataWithUserType", formDataWithUserType);
        const response = await registerInstitute(formDataWithUserType);
        setLoading(false);
        alert(
          `Check your email or phone for the user ID and one-time password.`
        );
        setFormValid(true);
        if (userType !== "institute") {
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

  const fetchCourses = async (myCoachingId) => {
    const coachingId = myCoachingId;
    setLoading(true);
    try {
      console.log("coachingIdcoachingId", coachingId);
      const response = await courseName(coachingId);
      if (response.courses == null) {
        const errorData = await response;
        console.error("Response Error:", errorData);
        throw new Error(errorData.error || "Failed to fetch courses");
      }

      const data = await response;
      if (data && data.courses) {
        return data.courses;
      } else {
        throw new Error("Courses not found in response data");
      }
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      return [];
    } finally {
      setLoading(false);
    }
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
                  type="decimal"
                  name="fee"
                  placeholder="Enter fee"
                  value={formData.fee}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                <input
                  type="text"
                  name="std"
                  placeholder="Enter standard (std)"
                  value={formData.std}
                  onChange={handleChange}
                  required
                  className="myInput-field"
                />
                <input
                  type="text"
                  name="medium"
                  placeholder="Enter medium (e.g., English, Hindi)"
                  value={formData.medium}
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
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  multiple
                  className="myInput-field"
                >
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <option
                        key={course.master_course_id}
                        value={course.master_course_id}
                      >
                        {course.master_course_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No courses available</option>
                  )}
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
                    <span className="verify-text">Verify</span>
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
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  multiple
                  className="myInput-field"
                >
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <option
                        key={course.master_course_id}
                        value={course.master_course_id}
                      >
                        {course.master_course_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No courses available</option>
                  )}
                </select>
                <input
                  type="text"
                  name="experienceInCourse"
                  placeholder="Enter experience in course"
                  value={formData.experienceInCourse}
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
                  placeholder="Enter address"
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
                    <span className="verify-text">Verify</span>
                  </>
                )}
              </>
            )}
            {loading && (
              <div className="loader-overlay">
                <div className="loader"></div>
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
