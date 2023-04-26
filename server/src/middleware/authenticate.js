import  Jwt from "jsonwebtoken";
import User from "../models/user.js";
import Note from "../models/note.js";
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
            const user = await User.findById(payload.id);
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

    // static async authorNote (req, res, next) {
    //     const noteId = req.params.id;
    //     try {
            
    //         const note = await Note.findById(noteId);
    //         if (!note) {
    //             return res.status(404).json({ error: 'Note not found' });
    //         }
    //         if (note.user.toString() !== req.user._id.toString()) {
    //             return res.status(403).json({ error: 'Unauthorized' });
    //         }
    //         next();
    //     } catch (error) {
    //         console.log("error in authorNote");
    //         return res.status(500).json({ error: error.message });
    //     }
    // }

    // static requireAuthor() {
    //     return [
    //         AuthMiddleware.authenticate,
    //         AuthMiddleware.authorNote
    //     ]
    // }
    
    
    static async authorize(req, res, next) {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        next();
    }

    static async checkPassword(req, res, next) {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ error: 'Password required' });
        }
        try {
            const valid = await bcrypt.compare(password, req.user.password);
            if (!valid) {
                return res.status(401).json({ error: 'Incorrect password' });
            }
            next();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
// class AuthMiddleware {
//     static async authenticate(req, res, next) {
//         const authHeader = req.headers.authorization;
//         if (!authHeader) {
//             return res.status(401).json({ error: 'Token required' });
//         }
//         const token = authHeader.split(' ')[1];
//         try {
//             const payload = Jwt.verify(token, process.env.JWT_SECRET);
//             const user = await User.findById(payload.id);
//             if (!user) {
//                 return res.status(404).json({ error: 'User not found' });
//             }
//             req.user = user;
//             next();
//         } catch (error) {
//             return res.status(401).json({ error: error.message });
//         }
//     }

//     static async authorize(req, res, next) {
//         if (req.user.role !== 'admin') {
//             return res.status(403).json({ error: 'Unauthorized' });
//         }
//         next();
//     }

//     static async checkPassword(req, res, next) {
//         const { password } = req.body;
//         if (!password) {
//             return res.status(400).json({ error: 'Password required' });
//         }
//         try {
//             const valid = await bcrypt.compare(password, req.user.password);
//             if (!valid) {
//                 return res.status(401).json({ error: 'Incorrect password' });
//             }
//             next();
//         } catch (error) {
//             return res.status(500).json({ error: error.message });
//         }
//     }


// }

export default AuthMiddleware;