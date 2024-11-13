const db = require("../config/missionDatabase");

class Mission {
  static createGeoJSON(coord) {
    return {
      type: "Feature",
      geometry: {
        type: "lineString",
        coordinates: coord.map(([lat, lng]) => [lat, lng]),
      },
    };
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM missions", [], (err, rows) => {
        if (err) reject(err);
        const missions = rows.map((row) => ({
          ...row,
          coord: JSON.parse(row.coord),
          GeoJSON: JSON.parse(row.GeoJSON),
        }));
        resolve({ missions });
      });
    });
  }
}

module.exports = Mission;
