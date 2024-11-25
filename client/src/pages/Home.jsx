import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster
import { Link } from "react-router-dom";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null); // State to store the employee to edit
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    department: "",
    salary: "",
    position: "",
  });

  // Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/employee/all"
        );
        const data = await response.json();
        if (data.employees) {
          setEmployees(data.employees);
        } else {
          setError("Failed to load employees");
        }
      } catch (err) {
        setError("Failed to fetch employees");
      }
    };

    fetchEmployees();
  }, []);

  // Handle the change in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Edit Button Click
  const handleEdit = (employee) => {
    setEditEmployee(employee); // Set the employee to edit
    setFormData({
      name: employee.name,
      age: employee.age,
      department: employee.department,
      salary: employee.salary,
      position: employee.position,
    });
  };

  // Submit the edited employee data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:4000/api/v1/employee/update/${editEmployee._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (data.message === "Employee updated successfully") {
      setEmployees(
        employees.map((emp) =>
          emp._id === editEmployee._id ? { ...emp, ...formData } : emp
        )
      );
      setEditEmployee(null); // Close the form
      toast.success("Employee updated successfully!", {
        position: "top-right",
      }); // Show success toast
    } else {
      setError("Failed to update employee");
      toast.error("Failed to update employee", {
        position: "top-right",
      }); // Show error toast
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const response = await fetch(
      `http://localhost:4000/api/v1/employee/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.message === "Employee deleted successfully") {
      setEmployees(employees.filter((employee) => employee._id !== id));
      toast.success("Employee deleted successfully!", {
        position: "top-right",
      }); // Show success toast
    } else {
      setError("Failed to delete employee");
      toast.error("Failed to delete employee", {
        position: "top-right",
      }); // Show error toast
    }
  };

  // Handle Add Employee Button Click

  return (
    <div className="p-6 relative pt-24 ">
      {/* Edit Form */}
      {editEmployee && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-6 ">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Edit Employee
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700"
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-md"
            >
              Update Employee
            </button>
          </form>
        </div>
      )}
      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="">
            <tr className="bg-indigo-600 text-white text-left rounded-r-xl">
              <th className="p-4">Name</th>
              <th className="p-4">Age</th>
              <th className="p-4">Department</th>
              <th className="p-4">Salary</th>
              <th className="p-4">Position</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee._id} className="border-b hover:bg-gray-100 ">
                  <td className="p-4">{employee.name}</td>
                  <td className="p-4">{employee.age}</td>
                  <td className="p-4">{employee.department}</td>
                  <td className="p-4">{employee.salary}</td>
                  <td className="p-4">{employee.position}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="text-blue-500 hover:underline mr-2 hover:scale-105 transition duration-200 ease-in-out"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="text-red-500 hover:underline hover:scale-105 transition duration-200 ease-in-out"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Add Employee Button */}
      <Link
        to={"/add-employee"}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700"
      >
        + Add Employee
      </Link>
      {/* Toast Notifications */}
      <Toaster /> {/* This will show the toast messages */}
    </div>
  );
};

export default Home;
