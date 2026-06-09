import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected with Database!");
    } catch (err) {
        console.error("Failed to connect with DB:", err);
        process.exit(1);
    }
};

export default connectDB;