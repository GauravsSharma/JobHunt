import express from "express";
import connectToDatabase from "./utils/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import user from "./routes/user.js";
import company from "./routes/company.js";
import job from "./routes/job.js";
import message from "./routes/message.js";
import application from "./routes/application.js";
import cloudinary from "cloudinary"
import { server,app } from "./socket/socket.js";

dotenv.config({});
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
})

const PORT = process.env.PORT || 3000;

// Configure CORS options
const corsOptions = {
    origin: ["https://gaurav-jobhunt.netlify.app","http://localhost:5173"],
    credentials: true,
};

// Apply CORS middleware before routes
app.use(cors(corsOptions));
// Middleware to parse incoming requests
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Route handlers
app.use("/api/v1/user", user);
app.use("/api/v1/company", company);
app.use("/api/v1", job);
app.use("/api/v1/application", application);
app.use("/api/v1/message", message);


connectToDatabase();

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
