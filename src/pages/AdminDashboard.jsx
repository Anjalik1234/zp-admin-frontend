import { useState } from "react";
import AddStudent from "./AddStudent";
import ManageTeachers from "./ManageTeachers";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

import schoolLogo from "../assets/zp-logo.png";
import AdminContributions from "./AdminContributions";
import AdminQRUpdate from "./AdminQRUpdate";
import AdminQuiz from "./AdminQuiz";

function AdminDashboard() {

  const [activeSection, setActiveSection] = useState("students");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => { 

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div className="admin-page">

      {/* Header */}

      <div className="admin-header">

        <div className="school-header">

          <img
            src={schoolLogo}
            alt="school logo"
            className="school-logo"
          />

          <h1 className="school-name">
            जिल्हा परिषद प्राथमिक शाळा, साजूर
          </h1>

        </div>

      </div>


      {/* Navbar */}

      <div className="admin-navbar">

        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>

          <button
            className={activeSection === "students" ? "active-nav" : ""}
            onClick={() => setActiveSection("students")}
          >
            Add Students
          </button>

          <button
            className={activeSection === "teachers" ? "active-nav" : ""}
            onClick={() => setActiveSection("teachers")}
          >
            Teachers
          </button>

          <button
            className={activeSection === "contributions" ? "active-nav" : ""}
            onClick={() => setActiveSection("contributions")}
          >
            Contributions
          </button>

          <button
            className={activeSection === "qr" ? "active-nav" : ""}
            onClick={() => setActiveSection("qr")}
          >
            QR
          </button>

          <button
            className={activeSection === "quiz" ? "active-nav" : ""}
            onClick={() => setActiveSection("quiz")}
          >
            Quizzes
          </button>

          <button onClick={handleLogout}>
            Log Out
          </button>

        </div>

      </div>


      {/* Content */}

      <div className="admin-content">

        {activeSection === "students" && <AddStudent />}

        {activeSection === "teachers" && <ManageTeachers />}

        {activeSection === "contributions" && <AdminContributions />}

        {activeSection === "qr" && <AdminQRUpdate />}

        {activeSection === "quiz" && <AdminQuiz />}

      </div>

    </div>

  );
}

export default AdminDashboard;