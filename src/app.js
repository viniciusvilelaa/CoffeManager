import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

//App general configuration
const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use((error, req, res, next) => {
    res.status(500).send(error.message);
})

export default app;