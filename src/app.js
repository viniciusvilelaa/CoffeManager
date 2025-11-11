import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import productRoutes from "./routers/productRoutes.js"
//App general configuration
const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/products", productRoutes);

app.post("/debug", (req, res) => {
  console.log("DEBUG BODY:", req.body);
  res.json(req.body);
});

app.use((error, req, res, next) => {
    res.status(500).send(error.message);
})



export default app;