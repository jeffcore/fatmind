var express = require('express');
var router = express.Router();
var ctrlQuantum = require('../controllers/quantum.controller.js');
var ctrlUser = require('../controllers/user.controller.js');
var ctrlAlive = require('../controllers/alive.controller.js')
var ctrlCounterSync = require('../controllers/countersync.controller.js');
var apiTokenAuthorization = require('../middleware/token.auth.middle.js');
var apiKeyAuthorization = require('../middleware/apikey.auth.middle.js');
var userAuthorization = require('../middleware/user.auth.middle.js');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');

router.post('/login', apiKeyAuthorization, ctrlUser.userAuthenticate);
router.post('/user', apiKeyAuthorization, ctrlUser.userCreate);
router.get('/areyoualive', apiKeyAuthorization, ctrlAlive.areYouAlive);
router.get('/countersync', apiKeyAuthorization, ctrlCounterSync.counterSyncGet);

//router.post('/particle/upload/:particleid', multipartMiddleware, apiKeyAuthorization, apiTokenAuthorization, ctrlImageUpload.particleImage);
router.get('/quantum', apiKeyAuthorization, apiTokenAuthorization, ctrlQuantum.quantumList);
router.get('/quantum/all', apiKeyAuthorization, apiTokenAuthorization, ctrlQuantum.quantumListAll);
router.get('/quantum/bydate', apiKeyAuthorization, apiTokenAuthorization, ctrlQuantum.quantumListAfterDate);
router.get('/quantum/bydateupdated', apiKeyAuthorization, apiTokenAuthorization, ctrlQuantum.quantumListAfterDateUpdated);
router.post('/quantum/sync', apiKeyAuthorization, apiTokenAuthorization, ctrlQuantum.quantumSyncPut);
router.get('/quantum/sync', apiKeyAuthorization, apiTokenAuthorization, ctrlQuantum.quantumSyncGet);


router.post('/quantum', apiKeyAuthorization, apiTokenAuthorization, ctrlQuantum.quantumCreate);
router.get('/quantum/:quantumid', apiKeyAuthorization, apiTokenAuthorization, ctrlQuantum.quantumReadOne);
router.put('/quantum/:quantumid', apiKeyAuthorization, apiTokenAuthorization, userAuthorization, ctrlQuantum.quantumUpdateOne);
router.delete('/quantum/:quantumid', apiKeyAuthorization, apiTokenAuthorization, userAuthorization, ctrlQuantum.quantumDeleteOne);

router.post('/search', apiKeyAuthorization, apiTokenAuthorization, ctrlQuantum.quantumSearch);

module.exports = router;
