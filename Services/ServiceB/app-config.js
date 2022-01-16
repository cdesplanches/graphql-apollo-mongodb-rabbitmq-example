const PORT = 5001;
const environment = {
    development: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb://localhost:27017/serviceB?retryWrites=true&w=majority',
        rabbitmqString: 'amqp://localhost'
    },
    debug: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb://mongo:27017/serviceB?retryWrites=true&w=majority',
        rabbitmqString: 'amqp://guest:guest@rabbitmq'
    },
    production: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb://mongo:27017/serviceB?retryWrites=true&w=majority',
        rabbitmqString: 'amqp://guest:guest@rabbitmq'
    }
}

module.exports = { PORT, environment }
