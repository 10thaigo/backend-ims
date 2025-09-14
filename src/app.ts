import express from 'express';
import apiRouter from 'routes/api';
import authRouter from 'routes/auth';
import authMiddleware from 'middlewares/auth';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', authMiddleware, apiRouter);
app.use('/auth', authRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});