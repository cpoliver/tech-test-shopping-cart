import { expect } from 'chai';
import { spy } from 'sinon';

import ShoppingCart from './shopping-cart';
import ITEMS from './items';

const APPLE = ITEMS.apple.id;
const ORANGE = ITEMS.orange.id;
const GARLIC = ITEMS.garlic.id;
const PAPAYA = ITEMS.papaya.id;

describe('the shopping cart', () => {
    context('when initialized with defaults', () => {
        it('should set items to an empty array', () => {
            const cart = new ShoppingCart();

            expect(cart.getItems()).to.deep.equal([]);
        });
    });

    context('when initialized with with an array', () => {
        it('should set items to the array value', () => {
            const cart = new ShoppingCart([ 1, 2, 3 ]);

            expect(cart.getItems()).to.deep.equal([ 1, 2, 3 ]);
        });
    });

    describe('the items property', () => {
        it('should return the cart contents', () => {
            const cart = new ShoppingCart([ 2, 3, 4 ]);

            expect(cart.getItems()).to.deep.equal([ 2, 3 ,4 ]);
        });
    });

    describe('the add item method', () => {
        it('should add single items to the cart', () => {
            const cart = new ShoppingCart([ 1 ]);
            cart.addItem(2);
            cart.addItem(3);

            expect(cart.getItems()).to.deep.equal([1, 2, 3]);
        });
    });

    describe('the add items method', () => {
        it('should add an array of items to the cart', () => {
            const cart = new ShoppingCart([ 1 ]);
            cart.addItems([ 2, 3, 4 ]);

            expect(cart.getItems()).to.deep.equal([ 1, 2, 3, 4 ]);
        });
    });

    describe('the total method', () => {
        context('when the cart is empty', () => {
            it('should return the correct total', () => {
                const cart = new ShoppingCart();

                expect(cart.getTotalCost()).to.equal(0);
            });
        });

        context('when the cart contains a single apple', () => {
            it('should return the correct total', () => {
                const cart = new ShoppingCart([ APPLE ]);

                expect(cart.getTotalCost()).to.equal(0.25);
            });
        });

        context('when the cart contains a single orange', () => {
            it('should return the correct total', () => {
                const cart = new ShoppingCart([ ORANGE ]);

                expect(cart.getTotalCost()).to.equal(0.30);
            });
        });

        context('when the cart contains a single clove of garlic', () => {
            it('should return the correct total', () => {
                const cart = new ShoppingCart([ GARLIC ]);

                expect(cart.getTotalCost()).to.equal(0.15);
            });
        });

        context('when the cart contains a single papaya', () => {
            it('should return the correct total', () => {
                const cart = new ShoppingCart([ PAPAYA ]);

                expect(cart.getTotalCost()).to.equal(0.50);
            });
        });

        context('when 3 papayas are in the cart', () => {
            it('should return the correct total', () => {
                it('should return the correct total', () => {
                    const cart = new ShoppingCart([ PAPAYA, PAPAYA, PAPAYA ]);

                    expect(cart.getTotalCost()).to.equal(1.00);
                });
            });
        });

        context('when more than 3 papayas are in the cart', () => {
            context('and the amount is divisble by 3', () => {
                it('should return the correct total with the discount applied', () => {
                    const cart = new ShoppingCart([ PAPAYA, PAPAYA, PAPAYA, PAPAYA, PAPAYA, PAPAYA ]);

                    expect(cart.getTotalCost()).to.equal(2.00);
                });
            });

            context('and the amount is not divisble by 3', () => {
                it('should return the correct total with the discount applied', () => {
                    const cart = new ShoppingCart([ PAPAYA, PAPAYA, PAPAYA, PAPAYA, PAPAYA ]);

                    expect(cart.getTotalCost()).to.equal(2.00);
                });
            });
        });

        context('when multiple amounts of all items have been added to the cart', () => {
            it('should return the correct total', () => {
                const cart = new ShoppingCart([
                    APPLE, ORANGE, ORANGE, GARLIC, GARLIC, GARLIC, PAPAYA, PAPAYA, PAPAYA, PAPAYA
                ]);

                expect(cart.getTotalCost()).to.equal(2.80);
            });
        });
    });

    describe('the get line item method', () => {
        it('should return an object with the item id, count, price, and subtotal', () => {
            const cart = new ShoppingCart([ APPLE, APPLE, ORANGE ]);
            const lineItem = cart.getLineItem(APPLE);

            expect(lineItem).to.deep.equal({
                id: 'apple',
                count: 2,
                price: 0.25,
                subtotal: 0.5
            });
        });
    });

    describe('the get line items method', () => {
        it('should call get line item method once for each unique item', () => {
            const cart = new ShoppingCart([ APPLE, APPLE, GARLIC, ORANGE, GARLIC, PAPAYA ]);
            cart.getLineItem = spy();
            cart.getLineItems();

            expect(cart.getLineItem.callCount).to.equal(4);
            expect(cart.getLineItem.firstCall.args[0]).to.equal(APPLE);
            expect(cart.getLineItem.secondCall.args[0]).to.equal(GARLIC);
            expect(cart.getLineItem.thirdCall.args[0]).to.equal(ORANGE);
            expect(cart.getLineItem.lastCall.args[0]).to.equal(PAPAYA);
        });
    });
});
