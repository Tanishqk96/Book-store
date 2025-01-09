import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productroutes from './routes/productroutes.js'
import cors from "cors"; // import cors here
dotenv.config({path:'../.env'});
const app= express();
app.use(express.json());
app.use('/api/products',productroutes);
app.use(cors());
app.listen(3000, () =>{
    connectDB();
    console.log("server is running fine.");
})
