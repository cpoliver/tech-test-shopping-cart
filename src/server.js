import restify from 'restify';

import ShoppingCart from './shopping-cart';

const server = restify.createServer();
server.use(restify.bodyParser());

server.get('/healthcheck/', (request, response) => {
    response.send(200, 'all gravy');
});

server.post('/cart/', (request, response) => {
    const cart = new ShoppingCart(request.body);
    const total = cart.getLineItems();
    console.log(total);

    return response.send(200, total);
});

export default server;
