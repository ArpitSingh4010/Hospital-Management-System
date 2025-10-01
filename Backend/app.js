import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js';
import messageRouter from './routes/messageRouter.js';  
import {errorMiddleware} from'./middlewares/errorMiddleware.js'; // to handle errors
import userRouter from './routes/userRouter.js';
import appointmentRouter from './routes/appointmentRouter.js';

const app = express();
config({ path: "./config/config.env" });  //to use env variables

// Logging middleware to debug incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//cors is used to allow frontend to access backend

app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL,process.env.DASHBOARD_URL_ALT],
    methods: ['GET','POST','PUT','DELETE'],
    credentials:true,
}));

app.use(cookieParser());  //for backend to get cookies from frontend
app.use(express.json());  //to accept json data from frontend
app.use(express.urlencoded({ extended: true })); //to accept form data from frontend


//fileupload is used to upload files like images from frontend to backend
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
    createParentPath:true
}));

app.use("/api/v1/message",messageRouter);  //message route
app.use("/api/v1/user",userRouter);  //user route
app.use("/api/v1/appointment", appointmentRouter);  //appointment route

dbConnection();  //database connection


app.use(errorMiddleware); //error middleware to handle errors
export default app;