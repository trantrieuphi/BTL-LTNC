import Note from "../models/note.js";

// Path: server\src\controllers\note.controller.js
// Compare this snippet from server\src\models\note.js:
// import mongoose from 'mongoose';

class NoteController {
    static async createNote(req, res) {
        const { title, content, url, type } = req.body;
        const user = req.user._id;
        try {
            const note = await Note.create({ title, content, url, type, user });
            return res.status(201).json({success: true, note });
        } catch (error) {
            return res.status(500).json({success: false, message: error.message });
        }
    }

    static async getNotes(req, res) {
        try {
            const notes = await Note.find({ user: req.user._id });
            return res.status(200).json({success: true, notes});
        } catch (error) {
            return res.status(500).json({success: false, message: error.message});
        }
    }

    static async getNoteById(req, res) {
        try {
            const note = await Note.findById(req.params.noteId);
            if (note) {
                return res.status(200).json({success: true, note });
            }
            return res.status(404).json({success: false, message: 'Note not found' });
        } catch (error) {
            return res.status(500).json({success: false, message: error.message });
        }
    }

    static async updateNoteById(req, res) {
        const { title, content, url } = req.body;
        try {
            const note = await Note.findOneAndUpdate(
                { _id: req.params.noteId, user: req.user._id },
                { title, content, url },
                { new: true }
            );
            if (note) {
                return res.status(200).json({ success: true, note });
            }
            return res.status(404).json({ success: false, message: 'Note not found' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message});
        }
    }
    
    static async deleteNoteById(req, res) {
        try {
            const note = await Note.findOneAndDelete({ _id: req.params.noteId, user: req.user._id });
            if (note) {
                return res.status(200).json({success: true, message: 'Note deleted' });
            }
            return res.status(404).json({success: false, message: 'Note not found' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message});
        }
    }

    static async deleteAllNotes(req, res) {
        try {
            await Note.deleteMany({});
            return res.status(200).json({ success: true, message: 'All notes deleted' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default NoteController;