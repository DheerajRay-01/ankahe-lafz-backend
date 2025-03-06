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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN ); // Ensure this is set correctly
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No content, just approve preflight
  }

  next();
});


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);

export { app };
