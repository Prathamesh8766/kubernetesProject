import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connect to MongoDB ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error in MongoDB Connection ${error.message}`);
        process.exit(1);
    }
}
export default connectDB;
