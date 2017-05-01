'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _shoppingCart = require('./shopping-cart');

var _logReceipt = require('./log-receipt');

var _logReceipt2 = _interopRequireDefault(_logReceipt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _restify2.default.createServer();
server.use(_restify2.default.bodyParser());

server.get('/healthcheck/', function (request, response) {
    response.send(200, 'all gravy');
});

server.post('/cart/', function (request, response) {
    var cartItems = request.body;
    var receipt = (0, _shoppingCart.getReceipt)(cartItems);

    (0, _logReceipt2.default)(receipt);

    return response.send(200, receipt);
});

exports.default = server;