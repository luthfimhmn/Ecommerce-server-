const { verifyToken } = require('../helpers/jwt')
const { User, Product } = require('../models');
const user = require('../models/user');

const authenticate = (req, res, next) => {
    try {
        let { id, email } = verifyToken(req.headers.access_token)
        User.findOne({ where: { id, email } })
            .then((user) => {
                if (user.role === 'admin') {
                    req.user = { id: user.id, email: user.email, name: user.name, role: user.role }
                    next()
                } else {
                    next({ name: 'NotAdmin' })
                }
            })
            .catch((err) => {
                next(err)
            });
    } catch (error) {
        next(error)
    }
}

const authorize = (req, res, next) => {
    let productID = +req.params.id
    Product.findByPk(productID)
        .then((product) => {
            if (!product) {
                next({ name: 'Notfound' })
            } else {
                let userId = req.user.id
                return User.findByPk(userId)
            }
        })
        .then(user => {
            if (user.role === 'admin') {
                next()
            } else {
                next({ name: 'NotAdmin' })
            }
        })
        .catch((err) => {
            next(err)
        });
}


module.exports = {
    authenticate,
    authorize
}