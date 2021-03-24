const router = require('express').Router();
const UserController = require('../controllers/userController');
const productRoute = require('./productRoute')
const bannerRoute = require('./bannerRoute')
const cartRoute = require('./cartRoute');
const { authenticate } = require('../middlewares/auth')


router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.use(authenticate)
router.use('/products', productRoute);
router.use('/banners', bannerRoute);
router.use('/cart', cartRoute);

module.exports = router;