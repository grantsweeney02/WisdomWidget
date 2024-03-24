import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import "../styles/NoteDetails.css"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import AddIcon from "@mui/icons-material/Add"
import CheckIcon from "@mui/icons-material/Check"
import CancelIcon from "@mui/icons-material/Cancel"

const NoteDetails = ({}) => {
	const { classIDassignmentID, noteID } = useParams()
	const classID = classIDassignmentID.split("-")[0]
	const assignmentID = classIDassignmentID.split("-")[1]
	const navigate = useNavigate()
	const [newKeyword, setNewKeyword] = useState("")
	const [newDefinition, setNewDefinition] = useState("")
	const [addingKeyword, setAddingKeyword] = useState(false)
	const [data, setData] = useState(demoResponse) // Initial data from demoResponse

	const handleBack = () => {
		navigate(-1)
	}

	const handleAddKeyword = () => {
		setAddingKeyword(true)
	}

	const handleConfirmAddKeyword = () => {
		const newData = { ...data }
		newData.note.keywords[newKeyword] = newDefinition
		setData(newData)
		setNewKeyword("")
		setNewDefinition("")
		setAddingKeyword(false)
	}

	const handleCancelAddKeyword = () => {
		setNewKeyword("")
		setNewDefinition("")
		setAddingKeyword(false)
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
				<div className="col-10 note-details">
					<h1>
						{data.assignmentName} - {data.note.name}
					</h1>
					<button className="btn back-button" onClick={() => handleBack()}>
						<ArrowBackIosNewIcon />
					</button>
					<p>{data.note.summary}</p>
					<div className="keywords">
						{Keywords}
						{addingKeyword ? (
							<div className="keyword-add-container">
								<input type="text" placeholder="New Keyword" value={newKeyword} onChange={(e) => setNewKeyword(e.target.value)} />
								<input type="text" placeholder="Definition" value={newDefinition} onChange={(e) => setNewDefinition(e.target.value)} />
								<button className="confirm-add-keyword-button" onClick={handleConfirmAddKeyword}>
									<CheckIcon />
								</button>
								<button className="cancel-add-keyword-button" onClick={handleCancelAddKeyword}>
									<CancelIcon />
								</button>
							</div>
						) : (
							<div className="keyword-add-container">
								<button className="keyword-add-button" onClick={() => handleAddKeyword()}>
									<AddIcon />
									Add Keyword
								</button>
							</div>
						)}
					</div>
					{data.note.url && (
						<h4>
							Source: <a href={data.note.url}>{data.note.url}</a>
						</h4>
					)}
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
