const express = require("express");

const {
  addPlayerSingleController,
} = require("../controllers/addPlayerSingleController");
const { getPlayersController } = require("../controllers/getPlayersController");
const { updatePlayerSingle } = require("../controllers/updatePlayerSingle");

const router = express.Router();
const tempCallback = (req, res) =>
  res.status(204).send("please excuse the mess!!!");

router.get("/players", getPlayersController);
// create new player
router.post("/players", addPlayerSingleController);
// update player -- indicating a player has been selected. future potential for expansion.
router.patch("/players/:playerId", updatePlayerSingle);
// get a player's data (JOINs bebe)?
router.get("/players/:playerId", tempCallback);
// three year historical data from x sources
router.get("/players/:playerId/historical", tempCallback);
// every other endpoint hit gets a bad request
router.get("*", (req, res) => res.status(400).send());

module.exports = router;
