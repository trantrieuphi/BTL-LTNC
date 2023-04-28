import Note from "../models/note.js";

// Path: server\src\controllers\note.controller.js
// Compare this snippet from server\src\models\note.js:
// import mongoose from 'mongoose';

class NoteController {
    static async createNote(req, res) {
        const data = req.body;
        data.user = req.user._id;
        try {
            const note = await Note.create(data);
            return res.status(201).json({ success: true, note });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    static async getNotes(req, res) {
        try {
            const notes = await Note.findNotesByUserId(req.user._id );
            return res.status(200).json({success: true, notes});
        } catch (error) {
            return res.status(500).json({success: false, message: error.message});
        }
    }

    static async getNoteById(req, res) {
        try {
            const note = await Note.findNoteById(req.params.noteId );
            if (note) {
                return res.status(200).json({ success: true, note });
            }
            return res.status(404).json({ success: false, message: 'Note not found' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message});
        }
    }

    static async updateNoteById(req, res) {
        try {
            const note = await Note.updateNoteById(req.params.noteId, req.body );
            if (note) {
                return res.status(200).json({ success: true, note });
            }
            return res.status(404).json({ success: false, message: 'Note not found' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    
    static async deleteNoteById(req, res) {
        try {
            const note = await Note.deleteNoteById(req.params.noteId );
            if (note) {
                return res.status(200).json({ success: true, note });
            }
            return res.status(404).json({ success: false, message: 'Note not found' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    static async deleteAllNotes(req, res) {
        try {
            const notes = await Note.deleteAllNotes();
            return res.status(200).json({ success: true, notes });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default NoteController;