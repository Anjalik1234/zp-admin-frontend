import { useState } from "react";
import AddStudent from "./AddStudent";
import ManageTeachers from "./ManageTeachers";
import "./AdminDashboard.css";

import schoolLogo from "../assets/zp-logo.png";
import AdminContributions from "./AdminContributions";
import AdminQRUpdate from "./AdminQRUpdate";

function AdminDashboard() {

  const [activeSection, setActiveSection] = useState("students");
  const [menuOpen, setMenuOpen] = useState(false);

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

          <button onClick={() => setActiveSection("students")}>
            Add Students
          </button>

          <button onClick={() => setActiveSection("teachers")}>
            Teachers
          </button>

          <button onClick={() => setActiveSection("contributions")}>
            Contributions
          </button>

          <button onClick={() => setActiveSection("qr")}>
            QR
          </button>

        </div>

      </div>


      {/* Content */}

      <div className="admin-content">

        {activeSection === "students" && <AddStudent />}

        {activeSection === "teachers" && <ManageTeachers />}

        {activeSection === "contributions" && <AdminContributions />}

        {activeSection === "qr" && <AdminQRUpdate />}

      </div>

    </div>

  );
}

export default AdminDashboard;