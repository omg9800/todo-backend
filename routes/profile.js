const express = require("express");
const profile = require("../controllers/profile");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/me", [auth], profile.getProfile);

module.exports = router;
