// routes/employee.routes.js
const express = require("express");
const {
  createEmployee,
  deleteEmployeeById,
  getEmployeeById,
  getEmployees,
  updateEmployeeById,
} = require("../controllers/employeeController");

const router = express.Router();

router.post("/create", createEmployee);

router.get("/get/:id", getEmployeeById);

router.get("/all", getEmployees);

router.put("/update/:id", updateEmployeeById);

router.delete("/delete/:id", deleteEmployeeById);

module.exports = router;
