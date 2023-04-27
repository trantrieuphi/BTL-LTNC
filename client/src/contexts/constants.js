export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api'
		: 'https://sleepy-inlet-56101.herokuapp.com/api'

export const LOCAL_STORAGE_TOKEN_NAME = 'note-app'

export const NOTES_LOADED_SUCCESS = 'NOTES_LOADED_SUCCESS'
export const NOTES_LOADED_FAIL = 'NOTES_LOADED_FAIL'
export const ADD_NOTE = 'ADD_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'
export const FIND_NOTE = 'FIND_NOTE'
