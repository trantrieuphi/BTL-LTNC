import { NoteContext } from '../contexts/NoteContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'
import SingleNote from '../components/notes/SingleNote'
import AddNoteModal from '../components/notes/AddNoteModal'
import UpdateNoteModal from '../components/notes/UpdateNoteModal'
import addIcon from '../assets/plus-circle-fill.svg'

const Dashboard = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		noteState: { note, notes, notesLoading },
		getNotes,
		setShowAddNoteModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(NoteContext)

	// Start: Get all notes
	useEffect(() => getNotes(), [])

	let body = null

	if (notesLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (notes.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome to Note App</Card.Title>
						<Card.Text>
							Click the button below to create your first note
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddNoteModal.bind(this, true)}
						>
							Add Note
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{notes.map(note => (
						<Col key={note._id} className='my-2'>
							<SingleNote note={note} />
						</Col>
					))}
				</Row>

				{/* Open Add Note Modal */}
				<OverlayTrigger
					placement='left'
					overlay={<Tooltip>Add a new thing to note</Tooltip>}
				>
					<Button
						className='btn-floating'
						onClick={setShowAddNoteModal.bind(this, true)}
					>
						<img src={addIcon} alt='add-note' width='60' height='60' />
					</Button>
				</OverlayTrigger>
			</>
		)
	}

	return (
		<>
			{body}
			<AddNoteModal />
			{note !== null && <UpdateNoteModal />}
			{/* After note is added, show toast */}
			<Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</>
	)
}

export default Dashboard
