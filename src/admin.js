const router = require("express").Router();
const authRoutes = require("./routes/auth");

const topupRoutes = require('./admin/routes-admin/topup')

router
    .use('/topup', topupRoutes)

module.exports = router
