import express from 'express';
import { router } from "./v1/routes/rabbit_MQ_Routes.js";
const app = express();
const PORT = process.env.PORT || 9000 ;

app.use(express.json());

app.get("/", async (req, res) => {
     try {
         return res
             .status(200)
             .send({ uptime: process.uptime(), status: "Ok!", timestamp: new Date() });
     } catch (error) {
         console.error(error);
         res.status(503).send(error);
     }
 });
 
app.use('/api/rabbitMQ-exchange', router);

app.listen(PORT , ( )=>{
 console.log(`API server listening on port ${PORT}`);
})
