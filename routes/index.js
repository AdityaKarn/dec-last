const express = require("express");
const router = express.Router();

// Welcome Page
router.get("/", (req, res) => res.sendFile("index.html"));

module.exports = router;
