const { Product } = require('../models')

class ProductController {
    static createProduct(req, res, next) {
        const { name, image_url, price, stock } = req.body
        Product.create({ name, image_url, price, stock })
            .then((product) => {
                res.status(201).json(product)
            })
            .catch((err) => {
                next(err)
            });
    }
    static getAllProduct(req, res, next) {
        Product.findAll()
            .then((products) => {
                res.status(200).json(products)
            })
            .catch((err) => {
                next(err)
            });
    }

    static updateProduct(req, res, next) {
        try {
            let id = +req.params.id
            let { name, image_url, price, stock } = req.body
            Product.update({ name, image_url, price, stock }, { where: { id } })
                .then((result) => {
                    if(result){
                        res.status(200).json(result)
                    } else {
                        next({name: "failedupdate", err})
                    }
                })
                .catch((err) => {
                    next({name: "failedupdate", err})
                });
        } catch (error) {
            next({name: "failedupdate", err: error})
        }
    }

    static deleteProduct(req, res, next) {
        let id = +req.params.id
        Product.destroy({ where: { id } })
            .then((result) => {
                res.status(200).json({ msg: 'Delete Success' })
            })
            .catch((err) => {
                next(err)
            });
    }

    static getProductById(req,res,next) {
        let id = +req.params.id
        Product.findByPk(id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next({name: 'NotFound'})
            })
    }
}

module.exports = ProductController