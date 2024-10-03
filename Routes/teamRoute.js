const { createEmployee, deleteEmployee, updateEmployee, getAllEmployees } = require("../Controllers/teamController");
const { requireAdminLogin } = require("../Middlewares/middleware");

const router = require("express").Router();

router
  .post("/employees",requireAdminLogin, createEmployee)
  .delete("/employees/:employeeId",requireAdminLogin, deleteEmployee)
  .put("/employees/:employeeId",requireAdminLogin, updateEmployee)
  .get("/employees", getAllEmployees);

module.exports = router;
