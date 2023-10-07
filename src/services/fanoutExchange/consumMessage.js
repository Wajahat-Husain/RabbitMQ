import { rabbit_MQ_Connection } from '../../rabbit-connection/index.js'

const consumeMessage = async (exchange) => {
    try {

        rabbit_MQ_Connection(async (err, connection) => {
            if (err) {
                throw err;
            }
            connection.createChannel(function (error, channel) {
                if (error) {
                    throw error;
                }

                channel.assertExchange(exchange, 'fanout', {
                    durable: false
                });

                channel.assertQueue('', {
                    exclusive: true
                }, function (err1, q) {
                    if (err1) {
                        throw err1;
                    }
                    console.log("Waiting for messages", q.queue);
                    channel.bindQueue(q.queue, exchange, '');

                    channel.consume(q.queue, function (message) {
                        if (message.content) {
                            console.log("Message consume", message.content.toString());
                        }
                    }, {
                        noAck: true
                    });

                });

            });

        });

    } catch (err) {
        console.error(`Emit Message: ${err.message}`)
    }

}

export { consumeMessage }

