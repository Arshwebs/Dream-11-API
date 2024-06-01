const express = require("express");
const router = express.Router();
const { processResult } = require("../controller/processResultController");

router.post("/process-result", processResult);

module.exports = router;
