const router = require('express').Router();
const ProductController = require('../controllers/productController');
const CartController = require('../controllers/cartController');
const { authorize } = require('../middlewares/auth');

// router.use(authenticate)
router.get('/', ProductController.getAllProduct);
// router.post('/:prodId', CartController.addToCart);
router.use(authorize)
router.post('/', ProductController.createProduct);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;