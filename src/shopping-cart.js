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
        const prices = {
            apple: 0.25,
            orange: 0.30,
            garlic: 0.15,
            papaya: 0.50
        };

        const subtotal = this.items.reduce((total, curr) => total + prices[curr], 0);

        const discount = (papayaCount) => Math.floor(papayaCount / 3) * 0.5;
        let papayaCount = this.items.filter((item) => item === 'papaya').length;

        return subtotal - discount(papayaCount);
    }

};
