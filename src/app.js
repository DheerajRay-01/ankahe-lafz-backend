import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js'; // ✅ Adjust import if needed
import contentRouter from './routes/content.routes.js';
dotenv.config(); 

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN ,
    credentials: true
}));


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);

export { app };
