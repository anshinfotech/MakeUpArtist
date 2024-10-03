const courseModel = require("../Models/courseModel");

const createCourse = async (req, res) => {
    try {
      const { name, description, duration, price, content, image } = req.body;
      const newCourse = new courseModel({
        name,
        description,
        duration,
        price,
        content,
        image,
      });
      await newCourse.save();
      res.status(201).json({ success: true, message: "Course created successfully" });
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ success: false, error: "Failed to create course" });
    }
  };
  const getAllCourses = async (req, res) => {
    try {
      const allCourses = await courseModel.find();
      res.status(200).json({ success: true, message: "All courses", courses: allCourses });
    } catch (error) {
      console.error("Error getting all courses:", error);
      res.status(500).json({ success: false, error: "Failed to get courses" });
    }
  };
  const getSingleCourse = async (req, res) => {
    try {
      const courseId = req.params.id;
      const course = await courseModel.findById(courseId);
      if (!course) {
        return res.status(404).json({ success: false, error: "Course not found" });
      }
      res.status(200).json({ success: true, message: "Course found", course });
    } catch (error) {
      console.error("Error getting single course:", error);
      res.status(500).json({ success: false, error: "Failed to get course" });
    }
  };
  const updateCourse = async (req, res) => {
    try {
      const courseId = req.params.id;
      const updatedData = req.body;
      const updatedCourse = await courseModel.findByIdAndUpdate(courseId, updatedData, { new: true });
      if (!updatedCourse) {
        return res.status(404).json({ success: false, error: "Course not found" });
      }
      res.status(200).json({ success: true, message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({ success: false, error: "Failed to update course" });
    }
  };
  const deleteCourse = async (req, res) => {
    try {
      const courseId = req.params.id;
      const deletedCourse = await courseModel.findByIdAndDelete(courseId);
      if (!deletedCourse) {
        return res.status(404).json({ success: false, error: "Course not found" });
      }
      res.status(200).json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({ success: false, error: "Failed to delete course" });
    }
  };

module.exports={createCourse,getAllCourses,getSingleCourse,updateCourse,deleteCourse}