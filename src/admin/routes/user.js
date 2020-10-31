const router = require("express").Router();
const adminController = require("../controllers/user");
const { authentication, authorization } = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");

router
  .get("/search/query", authentication, adminController.searchByName)
  .get("/", authentication, authorization, adminController.getAllUser)
  .get("/:id", authentication, authorization, adminController.getById)
  .patch("/:id", upload, authentication, authorization, adminController.editUser)
  .delete("/:id", authentication, authorization, adminController.deleteUser);
  
module.exports = router;
