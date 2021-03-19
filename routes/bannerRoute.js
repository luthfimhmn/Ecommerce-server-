const BannerController = require('../controllers/bannerController')
const router = require('express').Router()
// const { authenticate } = require('../middlewares/auth')

// router.use(authenticate)
router.get('/', BannerController.getAllBanner);
router.post('/', BannerController.createBanner);
router.get('/:id', BannerController.getBannerById);
router.put('/:id', BannerController.updateBanner);
router.delete('/:id', BannerController.deleteBanner);

module.exports = router