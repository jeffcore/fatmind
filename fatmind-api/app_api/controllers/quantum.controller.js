/**
 * Created by jeffr on 8/9/15.
 */
var mongoose = require('mongoose');
var Quantum = mongoose.model('Quantum');
var User = mongoose.model('User');
var CounterSync = mongoose.model('CounterSync');

/*  Standard Response function */
var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/*
 PUT a list of quantum changes sync
 /api/quantum/sync
 */
module.exports.quantumSyncPut = function(req, res) {
    //var obj = JSON.parse(req.body)
    var quantumList = req.body;
    console.log(quantumList);
    for(i = 0; i < quantumList.length - 1; i++) {
        console.log('show latest quantum' );
        console.log(quantumList[i]);
        Quantum
            .findOne({'guid': quantumList[i]['id']})
            .populate('userID', 'username')
            .exec(function(err, quantum){
                // if (quantum) {
                //     console.log('update quantum: show note' );
                //     console.log(quantumList[i]);
                //
                //     quantum.note = quantumList[i]['note'];
                //     quantum.dateUpdated = quantumList[i]['dateUpdated'];
                //
                //     quantum.save(function(err, location) {
                //         if (err) {
                //             console.log(err);
                //         } else {
                //             console.log('quautum entered');
                //         }
                //     });
                // } else {
                //     console.log('create quantum: show note' );
                //     console.log(quantumList[i]);
                //     Quantum
                //         .create({
                //             note: quantumList[i]['note'],
                //             userID: req.decoded._id,
                //             guid: quantumList[i]['id'],
                //             dateUpdated: quantumList[i]['dateUpdated']
                //         }, function(err, quantum) {
                //             if (err) {
                //                 console.log(err);
                //                 //sendJSONResponse(res, 400, err);
                //             } else {
                //                 console.log(quantum);
                //
                //                 User.findByIdAndUpdate(
                //                     req.decoded._id,
                //                     {$push: {quanta: quantum._id}},
                //                     {safe: true, upsert: true},
                //                     function(err, model) {
                //                         console.log(err);
                //                     }
                //                 );
                //                 //sendJSONResponse(res, 201, {data: quantum});
                //             }
                //         });
                //         console.log('new quautum entered');
                // }
            }
        );
    }

    sendJSONResponse(res, 200, {message: 'successfully synced quantum'});
    console.log("successfully synced quantum");

};

/*
 GET a list of quantums after date
 /api/quantum/sync/
*/
module.exports.quantumSyncGet = function(req, res) {
    console.log('in ChangesAfterDate ' + decodeURIComponent(req.query.datelastupdate));
    console.log('converted in ChangesAfterDate ' + new Date(decodeURIComponent(req.query.datelastupdate)));
    Quantum
        .find({
                'dateUpdated' : { $lt: new Date() , $gt: new Date(decodeURIComponent(req.query.datelastupdate)) },
                'userID' : req.decoded._id//,
                //$and: [{$or:[ {'new': true}, {'updated':true}, {'deleted':true} ]}]
            }
        )
        .populate('userID', 'username')
        .exec(function(err, quantum) {
            if (!quantum) {
                sendJSONResponse(res, 404, {
                    success: false,
                    message: "quantum id not found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONResponse(res, 404, {
                    success: false,
                    message: "error loading quantums"
                });
                return;
            }
            console.log(quantum);
            sendJSONResponse(res, 200, {data: quantum});
        }
    );
};


/*
 GET a list of quantums
 /api/quantum/all
 */
module.exports.quantumListAll = function(req, res) {
    Quantum
        .find({'userID' : req.decoded._id})
        .populate('userID', 'username')
        .exec(function(err, quantum) {
            if (!quantum) {
                sendJSONResponse(res, 404, {
                    success: false,
                    message: "quantum id not found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONResponse(res, 404, {
                    success: false,
                    message: "error loading quantums"
                });
                return;
            }
            console.log("user found " + req.decoded._id);
            console.log(quantum);
            sendJSONResponse(res, 200, {data: quantum});
        }
    );
};




/*
 GET a list of quantums after date
 /api/quantum/bydate/
*/
module.exports.quantumListAfterDate = function(req, res) {
    console.log('in listafterdate ' + decodeURIComponent(req.query.datelastupdate));
    console.log('converted in listafterdate ' + new Date(decodeURIComponent(req.query.datelastupdate)));
    Quantum
        .find({
            'dateCreated' :
            { $lt: new Date() , $gt: new Date(decodeURIComponent(req.query.datelastupdate)) },
            'userID' : req.decoded._id
        })
        .populate('userID', 'username')
        .exec(function(err, quantum) {
            if (!quantum) {
                sendJSONResponse(res, 404, {
                    success: false,
                    message: "quantum id not found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONResponse(res, 404, {
                    success: false,
                    message: "error loading quantums"
                });
                return;
            }
            console.log(quantum);
            sendJSONResponse(res, 200, {data: quantum});
        }
    );
};

/*
 GET a list of quantums after date
 /api/quantum/bydateupdated/
*/
module.exports.quantumListAfterDateUpdated = function(req, res) {
    console.log('in listafterdateupdated ' + decodeURIComponent(req.query.datelastupdate));
    console.log('converted in listafterdate ' + new Date(decodeURIComponent(req.query.datelastupdate)));
    Quantum
        .find({
            'dateUpdated' :
            { $lt: new Date() , $gt: new Date(decodeURIComponent(req.query.datelastupdate)) },
            'userID' : req.decoded._id
        })
        .populate('userID', 'username')
        .exec(function(err, quantum) {
            if (!quantum) {
                sendJSONResponse(res, 404, {
                    success: false,
                    message: "quantum id not found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONResponse(res, 404, {
                    success: false,
                    message: "error loading quantums"
                });
                return;
            }
            console.log(quantum);
            sendJSONResponse(res, 200, {data: quantum});
        }
    );
};


/*
 GET a list of quantums
 /api/quantum/
 */
module.exports.quantumList = function(req, res) {
    Quantum
        .find({'userID' : req.decoded._id})
        .sort({dateCreated: 'desc'})
        .limit(20)
        .populate('userID', 'username')
        .exec(function(err, quantum) {
            if (!quantum) {
                sendJSONResponse(res, 404, {
                    success: false,
                    message: "quantum id not found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONResponse(res, 404, {
                    success: false,
                    message: "error loading quantums"
                });
                return;
            }
            console.log(quantum);
            sendJSONResponse(res, 200, {data: quantum});
        }
    );
};

/*
 GET a search the quantums
 /api/search/
 */
module.exports.quantumSearch = function(req, res) {
    console.log(req.body.note);
    var terms=req.body.note;
/*
    Quantum
    .search({
        query_string: {
            query: terms
        }
    },
    {hydrate:true},
    function(err, quantum) {
        console.log(quantum);
        sendJSONResponse(res, 200, {data: quantum});
    });
*/

    Quantum.find(
        { $text : { $search : terms } },
        { score : { $meta: "textScore" } }
    )
    .sort({ score : { $meta : 'textScore' } })
    .exec(function(err, results) {
        console.log(results);
        sendJSONResponse(res, 200, {data: results});
    });

    //
    // Quantum.search(terms, function(error, results){
    //     console.log(results);
    //     sendJSONResponse(res, 200, {data: results});
    // });


};

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

var counterIncrease = function counterSyncIncrease() {
    CounterSync
        .findOne()
        .exec(function(err, countersync){
            if (err) { }
            if (countersync.counter) {
                countersync.counter = countersync.counter + 1;
            } else {
                countersync.counter =  1;
            }

            countersync.save(function(err, res) { });
        }
    );
}

/*
 POST - create a new quantum
 /api/quantum/
 */
module.exports.quantumCreate = function(req, res) {
    console.log('quantumcreate body');
    console.log(req.body);

    Quantum
        .create({
            note: req.body.note,
            userID: req.decoded._id,
            guid: generateUUID()
        }, function(err, quantum) {
            if (err) {
                console.log(err);
                sendJSONResponse(res, 400, err);
            } else {
                console.log(quantum);

                User.findByIdAndUpdate(
                    req.decoded._id,
                    {$push: {quanta: quantum._id}},
                    {safe: true, upsert: true},
                    function(err, model) {
                        console.log(err);
                    }
                );
                counterIncrease();
                sendJSONResponse(res, 201, {data: quantum});
            }
        });
};

/*
    GET a quantum by id
    /api/quantum/:quantumid
*/
module.exports.quantumReadOne = function(req, res) {
    if (req.params && req.params.quantumid) {
        Quantum
            .findById(req.params.quantumid)
            .populate('userID', 'username')
            .exec(function(err, quantum){
                sendJSONResponse(res, 200, {data: quantum});
            }
        )
    } else {
        console.log('No quantumid specified');
        sendJSONResponse(res, 404, {
            "message": "No quantumid in request"
        });
    }
};

/*
    UPDATE a quantum by id
    /api/quantum/:quantumid
*/
module.exports.quantumUpdateOne = function(req, res) {
    if (req.params && req.params.quantumid) {
        Quantum
            .findById(req.params.quantumid)
            .populate('userID', 'username')
            .exec(function(err, quantum){
                if(!quantum){
                    sendJSONResponse(res, 400, {
                        message: 'quantum id not found'
                    });
                    return;
                } else if(err) {
                    sendJSONResponse(res, 400, err);
                    return;
                }
                quantum.note = req.body.note;
                quantum.alive = req.body.alive;
                quantum.dateUpdated = new Date();
                quantum.updated = true;

                quantum.save(function(err, location) {
                    if (err) {
                        sendJSONResponse(res, 400, err);
                    } else {
                        counterIncrease();
                        sendJSONResponse(res, 200, {data: quantum});
                    }
                });
            }
        );
    } else {
        console.log('No quantumid specified');
        sendJSONResponse(res, 400, {
            message: 'No quantumid in request'
        });
    }
};

/*
    DELETE a quantum by id
    /api/quantum/:quantumid
*/
module.exports.quantumDeleteOne = function(req, res) {
    var quantumid = req.params.quantumid;
    if (quantumid) {
        Quantum
            .findByIdAndRemove(quantumid)
            .exec(
                function(err, quantum) {
                    if (err) {
                        console.log(err);
                        sendJSONResponse(res, 404, err);
                        return;
                    }
                    console.log("Location id " + quantumid + " deleted");

                    User.findByIdAndUpdate(
                        req.decoded._id,
                        {$pull: {quanta: quantum._id}},
                        function(err, model) {
                            console.log(err);
                        }
                    );
                    counterIncrease();
                    sendJSONResponse(res, 204,
                        {message: 'successfully deleted quantum'}
                    );
                }
            );

          //
        //   Quantum.findById(quantumid, function(err, quantum) {
        //     //   quantum.remove(function(err, quantum) {
        //     //     if (err) {
        //     //         console.log(err);
        //     //         sendJSONResponse(res, 404, err);
        //     //         return;
        //     //     }
        //     //     console.log("Location id " + quantumid + " deleted");
        //       //
        //     //     User.findByIdAndUpdate(
        //     //         req.decoded._id,
        //     //         {$pull: {quanta: quantum._id}},
        //     //         function(err, model) {
        //     //             console.log(err);
        //     //         }
        //     //     );
          //
        //          sendJSONResponse(res, 204, {message: 'successfully deleted quantum'});
        //     });
        //});
    }
};
