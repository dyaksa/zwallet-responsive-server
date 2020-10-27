const router = require("express").Router();
const adminController = require("../controllers/user");
const { authentication, authorization } = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");

router
  .get("/search/query", authentication, adminController.searchByName)
  .get("/", authentication, authorization, adminController.getAllUser)
  .get("/:id", authentication, authorization, adminController.getById)
  .patch("/", upload, authentication, adminController.editUser)
  .delete("/:id", authentication, adminController.deleteUser);
module.exports = router;
