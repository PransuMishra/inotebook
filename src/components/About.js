import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">About iNotebook 📘</h1>

        <p className="about-text">
          <strong>iNotebook</strong> is a secure and powerful cloud-based note
          management application that helps you store your important notes
          safely and access them anytime, anywhere.
        </p>

        <div className="about-features">
          <h3>✨ Features</h3>
          <ul>
            <li>🔐 Secure Login & Authentication</li>
            <li>📝 Create, Edit & Delete Notes</li>
            <li>☁️ Cloud Storage with MongoDB</li>
            <li>⚡ Fast & Responsive UI with React</li>
            <li>📱 Fully Responsive Design</li>
          </ul>
        </div>

        <div className="about-tech">
          <h3>🚀 Technologies Used</h3>
          <div className="tech-badges">
            <span>React</span>
            <span>Node.js</span>
            <span>Express</span>
            <span>MongoDB</span>
            <span>JWT</span>
            <span>Bootstrap</span>
          </div>
        </div>

        <p className="about-author">
          Developed with ❤️ by <strong>Pransu Mishra</strong>
        </p>
      </div>
    </div>
  );
};

export default About;
