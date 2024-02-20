const express = require('express');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const {createProduct, getProducts} = require('../controllers/product');
const { requireAuth, isAdmin } = require('../middlewares');

const router = express.Router()

router.route('/')
    .get(getProducts)
    .post(requireAuth, isAdmin, upload.single('image'), createProduct)


module.exports = router;