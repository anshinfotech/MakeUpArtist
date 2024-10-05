const blogModel = require("../Models/blogModel");
const path = require("path");

const createBlog = async (req, res) => {
  const { title, description, content, image } = req.body;
  if (!title || !description || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    let blog = new blogModel({
      title,
      description,
      content,
      image,
    });
    await blog.save();
    res
      .status(201)
      .json({ success: true, message: "Blogs Created Successfully", blog });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: err.message || "Server error", success: false });
  }
};

const allBlogs = async (req, res) => {
  try {
    const allBlogs = await blogModel.find().sort({ createdAt: "desc" });
    res.status(200).json({
      success: true,
      message: "Blogs Fetched Successfully",
      allBlogs,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: err.message || "Server error", success: false });
  }
};

const threeBlogs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3; // Set a default limit of 3
    const allBlogs = await blogModel.find().sort({ createdAt: "desc" }).limit(limit);
    res.status(200).json({
      success: true,
      message: "Blogs Fetched Successfully",
      allBlogs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message || "Server error", success: false });
  }
};


const getSingleBlog = async (req, res) => {
  const _id = req.params._id; // Access the _id parameter directly
  console.log(_id);
  try {
    const singleBlog = await blogModel.findById(_id);
    if (!singleBlog) {
      return res
        .status(404)
        .json({ message: "No Blog Found with the given ID!" });
    }
    res.status(200).json({
      success: true,
      data: singleBlog,
      message: `Blog Fetched with id ${_id}`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const readblog = async (req, res) => {
  const _id = req.params;
  console.log(_id);
  try {
    const singleBlog = await blogModel.findById(_id);
    if (!singleBlog) {
      return res
        .status(404)
        .json({ message: "No Blog Found with the given ID!" });
    }

    // Concatenate HTML content with blog data
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Single Blog</title>
      <!-- Bootstrap CSS -->
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
      <!-- Font Awesome CSS -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #fadbd8; /* Light pink background */
          color: #6c3483; /* Pink text color */
        }
        .container {
          background-color: #f8bbd0; /* Dark pink container background */
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin: 50px auto;
          max-width: 800px;
        }
        .blog-item {
          background-color: #e1bee7; /* Violet blog item background */
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
          text-align: center; /* Center the content */
        }
        .blog-item img {
          max-width: 100%; /* Ensure image does not exceed container width */
          max-height: 600px; /* Set maximum height */
          border-radius: 5px;
          margin-bottom: 20px; /* Increased margin bottom */
          display: block; /* Make the image centered */
          margin-left: auto; /* Center the image */
          margin-right: auto; /* Center the image */
        }
        .share-icons {
          text-align: center;
          margin-top: 20px;
          cursor: pointer;
        }
        .share-icon {
          display: inline-block;
          font-size: 36px; /* Increased share icon size */
          color: #6c3483; /* Pink share icon color */
          transition: color 0.3s;
        }
        .share-icon:hover {
          color: #8e44ad; /* Lighter shade of pink on hover */
        }
        .share-text {
          color: #6c3483; /* Pink text color */
          font-weight: bold;
          margin-top: 20px; /* Increased margin top */
          font-size: 18px; /* Increased text size */
        }
        .back-link {
          display: block;
          margin-top: 20px;
          text-align: center;
          color: #6c3483; /* Pink link color */
          text-decoration: none;
          font-size: 16px; /* Increased text size */
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="blog-item">
          <img src="${singleBlog.image}" alt="Blog Image" class="img-fluid">
          <h1 class="mb-4">${singleBlog.title}</h1>
          <!-- Increased heading size -->
          <h5>Author: ${singleBlog.author}</h5>
          <br>
          <p class="mb-4">${singleBlog.description}</p>
          <!-- Increased text size -->
        </div>
        <div class="share-icons">
          <span class="share-icon"><i class="fas fa-share"></i></span>
          <!-- Share icon -->
          <p class="share-text">
            Share this blog on Instagram, Facebook, and WhatsApp
          </p>
        </div>
        <a href="/" class="back-link">&larr; Back to All Blogs</a>
      </div>
    </body>
    </html>
    `;

    res.status(200).send(htmlContent);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Something went wrong while fetching the blog",
      success: false,
    });
  }
};

const updateBlog = async (req, res) => {
  const updateData = req.body;
  const _id = req.params;
  try {
    const blog = await blogModel.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      success: true,
      data: blog,
      message: "Blog Updated Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Something went Wrong while updating the Blog",
      success: false,
    });
  }
};

const deleteBlog = async (req, res) => {
  const _id = req.params;

  try {
    const blog = await blogModel.findById(_id);
    if (!blog) {
      throw new Error("Blog not found");
    }
    const removeBlog = await blogModel.findByIdAndDelete(_id);
    res.status(200).json({
      success: true,
      data: removeBlog,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.messagae,
      message: "Something went Wrong while deleting the blog",
      success: false,
    });
  }
};
module.exports = {
  createBlog,
  allBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  readblog,
  threeBlogs,
};
