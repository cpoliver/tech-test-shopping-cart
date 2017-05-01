'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLineItem = getLineItem;
exports.getLineItems = getLineItems;
exports.getLineTotal = getLineTotal;
exports.getReceipt = getReceipt;
exports.getTotalCost = getTotalCost;

var _items = require('./items');

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getLineItem(itemId, cartItems) {
    var _ITEMS$itemId = _items2.default[itemId],
        id = _ITEMS$itemId.id,
        price = _ITEMS$itemId.price;

    var count = cartItems.filter(function (itemId) {
        return itemId === id;
    }).length;

    var _getLineTotal = getLineTotal(id, count, price),
        discount = _getLineTotal.discount,
        subtotal = _getLineTotal.subtotal;

    return { id: id, count: count, price: price, discount: discount, subtotal: subtotal };
}

function getLineItems(cartItems) {
    var uniqueItemIds = new Set(cartItems);
    return [].concat(_toConsumableArray(uniqueItemIds)).map(function (itemId) {
        return getLineItem(itemId, cartItems);
    });
}

function getLineTotal(id, count, price) {
    var discountApplies = id === _items2.default.papaya.id && count >= 3;
    var calculateDiscount = function calculateDiscount(count) {
        return Math.floor(count / 3) * 0.5;
    };

    var discount = discountApplies ? calculateDiscount(count) : 0;
    var subtotal = price * count - discount;

    return { discount: discount, subtotal: subtotal };
}

function getReceipt(cartItems) {
    var lineItems = getLineItems(cartItems);
    var total = getTotalCost(cartItems);

    return { lineItems: lineItems, total: total };
}

function getTotalCost(cartItems) {
    return getLineItems(cartItems).reduce(function (total, _ref) {
        var subtotal = _ref.subtotal;
        return subtotal + total;
    }, 0);
}