const topupModel = require('../models/topup')

module.exports = {
    getAllTopUp: async function(req, res) {
        try {
            const result = await topupModel.getAllTopUp()
            res.status(200).send({
                message: 'Success get all post',
                data: result
            })
        } catch (err) {
            res.status(500).send({
                message: err.message
            })
        }
    }
}