const request = require('supertest');
const app = require('../app');
const deleteProducts = require('../helpers/delete-products')
const createDummyProduct = require('../helpers/create-product')

describe("Testing PUT /products/:id, Success", () => {
    let productId = ''
    let access_token_user = ''
    afterAll(done => {
        //delete Data
        deleteProducts()
            .then(() => done())
            .catch((done))
    })

    beforeAll(function (done) {
        request(app)
            .post('/login')
            .send({
                email: 'luthfi@mail.com',
                password: 'luthfi123'
            })
            .end((err, res) => {
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
    it("should return response with status code 200, success", (done) => {
        //setup
        const newProduct = {
            name: 'baju sukses',
            image_url: 'testing',
            price: 10000,
            stock: 100
        }
        //execute
        request(app)
            .put('/products/'+ productId )
            .set('access_token', access_token_user)
            .send(newProduct)
            .end((err,res)=>{
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



describe("Testing PUT /products:id, without Access Token", () => {
    let productId = ''
    afterAll((done) => {
        //delete data
        deleteProducts()
            .then(()=> done())
            .catch(done)
    })

    beforeAll(function (done) {
        request(app)
            .post('/login')
            .send({
                email: 'customer@mail.com',
                password: 'customer'
            })
            .end((err, res) => {
                if(err){
                    done(err)
                } else {
                    access_token_user = res.body.access_token
                    done()
                }
            })
    })

    beforeAll((done) => {
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

    it("should return response with status code 400, No access Token", (done)=>{
        //setup
        const newProduct = {
            name: 'baju',
            image_url: 'testing',
            price: 10000,
            stock: 100
        }
        //execute
        request(app)
            .put('/products/'+ productId )
            .send(newProduct)
            .end((err,res)=>{
                if(err){
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(500)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body.message).toEqual("Internal Server Error")
                    done()
                }
            })
    })
})


describe("Testing PUT /products not admin", () => {
    let access_token_user = ''
    let productId = ''
    afterAll((done) => {
        //delete data
        deleteProducts()
            .then(()=> done())
            .catch(done)
    })

    beforeAll(function (done) {
        request(app)
            .post('/login')
            .send({
                email: 'customer@mail.com',
                password: 'customer'
            })
            .end((err, res) => {
                if(err){
                    done(err)
                } else {
                    access_token_user = res.body.access_token
                    done()
                }
            })
    })

    beforeAll((done) => {
        createDummyProduct()
            .then(product => {
                productId = product.id
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
    it("should return response with status code 400, not admin" , (done) => {
        //setup 
        const newProduct = {
            name: 'baju',
            image_url: 'testing',
            price: 10000,
            stock: 10
        }
        //execute
        request(app)
            .put('/products/' + productId)
            .set('access_token', access_token_user)
            .send(newProduct)
            .end((err,res)=>{
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


describe("Testing PUT /products, minus stock,price,invalid format", () => {
    let access_token_user = ''
    let productId = ''
    afterAll((done) => {
        //delete data
        deleteProducts()
            .then(()=> done())
            .catch(done)
    })

    beforeAll((done) => {
        request(app)
            .post('/login')
            .send({
                email: 'luthfi@mail.com',
                password: 'luthfi123'
            })
            .end((err,res)=>{
                if(err){
                    done(err)
                } else {
                    access_token_user = res.body.access_token
                    done()
                }
            })
    })

    beforeAll((done) => {
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

    it("should return response with status code 400, field stock is minus", (done) => {
        //setup
        console.log(productId, 'INI PRODUCT ID')
        const newProduct = {
            name: 'baju',
            image_url: 'testing',
            price: 0,
            stock: -10
        }
        //execute
        request(app)
            .put('/products/' + productId)
            .set('access_token', access_token_user)
            .send(newProduct)
            .end((err,res) => {
                if(err){
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    // expect(res.body.err).toEqual(expect.arrayContaining(['Stock minimum is 0']))
                    done()
                }
            })
    })
    it("should return response with status code 400, field price is minus",(done) => {
        //setup
        const newProduct = {
            name: 'baju',
            image_url: 'testing',
            price: -10,
            stock: 10
        }
        //execute
        request(app)
            .put('/products/' + productId)
            .set('access_token',access_token_user)
            .send(newProduct)
            .end((err,res)=>{
                if(err){
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    // expect(res.body.details).toEqual(expect.arrayContaining(['Price minimum is 0']))
                    done()
                }
        })
    })
    it("should return response with status code 400, field stock is string", (done) => {
        //setup
        const newProduct = {
            name: 'baju',
            image_url: 'testing',
            price: 10000,
            stock: 'testing'
        }
        //execute
        request(app)
            .put('/products/' + productId)
            .set('access_token', access_token_user)
            .send(newProduct)
            .end((err,res)=>{
                if(err){
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    console.log(res.body)
                    done()
                }
            })

    })
})