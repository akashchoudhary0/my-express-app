const BusinessProfile = require("../models/BusinessProfile");


// ==============================
// REGISTER
// ==============================
const register = async (req, res) => {
  try {

    // Check existing user
    const existingUser = await BusinessProfile.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Logo Upload Path
    let logoPath = "";

    if (req.file) {
      logoPath = `/uploads/${req.file.filename}`;
    }

    // Create User
    const user = await BusinessProfile.create({
      ownerName: req.body.ownerName,
      email: req.body.email,
      password: req.body.password,

      businessName: req.body.businessName,
      businessLogo: logoPath,

      gst: req.body.gst,
      phoneNumber: req.body.phoneNumber,
      shopCategory: req.body.shopCategory,

      address: {
        street: req.body.street,
        city: req.body.city,
        district: req.body.district,
        state: req.body.state,
        pincode: req.body.pincode,
      },
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      userId: user._id,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==============================
// LOGIN
// ==============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await BusinessProfile
      .findOne({ email })
      .select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      userId: user._id,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};


// ==============================
// GET ALL
// ==============================
const getBusinessProfiles = async (req, res) => {
  try {
    const profiles = await BusinessProfile.find();

    res.status(200).json({
      success: true,
      count: profiles.length,
      profiles,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// ==============================
// GET BY ID
// ==============================
const getBusinessProfileById = async (req, res) => {
  try {
    const profile = await BusinessProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Business Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// ==============================
// UPDATE
// ==============================
const updateBusinessProfile = async (req, res) => {
  try {
    const updateData = {};

    // Basic fields
    if (req.body.ownerName) updateData.ownerName = req.body.ownerName;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.businessName) updateData.businessName = req.body.businessName;
    if (req.body.phoneNumber) updateData.phoneNumber = req.body.phoneNumber;
    if (req.body.gst) updateData.gst = req.body.gst;
    if (req.body.shopCategory) updateData.shopCategory = req.body.shopCategory;

    // Parse address correctly
    if (req.body.address) {
      updateData.address = JSON.parse(req.body.address);
    }

    // Handle logo upload
    if (req.file) {
      updateData.businessLogo = `/uploads/${req.file.filename}`;
    }

    const updatedProfile = await BusinessProfile.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Business Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedProfile,
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};


// ==============================
// DELETE
// ==============================
const deleteBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Business Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Business Profile deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


module.exports = {
  register,
  login,
  getBusinessProfiles,
  getBusinessProfileById,
  updateBusinessProfile,
  deleteBusinessProfile,
};
