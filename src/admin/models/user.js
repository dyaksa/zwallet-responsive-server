const db = require("../../config/mysql");

module.exports = {
  getAllUser: (query, page, limit) => {
    return new Promise((resolve, reject) => {
      if (!limit) {
        limit = 10;
      } else {
        limit = parseInt(limit);
      }
      if (!page) {
        page = 1;
      } else {
        page = parseInt(page);
      }

      const sql = `SELECT * FROM users LIMIT ${limit} OFFSET ${
        (page - 1) * limit
      }`;
      db.query(sql, query, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  searchAllUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT name, phone, photo, balance FROM users WHERE id <> ? AND role <> 6 ORDER BY name ASC",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  searchOneById: (phone, token_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT name, phone, photo, balance FROM users WHERE phone=${phone} AND role <> 6 AND id <> ${token_id}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  searchByName: (id, name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT name, phone, photo, balance FROM users WHERE name LIKE '%${name}%' AND id <> ${id} AND role <> 6 ORDER BY name ASC`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  editUser: (id, setData) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET ? WHERE id=${id}`, setData, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  deleteUser: (id, setData) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE users SET ?  WHERE id=${id}`, setData, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
