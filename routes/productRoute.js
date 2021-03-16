const router = require('express').Router();
const ProductController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/auth');

router.use(authenticate)
router.get('/', ProductController.getAllProduct);
router.post('/', ProductController.createProduct);
router.put('/', ProductController.updateProduct);
router.delete('/', ProductController.deleteProduct);

module.exports = router;