const { verifyToken } = require('../helpers/jwt')
const { Cart, User, Product } = require('../models');

const authenticate = (req, res, next) => {
    try {
        let { id, email } = verifyToken(req.headers.access_token)
        User.findOne({ where: { id, email } })
            .then((user) => {
                req.user = { id: user.id, email: user.email, name: user.name, role: user.role }
                next()
            })
            .catch((err) => {
                next(err)
            });
    } catch (error) {
        next(error)
    }
}

const authorize = (req, res, next) => {
    if (req.user.role === 'admin') {
        next()
    } else {
        next({name: 'NotAdmin'})
    }
}

const authorizeUser = (req,res,next) => {
    let productId = req.params.id
    Cart.findOne({where: {}})
        .then((result) => {
            if(result) {
                if(result.UserId === req.user.id) {
                    next()
                } else {
                    next({ name: 'Unauthorized'})
                }
            }
        })
        .catch((err) => {
            next({ name: 'Unauthorized' })
        });
}


module.exports = {
    authenticate,
    authorize,
    authorizeUser
}