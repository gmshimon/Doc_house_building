import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'

// Define __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const port = process.env.PORT || 5000

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.json())
app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017/doc_house'
mongoose.connect(uri).then(()=>{
    console.log("Connected to MongoDB")
})

import UserRouter from './Module/User/user.routes.js'
import DoctorRouter from './Module/Doctor/doctor.routes.js'

app.use('/api/v1/user', UserRouter)


app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
    console.log(`Server running on port ${port}`)
})

export default app