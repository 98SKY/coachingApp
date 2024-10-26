import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import "./teacher.css";
import { userList as teacherListApi } from "../Global";
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

const Teacher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(InternalRoutes.INSTITUTE.TEACHER);
  const params = new URLSearchParams(location.search);
  let myCoachingId = params.get("myCoachingId");
  const userType = params.get("userType");
  const userCategory = params.get("userCategory");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef(null);
  const [teachers, setTeachers] = useState([]);
  const [showPlusIcon, setShowPlusIcon] = useState(true);
  const [currentCourseIndex, setCurrentCourseIndex] = useState({});

  const handleNavigation = (path) => {
    const currentPath = window.location.pathname;
    const newPath = `${path}?&myCoachingId=${myCoachingId}&userType=${userType}`;
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

  useEffect(() => {
    const intervals = [];
    teachers.forEach((teacher) => {
      if (teacher.courses && teacher.courses.length > 1) {
        const intervalId = setInterval(() => {
          setCurrentCourseIndex((prevIndex) => ({
            ...prevIndex,
            [teacher.uuid]: (prevIndex[teacher.uuid] || 0) + 1,
          }));
        }, 3000);
        intervals.push(intervalId);
      }
    });
    return () => intervals.forEach((intervalId) => clearInterval(intervalId));
  }, [teachers]);

  const fetchData = async () => {
    const userData = {
      coachingId: myCoachingId,
      userCategory: userCategory ? userCategory : "teacher",
      userType: userType ? userType : "institute",
    };
    setLoading(true);
    try {
      const response = await teacherListApi(userData);
      setTeachers(response.users);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user list:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const bodyScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const visible = bodyScrollTop > 100;
    setShowPlusIcon(!visible);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
          Teacher's
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
        <div className="body" onScroll={handleScroll}>
          {teachers.map((teacher, index) => {
            const courses = teacher.courses || [];
            const currentIndex = currentCourseIndex[teacher.uuid] || 0;

            return (
              <div
                key={index}
                className="listView-card"
                onClick={() =>
                  handleNavigation(
                    `${InternalRoutes.INSTITUTE.TEACHER_DETAILS}?${index}&uuid=${teacher.uuid}&name=${teacher.name}&`
                  )
                }
              >
                <div className="name">
                  {teacher.name
                    ? teacher.name.length > 20
                      ? teacher.name.slice(0, 20) + "..."
                      : teacher.name
                    : ""}
                </div>
                <div
                  className={`status chip ${
                    teacher.user_status === "Active" ? "green" : "red"
                  }`}
                >
                  {teacher.user_status}
                </div>
                <div className="address">
                  {teacher.address
                    ? teacher.address.length > 20
                      ? teacher.address.slice(0, 20) + "..."
                      : teacher.address
                    : ""}
                </div>
                <div className="fee-status">{teacher.phone_no}</div>
                <div className="subject">
                  {courses.length > 0 && (
                    <div
                      className={`course-item ${
                        currentIndex % 2 === 0
                          ? "course-item-even"
                          : "course-item-odd"
                      }`}
                    >
                      {courses.length === 1
                        ? courses[0].course
                        : courses[currentIndex % courses.length].course}
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

export default Teacher;
