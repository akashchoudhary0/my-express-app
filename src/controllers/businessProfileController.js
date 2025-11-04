const BusinessProfile = require("../models/BusinessProfile");
const Vendor = require("../models/Vendor");

// ✅ Define functions first

const createBusinessProfile = async (req, res) => {
  try {
    const { vendorId, businessName, address, gst, phoneNumber, shopCategory, businessLogo } = req.body;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    const profile = await BusinessProfile.create({
      vendorId,
      businessName,
      address,
      gst,
      phoneNumber,
      shopCategory,
      businessLogo,
      ownerName: vendor.name,
    });

    res.status(201).json({
      message: "Business profile created successfully",
      profile,
    });
  } catch (error) {
    console.error("❌ BusinessProfile error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getBusinessProfiles = async (req, res) => {
  try {
    const profiles = await BusinessProfile.find().populate("vendorId", "name email");
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBusinessProfileById = async (req, res) => {
  try {
    const profile = await BusinessProfile.findById(req.params.id).populate("vendorId", "name email");
    if (!profile) return res.status(404).json({ message: "Business Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!profile) return res.status(404).json({ message: "Business Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ message: "Business Profile not found" });
    res.json({ message: "Business Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Export all functions at the bottom
module.exports = {
  createBusinessProfile,
  getBusinessProfiles,
  getBusinessProfileById,
  updateBusinessProfile,
  deleteBusinessProfile,
};
