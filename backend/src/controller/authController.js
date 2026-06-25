import User from '../models/User.js'; // Fixed typo: 'modles' -> 'models'
import generateToken from '../util/generateToken.js';

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

      
        const userExist = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (userExist) {
            return res.status(400).json({
                success: false,
                error: userExist.email === email
                    ? "Email already registered"
                    : "Username already taken",
            });
        }

        const user = await User.create({ username, email, password });

        const token = await generateToken(user._id);
        
        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profileImage: user.profileImage || null, // Handle case where image might not exist
                    createdAt: user.createdAt,
                },
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Validate Input First
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Provide email and password",
            });
        }

        // 2. Find User (Moved OUT of the previous 'if' block)
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "User does not exist",
            });
        }

        // 3. Compare Password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // 4. Generate Token
        const token = await generateToken(user._id);

        // 5. Send Success Response
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: { // Wrapped user data in 'data' for consistency with register
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                },
                token,
            },
        });

    } catch (error) {
        next(error);
    }
};   