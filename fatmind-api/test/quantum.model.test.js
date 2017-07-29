require('../app_api/models/db.js');
var should = require('should');
var mongoose = require('mongoose');
var Quantum = mongoose.model('Quantum');
var User = mongoose.model('User');

describe('Quantum Model Unit Tests:', function(){
    var user = null;
    var quantum = null;

    before(function(done){
        user = new User({
           username: 'testerted3',
           password: '553399',
           email: 'tester@tester.com'
        });

        user.save(function(){
           quantum = new Quantum({
               note: 'the best node',
               userID: user._id,
               alive: 1
           });

           done();
        });
    });

    describe('Testing the save method', function(){
        it('Should be able to save without problems', function(){
            quantum.save(function(err){
                should.not.exist(err);
            });
        });

        it('Should not be able to save an quantum without a name', function(){
            quantum.note = '';
            quantum.save(function(err){
                should.exist(err);
            });
        });
    });

    after(function(done){
        quantum.remove(function() {
            user.remove(function() {
                done();
            });
        });
    });

});
