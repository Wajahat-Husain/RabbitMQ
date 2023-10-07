import { emitMessage } from '../services/namedQueue/emitMessage.js'
import { consumeMessage } from '../services/namedQueue/consumMessage.js';

const messageEmitByNameQueue = async (req, res) => {

    try {
        
        const { queue, message } = req.body;
        console.log(`Queue: ${queue}, Message: ${message}`)
        await emitMessage(queue, message)
        await consumeMessage(queue)

    } catch (err) {
        console.error(err.message)
        return res.status(500).send({ status: 0, message: 'Something went wrong', err: err.message })
    }
}

export { messageEmitByNameQueue }