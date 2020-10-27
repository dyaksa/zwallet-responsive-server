const router = require('express').Router()
const transferController = require('../controllers/transfer')
const { authentication, authorization } = require('../middlewares/auth')

router
    .get('/history/all', authentication, transferController.getAllHistoryUser)
    .get('/history', authentication, transferController.getHistoryUser)
    .get('/history/today', authentication, transferController.getHistoryToday)
    .post('/', authentication, transferController.postTransfer)

module.exports = router