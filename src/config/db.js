import mongoose from "mongoose";
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.EVN_URL_MONDB, {
        })


            if (conn && conn.connection) {
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        } else {
        console.log("⚠️ MongoDB connection object is undefined");
        }
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1)
        
        
    }
}

export default connectDB