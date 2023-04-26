import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";


class AuthController {
    static async signup(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (user) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const newUser = new User({ username, password: hash });
            await newUser.save();
            return res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
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
                return res.status(404).json({ error: 'User not found' });
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return res.status(401).json({ error: 'Incorrect password' });
            }
            const token = jwt.sign({ id: user._id }, config.jwt_key, { expiresIn: '1h' });
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async me(req, res) {
        return res.status(200).json({ user: req.user });
    }

    static async getAll(req, res) {
        try {
            const users = await User.find();
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}

export default AuthController;

