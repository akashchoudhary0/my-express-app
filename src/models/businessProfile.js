const mongoose = require("mongoose");

const businessProfileSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      
    },
    businessLogo: {
      type: String,
      
    },
    address: {
      type: String,
      required: true,
    },
    gst: {
      type: String, // optional
    },
    phoneNumber: {
      type: Number,
      
    },
    shopCategory: {
      type: String,
      
    },
    invoiceLimit: {
      type: Number,
      required: true,
      default: 10,
    },
    totalInvoice: {
      type: Number,
      required: true,
      default: 0,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor", // reference to Vendor model
      required: true,
    },
  },
  { timestamps: true }
);

const BusinessProfile = mongoose.model("BusinessProfile", businessProfileSchema);

module.exports = BusinessProfile;
