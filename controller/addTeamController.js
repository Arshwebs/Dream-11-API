const playerTypes = require("../data/players.json");
const TeamEntry = require("../models/teamEntryModal.js");
exports.addTeam = async (req, res) => {
  const { teamName, players, captain, viceCaptain } = req.body;

  const verifyTeam = await TeamEntry.findOne({ teamName: teamName });
  if (verifyTeam) {
    return res.status(409).send({ message: "Team name already exist" });
  }

  const filteredPlayers = playerTypes.filter((player) =>
    players.includes(player.Player),
  );
  const typeCounts = { WK: 0, BAT: 0, AR: 0, BWL: 0 };

  filteredPlayers.forEach((player) => {
    switch (player.Role) {
      case "BATTER":
        typeCounts["BAT"]++;
        break;
      case "BOWLER":
        typeCounts["BWL"]++;
        break;
      case "WICKETKEEPER":
        typeCounts["WK"]++;
        break;
      case "ALL-ROUNDER":
        typeCounts["AR"]++;
        break;
      default:
        break;
    }
  });
  console.log(typeCounts);
  if (
    typeCounts.WK < 1 ||
    typeCounts.WK > 8 ||
    typeCounts.BAT < 1 ||
    typeCounts.BAT > 8 ||
    typeCounts.AR < 1 ||
    typeCounts.AR > 8 ||
    typeCounts.BWL < 1 ||
    typeCounts.BWL > 8
  ) {
    return res.status(400).send({
      message: "Invalid player type distribution",
      typeCounts,
    });
  }
  try {
    const teamEntry = new TeamEntry({
      teamName,
      players,
      captain,
      viceCaptain,
    });
    await teamEntry.save();
    res.status(201).send("Team entry added successfully");
  } catch (err) {
    res.status(400).send({ err });
    console.error(err);
  }
};
