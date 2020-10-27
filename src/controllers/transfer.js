const { response } = require('../helpers')
const transferModel = require('../models/transfer')

module.exports = {
    getHistoryUser: async function(req, res) {
        try {
            const { id } = req.token
            let { order, page } = req.query
            if(!page) {
                page = 1
            } else {
                parseInt(page)
            }
            const offset = (2 * page) - 2
            const result = await transferModel.getHistoryUser(id, order, offset)
            response(res, 200, result)
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    getAllHistoryUser: async function(req, res) {
        try {
            const { id } = req.token
            const result = await transferModel.getAllHistoryUser(id)
            response(res, 200, result)       
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    getHistoryToday: async function(req, res) {
        try {
            const { id } = req.token
            const result = await transferModel.getHistoryToday(id)
            response(res, 200, result)
        } catch (error) {
            response(res, 500, { message: error.message })
        }
    },
    postTransfer: async function(req, res) {
        try {
            const pinBody = req.body.pin
            const { id, pin } = req.token
            if(pinBody == pin) {
                const { phone_receiver } = req.body
                const setData = req.body
                delete setData.pin
                delete setData.phone_receiver
                setData.id_sender = id
                const result = await transferModel.postTransfer(phone_receiver, setData)
                res.status(201).send({
                    message: 'Success created a transfer',
                    data: result
                })
            } else {
                res.status(403).send({
                    message: 'Invalid PIN'
                })
            }
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
}