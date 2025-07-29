import dotenv from 'dotenv'
dotenv.config({path: './.env'});
import mongoose from 'mongoose'
import connectDB from './db/index.js'
import express from 'express'
import { DB_NAME } from './constants.js';

import {app} from './app.js'




app.on("error", (error) =>{
    console.log("ERRRR", error);
    throw error;
})

connectDB()
.then(() =>{
    const port = process.env.PORT || 8000
    app.listen(port , () =>{
        console.log("Server is runn at port: ", port);
    })
    
    
})
.catch((error) => {
    console.log("Mongo DB connection Failed !!!" , error);
})





// whencever call database always use try catch or promises(bcoz in promises we have resolve, reject)
/*
(async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERRR: ", error);
            throw error    
        })
    } catch (error) {
        console.log("MongoDB connection FAILED !!! ", error);
        throw error
    }
})() // this IFEEs more 
*/