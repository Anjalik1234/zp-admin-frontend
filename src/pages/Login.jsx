import { useState } from "react";
import axios from "axios";
import "./Login.css";
import schoolLogo from "../assets/zp-logo.png";
import schoolBg from "../assets/infra.png";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {

    // check empty fields
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";

    } catch (err) {
      setError("Invalid email or password");

    }

  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${schoolBg})` }}
    >

      <div className="login-overlay">

        <div className="login-card">

          <img src={schoolLogo} alt="School Logo" className="login-logo" />

          <h2 className="login-title">
            जिल्हा परिषद प्राथमिक शाळा, साजूर
          </h2>

          <p className="login-subtitle">
            Admin Dashboard Login
          </p>

          {error && <p className="login-error">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className={`login-input ${error ? "input-error" : ""}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <input
            type="password"
            placeholder="Password"
            className={`login-input ${error ? "input-error" : ""}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          <button className="login-button" onClick={handleLogin}>
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;