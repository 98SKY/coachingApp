import React, { useState, useEffect } from "react";
import "./studentCourse.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import {
  faHome,
  faUser,
  faBookOpen,
  faClipboardCheck,
  faChartLine,
  faSadTear,
} from "@fortawesome/free-solid-svg-icons";
import { StudentInternalRoutes } from "../../route/StudentRoute";

const StudentCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState(
    StudentInternalRoutes.STUDENT.COURSE
  );
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("All");
  const [expandedCourses, setExpandedCourses] = useState({});

  useEffect(() => {
    setCourses([
      {
        id: 1,
        name: "Mathematics",
        description: "An advanced course on algebra, geometry, and calculus.",
        progress: 80,
        instructor: "John Doe",
        resources: [
          { id: 1, title: "Chapter 1: Algebra Basics", link: "#" },
          { id: 2, title: "Video Lecture: Calculus Introduction", link: "#" },
        ],
      },
      {
        id: 2,
        name: "Physics",
        description: "Learn about motion, forces, and energy.",
        progress: 60,
        instructor: "Jane Smith",
        resources: [
          { id: 1, title: "Chapter 2: Newton's Laws", link: "#" },
          { id: 2, title: "Lab: Projectile Motion", link: "#" },
        ],
      },
      {
        id: 3,
        name: "Chemistry",
        description:
          "Study chemical reactions, properties of matter, and lab techniques.",
        progress: 30,
        instructor: "Alice Johnson",
        resources: [
          { id: 1, title: "Chapter 3: Organic Chemistry", link: "#" },
          { id: 2, title: "Lab: Titration", link: "#" },
        ],
      },
    ]);
  }, []);

  const getProgressColor = (progress) => {
    if (progress < 50) return "#e74c3c";
    if (progress < 70) return "#f39c12";
    return "#2ecc71";
  };

  const filteredCourses = courses.filter(
    (course) =>
      filter === "All" ||
      (filter === "Completed" && course.progress === 100) ||
      (filter === "In Progress" && course.progress < 100)
  );

  const toggleExpand = (courseId) => {
    setExpandedCourses((prevState) => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };

  const handleNavigation = (path) => {
    setSelectedIcon(path);
    navigate(path);
  };

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">
          Courses
          <div className="course-filter">
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="All">All</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="body">
          <div className="course-list">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="course-info">
                    <div className="progress-chart">
                      <Doughnut
                        data={{
                          datasets: [
                            {
                              data: [course.progress, 100 - course.progress],
                              backgroundColor: [
                                getProgressColor(course.progress),
                                "#e0e0e0",
                              ],
                            },
                          ],
                        }}
                        options={{
                          cutout: "70%",
                          plugins: {
                            tooltip: { enabled: false },
                            legend: { display: false },
                          },
                        }}
                      />
                    </div>
                    <div className="course-details">
                      <h3>{course.name}</h3>
                      <p>{course.instructor}</p>
                      <button onClick={() => toggleExpand(course.id)}>
                        {expandedCourses[course.id]
                          ? "Less Details"
                          : "More Details"}
                        <FontAwesomeIcon
                          icon={
                            expandedCourses[course.id]
                              ? faChevronUp
                              : faChevronDown
                          }
                        />
                      </button>
                    </div>
                  </div>
                  {expandedCourses[course.id] && (
                    <div className="expanded-section">
                      <p>{course.description}</p>
                      <h4>Resources:</h4>
                      <ul>
                        {course.resources.map((resource) => (
                          <li key={resource.id}>
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {resource.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-courses">
                <FontAwesomeIcon icon={faSadTear} size="3x" />
                <p>
                  {filter === "Completed"
                    ? "No courses completed yet."
                    : "You haven't enrolled in any courses yet. Enroll now!"}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mainFooter">
          <div
            className="icon"
            onClick={() => handleNavigation(StudentInternalRoutes.STUDENT.HOME)}
          >
            <FontAwesomeIcon
              icon={faHome}
              className={
                selectedIcon === StudentInternalRoutes.STUDENT.HOME
                  ? "selected"
                  : ""
              }
            />
            <span className="label">Home</span>
          </div>
          <div
            className="icon"
            onClick={() =>
              handleNavigation(StudentInternalRoutes.STUDENT.COURSE)
            }
          >
            <FontAwesomeIcon
              icon={faBookOpen}
              className={
                selectedIcon === StudentInternalRoutes.STUDENT.COURSE
                  ? "selected"
                  : ""
              }
            />
            <span className="label">Course</span>
          </div>
          <div
            className="icon"
            onClick={() =>
              handleNavigation(StudentInternalRoutes.STUDENT.ASSIGNMENT)
            }
          >
            <FontAwesomeIcon
              icon={faClipboardCheck}
              className={
                selectedIcon === StudentInternalRoutes.STUDENT.ASSIGNMENT
                  ? "selected"
                  : ""
              }
            />
            <span className="label">Assignment</span>
          </div>
          <div
            className="icon"
            onClick={() =>
              handleNavigation(StudentInternalRoutes.STUDENT.ATTENDENCE)
            }
          >
            <FontAwesomeIcon
              icon={faChartLine}
              className={
                selectedIcon === StudentInternalRoutes.STUDENT.ATTENDENCE
                  ? "selected"
                  : ""
              }
            />
            <span className="label">Attendance</span>
          </div>
          <div
            className="icon"
            onClick={() =>
              handleNavigation(StudentInternalRoutes.STUDENT.PROFILE)
            }
          >
            <FontAwesomeIcon
              icon={faUser}
              className={
                selectedIcon === StudentInternalRoutes.STUDENT.PROFILE
                  ? "selected"
                  : ""
              }
            />
            <span className="label">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourse;
