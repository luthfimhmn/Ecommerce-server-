const { Product } = require('../models')

class ProductController {
    static createProduct(req, res, next) {
        const { name, image, description } = req.body
        Product.create({ name, image, description })
            .then((product) => {
                res.status(201).json(product)
            })
            .catch((err) => {
                next(err)
            });
    }
}

module.exports = ProductController