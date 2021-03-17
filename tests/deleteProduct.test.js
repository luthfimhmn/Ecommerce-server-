const request = require('supertest');
const app = require('../app');
const createDummyProduct = require('../helpers/create-product');

describe("Testing DELETE /products/:id", function() {
    let productId = ''
    let access_token_user = ''
    describe("Testing DELETE /products/:id success", ()=> {
        beforeAll(done => {
            request(app)
                .post('/login')
                .send({
                    email: 'luthfi@mail.com',
                    password: 'luthfi123'
                })
                .end((err,res)=> {
                    if(err){
                        done(err)
                    } else {
                        access_token_user = res.body.access_token
                        done()
                    }
                })
        })

        beforeAll(done => {
            createDummyProduct()
                .then(product => {
                    productId = product.id
                    done()
                })
                .catch(err => {
                    console.log(err)
                    done(err)
                })
        })
        it("should return response with status code 200", function (done){
            request(app)
                .delete('/products/' + productId)
                .set('access_token',access_token_user)
                .end((err,res) => {
                    if(err){
                        done(err)
                    } else {
                        expect(res.statusCode).toEqual(200)
                        expect(typeof res.body).toEqual("object")
                        done()
                    }
                })
        })
    })
})

describe("Testing DELETE /products/:id, fail", function(){
    let productId = ''
    beforeAll(done => {
        createDummyProduct()
            .then(product => {
                productId = product.id
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    })
    it("should return response with status code 500, no Access Token", function (done){
        request(app)
            .delete('/products/' + productId)
            .end((err,res) => {
                if(err){
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(500)
                    expect(typeof res.body).toEqual("object")
                    done()
                }
            })
    })
})

describe("Testing DELETE /products/:id, fail", function(){
    let productId = ''
    let access_token_user = ''

    beforeAll(done => {
        request(app)
            .post('/login')
            .send({
                email: 'customer@mail.com',
                password: 'customer'
            })
            .end((err,res)=> {
                if(err){
                    done(err)
                } else {
                    access_token_user = res.body.access_token
                    done()
                }
            })
    })

    beforeAll(done => {
        createDummyProduct()
            .then(product => {
                productId = product.id
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    })


    it("should return response with status code 400, Not Admin", function (done){
        request(app)
            .delete('/products/' + productId)
            .set('access_token',access_token_user)
            .end((err,res) => {
                if(err){
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body.message).toEqual(expect.stringContaining(`You're not admin`))
                    done()
                }
            })
    })
})