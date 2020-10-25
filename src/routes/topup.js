const topupController = require('../controllers/topup')
const router = require('express').Router()
const { authentication } = require('../middlewares/auth')

router
    .get('/', authentication, topupController.getAllTopUp)
    
module.exports = router