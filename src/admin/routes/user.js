const router = require("express").Router();
const adminController = require("../controllers/user");
const { authentication, authorization } = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");

router
  .get("/search", authentication, authorization, adminController.searchAllUser)
  .get("/search/receiver", authentication, authorization, adminController.searchOneById)
  .get("/search/query", authentication, authorization, adminController.searchByName)
  .get("/", authentication, authorization, adminController.getAllUser)
  .patch("/", upload, authentication, authorization, adminController.editUser);

  .get("/search/query", authentication, adminController.searchByName)
  .get("/", authentication, authorization, adminController.getAllUser)
  .patch("/", upload, authentication, adminController.editUser)
  .delete("/:id", authentication, adminController.deleteUser);
module.exports = router;
