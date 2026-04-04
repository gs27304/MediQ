import dotenv from "dotenv";
import { app } from "./src/app.js";
import connectDB from "./src/db/dbConnection.js";

// Load environment variables immediately
dotenv.config();

const PORT = process.env.PORT || 8000; // Updated to match your config.js (8000)

connectDB()
    .then(() => {
        // Start listening for requests
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server is running at: http://localhost:${PORT}`);
        });

        // Handle server-level errors (like port already in use)
        server.on("error", (error) => {
            console.error("❌ Server execution error:", error);
        });

        // App-level error handling for DB connection issues after startup
        app.on("error", (error) => {
            console.error("❌ Express Application Error:", error);
        });
    })
    .catch((err) => {
        console.error("📂 MongoDB connection failed:", err);
        process.exit(1); // Exit process with failure
    });