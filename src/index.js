const path = require("path");
require("dotenv").config({
  path: path.resolve(process.cwd(), "development.server.env"),
});

const express = require("express");
const { getPlayersController } = require("./controllers/getPlayersController");

const server = express();
const port = process.env.NODE_APP_PORT || 3000;

server.get("/", (req, res) => res.send("Hello!!!"));
server.get("/players", getPlayersController);
server.listen(port, () => console.log(`listening on ${port}!!!`));
