const express = require("express");
const router = express.Router();
const MissionController = require("../controllers/missionControllers");

router.get("/", MissionController.getAllMissions);
router.post("/", MissionController.createMission);
router.put("/:id", MissionController.updateMission);
router.get("/:id", MissionController.getMissionById);

module.exports = router;
