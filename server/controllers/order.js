const Order = require("../models/order")
const AppError = require("../utilities/AppError")
const moment = require('moment/moment')

const getOrderStats = async (req, res) => {
    const prevMonth = moment()
        .month(moment().month() - 1)
        .set('date', 1)
        .format('YYYY-MM-DD hh-mm-ss')

    try {
        const orders = await Order.aggregate([
        {
                $match: { createdAt: { $gte: new Date(prevMonth) } }
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
        if (orders) return res.status(200).json(orders)
        throw new AppError('Error fetching orders', 403)
    } catch (error) {
        next(error)
    }
}

const getEarnings = async (req, res) => {
    const prevMonth = moment()
        .month(moment().month() - 1)
        .set('date', 1)
        .format('YYYY-MM-DD hh-mm-ss')

    try {
        const earnings = await Order.aggregate([
        {
                $match: { createdAt: { $gte: new Date(prevMonth) } }
        },
        {
            $project: {
                month: {
                    $month: '$createdAt'
                },
                sales: '$total'
            }
        },
        {
            $group: {
                _id: '$month',
                total: {$sum: '$sales'}
            }
        }
        ])
        if (earnings) return res.status(200).json(earnings)
        throw new AppError('Error fetching earnings', 403)
    } catch (error) {
        next(error)
    }
}

const getWeekStats = async (req, res, next) => {
    const last7days = moment()
        .day(moment().day() - 7)
        .format('YYYY-MM-DD hh-mm-ss')

    try {
        const weeklySales = await Order.aggregate([
        {
                $match: { createdAt: { $gte: new Date(last7days) } }
        },
        {
            $project: {
                day: {
                    $dayOfWeek: '$createdAt'
                },
                sales: '$total'
            }
        },
        {
            $group: {
                _id: '$day',
                total: {$sum: '$sales'}
            }
        }
        ])
        if (weeklySales) return res.status(200).json(weeklySales)
        throw new AppError('Error fetching earnings', 403)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getOrderStats,
    getEarnings,
    getWeekStats
}