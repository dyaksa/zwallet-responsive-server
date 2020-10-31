const db = require("../../config/mysql");

module.exports = {
  // getAllUser: (query, page, limit) => {
  //   return new Promise((resolve, reject) => {
  //     if (!limit) {
  //       limit = 10;
  //     } else {
  //       limit = parseInt(limit);
  //     }
  //     if (!page) {
  //       page = 1;
  //     } else {
  //       page = parseInt(page);
  //     }

  //     const sql = `SELECT * FROM users LIMIT ${limit} OFFSET ${
  //       (page - 1) * limit
  //     }`;
  //     db.query(sql, query, (err, result) => {
  //       if (!err) {
  //         resolve(result);
  //       } else {
  //         reject(new Error(err));
  //       }
  //     });
  //   });
  // },

  getAllUser: (query) => {
    return new Promise((resolve, reject) => {
      const { page, limit } = query;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const sql = `SELECT * FROM users WHERE role <> 6`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          const resultUsers = result.slice(startIndex, endIndex);
          resolve(resultUsers);
        }
      });
    });
  },
  getById: (id, setData) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id=${id}`, setData, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  searchByName: (id, name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE name LIKE '%${name}%' AND id <> ${id} AND role <> 6 ORDER BY name ASC`,
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
      db.query(`DELETE FROM users WHERE id=${id}`, setData, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
