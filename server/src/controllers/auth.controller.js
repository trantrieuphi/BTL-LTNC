import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";


class AuthController {
    static async signup(req, res) {
        const { username, password, confirmPassword } = req.body;
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({success: false , message: 'Username and password required' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({success: false , message: 'Passwords do not match' });
        }
        try {
            const user = await User.findOne({ username });
            if (user) {
                return res.status(400).json({success: false , message: 'Username already exists' });
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const newUser = new User({ username, password: hash });
            await newUser.save();
            const accessToken = jwt.sign({ id: newUser._id }, config.jwt_key, { expiresIn: '1h' });
            return res.status(201).json({success: true,message: 'user create successfully', accessToken});
        } catch (error) {
            return res.status(500).json({success: false , message: error.message });
        }
    }

    static async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({success: false ,message: 'User not found' });
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return res.status(401).json({success: false , message: 'Incorrect password' });
            }
            const accessToken = jwt.sign({ id: user._id }, config.jwt_key, { expiresIn: '1h' });
            return res.status(200).json({success: true, accessToken});
        } catch (error) {
            return res.status(500).json({success: false , message: error.message });
        }
    }

    static async loadUser(req, res) {
        try {
            const user = await User.findById(req.user._id).select('-password');
            if(!user) return res.status(404).json({success: false, message: 'User not found' });

            return res.status(200).json({success: true, user });
        } catch (error) {
            return res.status(500).json({success: false, message: error.message });
        }

    }

    static async getAll(req, res) {
        try {
            const users = await User.find();
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

export default AuthController;

