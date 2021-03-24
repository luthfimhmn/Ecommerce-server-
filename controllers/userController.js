const { User } = require('../models');
const { comparePassword } = require('../helpers/passHelper');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static login(req, res, next) {
        try {
            const { email, password } = req.body
            User.findOne({ where: { email } })
                .then((user) => {
                    if (user) {
                        //Comparesync password
                        const comparedPassword = comparePassword(password, user.password)
                        if (comparedPassword) {
                            //Generate JWT
                            const access_token = generateToken({ id: user.id, email: user.email })
                            res.status(200).json({ access_token, name:user.name, role:user.role})
                        } else {
                            next({ name: 'invalidemailorpass' })
                        }
                    } else {
                        next({name:'invalidemailorpass'})
                    }
                })
                .catch((err) => {
                    next(err)
                });
        } catch (error) {
            next(error)
        }
    }

    static register (req,res,next) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then((user) => {
                res.status(201).json({id: user.id, email: user.email, role: user.role})
            })
            .catch((err) => {
                next(err)
            });
    }
}

module.exports = UserController