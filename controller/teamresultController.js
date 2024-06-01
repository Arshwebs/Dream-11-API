const TeamEntry = require("../models/teamEntryModal");

exports.getTeamResults = async (req, res) => {
  const teams = await TeamEntry.find().sort({ totalPoints: -1 });
  const maxPoints = teams[0]?.totalPoints;
  const winners = teams.filter((team) => team.totalPoints === maxPoints);

  res.status(200).json(winners);
};
