const router = require('express').Router();
const transferController = require('../controllers/transfer');
const { authentication, authorization } = require('../../middlewares/auth');

router.get('/', authentication, authorization, transferController.getTransfer);
router.get('/search/query', authentication, authorization, transferController.searchUser);

module.exports = router;