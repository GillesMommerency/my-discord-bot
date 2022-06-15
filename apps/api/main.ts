import {FastifyReply, FastifyRequest} from "fastify";

const fastify = require('fastify')();

fastify.get('/', (req:  FastifyRequest, reply: FastifyReply) => {
    reply.send('Hello World!');
});


const startServer = async () => {
    try {
        await fastify.listen({ port: 5000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

startServer().then(() => console.log('Server is listening on port 5000'));
