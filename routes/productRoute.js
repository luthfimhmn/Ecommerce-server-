const router = require('express').Router();
const ProductController = require('../controllers/productController');
// const { authenticate, authorize } = require('../middlewares/auth');

// router.use(authenticate)
router.get('/', ProductController.getAllProduct);
router.post('/', ProductController.createProduct);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;