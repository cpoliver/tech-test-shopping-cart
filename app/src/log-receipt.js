import Table from 'cli-table';

export default function logReceipt({ lineItems, total }) {
    const table = new Table({
        head: ['ITEM', 'PRICE', 'COUNT', 'DISCOUNT', 'SUBTOTAL'],
    });

    const toPrice = (num) => num === 0 ? '-' : '£' + (num / 100).toFixed(2);

    lineItems.map(({ id, price, count, discount, subtotal }) => table.push([
        id, toPrice(price), count, toPrice(discount), toPrice(subtotal)
    ]));

    table.push([ '', '', '', 'TOTAL', toPrice(total) ]);

    console.log(table.toString());
}
