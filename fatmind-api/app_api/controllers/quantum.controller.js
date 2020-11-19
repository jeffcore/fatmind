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
 POST a list of quantum changes sync
  if quantum id is found it updates,
  if quantum id is not found it creates a new one
 /api/quantum/sync
 */
module.exports.quantumSyncPost = function(req, res) {
    //var obj = JSON.parse(req.body)

    console.log('in quantumSyncPost');
    console.log('print quantumList in quantumSyncPost');
    console.log('changes from device - creating or updating quantums on server');
    var quantums = req.body;
    console.log(quantums);
    quantums.forEach(function(q){
        console.log('show latest quantum' );
        console.log(q);

        CounterSync
            .findOne({})
            .exec(q, function(err, counter) {
                Quantum
                    .findOne({'guid': q['id']})
                    .populate('userID', 'username')
                    .exec(function(err, quantum){
                        if (quantum) {
                            console.log('Update quantum: ' );

                            quantum.note = q['note'];
                            quantum.dateUpdated = q['dateUpdated'];
                            quantum.counter = counter.counter;

                            quantum.save(function(err, location) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    CounterSync.increaseCounter(function(err, counter) {});
                                    console.log('quautum updated');
                                }
                            });
                        } else {
                            console.log('create quantum: ' );
                            console.log(quantum);
                            Quantum
                                .create({
                                    note: q['note'],
                                    userID: req.decoded._id,
                                    guid: q['id'],
                                    dateUpdated: q['dateUpdated'],
                                    counter: counter.counter
                                }, function(err, quantum) {
                                    if (err) {
                                        console.log(err);
                                        //sendJSONResponse(res, 400, err);
                                    } else {
                                        console.log(quantum);
                                        CounterSync.increaseCounter(function(err, counter) {});
                                        User.findByIdAndUpdate(
                                            req.decoded._id,
                                            {$push: {quanta: quantum._id}},
                                            {safe: true, upsert: true},
                                            function(err, model) {
                                                console.log(err);
                                            }
                                        );
                                    }
                                });
                                console.log('new quautum entered');
                        }
                    });
            });       
    });
    sendJSONResponse(res, 200, {message: 'successfully synced quantum'});
    console.log("successfully synced quantum");
};

/*
 GET a list of quantums after date
 /api/quantum/sync/
*/
module.exports.quantumSyncGetByCounter = function(req, res) {
    console.log('in quantumSyncGetByCounter ' + req.query.counter);
    Quantum
        .find({
                'counter' : { $gte: req.query.counter },
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
            console.log('quantumSyncGetByCounter: quantums found');
            console.log(quantum);
            sendJSONResponse(res, 200, quantum);
        }
    );
};

/*
 GET a list of all quantums
 /api/quantum/all
 */
module.exports.quantumListAll = function(req, res) {
    console.log('quantumlistall' + req.decoded._id);
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
            sendJSONResponse(res, 200, quantum);
        }
    );
};

/*
 GET a list of quantums for homepage
 /api/quantum/
 */
module.exports.quantumList = function(req, res) {    
    Quantum
        .find({
            'userID' : req.decoded._id,
            'deleted' : false
        })
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
            sendJSONResponse(res, 200, quantum);
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
        // console.log(results)
        var output = []
        var s = ''
        for (s of results) {
            if (s['deleted'] == false) {                
                output.push(s)
            }
        } 
        console.log(output)
        sendJSONResponse(res, 200, output);
    });


    //
    // Quantum.search(terms, function(error, results){
    //     console.log(results);
    //     sendJSONResponse(res, 200, {data: results});
    // });
};

var generateUUID = function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

/*
 POST - create a new quantum
 /api/quantum/
 */
module.exports.quantumCreate = function(req, res) {
    console.log('quantumcreate body');
    console.log(req.body);

    CounterSync.getCounter(req, function(err, counter) {
        console.log('fancy counter call badk think');
        console.log(counter.counter);
        Quantum
            .create({
                note: req.body.note,
                userID: req.decoded._id,
                guid: generateUUID(),
                counter: counter.counter
            }, function(err, quantum) {
                if (err) {
                    console.log(err);
                    sendJSONResponse(res, 400, err);
                } else {
                    console.log("quantum created: ");
                    console.log(quantum);

                    CounterSync.increaseCounter(function(err, counter) {});

                    User.findByIdAndUpdate(
                        req.decoded._id,
                        {$push: {quanta: quantum._id}},
                        {safe: true, upsert: true},
                        function(err, model) {
                            console.log(err);
                        }
                    );

                    sendJSONResponse(res, 201, {data: quantum});
                }
        });
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
        CounterSync.getCounter(req, function(err, counter) {
            console.log('fancy counter call badk think');
            console.log(counter.counter);
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
                    quantum.counter = counter.counter;

                    quantum.save(function(err, location) {
                        if (err) {
                            sendJSONResponse(res, 400, err);
                        } else {
                            CounterSync.increaseCounter(function(err, counter) {});
                            sendJSONResponse(res, 200, {data: quantum});
                        }
                    });
                }
            );
        });
    } else {
        console.log('No quantumid specified');
        sendJSONResponse(res, 400, {
            message: 'No quantumid in request'
        });
    }
};
/*
    DELETE a quantum by id  - soft delete
    /api/quantum/:quantumid
*/
module.exports.quantumDeleteOne = function(req, res) {
    if (req.params && req.params.quantumid) {
        CounterSync.getCounter(req, function(err, counter) {
            console.log('fancy counter call badk think');
            console.log(counter.counter);
            console.log('id')
            console.log(req.params.quantumid)
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
                    quantum.deleted = true;
                    quantum.dateUpdated = new Date();
                    quantum.updated = true;
                    quantum.counter = counter.counter;

                    quantum.save(function(err, location) {
                        if (err) {
                            sendJSONResponse(res, 400, err);
                        } else {
                            CounterSync.increaseCounter(function(err, counter) {});
                            sendJSONResponse(res, 200, {data: quantum});
                        }
                    });
                }
            );
        });
    } else {
        console.log('No quantumid specified');
        sendJSONResponse(res, 400, {
            message: 'No quantumid in request'
        });   
    }
    // hard delete
    // var quantumid = req.params.quantumid;
    // if (quantumid) {
    //     Quantum
    //         .findByIdAndRemove(quantumid)
    //         .exec(
    //             function(err, quantum) {
    //                 if (err) {
    //                     console.log(err);
    //                     sendJSONResponse(res, 404, err);
    //                     return;
    //                 }
    //                 console.log("Location id " + quantumid + " deleted");

    //                 User.findByIdAndUpdate(
    //                     req.decoded._id,
    //                     {$pull: {quanta: quantum._id}},
    //                     function(err, model) {
    //                         console.log(err);
    //                     }
    //                 );
    //                 // counterUpdate();
    //                 sendJSONResponse(res, 204,
    //                     {message: 'successfully deleted quantum'}
    //                 );
    //             }
    //         );    
    // }
};

/*
 OLD SYNC NOT USED
 GET a list of quantums after date created
 /api/quantum/bydate/
*/

/*
    old sync funciton not used
*/
// module.exports.quantumSyncGet = function(req, res) {
//     console.log("changes made on server that will be added to device");
//     console.log('in ChangesAfterDate ' + decodeURIComponent(req.query.datelastupdate));
//     console.log('converted in ChangesAfterDate ' + new Date(decodeURIComponent(req.query.datelastupdate)));
//     Quantum
//         .find({
//                 'dateUpdated' : { $lt: new Date() , $gt: new Date(decodeURIComponent(req.query.datelastupdate)) },
//                 'userID' : req.decoded._id//,
//                 //$and: [{$or:[ {'new': true}, {'updated':true}, {'deleted':true} ]}]
//             }
//         )
//         .populate('userID', 'username')
//         .exec(function(err, quantum) {
//             if (!quantum) {
//                 sendJSONResponse(res, 404, {
//                     success: false,
//                     message: "quantum id not found"
//                 });
//                 return;
//             } else if (err) {
//                 console.log(err);
//                 sendJSONResponse(res, 404, {
//                     success: false,
//                     message: "error loading quantums"
//                 });
//                 return;
//             }
//             console.log(quantum);
//             sendJSONResponse(res, 200, {data: quantum});
//         }
//     );
// };




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
 OLD SYNC NOT USED
 GET a list of quantums after date updated
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