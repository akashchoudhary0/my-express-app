const express = require("express");
const {
  createBusinessProfile,
  getBusinessProfiles,
  getBusinessProfileById,
  updateBusinessProfile,
  deleteBusinessProfile,
} = require("../controllers/businessProfileController");

const router = express.Router();

router.post("/", createBusinessProfile);
router.get("/", getBusinessProfiles);
router.get("/:id", getBusinessProfileById);
router.put("/:id", updateBusinessProfile);
router.delete("/:id", deleteBusinessProfile);

module.exports = router;
