import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { NoteContext } from '../../contexts/NoteContext'

const AddNoteModal = () => {
	// Contexts
	const {
		showAddNoteModal,
		setShowAddNoteModal,
		addNote,
		setShowToast
	} = useContext(NoteContext)

	// State
	const [newNote, setNewNote] = useState({
		title: '',
		content: '',
		url: '',
		type: 'Learn'
	})

	const { title, content, url, type } = newNote

	const onChangeNewNoteForm = event =>
		setNewNote({ ...newNote, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddNoteData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addNote(newNote)
		resetAddNoteData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddNoteData = () => {
		setNewNote({ title: '', content: '', url: '', type: 'Learn' })
		setShowAddNoteModal(false)
	}

	return (
		<Modal show={showAddNoteModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>What do you want to note?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Title'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeNewNoteForm}
						/>
						<Form.Text id='title-help' muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Description'
							name='content'
							value={content}
							onChange={onChangeNewNoteForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL'
							name='url'
							value={url}
							onChange={onChangeNewNoteForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='select'
							value={type}
							name='type'
							onChange={onChangeNewNoteForm}
						>
							<option value='Learn'>LEARN</option>
							<option value='Work'>WORK</option>
							<option value='Life'>LIFE</option>
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						Add
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddNoteModal
