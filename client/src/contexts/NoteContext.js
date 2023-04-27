import { createContext, useReducer, useState } from 'react'
import { noteReducer } from '../reducers/noteReducer'
import {
	apiUrl,
	NOTES_LOADED_FAIL,
	NOTES_LOADED_SUCCESS,
	ADD_NOTE,
	DELETE_NOTE,
	UPDATE_NOTE,
	FIND_NOTE
} from './constants'
import axios from 'axios'

export const NoteContext = createContext()

const NoteContextProvider = ({ children }) => {
	// State
	const [noteState, dispatch] = useReducer(noteReducer, {
		note: null,
		notes: [],
		notesLoading: true
	})

	const [showAddNoteModal, setShowAddNoteModal] = useState(false)
	const [showUpdateNoteModal, setShowUpdateNoteModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all notes
	const getNotes = async () => {
		try {
			const response = await axios.get(`${apiUrl}/notes`)
			if (response.data.success) {
				dispatch({ type: NOTES_LOADED_SUCCESS, payload: response.data.notes })
			}
		} catch (error) {
			dispatch({ type: NOTES_LOADED_FAIL })
		}
	}

	// Add note
	const addNote = async newNote => {
		try {
			const response = await axios.post(`${apiUrl}/notes`, newNote)
			if (response.data.success) {
				dispatch({ type: ADD_NOTE, payload: response.data.note })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete note
	const deleteNote = async noteId => {
		try {
			const response = await axios.delete(`${apiUrl}/notes/${noteId}`)
			if (response.data.success)
				dispatch({ type: DELETE_NOTE, payload: noteId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find note when user is updating note
	const findNote = noteId => {
		const note = noteState.notes.find(note => note._id === noteId)
		dispatch({ type: FIND_NOTE, payload: note })
	}

	// Update note
	const updateNote = async updatedNote => {
		try {
			const response = await axios.put(
				`${apiUrl}/notes/${updatedNote._id}`,
				updatedNote
			)
			if (response.data.success) {
				dispatch({ type: UPDATE_NOTE, payload: response.data.note })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Note context data
	const noteContextData = {
		noteState,
		getNotes,
		showAddNoteModal,
		setShowAddNoteModal,
		showUpdateNoteModal,
		setShowUpdateNoteModal,
		addNote,
		showToast,
		setShowToast,
		deleteNote,
		findNote,
		updateNote
	}

	return (
		<NoteContext.Provider value={noteContextData}>
			{children}
		</NoteContext.Provider>
	)
}

export default NoteContextProvider
