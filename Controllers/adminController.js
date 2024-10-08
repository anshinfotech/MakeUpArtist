const bcrypt = require("bcrypt");
const adminModel = require("../Models/adminModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const path = require("path")

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const createAdmin = async (req, res) => {
  const otp = Math.round(Math.random() * (9999 - 1000) + 1000);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please fill all fields" });
  }
  const securepassword = await bcrypt.hashSync(password, 10);
  try {
    const admin = new adminModel({
      username,
      email,
      password:securepassword,
      otp,
    });
    await transporter.sendMail({
      from: process.env.AUTH_EMAIL, // sender address
      to: email, // recipient
      subject: "Thank you for Registering as Admin", // Subject line
      text: `Please Verify Your Account`, // Plain text body
      // You can also include HTML content
      html: `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank you for Registering as Admin</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin-bottom: 20px;
                }
                p {
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .otp {
                    background-color: #007bff;
                    color: #fff;
                    text-align: center;
                    font-size: 24px;
                    padding: 15px 0;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .note {
                    color: #999;
                    font-size: 14px;
                }
                .signature {
                    text-align: center;
                    margin-top: 20px;
                    font-style: italic;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Thank you for Registering as Admin</h1>
                <p>Plesae Verify Your Otp  to Activate your Account.</p>
                <div class="otp">OTP:- <strong>${otp}</strong></div>
                <p class="note">This is an auto-generated email, please do not reply to this email.</p>
                <p class="signature">Best Regards,<br>Palka Arora Makeovers</p>
            </div>
        </body>
        </html>`,
    });
    await admin.save();
    res.status(201).json({
      message: `Admin Details Saved ,Please verify the otp sent on mail ${email}`,
      success: true,
      admin,
    });
  } catch (error) {
    console.log(`Error in creating Admin :${error}`);
    res.status(500).json({
      error: error.messagae,
      message: "Something went Wrong",
      success: false,
    });
  }
};


const getLoginPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "Alogin.html"));
};

const verifyAdmin = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found!" });
    }
    if (admin.otp === otp) {
      admin.otp = null;
      admin.verified = true;
      admin.save()
      res.status(200).send({ message: "Verification Successfull", admin });
      return;
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with given email exists
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If credentials are correct, generate JWT token
    const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration

    res.status(200).send({
      success: true,
      message: "Login successful",
      // redirectTo: "admin/dashboard", 
    });
  } catch (error) {
    console.error(`Error in login: ${error}`);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
const getAdminDashboard = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "Admin.html"));
};

const getAddCourse = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "addCourse.html"));
};
const getViewCourse = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "viewCourse.html"));
};

const getAddBlog = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "Add-blog.html"));
};
const getViewBlog = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "viewBlog.html"));
};

const getViewAppointment = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "viewAppointment.html"));
};

const getViewContact = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "viewContact.html"));
};

module.exports = {getViewAppointment,getViewContact, createAdmin,getAdminDashboard,loginAdmin,verifyAdmin,getLoginPage,getAddCourse,getViewCourse,getAddBlog,getViewBlog}