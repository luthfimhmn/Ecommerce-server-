const router = require('express').Router();
const UserController = require('../controllers/userController');
const productRoute = require('./productRoute')
const bannerRoute = require('./bannerRoute')
const { authenticate } = require('../middlewares/auth')


router.post('/login', UserController.login);
router.use(authenticate)
router.use('/products', productRoute);
router.use('/banners', bannerRoute);

module.exports = router;