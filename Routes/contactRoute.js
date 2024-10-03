const express = require("express");
const { createContact, deleteContact, getAllContacts } = require("../Controllers/contactController");
const router = express.Router();


router.post("/contact", createContact);
router.delete("/contact/:id", deleteContact);
router.get("/contacts", getAllContacts);

module.exports = router;