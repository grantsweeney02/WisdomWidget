import Citations from "./Citations"
import NoteCard from "./NoteCard"

const DashboardContent = ({ assignment }) => {
	const getAllNoteUrls = (notes) => {
		const urls = []
		notes.forEach((note) => {
			urls.push(note.url)
		})
		return urls
	}

	return (
		<>
			{assignment && (
				<div className="col-10">
					<h1>{assignment.name}</h1>
					{assignment.due ? <h4>Due Date: {assignment.due}</h4> : null}
					<h4>Notes: </h4>
					{assignment.notes.map((note, index) => (
						<NoteCard key={index} note={note} />
					))}
					<Citations urls={getAllNoteUrls(assignment.notes)} />
					<h4>More Resources: </h4>
					<ul>
						{assignment.urlRecs.map((url, index) => (
							<li key={index}>
								<a key={index} href={url}>
									{url}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	)
}

export default DashboardContent
