const userModel = require("../models/user");
const service = require("../services/service");

module.exports = {
    success: async function(req,res){
        res.status(201).send({
            success: true,
            message: "topup is successful",
        })
    },

    failed: async function(res,res){
        res.status(403).send({
            success: false,
            message: "forbidden"
        })
    },

    accepted: async function(req,res){
        try {
            const {id, order_id} = req.query;
            const status = await service.getStatus(order_id);
            const user = await userModel.getUserLogin(id);
            if(status.transaction_status == "settlement" && status.order_id == order_id){
                const currentBalance = user[0].balance;
                const successBalance = parseInt(status.gross_amount);
                const total = currentBalance + successBalance;
                await userModel.editUser(id,{balance: total});
                res.redirect(`${process.env.API_URI}/accepted/success`);
            }else{
                res.redirect(`${process.env.API_URI}/accepted/failed`);
            }
        }catch(err){
            res.redirect(`${process.env.API_URI}/accepted/failed`);
        }
    }
}