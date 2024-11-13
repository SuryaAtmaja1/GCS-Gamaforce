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

  static async createMission(req, res) {
    try {
      const { nama, description, coord, date } = req.body;
      if (!nama || !coord || !Array.isArray(coord) || !date) {
        return res.status(400).json({
          status: "error",
          message: "Data misi tidak valid",
        });
      }
      const newMission = await Mission.create({
        nama,
        description,
        coord,
        date,
      });
      res.status(201).json(newMission);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Gagal membuat misi",
      });
    }
  }
}

module.exports = MissionController;
