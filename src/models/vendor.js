const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  vendorImage: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Vendor", VendorSchema);

/* 
const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  
    name: { 
        type: String,
        required: true 
    },
    email: { 
        type: String,
        required: true, 
        unique: true  
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        minlength: 6,
    },
    vendorImage: {
        type: String,
        trim: true,
    }
    
});

module.exports = mongoose.model("User", userSchema);

//const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Vendor schema
const VendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        minlength: 6,
    },
    vendorImage: {
        type: String,
        trim: true,
    },
    resetOtp: {
        type: String,
        trim: true,
    },
    resetOtpExpiry: {
        type: Date,
    },
}, {
    timestamps: true,
});

 Pre-save middleware to hash the password before saving
VendorSchema.pre('save', async function (next) {
    
    const vendor = this;
    // If the password is not modified or missing, skip hashing
    if (!vendor.password || !vendor.isModified('password')) return next();

    try {
        // Hash the password with a salt round of 10
        vendor.password = await bcrypt.hash(vendor.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

// Define the Vendor model
const Vendor = mongoose.model('Vendor', VendorSchema);

module.exports = Vendor;

*/















