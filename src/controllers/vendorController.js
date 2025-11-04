const Vendor = require("../models/Vendor");

// ✅ Create Vendor
const createVendor = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    // Check duplicate
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ success: false, message: "Vendor already exists" });
    }

    const vendor = new Vendor({ name, email, phoneNumber, password }); // ⚠️ hash password in production
    await vendor.save();

    res.status(201).json({
      success: true,
      message: "Vendor created successfully",
      vendorId: vendor._id,
      vendor: {
        name: vendor.name,
        email: vendor.email,
        phoneNumber: vendor.phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating vendor", error: error.message });
  }
};

// ✅ Get All Vendors
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching vendors", error: error.message });
  }
};

// ✅ Get Vendor By ID
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }
    res.status(200).json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching vendor", error: error.message });
  }
};

// ✅ Update Vendor
const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }
    res.status(200).json({ success: true, message: "Vendor updated successfully", vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating vendor", error: error.message });
  }
};

// ✅ Delete Vendor
const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }
    res.status(200).json({ success: true, message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting vendor", error: error.message });
  }
};

// Vendor Login
const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }

    // ⚠️ In production, compare hashed password instead of plain text
    if (vendor.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      vendor: {
        _id: vendor._id,
        name: vendor.name,
        email: vendor.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, mess-age: "Login error", error: error.message });
  }
};

module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
  loginVendor, 
};

