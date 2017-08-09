var mongoose = require('mongoose');
var mongoosastic = require("mongoosastic");
var Schema = mongoose.Schema;

var counterSyncSchema = new mongoose.Schema({
    counter: {
        type: Number,
        "default": 0,
        require: true
    }
});

 

var CounterSync = mongoose.model('CounterSync', counterSyncSchema);
