import { rabbit_MQ_Connection } from '../../rabbit-connection/index.js'

const emitMessage = async (exchange, message) => {
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

                channel.publish(exchange, '', Buffer.from(message));
                console.log(`Sent message to fanout Exchange message: ${message}`);

            });

            setTimeout(function () {
                connection.close();
                process.exit(0);
            }, 500);

        });

    } catch (err) {
        console.error(`Emit Message: ${err.message}`)
    }

}

export { emitMessage }