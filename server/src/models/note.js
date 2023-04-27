import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  url: {
    type: String,
  },
  type: {
    type: String,
    enum: ['Learn', 'Work', 'Life'],
    default: 'Life',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  }

});


class NoteModel {
  constructor() {
    this.note = mongoose.model('Note', noteSchema);
  }

  async create(data) {
    const note = await this.note.create(data);
    return note;
  }

  async findNoteById(id) {
    const note = await this.note.findById(id);
    return note;
  }

  async updateNoteById(id, data) {
    const note = await this.note.findByIdAndUpdate(id, data, { new: true });
    return note;
  }

  async deleteNoteById(id) {
    const note = await this.note.findByIdAndDelete(id);
    return note;
  }

  async findAllNotes() {
    const notes = await this.note.find();
    return notes;
  }

  async findNotesByUserId(id) {
    const notes = await this.note.find({ user: id });
    return notes;
  }

  async deleteAllNotes() {
    const notes = await this.note.deleteMany();
    return notes;
  }

}
const Note = new NoteModel();

export default Note;
