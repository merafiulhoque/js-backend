import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/connectDB";

dotenv.config({
    path: "./env"
})

connectDB()
.then(()=>{
    console.log("Connected Successfully");
    app.listen(process.env.PORT || 5000 , () => {
        console.log(`Server is running at PORT ${process.env.PORT? process.env.PORT : 5000}`);
    })
})
.catch((error)=>{
    console.log(`Error connecting Database`,error)
})

