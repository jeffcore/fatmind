var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSyncSchema = new mongoose.Schema({
    counter: {
        type: Number,
        "default": 0,
        require: true
    }
});

counterSyncSchema.statics.getCounter = function (req, cb) {
    this.findOne({}, cb);
};

counterSyncSchema.statics.getCounter2 = function (req, cb) {
    this.findOne({}, cb);
};



counterSyncSchema.statics.increaseCounter = function(cb) {
    this.findOne({}, function(err, counter){
        if (err) { }
        if (counter.counter) {
            console.log('counter sync model function found one ' + counter.counter);
            counter.counter = counter.counter + 1;
            counter.save(function(err, res) {
                console.log('counter sync model function counter after increase ' + counter.counter);
            });

        } else {
            console.log('found nune');

        }
    });
};



var CounterSync = mongoose.model('CounterSync', counterSyncSchema);
