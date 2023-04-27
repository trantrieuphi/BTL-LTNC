import AuthController from "../controllers/auth.controller.js";
import AuthMiddleware from "../middleware/authenticate.js";
import { Router } from "express";

class UserRouter {
    constructor() {
        this.router = Router();
        this.router.get('/',AuthMiddleware.authenticate, AuthController.loadUser);
        this.router.post('/register', AuthController.signup);
        this.router.post('/login', AuthController.login);
        this.router.get('/all', AuthController.getAll);
    }
}

export default new UserRouter().router;