const request = require('supertest');
const app = require('../app');


describe("Testing POST /products", function () {
    let access_token_user = ''
    describe("Testing POST /products success", () => {
        beforeAll(function (done) {
            request(app)
                .post('/login')
                .send({
                    email: 'luthfi@mail.com',
                    password: 'luthfi123'
                })
                .end((err, res) => {
                    access_token_user = res.body.access_token
                    done()
                })
        })
        it("should return response with status code 201", function (done) {
            //setup 
            const newProduct = {
                name: 'baju',
                image_url: 'test',
                price: 50000,
                stock: 10
            }
            //execute 
            request(app)
                .post('/products')
                .set('access_token', access_token_user)
                .send(newProduct)
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        expect(res.statusCode).toEqual(201)
                        expect(typeof res.body).toEqual("object")
                        done()
                    }
                })
        })
    })
    describe("Testing POST /products failed", () => {
        beforeAll(function (done) {
            request(app)
                .post('/login')
                .send({
                    email: 'customer@mail.com',
                    password: 'customer'
                })
                .end((err, res) => {
                    access_token_user = res.body.access_token
                    done()
                })
        })
        it("should return response with status code 400", (done) => {
            //setup 
            const newProduct = {
                name: 'tanaman',
                image_url: 'test',
                price: 30000,
                stock: 10
            }
            //execute
            request(app)
                .post('/products')
                .set('access_token', access_token_user)
                .send(newProduct)
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        expect(res.statusCode).toEqual(500)
                        expect(typeof res.body).toEqual("object")
                        done()
                    }
                })
        })
    })
})