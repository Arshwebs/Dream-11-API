const express = require("express");
const router = express.Router();
const {getTeamResults} = require("../controller/teamresultController");

router.get("/team-result", getTeamResults);

module.exports = router;
