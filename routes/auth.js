const express = require("express");
const authFtns = require("../controllers/auth");

const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/login", authFtns.login);
router.get("/logout", [auth], authFtns.logout);

module.exports = router;
