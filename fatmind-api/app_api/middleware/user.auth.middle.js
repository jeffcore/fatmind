var mongoose = require('mongoose');
var Quantum = mongoose.model('Quantum');

/*  Standard Response function */
var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports = function(req, res, next){

    if (req.params && req.params.quantumid) {
        Quantum
            .findById(req.params.quantumid)
            .populate('userID', 'username')
            .exec(function(err, quantum) {
                console.log('userID: '+ quantum.userID);
                console.log('decoded userID: '+ req.decoded._id);
                if (req.decoded._id == quantum.userID._id) {
                    console.log('decoded id - ' + req.decoded._id );
                    console.log('quantum id - ' + quantum.userID._id);
                    next();
                } else {
                    sendJSONResponse(res, 401, {
                        message: 'You are not allowed to edit this quantum.'
                    });
                }
            }
        )
    } else {
        console.log('No quantum id specified');
        sendJSONResponse(res, 404, {
            message: "No quantum id in request"
        });
    }

};
