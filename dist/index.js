'use strict';

var _server = require('./src/server.js');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('starting server...');

_server2.default.listen(8080, function () {
    console.log(_server2.default.name + ' listening at ' + _server2.default.url);
});