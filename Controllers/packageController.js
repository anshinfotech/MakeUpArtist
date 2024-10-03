const Package = require("../Models/packageModel");


// Create Package
const addPackage = async (req, res) => {
  const { packageName, price, image, timeDuration, description } = req.body;
  try {
    const newPackage = await Package.create({
      packageName,
      price,
      image,
      timeDuration,
      description,
    });
    res.status(201).json({ success: true, message: 'Package Added', newPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

// Read Packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json({ success: true, packages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

// Update Package
const updatePackage = async (req, res) => {
  const { packageId } = req.params;
  const { packageName, price, image, timeDuration, description } = req.body;
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      { packageName, price, image, timeDuration, description },
      { new: true }
    );
    if (!updatedPackage) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    res.json({ success: true, message: 'Package updated', updatedPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

// Delete Package
const deletePackage = async (req, res) => {
  const { packageId } = req.params;
  try {
    const deletedPackage = await Package.findByIdAndDelete(packageId);
    if (!deletedPackage) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    res.json({ success: true, message: 'Package deleted', deletedPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = {
  addPackage,
  getAllPackages,
  updatePackage,
  deletePackage,
};
