const TeamEntry = require("../models/teamEntryModal.js");
const matchData = require("../data/match.json");
const calculatePoints = require("../utils/calculatePoints.js");

exports.processResult = async (req, res) => {
  const teams = await TeamEntry.find();
  for (const team of teams) {
    let totalPoints = 0;

    for (const player of team.players) {
      const playerPoints = calculatePoints(player, matchData);
      totalPoints += playerPoints;

      if (player === team.captain) {
        totalPoints += playerPoints;
      }
      if (player === team.viceCaptain) {
        totalPoints += playerPoints * 0.5;
      }
    }

    team.totalPoints = totalPoints;
    await team.save();
  }

  res.status(200).send("Match results processed");
};
