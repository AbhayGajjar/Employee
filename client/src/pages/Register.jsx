import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // to handle redirection
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Form state to store inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state to handle submit

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true); // Set loading state to true to disable button

    try {
      // Create form data for multipart/form-data request
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("username", formData.username);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("password", formData.password);

      // Sending the form data to the backend for registration
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false); // Turn off loading state after API call

      // Check if the response is successful
      if (response.status === 201) {
        toast.success("Registration successful!", {
          position: "top-right",
        });

        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (err) {
      setLoading(false);

      toast.error(
        err.response?.data?.message || "Failed to register. Please try again.",
        { position: "top-right" }
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-md p-2 mt-1">
              <FaUserAlt className="text-gray-500 mr-2" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-2 border-none focus:outline-none"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-md p-2 mt-1">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border-none focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-md p-2 mt-1">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border-none focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-indigo-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
      <Toaster /> {/* Toast notification container */}
    </div>
  );
};

export default Register;
