/**
 * Created by jeffr on 8/9/15.
 */
/*  Standard Response function */
var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


/*
 GET a list of quantumss
 /api/quantum/all
 */
module.exports.areYouAlive = function(req, res) {
    sendJSONResponse(res, 200, {data: {alive: 'yes'}});
};
