const contactModel = require("../Models/contactModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const createContact = async (req, res) => {
  try {
    const { fname, lname, email, subject, message } = req.body;
    const newContact = new contactModel({
      fname,
      lname,
      email,
      subject,
      message,
    });
    await newContact.save();

    await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Thank You for Reaching Out to Palka Arora Makeup Artistry",
      html: `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #d6249f;">Thank You for Getting in Touch!</h2>
          <p>Dear ${fname+ " " + lname},</p>
          <p>We appreciate you contacting <strong>Palka Arora Makeup Artistry</strong>. One of our team members will get back to you shortly. In the meantime, feel free to browse our portfolio or check out our services on our website.</p>
          <p>For urgent inquiries, you can reach us directly at <a href="mailto:${process.env.AUTH_EMAIL}" style="color: #d6249f;">${process.env.AUTH_EMAIL}</a>.</p>
          <p>Thank you for considering us for your beauty needs!</p>

          <hr>
          <p>Follow us on Facebook</p>
          <a href="https://www.facebook.com/palkaaroramakeupartist/">Click Here</a>
          <p>Follow us on Instagram</p>
          <a href="https://www.instagram.com/palkaaroramakeupartist/?hl=en">Click Here</a>

          <p>Best regards,</p>
          <p><strong>Palka Arora Makeup Artistry Team</strong></p>
          <hr>
          <p style="font-size: 12px; color: #999;">This is an automated message, please do not reply directly to this email.</p>
        </div>
      `,
    });

    await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      // to: process.env.NOTIFICATION_EMAIL,
      to: 'singhjaspreet2425@gmail.com',
      subject: 'New Contact Form Submission - Palka Arora Makeup Artistry',
      html: `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #d6249f;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${fname+ " " + lname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
          <hr>
          <p>Open Website Now - <a href="https://palkaaroramakeupartist.com/admin/login">Click Here</a></p>
        </div>
      `
    });

    res
      .status(201)
      .json({ success: true, message: "Contact created successfully" });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ success: false, error: "Failed to create contact" });
  }
};
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    await contactModel.findByIdAndDelete(contactId);
    res
      .status(200)
      .json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ success: false, error: "Failed to delete contact" });
  }
};
const getAllContacts = async (req, res) => {
  try {
    const allContacts = await contactModel.find();
    res
      .status(200)
      .json({ success: true, message: "All contacts", contacts: allContacts });
  } catch (error) {
    console.error("Error getting all contacts:", error);
    res.status(500).json({ success: false, error: "Failed to get contacts" });
  }
};

module.exports = { createContact, deleteContact, getAllContacts };
