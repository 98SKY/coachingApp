import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import { userList as userListApi } from ".././Global";
import "./student.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChalkboardTeacher,
  faUser,
  faPlus,
  faSearch,
  faTimes,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Student = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState("/student");
  const params = new URLSearchParams(location.search);
  let myCoachingId = params.get("myCoachingId");
  const userType = params.get("userType");
  const userCategory = params.get("userCategory");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef(null);
  const [students, setStudents] = useState([]);

  const handleNavigation = (path) => {
    let currentPath = window.location.pathname;
    let newPath = `${path}&myCoachingId=${myCoachingId}`;
    if (currentPath === path || currentPath === newPath) {
      return;
    }
    setSelectedIcon(path);
    navigate(newPath);
  };


  const handleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  if (isSearchVisible && searchQuery === "") {
    fetchData(); 
  } else {
    applyFilter(); 
  }
  };

  const handleClose = () => {
    setSearchQuery(""); 
    setIsSearchVisible(false); 
  };
  
  
  const applyFilter = () => {
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setStudents(filteredStudents);
  };
  
  
  
  
  useEffect(() => {
    if (searchQuery === "") {
      
      fetchData();
    } else {

      const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setStudents(filteredStudents);
    }
  }, [searchQuery]);
  
  
  

  const fetchData = async () => {
    const userData = {
      coachingId: myCoachingId,
      userCategory: userCategory ? userCategory : "student",
      userType: userType ? userType : "institute",
    };
    setLoading(true);
    try {
      const response = await userListApi(userData);
      // console.log("response", response);
      setStudents(response.users);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user list:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  



  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">
        <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
          Student's
          <div className="searchIcon" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
          {isSearchVisible && (
            <div className="search-input">
              <input
                type="text"
                placeholder="Search by name or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                ref={searchRef}
              />
              <div
                className="close-icon"
                onClick={handleClose}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          )}
        </div>
        <div className="body">
          {students.map((student, index) => (
            <div
              key={index}
              className={"listView-card"}
              onClick={() => handleNavigation(`/studentDetails?${index}&uuid=${student.uuid}&name=${student.name}`)}
            >
              <div className="name">
                {student.name
                  ? student.name.length > 20
                    ? student.name.slice(0, 20) + "..."
                    : student.name
                  : ""}
              </div>
              <div className="status">{student.user_status}</div>
              <div className="address">
                {student.address
                  ? student.address.length > 20
                    ? student.address.slice(0, 20) + "..."
                    : student.address
                  : ""}
              </div>
              <div className="fee-status">{student.medium}</div>
              <div className="subject">{student.course}</div>
            </div>
          ))}

          <div
            className="plushIcon"
            onClick={() => handleNavigation(`/SignUp?userType=student`)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
          {loading && (
              <div className='loader-overlay'>
            <div className='loader'></div>
            </div>
            )}
        </div>
        <div className="mainFooter">
          <FontAwesomeIcon
            icon={faHome}
            className={selectedIcon === "/controlPanel" ? "selected" : ""}
            onClick={() => handleNavigation("/controlPanel?")}
          />
          <FontAwesomeIcon
            icon={faUsers}
            className={selectedIcon === "/student" ? "selected" : ""}
            onClick={() => handleNavigation("/student")}
          />
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            className={selectedIcon === "/teacher" ? "selected" : ""}
            onClick={() => handleNavigation("/teacher?")}
          />
          <FontAwesomeIcon
            icon={faUser}
            className={selectedIcon === "/profile" ? "selected" : ""}
            onClick={() => handleNavigation("/profile?")}
          />
        </div>
      </div>
    </div>
  );
};

export default Student;
