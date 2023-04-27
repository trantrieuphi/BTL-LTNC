import NoteController from "../controllers/note.controller.js";
import AuthMiddleware from "../middleware/authenticate.js";
import { Router } from "express";

class NoteRouter {
    constructor() {
        this.router = Router();
        this.router.get('/test', async (req, res) => {
            console.log('this is note router');
            await res.json({ message: 'this is note router' });
        })
        this.router.use(AuthMiddleware.authenticate);
        this.router.post('/',  NoteController.createNote);
        this.router.get('/', NoteController.getNotes);
        this.router.get('/:noteId', NoteController.getNoteById);
        this.router.put('/:noteId', NoteController.updateNoteById);
        this.router.delete('/:noteId', NoteController.deleteNoteById);
    }
}

export default new NoteRouter().router;
