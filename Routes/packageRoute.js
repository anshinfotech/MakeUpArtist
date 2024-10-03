const {
  addPackage,
  getAllPackages,
  updatePackage,
  deletePackage,
} = require("../Controllers/packageController");
const { requireAdminLogin } = require("../Middlewares/middleware");

const router = require("express").Router();

router.post("/packages",requireAdminLogin, addPackage);

// Get All Packages
router.get("/packages", getAllPackages);

// Update Package
router.put("/packages/:packageId",requireAdminLogin, updatePackage);

// Delete Package
router.delete("/packages/:packageId",requireAdminLogin, deletePackage);

module.exports = router;
