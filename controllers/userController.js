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
                            res.status(200).json({ access_token })
                        } else {
                            next({ name: 'invalidemailorpass' })
                        }
                    }
                })
                .catch((err) => {
                    next(err)
                });
        } catch (error) {
            next(error)
        }

    }
}

module.exports = UserController