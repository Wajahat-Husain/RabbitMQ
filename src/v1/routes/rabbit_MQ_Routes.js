import { Router } from 'express';
import { messageEmitByNameQueue } from '../../controllers/messageEmitByNameQueue.js'
import { messageEmitWithFanoutExchange } from '../../controllers/messageEmitWithFanoutExchange.js'
const router = Router();

router.post('/messageEmitByNameQueue', messageEmitByNameQueue)
router.post('/messageEmitWithFanoutExchange', messageEmitWithFanoutExchange)

export { router }
