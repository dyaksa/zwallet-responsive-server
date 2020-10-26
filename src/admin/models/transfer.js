const db = require("../../config/mysql");

module.exports = {
  getTransfer: function (query) {
    return new Promise((resolve, reject) => {
      const { page, limit } = query;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const sql = `SELECT * FROM users`;
      db.query(sql, (err, result) => {
        if (!err) {
          const resultUsers = result.slice(startIndex, endIndex);
          resolve(resultUsers);
        } else {
          reject(err);
        }
      });
    });
  },

  searchUser: (query, token) => {
    return new Promise((resolve, reject) => {
      const { page, limit, name } = query;
      const { id } = token
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const sql = `SELECT * FROM users WHERE (name) LIKE '%${name}%' AND id <> ${id} AND role <> 6 ORDER BY name ASC`;
      db.query(sql, (err, result) => {
        let array = [];
        if (result.length === array.length) {
          reject(err);
        } else {
          if (!err) {
            const resultUsers = result.slice(startIndex, endIndex);
            resolve(resultUsers);
          } else {
            reject(err);
          }
        }
      });
    });
  },
};
