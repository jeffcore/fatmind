/**
 * Created by jeffr on 8/9/15.
 */
var mongoose = require('mongoose');
var CounterSync = mongoose.model('CounterSync');

/*  Standard Response function */
var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/*
 GET a list of quantums after date
 /api/countersync/get/
*/
module.exports.counterSyncGet = function(req, res) {
    CounterSync
        .findOne()
        .exec(function(err, countersync) {
            if (err) {
                console.log(err);
                sendJSONResponse(res, 404, {
                    success: false,
                    message: "error loading counter"
                });
                return;
            }
            console.log(countersync);
            sendJSONResponse(res, 200, {data: countersync});
        }
    );
};
/*
    UPDATE a countersync by id
    /api/countersync/:countersync
*/
module.exports.counterSyncUpdate = function(req, res) {
    CounterSync
        .findOne()
        .exec(function(err, countersync){
            if (err) {
                sendJSONResponse(res, 400, err);
                return;
            }
            countersync.counter = countersync.counter + 1;

            countersync.save(function(err, res) {
                if (err) {
                    sendJSONResponse(res, 400, err);
                } else {
                    sendJSONResponse(res, 200, {data: res});
                }
            });
        }
    );
};
