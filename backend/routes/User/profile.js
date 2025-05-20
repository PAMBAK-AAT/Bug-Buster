

const express = require("express");
const router = express.Router();
const auth  = require("../../middlewares/auth.js");
const { getProfile, updateProfile, deleteProfile } = require("../../controllers/profile.js");


router.get("/profile/:id", getProfile);
router.put("/profile/:id", updateProfile);
router.delete("/profile/:id", deleteProfile);

module.exports = router;