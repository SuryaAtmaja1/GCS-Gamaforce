const Mission = require("../models/missions");

class MissionController {
  static async getAllMissions(req, res) {
    try {
      const missions = await Mission.getAll();
      res.json(missions);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Gagal mendapat data misi",
      });
    }
  }
}

module.exports = MissionController;
