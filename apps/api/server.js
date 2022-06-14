const fastify = require('fastify')();

fastify.get('/', (req, reply) => {
    reply.send('Hello World!');
});


const startServer = async () => {
    try {
        await fastify.listen(5000);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

startServer();
