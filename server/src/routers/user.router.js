import AuthController from "../controllers/auth.controller.js";
import AuthMiddleware from "../middleware/authenticate.js";
import { Router } from "express";

class UserRouter {
    constructor() {
        this.router = Router();
        this.router.get('/', async (req, res) => {
            console.log('Hello World');
            await res.json({ message: 'Hello World' });
        })
        this.router.post('/register', AuthController.signup);
        this.router.post('/login', AuthController.login);
        this.router.get('/all', AuthController.getAll);
        this.router.get('/me', AuthMiddleware.authenticate, AuthController.me);
    }
}

export default new UserRouter().router;