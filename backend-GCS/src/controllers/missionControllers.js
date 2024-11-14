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

  static async updateMission(req, res) {
    try {
      const { nama, description, coord, date } = req.body;
      if (!nama || !coord || !date || !Array.isArray(coord)) {
        return res.status(400).json({
          status: "error",
          massage: "Data misi tidak valid",
        });
      }

      const updateMission = await Mission.update(req.params.id, {
        nama,
        description,
        coord,
        date,
      });
      if (!updateMission) {
        return res.status(404).json({
          status: "error",
          massage: "Misi tidak ditemukan",
        });
      }
      res.json(updateMission);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Gagal memperbarui misi",
      });
    }
  }

  static async getMissionById(req, res) {
    try {
      const mission = await Mission.getById(req.params.id);
      if (!mission) {
        return res.status(404).json({
          status: "error",
          message: "Misi tidak ditemukan",
        });
      }
      res.json(mission);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Gagal mengambil data misi",
      });
    }
  }
}

module.exports = MissionController;
