const bcrypt = require("bcrypt");
const userModels = require("../models/user");
const { checkUser } = require("../../models/auth");
const { response } = require("../../helpers");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      let { page, limit } = req.query;
      const result = await userModels.getAllUser(req.query, page, limit);
      response(res, 200, result);
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },

  searchByName: async function (req, res) {
    try {
      const { q } = req.query;
      const { id } = req.token;
      const result = await userModels.searchByName(id, q);
      response(res, 200, result);
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },

  editUser: async (req, res) => {
    try {
      const { id } = req.token;
      const setData = req.body;

      if (req.file) {
        setData.photo = req.file.filename;
      }

      if (setData.currPassword && setData.password) {
        const result = await checkUser(req.token);
        const check = bcrypt.compareSync(
          setData.currPassword,
          result[0].password
        );
        if (check) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(setData.password, salt);
          setData.password = hash;
          delete setData.currPassword;
        } else {
          res.sendStatus(403);
        }
      }

      const result = await userModels.editUser(id, setData);
      if (result.affectedRows) {
        res.status(201).send({
          message: `${Object.keys(req.file || req.body)} successfully edited`,
          data: result,
        });
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await userModels.deleteUser(id);
      res.status(200).send({
        message: "Success delete data users",
      });
    } catch {
      res.status(500).send({
        message: error.message,
      });
    }
  },
};
