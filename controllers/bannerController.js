const { Banner } = require('../models')


class BannerController {
    static createBanner(req,res,next) {
        const { title, status, image_url} = req.body
        Banner.create({ title, status, image_url})
            .then((banner) => {
                res.status(201).json(banner)
            })
            .catch((err) => {
                next(err)
            })
    }

    static getAllBanner(req,res,next) {
        Banner.findAll({where: {status: 'active'}})
            .then((banners) => {
                res.status(200).json(banners)
            })
            .catch((err) => {
                next(err)
            })
    }

    static getBannerById(req,res,next) {
        let id = req.params.id
        Banner.findByPk(id)
            .then(banner => {
                res.status(200).json(banner)
            })
            .catch(err => {
                next({name: 'NotFound'})
            })
    }

    static updateBanner(req,res,next) {
        try {
            let id = req.params.id
            let {title, status, image_url} = req.body
            Banner.update({title, status, image_url}, { where: { id } })
                .then(result => {
                    if(result) {
                        res.status(200).json(result)
                    } else {
                        next({name: 'failedupdate', err})
                    }
                })
                .catch(err => {
                    next({name: 'failedupdate', err})
                })
        } catch (error) {
            next({name:'failedupdate', err:error})
        }
    }

    static deleteBanner(req,res,next) {
        let id = req.params.id
        Banner.destroy({where: {id}})
            .then(result => {
                res.status(200).json({ msg: 'Delete Success'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = BannerController