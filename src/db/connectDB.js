import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/videotube")
        // await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    } catch (error) {
        console.log("MongoDB connetion error")
        process.exit(1)
    }
}

export default connectDB;