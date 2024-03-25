import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import "./student.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChalkboardTeacher,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Student = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState("/student");
  const params = new URLSearchParams(location.search);
  let myCoachingId = params.get("myCoachingId");
  const userType = params.get("userType");
  const userCategory = params.get("userCategory");

  const handleNavigation = (path) => {
    const currentPath = window.location.pathname;
    const newPath = `${path}?myCoachingId=${myCoachingId}&userType=${userType}&userCategory=${userCategory}`;
    if (currentPath === path || currentPath === newPath) {
      return;
    }
    setSelectedIcon(path);
    navigate(newPath);
  };

  // Sample student data
  const students = [
    {
      name: "John Doe",
      status: "Active",
      feeStatus: "Paid",
      subject: "Maths",
      address: "sdvxcvcvdfdfdfdfvfghhfgbcvcbfgb",
    },
    {
      name: "Jane Doe",
      status: "Inactive",
      feeStatus: "Pending",
      subject: "Science",
      address: "cdcd",
    },
    {
      name: "John Doe",
      status: "Active",
      feeStatus: "Paid",
      subject: "Maths",
      address: "sdvxcvcv",
    },
    {
      name: "Jane Doe",
      status: "Inactive",
      feeStatus: "Pending",
      subject: "Science",
      address: "cdcd",
    },
    {
      name: "John Doe",
      status: "Active",
      feeStatus: "Paid",
      subject: "Maths",
      address: "sdvxcvcv",
    },
    {
      name: "Jane Doe",
      status: "Inactive",
      feeStatus: "Pending",
      subject: "Science",
      address: "cdcd",
    },
    {
      name: "John Doe",
      status: "Active",
      feeStatus: "Paid",
      subject: "Maths",
      address: "sdvxcvcv",
    },
    {
      name: "Jane Doe",
      status: "Inactive",
      feeStatus: "Pending",
      subject: "Science",
      address: "cdcd",
    },
    {
      name: "John Doe",
      status: "Active",
      feeStatus: "Paid",
      subject: "Maths",
      address: "sdvxcvcv",
    },
    {
      name: "Jane Doe kumarssdfddfnjsdfnsfsdfbvxcjnvvdfvipuvdfsvsvjs[nv",
      status: "Inactive",
      feeStatus: "Pending",
      subject: "Science",
      address: "cdcd",
    },
    {
      name: "John Doe",
      status: "Active",
      feeStatus: "Paid",
      subject: "Maths",
      address: "sdvxcvcv",
    },
    {
      name: "Jane Doe",
      status: "Inactive",
      feeStatus: "Pending",
      subject: "Science",
      address: "cdcd",
    },
    {
      name: "John Doe",
      status: "Active",
      feeStatus: "Paid",
      subject: "Maths",
      address: "sdvxcvcv",
    },
    {
      name: "Jane Doe",
      status: "Inactive",
      feeStatus: "Pending",
      subject: "Science",
      address: "cdcd",
    },
    {
      name: "John Doe",
      status: "Active",
      feeStatus: "Paid",
      subject: "Maths",
      address: "sdvxcvcv",
    },
    {
      name: "Jane Doe",
      status: "Inactive",
      feeStatus: "Pending",
      subject: "Science",
      address: "cdcd",
    },
    
    
  ];

  return (
    <div className="wrapper">
      <div className="padding-all">
        <div className="header">Student's</div>
        <div className="body">
          {students.map((student, index) => (
            <div
              key={index}
              className={"student-card"}
              onClick={() => handleNavigation(`/student/${index}`)}
            >
              <div className="name">{student.name.length > 20 ? student.name.slice(0, 20) + '...' : student.name}</div>
              <div className="status">{student.status}</div>
              <div className="address">{student.address.length > 20 ? student.address.slice(0,20) + '...': student.address}</div>
              <div className="fee-status">{student.feeStatus}</div>
              <div className="subject">{student.subject}</div>
            </div>
          ))}

          <div
            className="plushIcon"
            onClick={() => handleNavigation(`/SignUp?userType=student`)}
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

export default Student;
