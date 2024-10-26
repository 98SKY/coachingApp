import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import { userList as userListApi } from ".././Global";
// import "./student.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChalkboardTeacher,
  faUser,
  faPlus,
  faSearch,
  faTimes,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import {InternalRoutes} from '../../route/InstituteRoute';

const Student = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState(InternalRoutes.INSTITUTE.STUDENT);
  const params = new URLSearchParams(location.search);
  const myCoachingId = params.get("myCoachingId");
  const userType = params.get("userType");
  const userCategory = params.get("userCategory");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef(null);
  const [students, setStudents] = useState([]);
  const [showPlusIcon, setShowPlusIcon] = useState(true);
  const [currentCourseIndex, setCurrentCourseIndex] = useState({});

  const handleNavigation = (path) => {
    let currentPath = window.location.pathname;
    let newPath = `${path}?&myCoachingId=${myCoachingId}&userType=${userType}`;
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
      applyFilter();
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const bodyScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setShowPlusIcon(bodyScrollTop <= 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const intervals = [];
    students.forEach((student) => {
      if (student.courses && student.courses.length > 1) {
        const intervalId = setInterval(() => {
          setCurrentCourseIndex((prevIndex) => ({
            ...prevIndex,
            [student.uuid]: (prevIndex[student.uuid] || 0) + 1,
          }));
        }, 3000);
        intervals.push(intervalId);
      }
    });
    return () => intervals.forEach((intervalId) => clearInterval(intervalId));
  }, [students]);

  const fetchData = async () => {
    const userData = {
      coachingId: myCoachingId,
      userCategory: userCategory || "student",
      userType: userType || "institute",
    };
    setLoading(true);
    try {
      const response = await userListApi(userData);
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
              <div className="close-icon" onClick={handleClose}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          )}
        </div>
        <div className="body">
          {students.map((student, index) => {
            const courses = student.courses || [];
            const currentIndex = currentCourseIndex[student.uuid] || 0;

            return (
              <div
                key={index}
                className="listView-card"
                onClick={() =>
                  handleNavigation(
                    `${InternalRoutes.INSTITUTE.STUDENT_DETAILS}?${index}&uuid=${student.uuid}&name=${student.name}`
                  )
                }
              >
                <div className="name">
                  {student.name
                    ? student.name.charAt(0).toUpperCase() +
                      student.name.slice(1, 20) +
                      (student.name.length > 20 ? "..." : "")
                    : ""}
                </div>

                <div
                  className={`status chip ${
                    student.user_status === "Active" ? "green" : "red"
                  }`}
                >
                  {student.user_status}
                </div>
                <div className="address">
                  {student.address
                    ? student.address.length > 20
                      ? student.address.slice(0, 20) + "..."
                      : student.address
                    : ""}
                </div>
                <div className="fee-status-container">
                  <div className="fee-status">{student.medium}</div>
                  <div className="info-box">
                    More information about the medium
                  </div>
                </div>

                <div className="subject">
                  {courses.length > 0 && (
                    <div className="course-container">
                      <span
                        className={`course-item ${
                          currentIndex % 2 === 0
                            ? "course-item-even"
                            : "course-item-odd"
                        }`}
                      >
                        {courses.length === 1
                          ? courses[0].course
                          : courses[currentIndex % courses.length].course}
                      </span>
                      <div className="info-box">
                        More information about{" "}
                        {courses.length === 1
                          ? courses[0].course
                          : courses[currentIndex % courses.length].course}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div
            className="plushIcon"
            style={{ display: isSearchVisible ? "none" : "" }}
            onClick={() => handleNavigation(`${InternalRoutes.SIGN_UP}?userType=${userType}`)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
          {loading && (
            <div className="loader-overlay">
              <div className="loader"></div>
            </div>
          )}
        </div>
        <div className="mainFooter">
          <div className="icon">
            <FontAwesomeIcon
              icon={faHome}
              className={
                selectedIcon === InternalRoutes.INSTITUTE.CONTROL_PANEL ? "selected" : ""
              }
              onClick={() => handleNavigation(InternalRoutes.INSTITUTE.CONTROL_PANEL)}
            />
            <span className="label">Home</span>
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faUsers}
              className={
                selectedIcon === InternalRoutes.INSTITUTE.STUDENT ? "selected" : ""
              }
              onClick={() => handleNavigation(InternalRoutes.INSTITUTE.STUDENT)}
            />
            <span className="label">Students</span>
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              className={
                selectedIcon === InternalRoutes.INSTITUTE.TEACHER ? "selected" : ""
              }
              onClick={() => handleNavigation(InternalRoutes.INSTITUTE.TEACHER)}
            />
            <span className="label">Teachers</span>
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faUser}
              className={selectedIcon === InternalRoutes.PROFILE ? "selected" : ""}
              onClick={() => handleNavigation(InternalRoutes.PROFILE)}
            />
            <span className="label">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
