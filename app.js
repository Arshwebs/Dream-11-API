const express = require("express");

const addTeamsRouter = require("./routes/addTeams");
const teamResultsRouter = require("./routes/teamResult");
const processResultsRouter = require("./routes/processResult");

const app = express();

app.use(express.json());

app.use("/", addTeamsRouter);
app.use("/", teamResultsRouter);
app.use("/", processResultsRouter);

module.exports = app;
