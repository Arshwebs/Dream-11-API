const express = require("express");
const router = express.Router();
const { addTeam } = require("../controller/addTeamController");

router.post("/add-team", addTeam);

module.exports = router;
