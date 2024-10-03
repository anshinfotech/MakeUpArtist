const {
  createAppointment,
  confirmAppointment,
  getAllAppointments,
} = require("../Controllers/appointment");

const router = require("express").Router();

router.post("/createappointment", createAppointment);
router.get("/confirmappointment/:id", confirmAppointment);
router.get("/getallappointments", getAllAppointments);

module.exports = router;
