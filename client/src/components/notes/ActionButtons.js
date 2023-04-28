import Button from 'react-bootstrap/Button'
import urlIcon from '../../assets/url.svg'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { NoteContext } from '../../contexts/NoteContext'
import { useContext } from 'react'

const ActionButtons = ({ url, _id }) => {
	const { deleteNote, findNote, setShowUpdateNoteModal } = useContext(
		NoteContext
	)

	const chooseNote = noteId => {
		findNote(noteId)
		setShowUpdateNoteModal(true)
	}

	return (
		<>
			<Button className='note-button' href={url} target='_blank'>
				<img src={urlIcon} alt='play' width='24' height='24' />
			</Button>
			<Button className='note-button' onClick={chooseNote.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='note-button' onClick={deleteNote.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons
