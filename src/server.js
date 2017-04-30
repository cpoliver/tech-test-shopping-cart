import restify from 'restify';

import ShoppingCart from './shopping-cart';
import logReceipt from './log-receipt';

const server = restify.createServer();
server.use(restify.bodyParser());

server.get('/healthcheck/', (request, response) => {
    response.send(200, 'all gravy');
});

server.post('/cart/', (request, response) => {
    const cart = new ShoppingCart(request.body);
    const receipt = cart.getReceipt();

    logReceipt(receipt);

    return response.send(200, receipt);
});

export default server;
