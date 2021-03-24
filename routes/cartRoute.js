const router = require('express').Router();
const CartController = require('../controllers/cartController');

router.get('/', CartController.getCart);
router.post('/:prodId', CartController.addToCart);
router.delete('/:id', CartController.removeFromCart)


module.exports = router