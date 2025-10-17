import mongoose from "mongoose";

// Enhanced Database connection function with better diagnostics
export const dbConnection = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("MONGO_URI is not defined in environment variables");
        throw new Error("Missing MONGO_URI env var");
    }
    try {
        console.log("Attempting MongoDB connection...");
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 30000, // 30s timeout
            socketTimeoutMS: 45000, // 45s socket timeout
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn;
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        // Provide common hints
        console.error("Hints: Check IP allowlist / network, verify credentials, ensure the cluster is running.");
        console.error("For local MongoDB: Ensure MongoDB service is running on your machine.");
        throw err; // rethrow so caller can decide to exit
    }
};