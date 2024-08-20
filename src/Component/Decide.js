import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../global.css";
import "./decide.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { instituteName as instituteNameApi } from "./Global";

const Decide = () => {
  const [selectedChip, setSelectedChip] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [institutes, setInstitutes] = useState([]);
  const [isForwardDisabled, setIsForwardDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isInstitutesFetched, setIsInstitutesFetched] = useState(false);
  const navigate = useNavigate();

  const handleChipClick = (chip) => {
    setSelectedChip(chip);
    if (chip === "user") {
      setSelectedUserType("");
    }
    setIsForwardDisabled(selectedLanguage === "" || chip === null);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setIsForwardDisabled(selectedChip === null || event.target.value === "");
  };

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
    setIsForwardDisabled(
      selectedLanguage === "" ||
        selectedChip === null ||
        event.target.value === ""
    );
  };

  const handleInstituteChange = (event) => {
    setSelectedInstitute(event.target.value);
    setIsForwardDisabled(
      selectedLanguage === "" ||
        selectedChip === null ||
        selectedUserType === "" ||
        event.target.value === ""
    );
  };

  const handleForwardButtonClick = () => {
    if (
      selectedLanguage === "" ||
      selectedChip === null ||
      (selectedChip === "user" &&
        (selectedUserType === "" || selectedInstitute === ""))
    ) {
      setErrorMessage("Please select a user type, a user category, and an institute name");
      setTimeout(() => {
        setErrorMessage('');
      }, 5000); // Hide the error message after 5 seconds
    }

     else {
      setErrorMessage("");
      navigate(
        `/login?language=${selectedLanguage}&userType=${selectedChip}${
          selectedChip === "user"
            ? `&userCategory=${selectedUserType}&instituteId=${selectedInstitute}`
            : ""
        }`
      );
    }
  };

  const fetchInstitutes = async () => {
    try {
      const response = await instituteNameApi();

      const data = await response?.result;
      console.log(data);
      setInstitutes(data);
      setIsInstitutesFetched(true);
    } catch (error) {
      console.error("Error fetching institutes:", error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Navigate to the dashboard if the user is already authenticated
      navigate("/login");
    }

    if (!isInstitutesFetched) {
      fetchInstitutes();
    }
  }, [isInstitutesFetched]);

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">Welcome</div>
        <div className="myBody">
          <div className="container">
            <select value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="">Select Language</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
            </select>
            <div className="chips">
              <button
                className={selectedChip === "institute" ? "selected" : ""}
                onClick={() => handleChipClick("institute")}
              >
                Institute
              </button>
              <button
                className={selectedChip === "user" ? "selected" : ""}
                onClick={() => handleChipClick("user")}
              >
                User
              </button>
            </div>
            <div className="dropDown">
              {selectedChip === "user" && (
                <>
                  <select
                    value={selectedUserType}
                    onChange={handleUserTypeChange}
                  >
                    <option value="">Select User Category</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="accountDepartment">Account Department</option>
                  </select>
                  {selectedUserType && (
                    <select
                      value={selectedInstitute}
                      onChange={handleInstituteChange}
                    >
                      <option value="">Select Institute</option>
                      {Object.keys(institutes).map((key) => (
                        <option key={key} value={key}>
                          {institutes[key]}
                        </option>
                      ))}
                    </select>
                  )}
                </>
              )}
            </div>
            {errorMessage && (
              <div className={`popup ${errorMessage ? 'show' : ''}`}>
              <span className="popuptext">{errorMessage}</span>
              <button onClick={() => setErrorMessage('')} className="closeButton">
              <i className="fas fa-times fa-2x"></i> 
              </button>
            </div>
          
            )}
            <button
              onClick={handleForwardButtonClick}
              className={isForwardDisabled ? "disabledButton" : "enabledButton"}
              disabled={isForwardDisabled}
            >
              Forward
            </button>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
};

export default Decide;
