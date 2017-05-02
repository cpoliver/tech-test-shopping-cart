'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = logReceipt;

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logReceipt(_ref) {
    var lineItems = _ref.lineItems,
        total = _ref.total;

    var table = new _cliTable2.default({
        head: ['ITEM', 'PRICE', 'COUNT', 'DISCOUNT', 'SUBTOTAL']
    });

    var toPrice = function toPrice(num) {
        return num === 0 ? '-' : '£' + (num / 100).toFixed(2);
    };

    lineItems.map(function (_ref2) {
        var id = _ref2.id,
            price = _ref2.price,
            count = _ref2.count,
            discount = _ref2.discount,
            subtotal = _ref2.subtotal;
        return table.push([id, toPrice(price), count, toPrice(discount), toPrice(subtotal)]);
    });

    table.push(['', '', '', 'TOTAL', toPrice(total)]);

    console.log(table.toString());
}