const mongoose = require("mongoose");

const businessProfileSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    businessName: {
      type: String,
      required: true,
    },

    businessLogo: {
      type: String,
      default: "",
    },

    gst: {
      type: String,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    shopCategory: {
      type: String,
      required: true,
    },

    invoiceLimit: {
      type: Number,
      default: 10,
    },

    totalInvoice: {
      type: Number,
      default: 0,
    },

    address: {
      street: String,
      city: String,
      district: String,
      state: String,
      pincode: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "BusinessProfile",
  businessProfileSchema
);