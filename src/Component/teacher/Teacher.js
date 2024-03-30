import React, { useState,useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import "./teacher.css";
import { userList as teacherListApi } from ".././Global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChalkboardTeacher,
  faUser,
  faPlus,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Teacher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("/teacher");
  const params = new URLSearchParams(location.search);
  let myCoachingId = params.get("myCoachingId");
  const userType = params.get("userType");
  const userCategory = params.get("userCategory");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef(null);
  const [teachers, setTeachers] = useState([]);

  const handleNavigation = (path) => {
    const currentPath = window.location.pathname;
    const newPath = `${path}?myCoachingId=${myCoachingId}`;
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
    const filteredTeachers = teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTeachers(filteredTeachers);
  };

   
  useEffect(() => {
    if (searchQuery === "") {
      
      fetchData();
    } else {

      const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTeachers(filteredTeachers);
    }
  }, [searchQuery]);

  const fetchData = async () => {
    const userData = {
      coachingId: myCoachingId,
      userCategory: userCategory ? userCategory : "teacher",
      userType: userType ? userType : "institute",
    };
    setLoading(true);
    try {
      const response = await teacherListApi(userData);
      // console.log("response", response);
      setTeachers(response.users);
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
        <div className="header">Teacher's
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
        {teachers.map((teacher, index) => (
            <div
              key={index}
              className={"listView-card"}
              onClick={() => handleNavigation(`/teacher/${index}`)}
            >
              <div className="name">
                {teacher.name
                  ? teacher.name.length > 20
                    ? teacher.name.slice(0, 20) + "..."
                    : teacher.name
                  : ""}
              </div>
              <div className="status">{teacher.user_status}</div>
              <div className="address">
                {teacher.address
                  ? teacher.address.length > 20
                    ? teacher.address.slice(0, 20) + "..."
                    : teacher.address
                  : ""}
              </div>
              <div className="fee-status">{teacher.phone_no}</div>
              <div className="subject">{teacher.course}</div>
            </div>
          ))}
          <div
            className="plushIcon"
            onClick={() => handleNavigation(`/SignUp?userType=teacher`)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <div className="mainFooter">
          <FontAwesomeIcon
            icon={faHome}
            className={selectedIcon === "/controlPanel" ? "selected" : ""}
            onClick={() => handleNavigation("/controlPanel")}
          />
          <FontAwesomeIcon
            icon={faUsers}
            className={selectedIcon === "/student" ? "selected" : ""}
            onClick={() => handleNavigation("/student")}
          />
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            className={selectedIcon === "/teacher" ? "selected" : ""}
            onClick={() => handleNavigation("/teacher")}
          />
          <FontAwesomeIcon
            icon={faUser}
            className={selectedIcon === "/profile" ? "selected" : ""}
            onClick={() => handleNavigation("/profile")}
          />
        </div>
      </div>
    </div>
  );
};

export default Teacher;
