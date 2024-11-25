const employeModel = require("../models/employe.model");

// create employee

exports.createEmployee = async (req, res) => {
  try {
    const { name, age, position, department, salary } = req.body;
    if (!name || !age || !position || !department || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newEmployee = await employeModel.create({
      name,
      age,
      position,
      department,
      salary,
    });
    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get all employees

exports.getEmployees = async (req, res) => {
  try {
    const employees = await employeModel.find();
    res.json({
      message: "Employees retrieved successfully",
      employees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get employee by id

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await employeModel.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({
      message: "Employee retrieved successfully",
      employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// update employee by id

exports.updateEmployeeById = async (req, res) => {
  try {
    const { name, age, position, department, salary } = req.body;
    const updatedEmployee = await employeModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        position,
        department,
        salary,
      },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// delete employee by id

exports.deleteEmployeeById = async (req, res) => {
  try {
    // Ensure the id is valid
    const { id } = req.params;
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "Invalid employee ID format" });
    }

    // Attempt to delete the employee by ID
    const deletedEmployee = await employeModel.findByIdAndDelete(id);
    
    // If no employee was found to delete
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Return success response
    res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
