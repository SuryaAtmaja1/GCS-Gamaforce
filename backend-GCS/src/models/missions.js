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
        if (err) {
          console.error("Database query error:", err);
          reject(err); // This prevents uncaught errors that may terminate the server
        } else {
          const missions = rows.map((row) => ({
            ...row,
            coord: row.coord ? JSON.parse(row.coord) : null,
            geoJSON: row.geoJSON ? JSON.parse(row.geoJSON) : null,
            description: row.description || null,
          }));
          resolve({ missions });
        }
      });
    });
  }

  static async create(missionData) {
    const { nama, description, coord } = missionData;
    const home = coord[0];
    const geoJSON = this.createGeoJSON(coord);

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO missions (nama, description, coord, home, geoJSON)
        VALUES (?, ?, ?, ?, ?)`,
        [
          nama,
          description || null,
          JSON.stringify(coord),
          JSON.stringify(home),
          JSON.stringify(geoJSON),
        ],
        function (err) {
          if (err) reject(err);
          resolve({
            mission_id: this.lastID,
            nama,
            description,
            coord,
            home,
            geoJSON,
          });
        }
      );
    });
  }
}

module.exports = Mission;
