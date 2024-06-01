const express = require("express");

const addTemsRouter = require("./routes/addTeams");
const teamResultsRouter = require("./routes/teamResult");
const processResultsRouter = require("./routes/processResult");

const app = express();

app.use(express.json());

app.use("/", addTemsRouter);
app.use("/", teamResultsRouter);
app.use("/", processResultsRouter);

module.exports = app;
