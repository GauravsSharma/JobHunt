import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookies or headers
        let token = req.cookies?.token || req.headers.authorization;
        // Check if token is provided
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        // If token starts with "Bearer", remove it to get the actual token
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trim();
        }

        // Verify the token and extract the user ID
        const {userId} = jwt.verify(token, process.env.SECRET_KEY);

        // Find user by ID
        const user = await UserModel.findById(userId);

        // If no user is found, token might be expired
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token expired, please re-login"
            });
        }

        // Attach user ID to the request object
        req.userId = user._id;

        // Proceed to the next middleware
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Please login first"
        });
    }
};
