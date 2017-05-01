'use strict';

var _server = require('./src/server.js');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('starting server...');

var port = process.env.PORT || 5000;

_server2.default.listen(port, function () {
    console.log(_server2.default.name + ' listening on port ' + port);
});