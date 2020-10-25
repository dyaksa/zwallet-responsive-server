const db = require('../config/mysql')

module.exports = {
    getAllTopUp: function() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM topup ORDER BY sequence ASC', (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}