const {
  createBlog,
  allBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  readblog,
  threeBlogs,
} = require("../Controllers/blogController");
const { requireAdminLogin } = require("../Middlewares/middleware");

const router = require("express").Router();

router
  .post("/create-blog",requireAdminLogin, createBlog)
  .get("/all-blogs", allBlogs)
  .get("/three-blogs", threeBlogs)
  .get("/single-blog/:_id", getSingleBlog)
  .get("/readblog/:_id",readblog)
  .delete("/delete-blog/:_id",requireAdminLogin, deleteBlog)
  .put("/update-blog/:_id",requireAdminLogin, updateBlog);

module.exports = router;
