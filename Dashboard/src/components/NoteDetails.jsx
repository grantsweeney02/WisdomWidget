import { useNavigate, useParams } from "react-router-dom"
import "../styles/NoteDetails.css"

const NoteDetails = ({}) => {
	const { noteID } = useParams()
    const navigate = useNavigate()

	// get note info from db
	const data = demoResponse // from fetch

    const handleBack = () => {
        navigate(-1);
    }

	const Keywords = Object.entries(data.note.keywords).map(([keyword, definition]) => (
		<div key={keyword} className="keyword-container">
			<div className="keyword-card">
				<h5 className="keyword">{keyword}</h5>
                <p className="definition">{definition}</p>
			</div>
		</div>
	))

	return (
		<>
			{noteID && (
				<div className="col-10">
					<h1>
						{data.assignmentName} - {data.note.name}
					</h1>
                    <button onClick={() => handleBack()}>Back</button>
					{data.note.url && (
						<h4>
							Source: <a href={data.note.url}>{data.note.url}</a>
						</h4>
					)}
					<p>{data.note.summary}</p>
					<div className="keywords">{Keywords}</div>
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
	},
}
