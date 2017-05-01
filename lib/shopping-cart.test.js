'use strict';

var _chai = require('chai');

var _sinon = require('sinon');

var _shoppingCart = require('./shopping-cart');

var _items = require('./items');

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APPLE = _items2.default.apple.id;
var ORANGE = _items2.default.orange.id;
var GARLIC = _items2.default.garlic.id;
var PAPAYA = _items2.default.papaya.id;

describe('the shopping cart module', function () {
    describe('the total function', function () {
        context('when the called with no arguments', function () {
            it('should return the correct total', function () {
                (0, _chai.expect)((0, _shoppingCart.getTotalCost)()).to.equal(0);
            });
        });

        context('when the called with an empty array', function () {
            it('should return the correct total', function () {
                (0, _chai.expect)((0, _shoppingCart.getTotalCost)([])).to.equal(0);
            });
        });

        context('when called with an array containing a single apple', function () {
            it('should return the correct total', function () {
                var items = [APPLE];

                (0, _chai.expect)((0, _shoppingCart.getTotalCost)(items)).to.equal(0.25);
            });
        });

        context('when called with an array containing a single orange', function () {
            it('should return the correct total', function () {
                var items = [ORANGE];

                (0, _chai.expect)((0, _shoppingCart.getTotalCost)(items)).to.equal(0.30);
            });
        });

        context('when called with an array containing a single clove of garlic', function () {
            it('should return the correct total', function () {
                var items = [GARLIC];

                (0, _chai.expect)((0, _shoppingCart.getTotalCost)(items)).to.equal(0.15);
            });
        });

        context('when called with an array containing a single papaya', function () {
            it('should return the correct total', function () {
                var items = [PAPAYA];

                (0, _chai.expect)((0, _shoppingCart.getTotalCost)(items)).to.equal(0.50);
            });
        });

        context('when called with an array containing three papayas', function () {
            it('should return the correct total', function () {
                var items = [PAPAYA, PAPAYA, PAPAYA];

                (0, _chai.expect)((0, _shoppingCart.getTotalCost)(items)).to.equal(1.00);
            });
        });

        context('when called with an array containing more than three papayas', function () {
            context('and the amount of papayas is divisble by 3', function () {
                it('should return the correct total with the discount applied', function () {
                    var items = [PAPAYA, PAPAYA, PAPAYA, PAPAYA, PAPAYA, PAPAYA];

                    (0, _chai.expect)((0, _shoppingCart.getTotalCost)(items)).to.equal(2.00);
                });
            });

            context('and the amount of papayas is not divisble by 3', function () {
                it('should return the correct total with the discount applied', function () {
                    var items = [PAPAYA, PAPAYA, PAPAYA, PAPAYA, PAPAYA];

                    (0, _chai.expect)((0, _shoppingCart.getTotalCost)(items)).to.equal(2.00);
                });
            });
        });

        context('when called with an array containing various amounts of each item', function () {
            it('should return the correct total', function () {
                var items = [APPLE, ORANGE, ORANGE, GARLIC, GARLIC, GARLIC, PAPAYA, PAPAYA, PAPAYA, PAPAYA];

                (0, _chai.expect)((0, _shoppingCart.getTotalCost)(items)).to.equal(2.80);
            });
        });
    });

    describe('the get line item function', function () {
        context('when discount is not applicable', function () {
            it('should return an object with the correct item id, count, price, discount, and subtotal', function () {
                var items = [APPLE, APPLE, ORANGE];
                var lineItem = (0, _shoppingCart.getLineItem)(APPLE, items);

                (0, _chai.expect)(lineItem).to.deep.equal({
                    id: 'apple',
                    count: 2,
                    price: 0.25,
                    discount: 0,
                    subtotal: 0.5
                });
            });
        });

        context('when discount is applicable', function () {
            it('should return an object with the correct item id, count, price, discount, and subtotal', function () {
                var items = [PAPAYA, PAPAYA, APPLE, PAPAYA, ORANGE];
                var lineItem = (0, _shoppingCart.getLineItem)(PAPAYA, items);

                (0, _chai.expect)(lineItem).to.deep.equal({
                    id: 'papaya',
                    count: 3,
                    price: 0.50,
                    discount: 0.50,
                    subtotal: 1.0
                });
            });
        });
    });

    describe('the get line items function', function () {
        it('should return an array of results from get line item for each unique item', function () {
            var items = [APPLE, APPLE, GARLIC, ORANGE, GARLIC, PAPAYA];
            var lineItems = (0, _shoppingCart.getLineItems)(items);

            (0, _chai.expect)(lineItems).to.deep.equal([{
                count: 2,
                discount: 0,
                id: 'apple',
                price: 0.25,
                subtotal: 0.5
            }, {
                count: 2,
                discount: 0,
                id: 'garlic',
                price: 0.15,
                subtotal: 0.3
            }, {
                count: 1,
                discount: 0,
                id: 'orange',
                price: 0.3,
                subtotal: 0.3
            }, {
                count: 1,
                discount: 0,
                id: 'papaya',
                price: 0.5,
                subtotal: 0.5
            }]);
        });
    });
});