import jwt from 'jsonwebtoken';
import { Request } from 'express';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();
interface AuthenticatedRequest extends Request {
    user?: any;
}

const protect = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
    let token;

    token = req.cookies.jwt;
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload & { userId: string };
        req.user = await User.findById(decoded.userId).select('-password');

        next();
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
});


const admin = asyncHandler(async (req: any, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
})

export {protect, admin};