import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    department: "",
    salary: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/employee/create",
        formData
      );
      if (response.status === 201) {
        toast.success("Employee added successfully!", {
          position: "top-right",
        }); // Success toast
        // Clear the form after successful submission
        setFormData({
          name: "",
          age: "",
          department: "",
          salary: "",
          position: "",
        });

        // Optional: Navigate to Home after a short delay
        setTimeout(() => {
          window.location.href = "/home";
        }, 1500);
      }
    } catch (error) {
      toast.error("Failed to add employee. Please try again."); // Error toast
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Add Employee
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter employee name"
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="age"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter employee age"
            />
          </div>

          {/* Department */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="department"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter department"
            />
          </div>

          {/* Salary */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="salary"
            >
              Salary
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter salary"
            />
          </div>

          {/* Position */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="position"
            >
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter position"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Employee
          </button>
        </form>
      </div>

      {/* Toast container */}
      <Toaster />
    </div>
  );
};

export default AddEmployee;
