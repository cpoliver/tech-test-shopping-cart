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
        const { discount, subtotal } = this.getLineTotal(id, count, price);

        return { id, count, price, discount, subtotal };
    }

    getLineItems() {
        const uniqueItemIds = new Set(this.itemIds);
        return [...uniqueItemIds].map(this.getLineItem.bind(this));
    }

    getLineTotal(id, count, price) {
        const discountApplies = id === ITEMS.papaya.id && count >= 3;
        const calculateDiscount = (count) => Math.floor(count / 3) * 0.5;

        const discount = discountApplies ? calculateDiscount(count) : 0;
        const subtotal = (price * count) - discount;

        return { discount, subtotal };
    }

    getTotalCost() {
        const subtotal = this.itemIds.reduce((total, itemId) => total + ITEMS[itemId].price, 0);

        const discount = (papayaCount) => Math.floor(papayaCount / 3) * 0.5;

        let papayaCount = this.itemIds.filter((itemId) => itemId === ITEMS.papaya.id).length;

        return subtotal - discount(papayaCount);
    }
};
