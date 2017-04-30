import restify from 'restify';

import ShoppingCart from './src/shopping-cart';

function healthcheck(req, res) {
    res.send(200, 'all gravy');
}

function cart(req, res) {
    if (req.body instanceof Error) {
        console.log('bad request');
        return res.send(400, req.body.stack);
    }

    const cart = new ShoppingCart(req.body);
    const total = cart.getLineItems();
    console.log(req.body, total);

    return res.send(200, total);
}

const server = restify.createServer();
server.use(restify.bodyParser());

server.get('/healthcheck/', healthcheck);
server.post('/cart/', cart);

server.listen(8080, () => {
    console.log(`${server.name} listening at ${server.url}`);
});
