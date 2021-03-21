const { verifyToken } = require('../helpers/jwt')
const { User, Product } = require('../models');

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


module.exports = {
    authenticate,
    authorize
}