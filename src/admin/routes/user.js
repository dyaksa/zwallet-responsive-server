const router = require("express").Router();
const adminController = require("../controllers/user");
const { authentication, authorization } = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");

router
  .get("/search/query", authentication, adminController.searchByName)
  .get("/", authentication, authorization, adminController.getAllUser)
  .patch("/", upload, authentication, adminController.editUser)
  .delete("/", authentication, adminController.deleteUser);
module.exports = router;
