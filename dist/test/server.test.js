'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _items = require('./items');

var _items2 = _interopRequireDefault(_items);

var _shoppingCart = require('./shopping-cart');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APPLE = _items2.default.apple.id;
var ORANGE = _items2.default.orange.id;
var GARLIC = _items2.default.garlic.id;
var PAPAYA = _items2.default.papaya.id;

var onEnd = function onEnd(error, done) {
    if (error) {
        throw error;
    }
    done();
};

describe('the server', function () {
    describe('the /healthcheck endpoint', function () {
        it('returns confirmation that the server is running', function (done) {
            (0, _supertest2.default)(_server2.default).get('/healthcheck').expect(200).expect('"all gravy"').end(function (error) {
                return onEnd(error, done);
            });
        });
    });

    describe('the /cart endpoint', function () {
        context('when requested with no body', function () {
            it('responds with an empty receipt', function (done) {
                (0, _supertest2.default)(_server2.default).post('/cart').expect(200).expect({ lineItems: [], total: 0 }).end(function (error) {
                    return onEnd(error, done);
                });
            });
        });

        context('when requested with an array of valid items', function () {
            it('responds with a receipt', function (done) {
                var items = [APPLE, ORANGE, GARLIC, PAPAYA];
                var expected = (0, _shoppingCart.getReceipt)(items);

                (0, _supertest2.default)(_server2.default).post('/cart').send(items).expect(200).expect(expected).end(function (error) {
                    return onEnd(error, done);
                });
            });
        });
    });
});