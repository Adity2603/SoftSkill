import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Vocabluary from "./components/Vocabluary"
import Test from "./components/Test" // Import the Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vocabluary" element={<Vocabluary />} /> 
        <Route path="/test" element={<Test />} />{/* Add the Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
