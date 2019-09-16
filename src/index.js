const path = require("path");
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const { getPlayersController } = require("./controllers/getPlayersController");
const {
  addPlayerSingleController,
} = require("./controllers/addPlayerSingleController");

require("dotenv").config({
  path: path.resolve(process.cwd(), "development.server.env"),
});

const server = express();
const port = process.env.NODE_APP_PORT || 3000;

server.use(bodyParser());
server.use(helmet());

const tempCallback = (req, res) =>
  res.status(204).send("please excuse the mess!!!");
// need to
server.get("/players", getPlayersController);
// create new player
server.post("/players", addPlayerSingleController);
// update player; indicating a player has been selected
server.patch("/players/:playerId", tempCallback);
// get a player's data (JOINs bebe)?
server.get("/players/:playerId", tempCallback);
// three year historical data from x sources
server.get("/players/:playerId/historical", tempCallback);

server.get("*", (req, res) => res.status(400).send());

server.listen(port, () => console.log(`listening on ${port}!!!`));
