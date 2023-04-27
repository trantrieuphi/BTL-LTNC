import {
	NOTES_LOADED_SUCCESS,
	NOTES_LOADED_FAIL,
	ADD_NOTE,
	DELETE_NOTE,
	UPDATE_NOTE,
	FIND_NOTE,
} from '../contexts/constants'

export const noteReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case NOTES_LOADED_SUCCESS:
			return {
				...state,
				notes: payload,
				notesLoading: false
			}

		case NOTES_LOADED_FAIL:
			return {
				...state,
				notes: [],
				notesLoading: false
			}

		case ADD_NOTE:
			return {
				...state,
				notes: [...state.notes, payload]
			}

		case DELETE_NOTE:
			return {
				...state,
				notes: state.notes.filter(note => note._id !== payload)
			}

		case FIND_NOTE:
			return { ...state, note: payload }

		case UPDATE_NOTE:
			const newNotes = state.notes.map(note =>
				note._id === payload._id ? payload : note
			)

			return {
				...state,
				notes: newNotes
			}

		default:
			return state
	}
}
