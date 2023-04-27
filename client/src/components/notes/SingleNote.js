import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'

const SingleNote = ({ note: { _id, type, title, content, url } }) => (
	<Card
		className='shadow'
		border={
			type === 'LEARN'
				? 'success'
				: type === 'WORK'
				? 'warning'
				: 'danger'
		}
	>
		<Card.Body>
			<Card.Title>
				<Row>
					<Col>
						<p className='note-title'>{title}</p>
						<Badge
							pill
							variant={
								type === 'LEARN'
									? 'success'
									: type === 'WORK'
									? 'warning'
									: 'danger'
							}
						>
							{type}
						</Badge>
					</Col>
					<Col className='text-right'>
						<ActionButtons url={url} _id={_id} />
					</Col>
				</Row>
			</Card.Title>
			<Card.Text>{content}</Card.Text>
		</Card.Body>
	</Card>
)

export default SingleNote
