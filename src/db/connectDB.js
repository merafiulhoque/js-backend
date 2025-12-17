import mongoose from "mongoose";
import { DB_NAME } from "../constant";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.log("MongoDB connetion error")
        process.exit(1)
    }
}

export default connectDB;