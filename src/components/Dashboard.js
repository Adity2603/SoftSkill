import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaMicrophoneAlt, FaVolumeUp, FaClipboardCheck, FaChartBar } from 'react-icons/fa';

function Dashboard() {
  return (
    <div style={{ 
      backgroundImage: 'url("https://source.unsplash.com/random/1920x1080")', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      padding: '20px',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '1200px', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '40px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)' }}>
        <h1 style={{ marginBottom: '30px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '36px' }}> DASHBOARD</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ width: '18rem', padding: '20px', borderRadius: '10px', backgroundColor: '#007BFF', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', color: '#fff', transition: 'transform 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <FaBook style={{ fontSize: '28px', color: '#fff' }} />
              <h2 style={{ marginLeft: '10px' }}>Vocabulary Lesson</h2>
            </div>
            <p style={{ fontSize: '16px' }}>Enhance your vocabulary with interactive lessons and quizzes designed to improve your learning.</p>
            <Link to="/vocabulary-lessons">
              <button style={{ padding: '10px', backgroundColor: '#0056b3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', marginTop: '10px' }}>Go to Vocabulary</button>
            </Link>
          </div>

          <div style={{ width: '18rem', padding: '20px', borderRadius: '10px', backgroundColor: '#28A745', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', color: '#fff', transition: 'transform 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <FaMicrophoneAlt style={{ fontSize: '28px', color: '#fff' }} />
              <h2 style={{ marginLeft: '10px' }}>Speech Lessons</h2>
            </div>
            <p style={{ fontSize: '16px' }}>Practice and enhance your speech with guided exercises tailored to your learning needs.</p>
            <Link to="/speech-lessons">
              <button style={{ padding: '10px', backgroundColor: '#218838', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', marginTop: '10px' }}>Go to Speech</button>
            </Link>
          </div>

          <div style={{ width: '18rem', padding: '20px', borderRadius: '10px', backgroundColor: '#FFC107', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', color: '#333', transition: 'transform 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <FaVolumeUp style={{ fontSize: '28px', color: '#333' }} />
              <h2 style={{ marginLeft: '10px' }}>Pronunciation Lessons</h2>
            </div>
            <p style={{ fontSize: '16px' }}>Master pronunciation with audio-based lessons that enhance your speaking skills.</p>
            <Link to="/pronunciation-lessons">
              <button style={{ padding: '10px', backgroundColor: '#e0a800', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', marginTop: '10px' }}>Go to Pronunciation</button>
            </Link>
          </div>

          <div style={{ width: '18rem', padding: '20px', borderRadius: '10px', backgroundColor: '#17A2B8', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', color: '#fff', transition: 'transform 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <FaClipboardCheck style={{ fontSize: '28px', color: '#fff' }} />
              <h2 style={{ marginLeft: '10px' }}>Practice Tests</h2>
            </div>
            <p style={{ fontSize: '16px' }}>Test your skills with interactive practice tests to track your progress.</p>
            <Link to="/practice-tests">
              <button style={{ padding: '10px', backgroundColor: '#138496', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', marginTop: '10px' }}>Go to Practice Tests</button>
            </Link>
          </div>

          <div style={{ width: '18rem', padding: '20px', borderRadius: '10px', backgroundColor: '#6C757D', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', color: '#fff', transition: 'transform 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <FaChartBar style={{ fontSize: '28px', color: '#fff' }} />
              <h2 style={{ marginLeft: '10px' }}>Test Reports</h2>
            </div>
            <p style={{ fontSize: '16px' }}>View detailed reports and analytics to track your performance progress.</p>
            <Link to="/test-reports">
              <button style={{ padding: '10px', backgroundColor: '#5a5c5d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', marginTop: '10px' }}>View Test Reports</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

