const router = require('express').Router();
const Order = require('../models/order')
const { requireAuth, isAdmin } = require('../middlewares');
const {getOrderStats, getEarnings, getWeekStats} = require('../controllers/order')

router.route('/stats')
    .get(requireAuth, isAdmin, getOrderStats)
    
router.route('/earnings')
    .get(requireAuth, isAdmin, getEarnings)

router.route('/week-stats')
    .get(requireAuth, isAdmin, getWeekStats)

module.exports = router;