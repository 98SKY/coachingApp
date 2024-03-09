import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../global.css";
import "./decide.css";

const Decide = () => {
    const [selectedChip, setSelectedChip] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isForwardDisabled, setIsForwardDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChipClick = (chip) => {
        setSelectedChip(chip);
        setIsForwardDisabled(selectedLanguage === '' || chip === null);
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
        setIsForwardDisabled(selectedChip === null || event.target.value === '');
    };

    const handleForwardButtonClick = () => {
        if (selectedLanguage === '' || selectedChip === null) {
            setErrorMessage('Please select a language and a user type');
        } else {
            setErrorMessage('');
            navigate(`/login?language=${selectedLanguage}&userType=${selectedChip}`);
        }
    };
    

    const languageOptions = {
        '': 'Select Language',
        'english': 'English',
        'spanish': 'Spanish'
    };

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        // Navigate to the dashboard if user is already authenticated
        navigate('/login');
      }
    }, []);



  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">Welcome</div>
        <div className="myBody">
          <div className="container">
            <select value={selectedLanguage} onChange={handleLanguageChange}>
              {Object.keys(languageOptions).map((key) => (
                <option key={key} value={key}>
                  {languageOptions[key]}
                </option>
              ))}
            </select>

            <div className="chips">
              <button
                className={selectedChip === "institute" ? "selected" : ""}
                onClick={() => handleChipClick("institute")}
              >
                Institute
              </button>
              <button
                className={selectedChip === "student" ? "selected" : ""}
                onClick={() => handleChipClick("student")}
              >
                Student
              </button>
            </div>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <button
              onClick={handleForwardButtonClick}
              className={isForwardDisabled ? 'disabledButton' : 'enabledButton'}
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
