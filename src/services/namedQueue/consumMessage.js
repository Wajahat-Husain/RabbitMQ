import { rabbit_MQ_Connection } from '../../rabbit-connection/index.js'

const consumeMessage = async (queue) => {
    try {

        rabbit_MQ_Connection(async (err, connection) => {
            if (err) {
                throw err;
            }
            connection.createChannel(function (error, channel) {
                if (error) {
                    throw error;
                }
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.consume(queue, function (msg) {
                    console.log(`Consumed message with Name Queue : ${msg.content.toString()}`);
                    // channel.ack(msg)
                }, {
                    noAck: true
                });
                setTimeout(function () {
                    connection.close();
                    process.exit(0)
                }, 500);
            });

        });

    } catch (err) {
        console.error(`Emit Message: ${err.message}`)
    }

}

export { consumeMessage }

