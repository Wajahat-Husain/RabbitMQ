import { emitMessage } from '../services/fanoutExchange/emitMessage.js'
import { consumeMessage } from '../services/fanoutExchange/consumMessage.js';

const messageEmitWithFanoutExchange = async (req, res) => {

    try {

        const { exchange, message } = req.body;
        console.log(`key: ${exchange}, Message: ${message}`)
        await emitMessage(exchange, message)
        await consumeMessage(exchange)

    } catch (err) {
        console.error(err.message)
        return res.status(500).send({ status: 0, message: 'Something went wrong', err: err.message })
    }
}

export { messageEmitWithFanoutExchange }