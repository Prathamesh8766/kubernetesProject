import mogoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connect = await mogoose.connect(process.env.MONGODB_URL);
        console.log(`Connect to MongoDB ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error in MongoDB Connection ${error.message}`);
        process.exit(1);
    }
}