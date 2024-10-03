const contactModel = require("../Models/contactModel");


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
    res.status(201).json({ success: true, message: "Contact created successfully" });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ success: false, error: "Failed to create contact" });
  }
};
const deleteContact = async (req, res) => {
    try {
      const contactId = req.params.id;
      await contactModel.findByIdAndDelete(contactId);
      res.status(200).json({ success: true, message: "Contact deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ success: false, error: "Failed to delete contact" });
    }
  };
  const getAllContacts = async (req, res) => {
    try {
      const allContacts = await contactModel.find();
      res.status(200).json({ success: true, message: "All contacts", contacts: allContacts });
    } catch (error) {
      console.error("Error getting all contacts:", error);
      res.status(500).json({ success: false, error: "Failed to get contacts" });
    }
  };

module.exports = {createContact,deleteContact,getAllContacts};
