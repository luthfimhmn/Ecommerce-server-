const request = require('supertest');
const app = require('../app');
const { generateToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/passHelper');
const { User } = require('../models');
let access_token_user = ''

describe("Testing POST /products", function () {
    beforeAll(function () {
        //process login
        const user = {
            email: 'luthfi@mail.com',
            password: 'luthfi123'
        }
        //sign JWT
        User.findOne({ where: { email: user.email } })
            .then((user) => {
                if (user) {
                    //Comparesync password
                    const comparedPassword = comparePassword(password, user.password)
                    if (comparedPassword) {
                        //Generate JWT
                        const access_token = generateToken({ id: user.id, email: user.email })
                        access_token_user = access_token
                    } else {
                        console.log('erorr');
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    })

    it("should return response with status code 400, No JWT", function (done) {
        //execute 
        request(app)
            .post('/products')
            .send()
            .set('access_token', access_token_user)
            .end(function (err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(500)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("access_token")
                    done()
                }
            })
    })
})