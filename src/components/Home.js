import React from "react";
import Notes from "./Notes";
import "./Home.css";

const Home = (props) => {
  const { showAlert } = props;

  return (
    <div className="home-page">
      <div className="home-overlay"></div>

      <div className="home-content">
        <div className="home-header">
          <h1>
            Welcome to <span>iNotebook</span> ✨
          </h1>
          <p>Your personal cloud notebook — secure, fast & always with you.</p>
        </div>

        <div className="home-notes-card">
          <Notes showAlert={showAlert} />
        </div>
      </div>
    </div>
  );
};

export default Home;
