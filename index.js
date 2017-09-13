const express = require('express');
const app = express();
const http = require('http').Server(app);
const Log = require('log');
const logger = new Log('debug');
const port = 80;

http.listen(port, function () {
    logger.info('Port: ' + port);
});


app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));