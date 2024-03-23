const NoteDetails = ({ assignment, note }) => {
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
