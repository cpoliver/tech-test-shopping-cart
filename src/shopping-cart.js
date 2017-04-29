import ITEMS from './items';

export default class ShoppingCart {
    constructor(itemsIds = []) {
        this.itemIds = itemsIds;
    }

    addItem(itemId) {
        this.addItems([ itemId ]);
    }

    addItems(itemIds) {
        this.itemIds = this.itemIds.concat(itemIds);
    }

    getItems() {
        return this.itemIds;
    }

    getLineItem(itemId) {
        const { id, price } = ITEMS[itemId];
        const count = this.itemIds.filter((itemId) => itemId === id).length;

        console.log(id, itemId, count, this.itemIds);

        return { id, count, price, subtotal: price * count };
    }

    getLineItems() {
        new Set(this.itemIds).forEach((itemId) => this.getLineItem(itemId));

    }

    getTotalCost() {
        const subtotal = this.itemIds.reduce((total, itemId) => total + ITEMS[itemId].price, 0);
        const discount = (papayaCount) => Math.floor(papayaCount / 3) * 0.5;

        let papayaCount = this.itemIds.filter((itemId) => itemId === ITEMS.papaya.id).length;

        return subtotal - discount(papayaCount);
    }
};
