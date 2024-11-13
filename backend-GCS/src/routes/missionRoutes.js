const express = require("express");
const router = express.Router();
const MissionController = require("../controllers/missionControllers");

router.get("/", MissionController.getAllMissions);

module.exports = router;
