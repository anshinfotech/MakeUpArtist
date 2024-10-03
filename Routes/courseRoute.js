const express = require("express");
const { createCourse, getAllCourses, getSingleCourse, updateCourse, deleteCourse } = require("../Controllers/courseController");
const { requireAdminLogin } = require("../Middlewares/middleware");
const router = express.Router();

router.post("/courses",requireAdminLogin, createCourse);
router.get("/courses", getAllCourses);
router.get("/courses/:id", getSingleCourse);
router.put("/courses/:id",requireAdminLogin, updateCourse);
router.delete("/admin/courses/:id",requireAdminLogin, deleteCourse);

module.exports = router;