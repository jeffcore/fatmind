var app = require('../app');
//require('../app_api/models/db.js');
var request = require('supertest');
var should = require('should');
var mongoose = require('mongoose');
var Quantum = mongoose.model('Quantum');
var User = mongoose.model('User');
var api = request('http://localhost:3000');
var config = require('../config');

describe('Quantum Controller Unit Tests:', function(){
    var token = null;
    var user = null;
    var quantum = null;
    var quantumID = null;
    var quantum_update_data = null;
    before(function(done){
        user = new User({
            username: 'testerted', 
            password: '553399',
            email: 'tester@tester.com'
        });

        user.save(function(err){
            quantum = new Quantum({
                note: 'the best node',
                userID: user._id,
                alive: 1
            });

            quantum_update_data = {
                note: 'this has been updated',
                userID: user._id,
                alive: 0
            };

            quantum.save(function(err){
                done();
            });

        });

    });

    before(function(done){

        api
            .post('/api/login')
            .set('Accept', 'application/x-www-form-urlencoded')
            .set('x-api-key', config.apiKey)
            .send({ email: user.email, password: '553399'})
            .end(function(err, res) {
                token = res.body.token;
                done();
            });

    });


    //describe('Testing Authentication', function(){
    //    it('Should be able authenticate with out any problems', function(done){
    //        api
    //            .post('/api/login')
    //            .set('Accept', 'application/x-www-form-urlencoded')
    //            .set('x-api-key', 'aD7WrqSxV8ur7C59Ig6gf72O5El0mz04')
    //            .send({ username: user.username, password: '553399'})
    //            .expect(201)
    //            .expect('Content-Type', /json/)
    //            .end(function(err, res) {
    //                should.not.exist(err);
    //                token = res.body.token;
    //                should.exist(token);
    //                done();
    //            });
    //    });
    //});

    describe('Testing the GET Methods - Get Quantum List', function(){

        it('Should be able to get a list of quantums', function(done){
            api.get('/api/quantum/')
                .set('x-api-key', config.apiKey)
                .set('x-access-token', token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    //res.body.should.be.an.Array.and.have.lengthOf(1);
                    res.body.should.have.property('data');
                    res.body.data[0].should.have.property('note');
                    done();
                });
        });

    });

    describe('Testing the GET Methods - Get One Quantum', function(){

        it('Should be able to get a one quantum', function(done){
            api.get('/api/quantum/' + quantum._id)
                .set('x-api-key', config.apiKey)
                .set('x-access-token', token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    //res.body.should.be.an.Array.and.have.lengthOf(1);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('note');
                    done();
                });
        });

    });

    describe('Testing the PUT Methods - Update a Quantum', function(){
        it('Should be able to update a quantum', function(done){
            api.put('/api/quantum/' + quantum._id)
                .set('x-api-key', config.apiKey)
                .set('x-access-token', token)
                .send(quantum_update_data)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    //res.body.should.be.an.Array.and.have.lengthOf(1);
                    res.body.data.should.have.property('note', 'this has been updated');
                    res.body.data.should.have.property('alive', 0);

                    done();
                });
        });

    });


    after(function(done){
        quantum.remove(function() {
            user.remove(function() {
                done();
            });
        });

    })

});
