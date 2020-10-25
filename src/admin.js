const router = require("express").Router();
const authRoutes = require("./routes/auth");

const topupRoutes = require("./admin/routes/topup");
const adminRoutes = require("./admin/routes/user");

router.use("/topup", topupRoutes).use("/", adminRoutes);

module.exports = router;
