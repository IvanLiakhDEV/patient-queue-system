import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './db/connect.js';
import userRouter from './src/router/UserRouter.js';
import { errorMiddleware } from './src/middlewares/error.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use('/user/', userRouter);

app.get('', (req, res) => res.send('Hello'));

connectToDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

app.use(errorMiddleware);
