import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { NoteContext } from '../../contexts/NoteContext'

const UpdateNoteModal = () => {
	// Contexts
	const {
		noteState: { note },
		showUpdateNoteModal,
		setShowUpdateNoteModal,
		updateNote,
		setShowToast
	} = useContext(NoteContext)

	// State
	const [updatedNote, setUpdatedNote] = useState(note)

	useEffect(() => setUpdatedNote(note), [note])

	const { title, content, url, type } = updatedNote

	const onChangeUpdatedNoteForm = event =>
		setUpdatedNote({ ...updatedNote, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedNote(note)
		setShowUpdateNoteModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateNote(updatedNote)
		setShowUpdateNoteModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddNoteData = () => {
	// 	setNewNote({ title: '', content: '', url: '', status: 'TO LEARN' })
	// 	setShowAddNoteModal(false)
	// }

	return (
		<Modal show={showUpdateNoteModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Making progress?</Modal.Title>
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
							onChange={onChangeUpdatedNoteForm}
						/>
						<Form.Text id='title-help' muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='content'
							name='content'
							value={content}
							onChange={onChangeUpdatedNoteForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL'
							name='url'
							value={url}
							onChange={onChangeUpdatedNoteForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='select'
							value={type}
							name='type'
							onChange={onChangeUpdatedNoteForm}
						>
							<option defaultChecked value='Learn'>LEARN</option>
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
						Save
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default UpdateNoteModal
