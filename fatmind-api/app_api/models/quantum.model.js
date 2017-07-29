var mongoose = require('mongoose');
var mongoosastic = require("mongoosastic");
var Schema = mongoose.Schema;

var quantumSchema = new mongoose.Schema({
    note: {
        type: String,
        require: true
        //es_indexed: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    alive: Boolean,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
    dateRemoved: {
        type: Date,
        default: null
    },
    guid: {
        type: String,
        index: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

// add a text index to the tags array
quantumSchema.index({'note': 'text'});

var Quantum = mongoose.model('Quantum', quantumSchema);
