var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect  = require('chai').expect;
var api = 'https://testapp.devdigi.me';
var username = Math.random().toString(36).substring(2, 15);
var password = Math.random().toString(36).substring(2, 15);
var id,token;
const nodemailer = require('nodemailer');


describe('POST user', () => {
    it('Should create a user', (done) => {
        chai
            .request(api)
            .post('/api/users')
            .send({"username": username, 'password':password})
            .end(function (error, response) {
                if (error) done(error);
                const result = response.statusCode;
                var bodyObj = response.body;
                id = response.body.id;
                expect(result).to.equal(201);
                console.log(bodyObj);
                done();                
            })
    })
})

describe('PUT - update user', () => {
    it('Should update password', (done) => {
        chai
            .request(api)
            .post('/api/users')
            .send({"username": username, 'password':password +'update'})
            .end(function (error, response) {
                if (error) done(error);
                const result = response.statusCode;
                var bodyObj = response.body;
                expect(result).to.equal(201);
                console.log(bodyObj);
                done();                
            })
    })
})


describe('GET user', () => {
    it('Should get a user', (done) => {
        chai
            .request(api)
            .get('/api/users/'+ id)
            .end(function (error, response) {
                if (error) done(error);
                const result = response.statusCode;
                var bodyObj = response.body;
                expect(result).to.equal(200);
                console.log(bodyObj);
                done();
            }) 
    })
})

describe('GET user token', () => {
    it('Should get a token', (done) => {
        chai
            .request(api)
            .get('/api/token')
            .auth(username,password)
            .end(function (error, response) {
                if (error) done(error);
                const result = response.statusCode;
                var bodyObj = response.body;
                token = response.body.token;
                expect(result).to.equal(200);
                console.log(bodyObj);
                done();
            }) 
    })
})

describe('GET user resource', () => {
    it('Should get a resource', (done) => {
        chai
            .request(api)
            .get('/api/resource')
            .auth(token,'')
            .end(function (error, response) {
                if (error) done(error);
                const result = response.statusCode;
                var bodyObj = response.body;
                expect(result).to.equal(200);
                console.log(bodyObj);
                done();
            }) 
    })
})

describe('DELETE user resource', () => {
    it('should delete user', (done) => {
        chai
            .request(api)
            .del('/api/users/' + id)
            .end(function (error, response) {
                if (error) done(error);
                const result = response.statusCode;
                var bodyObj = response.body;
                expect(result).to.equal(200);
                console.log(bodyObj);
                done();
            }) 
    })
})


