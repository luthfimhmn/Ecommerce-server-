const router = require('express').Router();
const CartController = require('../controllers/cartController');
const { authorizeUser } = require('../middlewares/auth');

router.get('/', CartController.getCart);
router.post('/:prodId', CartController.addToCart);
router.patch('/min/:id', CartController.subtractCart);
router.use('/:id', authorizeUser)
router.delete('/:id', CartController.removeFromCart);


module.exports = router