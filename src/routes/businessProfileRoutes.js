const express = require("express");

const {
  register,
  login,
  getBusinessProfiles,
  getBusinessProfileById,
  updateBusinessProfile,
  deleteBusinessProfile,
} = require("../controllers/businessProfileController");

const upload = require("../middleware/upload");

const router = express.Router();

// ==============================
// AUTH ROUTES
// ==============================
router.post(
  "/register",
  upload.single("businessLogo"),
  register
);

router.post("/login", login);

// ==============================
// CRUD ROUTES
// ==============================
router.get("/", getBusinessProfiles);

router.get("/:id", getBusinessProfileById);

router.put(
  "/:id",
  upload.single("businessLogo"),
  updateBusinessProfile
);

router.delete("/:id", deleteBusinessProfile);

module.exports = router;