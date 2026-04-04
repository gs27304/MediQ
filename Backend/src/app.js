import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

// Route Imports
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import doctorRouter from "./routes/doctor.route.js"
import reviewRouter from "./routes/review.route.js"
import bookingRouter from "./routes/booking.route.js"
import geminiRouter from "./routes/gemini.js" // Updated to point to your new gemini.js file
import newsRouter from "./routes/news.router.js"

const app = express()

// 1. Middleware Configuration
app.use(cors({
    // Uses the origin from your .env (likely http://localhost:5173)
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", 
    credentials: true
}))

// Standard MERN security and parsing limits
app.use(express.json({ limit: "16kb" })) 
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// 2. API Route Declarations
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/doctors", doctorRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/bookings", bookingRouter)
app.use("/api/v1/news", newsRouter)

/** * AI Chatbot Route
 * This matches your frontend config: http://localhost:8000/api/v1/gemini/chat
 */
app.use("/api/v1/gemini", geminiRouter)

// Systems Health Check
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ status: "MediQ Systems Online" })
})

export { app }