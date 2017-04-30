import request from 'supertest';
import { expect } from 'chai';

import server from './server';
import ShoppingCart from './shopping-cart';
import ITEMS from './items';

const APPLE = ITEMS.apple.id;
const ORANGE = ITEMS.orange.id;
const GARLIC = ITEMS.garlic.id;
const PAPAYA = ITEMS.papaya.id;

describe.only('the server', () => {
    describe('the /healthcheck endpoint', () => {
        it('returns confirmation that the server is running', (done) => {
            request(server)
                .get('/healthcheck')
                .expect(200)
                .expect('"all gravy"')
                .end((error) => {
                    if (error) { throw error; }
                    done();
                });
        });
    });

    describe('the /cart endpoint', () => {
        context('when requested with no body', () => {
            it('responds with an empty array', (done) => {
                request(server)
                    .post('/cart')
                    .expect(200)
                    .expect([])
                    .end((error) => {
                        if (error) { throw error; }
                        done();
                    });
            });
        });

        context('when requested with an array of valid items', () => {
            it('responds with an array of line items', (done) => {
                const items = [ APPLE, ORANGE, GARLIC, PAPAYA ];
                const cart = new ShoppingCart(items);
                const expected = cart.getLineItems();

                request(server)
                    .post('/cart')
                    .send(items)
                    .expect(200)
                    .expect(expected)
                    .end((error) => {
                        if (error) { throw error; }
                        done();
                    });
            });
        });
    });
});
