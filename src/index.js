import dotenv from 'dotenv'
dotenv.config({path: './.env'});
import mongoose from 'mongoose'
import connectDB from './db/index.js'
import express from 'express'
import { DB_NAME } from './constants.js';


// connectDB()



const app = express()


// whencever call database always use try catch or promises(bcoz in promises we have resolve, reject)

(async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
    } catch (error) {
        console.log("MongoDB connection FAILED !!! ", error);
        throw error
    }
})() // this IFEEs more 