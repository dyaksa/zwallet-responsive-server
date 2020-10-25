const router = require("express").Router();
const authRoutes = require("./routes/auth");

// User
const userRoutes = require("./routes/user");
const transferRoutes = require("./routes/transfer");
const topupRoutes = require("./routes/topup");

// Admin
// const adminRoutes = require('./admin/routes-admin/admin')
// const transferadmRoutes = require('./admin/routes-admin/transfer')
// const topupadmRoutes = require('./admin/routes-admin/topup')

router
  .use("/auth", authRoutes)
  .use("/users", userRoutes)
  .use("/transfer", transferRoutes)
  .use("/topup", topupRoutes);
// .use('/admin', adminRoutes)
// .use('/topup', topupadmRoutes)
// .use('/transfer', transferadmRoutes)
module.exports = router;

/* 

PORT=8000
DB_HOST=us-cdbr-east-02.cleardb.com
DB_USER=beafa6c6f1a04e
DB_PASSWORD=e4db0b54
DB_NAME=heroku_edf15b710a7f7a7
*/
