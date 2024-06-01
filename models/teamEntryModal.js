const mongoose = require("mongoose");

const teamEntrySchema = new mongoose.Schema(
  {
    teamName: { type: String, required: [true, "Team is name needed"] },
    players: {
      type: [{ type: String, required: [true, "please select 11 players"] }],
      validate: {
        validator: function (array) {
          return array.length === 11;
        },
        message: (props) =>
          `Cricket team entry must have 11 players, current players ${props.value.length}`,
      },
    },
    captain: { type: String, required: [true, "Please select captain"] },
    viceCaptain: {
      type: String,
      required: [true, "Please select viceCaptain"],
    },
    totalPoints: { type: Number, default: 0 },
  },
  { versionKey: false },
);

module.exports = mongoose.model("TeamEntry", teamEntrySchema);
