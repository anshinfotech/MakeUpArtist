const appointmentModel = require("../Models/appointment");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const createAppointment = async (req, res) => {
  const id = Math.round(Math.random() * 100000);
  const { name, phone, email, service, date, slot, message } = req.body;
  try {
    // Check if any appointment already exists for the given slot, service, and date
    const existingAppointment = await appointmentModel.findOne({
      service,
      date,
      slot,
    });

    if (existingAppointment) {
      return res
        .status(400)
        .json({ error: "Slot already booked for this service on this date" });
    }

    // If no existing appointment found, create a new appointment
    const newAppointment = new appointmentModel({
      name,
      phone,
      email,
      service,
      date,
      slot,
      message,
      id,
    });
    await newAppointment.save();

    // Send confirmation email to the user
    await transporter.sendMail({
      from: process.env.AUTH_EMAIL, // sender address
      to: email, // recipient
      subject: "Appointment Confirmation", // Subject line
      html: `<html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Appointment Confirmation</title>
          <style>
              /* Add your custom CSS styles here */
              /* Example styles */
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
              }
              .container {
                  max-width: 600px;
                  padding: 30px;
                  background-color: #fff;
                  border-radius: 10px;
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
                  text-align: center;
              }
              .confirmation {
                  background-color: #007bff;
                  color: #fff;
                  text-align: center;
                  font-size: 24px;
                  padding: 15px 0;
                  border-radius: 5px;
                  margin-bottom: 20px;
              }
              .btn {
                  display: block;
                  background-color: #007bff;
                  color: #fff;
                  text-decoration: none;
                  padding: 10px 20px;
                  border-radius: 5px;
                  transition: background-color 0.3s ease;
                  margin: 0 auto;
                  width: 150px;
                  text-align: center;
              }
              .btn:hover {
                  background-color: #0056b3;
              }
              .note {
                  color: #999;
                  font-size: 14px;
                  text-align: center;
              }
              .signature {
                  text-align: center;
                  margin-top: 20px;
                  font-style: italic;
                  color: #666;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Appointment Confirmation</h1>
              <p>Dear ${name},</p>
              <p>Your appointment for ${service} on ${date} at ${slot} has been successfully booked.</p>
              <p>We look forward to seeing you!</p>
              <a href="http://localhost:5000/confirmappointment/${newAppointment._id}" class="btn">Confirm Appointment</a>
              <div class="confirmation">Please Note Down The Confirmation ID: #${id}</div>
              <p class="note">This is an auto-generated email, please do not reply to this email.</p>
              <p class="signature">Best Regards,<br>Palka Arora Makeovers</p>
          </div>
      </body>
      </html>
      `,
    });

    res
      .status(201)
      .json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const confirmAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    // Find the appointment by ID
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    // Update the appointment status to confirmed
    appointment.confirm = true;
    await appointment.save();
    // Redirect to a confirmation page or send a response indicating successful confirmation
    res.status(200).json({ message: "Appointment confirmed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAppointments = async(req,res)=>{
    try {
        const allAppointments=await appointmentModel.find().sort({createdAt:-1})
        console.log(allAppointments);
        res.status(200).json({success:true,message:"All Appointments",allAppointments})
    } catch (error) {
        console.log("Error in getting All Appointments : ",error)
        res.status(500).json({success:false,message:"Error in fetching data",error});
    }
}

module.exports = { createAppointment, confirmAppointment ,getAllAppointments};
