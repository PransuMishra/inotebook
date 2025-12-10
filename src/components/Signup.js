import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;
    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-page">
      <div className="signup-overlay"></div>

      <div className="signup-card">
        <div className="signup-header">
          <h2>
            Create your <span>iNotebook</span> account ✍️
          </h2>
          <p>Sign up and start storing your notes securely in the cloud.</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control signup-input"
              id="name"
              name="name"
              onChange={onChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control signup-input"
              id="email"
              name="email"
              onChange={onChange}
              autoComplete="email"
              required
            />
            <div id="emailHelp" className="form-text signup-help">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control signup-input"
              id="password"
              name="password"
              onChange={onChange}
              minLength={5}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control signup-input"
              id="cpassword"
              name="cpassword"
              onChange={onChange}
              minLength={5}
              autoComplete="new-password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary signup-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
