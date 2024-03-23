import { useParams } from "react-router-dom"

const NoteDetails = ({}) => {
	const { noteID } = useParams()

	// get note info from db
    const data = demoResponse // from fetch

	return (
		<>
			{noteID && (
				<div className="col-10">
					<h1>{data.assignmentName} - {data.note.name}</h1>
				</div>
			)}
		</>
	)
}

export default NoteDetails

const demoResponse = {
    assignmentName: "Assignment1",
    note: {
        name: "Note1",
        url: "http://www.google.com",
        summary: "This is a summary for Note1",
        keywords: {
            "keyword 1": "definition for keyword 1",
            "keyword 2": "definition for keyword 2",
            "keyword 3": "definition for keyword 3",
        },
    }
}
