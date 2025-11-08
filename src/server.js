import dotenv from 'dotenv';
import app from './app.js';


//.ENV Configuration and stating server
dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));








