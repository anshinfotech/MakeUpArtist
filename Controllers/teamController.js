const employeeModel = require("../Models/teamModel");

const createEmployee = async (req, res) => {
  const { fname, lname, designation, quote, image } = req.body;
  try {
    const newEmployee =await employeeModel.create({
      fname,
      lname,
      designation,
      quote,
      image,
    });
    return res
      .status(201)
      .json({ success: true, message: "Employee Added", newEmployee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

const deleteEmployee = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const deletedEmployee = await employeeModel.findByIdAndDelete(employeeId);
    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    return res.json({
      success: true,
      message: "Employee deleted",
      deletedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

const updateEmployee = async (req, res) => {
  const { employeeId } = req.params;
  const { fname, lname, designation, quote, image } = req.body;
  try {
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      employeeId,
      { fname, lname, designation, quote, image },
      { new: true }
    );
    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    return res.json({
      success: true,
      message: "Employee updated",
      updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};
const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    return res.json({ success: true, employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

module.exports={
    createEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
}