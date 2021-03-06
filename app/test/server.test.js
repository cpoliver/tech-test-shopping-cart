import request from 'supertest';
import { expect } from 'chai';

import server from '../src/server';
import ITEMS from '../src/items';
import { getReceipt } from '../src/shopping-cart';

const APPLE = ITEMS.apple.id;
const ORANGE = ITEMS.orange.id;
const GARLIC = ITEMS.garlic.id;
const PAPAYA = ITEMS.papaya.id;

const onEnd = (error, done) => {
    if (error) { throw error; }
    done();
};

describe('the server', () => {
    describe('the /healthcheck endpoint', () => {
        it('returns confirmation that the server is running', (done) => {
            request(server)
                .get('/healthcheck')
                .expect(200)
                .expect('"all gravy"')
                .end((error) => onEnd(error, done));
        });
    });

    describe('the /cart endpoint', () => {
        context('when requested with no body', () => {
            it('responds with an empty receipt', (done) => {
                request(server)
                    .post('/cart')
                    .expect(200)
                    .expect({ lineItems: [], total: 0 })
                    .end((error) => onEnd(error, done));
            });
        });

        context('when requested with an array of valid items', () => {
            it('responds with a receipt', (done) => {
                const items = [ APPLE, ORANGE, ORANGE, ORANGE, GARLIC, PAPAYA ];
                const expected = getReceipt(items);

                request(server)
                    .post('/cart')
                    .send(items)
                    .expect(200)
                    .expect(expected)
                    .end((error) => onEnd(error, done));
            });
        });
    });
});
