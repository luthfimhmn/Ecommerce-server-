const router = require('express').Router();
const ProductController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/auth');


router.use(authenticate)
router.post('/products', ProductController.createProduct)

module.exports = router;