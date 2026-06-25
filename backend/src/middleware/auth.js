import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    // 1. Fixed: req.header -> req.headers (plural)
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, no token provided",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            // 2. Fixed: return.status -> return res.status
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        }
        
        req.user = user;
        
        // 3. Fixed: Added missing 'next()' parameter to function signature and called it here
        return next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired",
            });
        }
        return res.status(401).json({
            success: false,
            message: "Not authorized, token invalid",
        });
    }
    // 4. Removed: Unreachable code below the try/catch block
};   