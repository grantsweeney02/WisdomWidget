import { useParams } from 'react-router-dom';

const NoteDetails = ({ assignment, note }) => {
    const { noteID } = useParams();
    
    // get note info from db

	return (
		<>
			{note && (
				<div className="col-10">
					<h1>{note.name}</h1>
				</div>
			)}
		</>
	)
}

export default NoteDetails
