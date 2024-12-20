import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const conection = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        if (conection) {
            const conn = await mongoose.connect(conection);
            console.log(`MongoDB Connected: ${conn.connection.host}`)
        }
        
    } catch (error: any) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB;