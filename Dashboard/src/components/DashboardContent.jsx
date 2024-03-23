import Citations from "./Citations"
import NoteCard from "./NoteCard"
import URLRec from "./URLRec"
import dummyUser from "../../dummyUser.json"
import { useParams } from "react-router-dom"

const DashboardContent = ({}) => {
	const { assignmentID } = useParams()

	// fetch assignment info
    const response = dummyUser
    const assignment = response.classes[0].assignments[assignmentID-1]

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
					<div className="note-card-container">
						{assignment.notes.map((note, index) => (
							<NoteCard key={index} note={note} />
						))}
					</div>
					<Citations urls={getAllNoteUrls(assignment.notes)} />
					<h4>More Resources: </h4>
					<ul>
						{assignment.urlRecs.map((url, index) => (
							<URLRec url={url} />
						))}
					</ul>
				</div>
			)}
		</>
	)
}

export default DashboardContent
