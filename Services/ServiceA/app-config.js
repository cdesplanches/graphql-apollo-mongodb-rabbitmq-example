const PORT = 5000;
const environment = {
    development: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb://localhost:27017/serviceA?retryWrites=true&w=majority',
        rabbitmqString: 'amqp://localhost'
    },
    debug: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb://mongo:27017/serviceA?retryWrites=true&w=majority',
        rabbitmqString: 'amqp://rabbitmq:15672'
    },
    production: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb://mongo:27017/serviceA?retryWrites=true&w=majority',
        rabbitmqString: 'amqp://rabbitmq:15672'
    }
}

module.exports = { PORT, environment }
