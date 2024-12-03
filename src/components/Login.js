import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); // Correctly initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for login validation (mock example)
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "test@example.com" && password === "password123") {
      // Navigate to Dashboard on successful login
      navigate("/dashboard");
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Section: Full-Height Image and Title */}
      <div className="flex-1 relative">
        <img
          src="https://img.freepik.com/free-vector/web-design-concept-with-flat-design_23-2147851409.jpg"
          alt="Soft Skill Enhancement"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section: Login Form */}
      <div className="flex-1 flex justify-center items-center p-8 bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Forgot Password */}
            <div className="mb-4 text-right">
              <a href="/" className="text-blue-500 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>

          {/* Register Button */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
