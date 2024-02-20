const router = require('express').Router()
const {getStats} = require('../controllers/user');
const { isAdmin, requireAuth } = require('../middlewares');

router.route('/stats')
        .get(requireAuth, isAdmin, getStats)

module.exports = router;