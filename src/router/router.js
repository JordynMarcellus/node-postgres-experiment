const express = require("express");

const {
  addPlayerSingleController,
} = require("../controllers/addPlayerSingleController");
const { getPlayersController } = require("../controllers/getPlayersController");
const { updatePlayerSingle } = require("../controllers/updatePlayerSingle");
const {
  getPlayersIdHashMapController,
} = require("../controllers/getPlayersIdHashMap");
const {
  searchForPlayerController,
} = require("../controllers/searchForPlayerController");
const {
  updatePlayerSingleStatsController,
} = require("../controllers/updatePlayerSingleStatsController");

const router = express.Router();
const tempCallback = (req, res) =>
  res.status(204).send("please excuse the mess!!!");

// ✅
router.get("/players", getPlayersController);
// ✅
router.get("/playersId", getPlayersIdHashMapController);
// ✅
router.get("/players/search", searchForPlayerController);

// create new player -- not implemented in UI (yet). can be programmatic for services and the like.
router.post("/players", addPlayerSingleController);

// update player -- indicating a player has been selected. future potential for expansion. ✅
router.patch("/players/:playerId", updatePlayerSingle);

// get a player's data (JOINs bebe)?
router.get("/players/:playerId", tempCallback);
// three year historical data from x sources
router.get("/players/:playerId/historical", tempCallback);

// this is where is insert/upsert the historical data
// 2016
// 2017
// 2018
// aggregate
router.put("/players/:playerId/stats", updatePlayerSingleStatsController);
// every other endpoint hit gets a bad request
router.get("*", (req, res) => res.status(400).send());

module.exports = router;
