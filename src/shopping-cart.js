import ITEMS from './items';

export default class ShoppingCart {
    constructor(items = []) {
        this.items = items;
    }

    addItem(newItem) {
        this.addItems([ newItem ]);
    }

    addItems(newItems) {
        this.items = this.items.concat(newItems);
    }

    getItems() {
        return this.items;
    }

    getTotalCost() {
        const subtotal = this.items.reduce((total, item) => total + ITEMS[item].price, 0);
        const discount = (papayaCount) => Math.floor(papayaCount / 3) * 0.5;

        let papayaCount = this.items.filter((item) => item === ITEMS.papaya.id).length;

        return subtotal - discount(papayaCount);
    }

};
