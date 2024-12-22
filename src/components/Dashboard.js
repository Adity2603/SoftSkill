import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaMicrophoneAlt, FaVolumeUp, FaClipboardCheck, FaChartBar } from 'react-icons/fa';
import '/Users/admin/Desktop/Designathon/SoftSkill/softskill/src/css/Dashboardcss.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-header">DASHBOARD</h1>
        <div className="dashboard-cards">
          <div className="dashboard-card card-blue">
            <div className="card-header">
              <FaBook style={{ fontSize: '28px' }} />
              <h2>Vocabulary Lesson</h2>
            </div>
            <p>Enhance your vocabulary with interactive lessons and quizzes designed to improve your learning.</p>
            <Link to="/vocabluary">
              <button className="card-button">Go to Vocabulary</button>
            </Link>
          </div>

          <div className="dashboard-card card-green">
            <div className="card-header">
              <FaMicrophoneAlt style={{ fontSize: '28px' }} />
              <h2>Speech Lessons</h2>
            </div>
            <p>Practice and enhance your speech with guided exercises tailored to your learning needs.</p>
            <Link to="/speech-lessons">
              <button className="card-button">Go to Speech</button>
            </Link>
          </div>

          <div className="dashboard-card card-yellow">
            <div className="card-header">
              <FaVolumeUp style={{ fontSize: '28px' }} />
              <h2>Pronunciation Lessons</h2>
            </div>
            <p>Master pronunciation with audio-based lessons that enhance your speaking skills.</p>
            <Link to="/pronunciation-lessons">
              <button className="card-button">Go to Pronunciation</button>
            </Link>
          </div>

          <div className="dashboard-card card-cyan">
            <div className="card-header">
              <FaClipboardCheck style={{ fontSize: '28px' }} />
              <h2>Practice Tests</h2>
            </div>
            <p>Test your skills with interactive practice tests to track your progress.</p>
            <Link to="/practice-tests">
              <button className="card-button">Go to Practice Tests</button>
            </Link>
          </div>

          <div className="dashboard-card card-gray">
            <div className="card-header">
              <FaChartBar style={{ fontSize: '28px' }} />
              <h2>Test Reports</h2>
            </div>
            <p>View detailed reports and analytics to track your performance progress.</p>
            <Link to="/test-reports">
              <button className="card-button">View Test Reports</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
