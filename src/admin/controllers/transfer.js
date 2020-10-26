const transferModel = require("../models/transfer");
const { response } = require("../../helpers");

module.exports = {
  getTransfer: async function (req, res) {
    try {
      const result = await transferModel.getTransfer(req.query);
      response(res, 200, result);
    } catch (err) {
      response(res, 500, { message: err.message });
    }
  },

  searchUser: async function (req, res) {
    try {
      const result = await transferModel.searchUser(req.query, req.token);
      response(res, 200, result);
    } catch (err) {
      response(res, 500, { message: "Nothing found" });
    }
  },
};
