import amqp from 'amqplib/callback_api.js';

const rabbit_MQ_Connection = (callback) => {
    try {
        amqp.connect('amqp://rabbitmq:5672', (err, connection) => {
            if (err) {
                console.error('Error connecting to RabbitMQ:', err);
                return callback(err, null);
            }
            console.log('Successfully connected to RabbitMQ!');
            return callback(null, connection);
        });
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        return callback(error, null);
    }
};

export { rabbit_MQ_Connection }