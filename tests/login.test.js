const request = require('supertest');
const app = require('../app');

describe("Testing POST /login", function () {
    it("should return response with status code 200", function (done) {
        //setup
        const body = {
            email: 'luthfi@mail.com',
            password: 'luthfi123'
        }
        //execute
        request(app)
            .post('/login')
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("access_token")
                    done()
                }
            })
    })
    it("should return with status code 400, Wrong Password", function (done) {
        //setup 
        const body = {
            email: 'luthfi@mail.com',
            password: 'luthfi1234'
        }
        //execute
        request(app)
            .post('/login')
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty('message')
                    done()
                }
            })
    })
    it("should return with status code 400, Wrong Email", function (done) {
        //setup 
        const user = {
            email: 'luthfiz@mail.com',
            password: 'luthfi123'
        }
        //execute
        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    done()
                }
            })
    })
    it("should return with status code 400, No Email and Password",function(done){
        //setup
        const user ={
            email : '',
            password: ''
        }
        //execute
        request(app)
            .post('/login')
            .send(user)
            .end((err,res)=>{
                if(err){
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    done()
                }
            })

    })
})