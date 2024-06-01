const express = require("express");
const router = express.Router();
const { getTeamResults } = require("../controller/teamResultController");

router.get("/team-result", getTeamResults);

module.exports = router;
