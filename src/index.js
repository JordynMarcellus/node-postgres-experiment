const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const {
  addPlayerSingleController,
} = require("./controllers/addPlayerSingleController");
const { getPlayersController } = require("./controllers/getPlayersController");
const { updatePlayerSingle } = require("./controllers/updatePlayerSingle");

require("dotenv").config({
  path: path.resolve(process.cwd(), "development.server.env"),
});

const server = express();
const port = process.env.NODE_APP_PORT || 3000;

server.use(bodyParser.json());
server.use(cors());
server.use(helmet());

const tempCallback = (req, res) =>
  res.status(204).send("please excuse the mess!!!");

// get list of players
server.get("/players", getPlayersController);
// create new player
server.post("/players", addPlayerSingleController);
// update player -- indicating a player has been selected. future potential for expansion.
server.patch("/players/:playerId", updatePlayerSingle);
// get a player's data (JOINs bebe)?
server.get("/players/:playerId", tempCallback);
// three year historical data from x sources
server.get("/players/:playerId/historical", tempCallback);
// every other endpoint hit gets a bad request
server.get("*", (req, res) => res.status(400).send());

server.listen(port, () => console.log(`listening on ${port}!!!`));
