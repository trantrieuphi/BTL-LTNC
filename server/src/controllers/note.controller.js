import Note from "../models/note.js";

// Path: server\src\controllers\note.controller.js
// Compare this snippet from server\src\models\note.js:
// import mongoose from 'mongoose';

class NoteController {
    static async createNote(req, res) {
        const { title, content } = req.body;
        const user = req.user._id;
        try {
            const note = await Note.create({ title, content, user });
            return res.status(201).json({ note });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getNotes(req, res) {
        try {
            const notes = await Note.find({ user: req.user._id });
            return res.status(200).json({ notes });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getNoteById(req, res) {
        try {
            const note = await Note.findById(req.params.id);
            if (note) {
                return res.status(200).json({ note });
            }
            return res.status(404).json({ error: 'Note not found' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async updateNoteById(req, res) {
        const { title, content } = req.body;
        try {
            const note = await Note.findOneAndUpdate(
                { _id: req.params.id, user: req.user._id },
                { title, content },
                { new: true }
            );
            if (note) {
                return res.status(200).json({ note });
            }
            return res.status(404).json({ error: 'Note not found' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    
    static async deleteNoteById(req, res) {
        try {
            const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
            if (note) {
                return res.status(200).json({ message: 'Note deleted' });
            }
            return res.status(404).json({ error: 'Note not found' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async deleteAllNotes(req, res) {
        try {
            await Note.deleteMany({});
            return res.status(200).json({ message: 'All notes deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default NoteController;