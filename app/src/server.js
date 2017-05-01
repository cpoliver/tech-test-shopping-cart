import restify from 'restify';

import { getReceipt } from './shopping-cart';
import logReceipt from './log-receipt';

const server = restify.createServer();
server.use(restify.bodyParser());

server.get('/healthcheck/', (request, response) => {
    response.send(200, 'all gravy');
});

server.post('/cart/', (request, response) => {
    const cartItems = request.body;
    const receipt = getReceipt(cartItems);

    logReceipt(receipt);

    return response.send(200, receipt);
});

export default server;
