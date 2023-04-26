import userRouter from "./routers/user.router.js";
import noteRouter from "./routers/note.router.js";
import express from "express";
import cors from "cors";
import Database from "./helper/db.js";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.init();
    }

    init() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/api/users', userRouter);
        this.app.use('/api/notes', noteRouter);
        this.app.use((req, res) => {
            res.status(404).json({ error: 'Not found' });
        });
    }

    async start() {
            this.app.listen(this.port, async () => {
            await Database.connect();
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

export default Server;