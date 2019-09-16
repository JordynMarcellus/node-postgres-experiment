const path = require("path");
require("dotenv").config({
  path: path.resolve(process.cwd(), "development.server.env"),
});

const express = require("express");
const { getPlayersController } = require("./controllers/getPlayersController");

const server = express();
const port = process.env.NODE_APP_PORT || 3000;

const tempCallback = (req, res) =>
  res.status(204).send("please excuse the mess!!!");
// need to
server.get("/players", getPlayersController);
// update player; indicating a player has been selected
server.patch("/players", tempCallback);
// create new player
server.post("/players", tempCallback);
server.get("/players/:playerId/details", tempCallback);
server.get("*", (req, res) => res.status(400).send());

server.listen(port, () => console.log(`listening on ${port}!!!`));
