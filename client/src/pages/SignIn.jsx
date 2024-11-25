import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate after login
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Import React Hot Toast

const SignIn = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // State to handle form data and loading
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state to disable the button during submission

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
    setLoading(true); // Set loading to true when submitting

    try {
      // Send login request to the backend
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        formData
      );

      setLoading(false); // Set loading to false after the response

      // If login is successful
      if (response.status === 200) {
        // Show success toast
        toast.success("Login successful!", {
          position: "top-right",
        });

        // Store the token in local storage (or cookie) for future authentication
        localStorage.setItem("token", response.data.token);

        // Delay navigation for 2 seconds to allow the toast to display
        setTimeout(() => {
          navigate("/home"); // Redirect to the home or dashboard page
        }, 2000);
      }
    } catch (err) {
      setLoading(false); // Set loading to false after the error

      // Show error toast
      toast.error(
        err.response?.data?.message || "An error occurred during login.",
        { position: "top-right" }
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
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

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/" className="text-indigo-600 hover:underline">
            Register
          </a>
        </p>
      </div>
      {/* Toast Container */}
      <Toaster />
    </div>
  );
};

export default SignIn;
