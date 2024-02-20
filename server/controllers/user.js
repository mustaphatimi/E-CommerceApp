const moment = require('moment/moment')
const { requireAuth } = require('../middlewares')
const User = require('../models/user')

const getStats = async (req, res, next) => {
    const prevMonth = moment()
        .month(moment().month() - 1)
        .set('date', 1)
        .format('YYYY-MM-DD hh:mm:ss')
    
    const users = await User.aggregate([
        {
            $match: {
                createdAt : { $gte: new Date(prevMonth)}
            }
        },
        {
            $project: {
                month: {
                    $month: '$createdAt'
                }
            }
        },
        {
            $group: {
                _id: '$month',
                total: {$sum: 1}
            }
        }
    ])
    
    res.send(users)
}

module.exports = {
    getStats
}