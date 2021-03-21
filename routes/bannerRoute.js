const BannerController = require('../controllers/bannerController')
const router = require('express').Router()
const { authorize } = require('../middlewares/auth')


router.get('/', BannerController.getAllBanner);
router.use(authorize)
router.post('/', BannerController.createBanner);
router.get('/:id', BannerController.getBannerById);
router.put('/:id', BannerController.updateBanner);
router.delete('/:id', BannerController.deleteBanner);

module.exports = router