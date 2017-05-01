import { expect } from 'chai';
import { spy } from 'sinon';

import { getLineItem, getLineItems, getLineTotal, getReceipt, getTotalCost } from '../src/shopping-cart';
import ITEMS from '../src/items';

const APPLE = ITEMS.apple.id;
const ORANGE = ITEMS.orange.id;
const GARLIC = ITEMS.garlic.id;
const PAPAYA = ITEMS.papaya.id;

describe('the shopping cart module', () => {
    describe('the total function', () => {
        context('when the called with no arguments', () => {
            it('should return the correct total', () => {
                expect(getTotalCost()).to.equal(0);
            });
        });

        context('when the called with an empty array', () => {
            it('should return the correct total', () => {
                expect(getTotalCost([])).to.equal(0);
            });
        });

        context('when called with an array containing a single apple', () => {
            it('should return the correct total', () => {
                const items = [ APPLE ];

                expect(getTotalCost(items)).to.equal(0.25);
            });
        });

        context('when called with an array containing a single orange', () => {
            it('should return the correct total', () => {
                const items = [ ORANGE ];

                expect(getTotalCost(items)).to.equal(0.30);
            });
        });

        context('when called with an array containing a single clove of garlic', () => {
            it('should return the correct total', () => {
                const items = [ GARLIC ];

                expect(getTotalCost(items)).to.equal(0.15);
            });
        });

        context('when called with an array containing a single papaya', () => {
            it('should return the correct total', () => {
                const items = [ PAPAYA ];

                expect(getTotalCost(items)).to.equal(0.50);
            });
        });

        context('when called with an array containing three papayas', () => {
            it('should return the correct total', () => {
                const items = [ PAPAYA, PAPAYA, PAPAYA ];

                expect(getTotalCost(items)).to.equal(1.00);
            });
        });

        context('when called with an array containing more than three papayas', () => {
            context('and the amount of papayas is divisble by 3', () => {
                it('should return the correct total with the discount applied', () => {
                    const items = [ PAPAYA, PAPAYA, PAPAYA, PAPAYA, PAPAYA, PAPAYA ];

                    expect(getTotalCost(items)).to.equal(2.00);
                });
            });

            context('and the amount of papayas is not divisble by 3', () => {
                it('should return the correct total with the discount applied', () => {
                    const items = [ PAPAYA, PAPAYA, PAPAYA, PAPAYA, PAPAYA ];

                    expect(getTotalCost(items)).to.equal(2.00);
                });
            });
        });

        context('when called with an array containing various amounts of each item', () => {
            it('should return the correct total', () => {
                const items = [ APPLE, ORANGE, ORANGE, GARLIC, GARLIC, GARLIC, PAPAYA, PAPAYA, PAPAYA, PAPAYA ];

                expect(getTotalCost(items)).to.equal(2.80);
            });
        });
    });

    describe('the get line item function', () => {
        context('when discount is not applicable', () => {
            it('should return an object with the correct item id, count, price, discount, and subtotal', () => {
                const items = [ APPLE, APPLE, ORANGE ];
                const lineItem = getLineItem(APPLE, items);

                expect(lineItem).to.deep.equal({
                    id: 'apple',
                    count: 2,
                    price: 0.25,
                    discount: 0,
                    subtotal: 0.5
                });
            });
        });

        context('when discount is applicable', () => {
            it('should return an object with the correct item id, count, price, discount, and subtotal', () => {
                const items = [ PAPAYA, PAPAYA, APPLE, PAPAYA, ORANGE ];
                const lineItem = getLineItem(PAPAYA, items);

                expect(lineItem).to.deep.equal({
                    id: 'papaya',
                    count: 3,
                    price: 0.50,
                    discount: 0.50,
                    subtotal: 1.0
                });
            });
        });
    });

    describe('the get line items function', () => {
        it('should return an array of results from get line item for each unique item', () => {
            const items = [ APPLE, APPLE, GARLIC, ORANGE, GARLIC, PAPAYA ];
            const lineItems = getLineItems(items);

            expect(lineItems).to.deep.equal([{
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
