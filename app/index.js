import server from './src/server.js';

console.log('starting server...');

server.listen(8080, () => {
    console.log(`${server.name} listening at ${server.url}`);
});
