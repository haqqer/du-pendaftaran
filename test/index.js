const mongoose = require('mongoose');
const Daftar = require('../src/models/daftar.model');
const User = require('../src/models/user.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET api', () => {
    it('it should a message', (done) => {
        chai.request(app)
            .get('/api')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                done()
            });
    });
});
describe('Auth', () => {
    describe('POST api/auth/login', () => {
        it('POST auth login', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({email: 'admin@email.com', password: 'admin'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                done();
                })
        })
    })
})

describe('Daftar', () => {
    describe('/GET api/daftar', () => {
        it('it should GET all the Daftar', (done) => {
            chai.request(app)
                .get('/api/daftar')
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                done();
                });
        });
    });
});

describe('User', () => {
    describe('/GET api/user', () => {
        it('it should GET all the User', (done) => {
            chai.request(app)
                .get('/api/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
                });
        });
    });
});



