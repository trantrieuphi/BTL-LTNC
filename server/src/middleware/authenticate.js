import  Jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import config from "../../config/config.js";



class AuthMiddleware {
    static async authenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Token required' });
        }
        const token = authHeader.split(' ')[1];
        try {
            const payload = Jwt.verify(token, config.jwt_key);
            const user = await User.findUserById(payload.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            req.user = user;
            // res.locals.user = user;
            next();
        } catch (error) {
            console.log("error in authenticate");
            return res.status(401).json({ error: error.message });
        }
    }
    
    static async authorize(req, res, next) {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        next();
    }
}

export default AuthMiddleware;