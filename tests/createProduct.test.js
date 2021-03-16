const request = require('supertest');
const app = require('../app');
const deleteProducts = require('../helpers/delete-products')


describe("Testing POST /products", function () {
    afterAll(function(){
        //delete data
        deleteProducts()
            .then(()=> done())
            .catch(done)
    })
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
        it("should return response with status code 400, field required is empty",(done)=>{
            //setup
            const newProduct = {
                name: '',
                image_url: '',
                price: '',
                stock: 10
            }
            //execute
            request(app)
                .post('/products')
                .set('access_token',access_token_user)
                .send(newProduct)
                .end((err,res)=>{
                    if(err){
                        done(err)
                    } else {
                        expect(res.statusCode).toEqual(400)
                        expect(typeof res.body).toEqual("object")
                        expect(res.body.details).toEqual(expect.arrayContaining([
                            'Name Product is required',
                            'Image URL is required',
                            'Price is required'
                        ]))
                        done()
                    }
                })
        })
        it("should return response with status code 400, field stock is minus",(done)=>{
            //setup
            const newProduct = {
                name: 'baju',
                image_url: 'testing',
                price: 0,
                stock: -10
            }
            //execute
            request(app)
                .post('/products')
                .set('access_token',access_token_user)
                .send(newProduct)
                .end((err,res)=>{
                    if(err){
                        done(err)
                    } else {
                        expect(res.statusCode).toEqual(400)
                        expect(typeof res.body).toEqual("object")
                        expect(res.body.details).toEqual(expect.arrayContaining(['Stock minimum is 0']))
                        done()
                    }
                })
        })
        it("should return response with status code 400, field price is minus",(done)=>{
            //setup
            const newProduct = {
                name: 'baju',
                image_url: 'testing',
                price: -10,
                stock: 10
            }
            //execute
            request(app)
                .post('/products')
                .set('access_token',access_token_user)
                .send(newProduct)
                .end((err,res)=>{
                    if(err){
                        done(err)
                    } else {
                        expect(res.statusCode).toEqual(400)
                        expect(typeof res.body).toEqual("object")
                        expect(res.body.details).toEqual(expect.arrayContaining(['Price minimum is 0']))
                        done()
                    }
            })
        })
        it("should return response with status code 400, field stock is string", (done)=>{
            //setup
            const newProduct = {
                name: 'baju',
                image_url: 'testing',
                price: 10000,
                stock: 'testing'
            }
            //execute
            request(app)
                .post('/products')
                .set('access_token', access_token_user)
                .send(newProduct)
                .end((err,res)=>{
                    if(err){
                        done(err)
                    } else {
                        expect(res.statusCode).toEqual(400)
                        expect(typeof res.body).toEqual("object")
                        expect(res.body.details).toEqual(expect.arrayContaining(['Stock must in number']))
                        done()
                    }
                })

        })
    })
})

describe("Testing POST /products failed", () => {
    let access_token_user = ''
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
    it("should return response with status code 400, login with customer acc", (done) => {
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
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body.message).toEqual(expect.stringContaining(`You're not admin`))
                    done()
                }
            })
    })
})

