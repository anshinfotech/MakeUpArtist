const {
  createAdmin,
  verifyAdmin,
  loginAdmin,
  getLoginPage,
  getAdminDashboard,
  getAddCourse,
  getViewCourse,
  getAddBlog,
  getViewBlog,
  getViewAppointment,
  getViewContact,
} = require("../Controllers/adminController");
const { requireAdminLogin } = require("../Middlewares/middleware");

const router = require("express").Router();

router
  .post("/admin/create", createAdmin)
  .post("/admin/verify", verifyAdmin)
  .post("/admin/login", loginAdmin)
  .get("/admin/login", getLoginPage)
  .get("/admin/dashboard", requireAdminLogin, getAdminDashboard)
  .get("/admin/addCourse", requireAdminLogin, getAddCourse)
  .get("/admin/add-blog", requireAdminLogin, getAddBlog)
  .get("/admin/viewCourse", requireAdminLogin, getViewCourse)
  .get("/admin/viewBlog", requireAdminLogin, getViewBlog)
  .get("/admin/viewAppointment", requireAdminLogin, getViewAppointment)
  .get("/admin/viewContact", requireAdminLogin, getViewContact)

module.exports = router;
