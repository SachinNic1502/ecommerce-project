const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, upload.single('image'), createProduct);

router.route('/:id')
  .put(protect, admin, upload.single('image'), updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
