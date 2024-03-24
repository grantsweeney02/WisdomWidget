import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import "../styles/NoteDetails.css"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import AddIcon from "@mui/icons-material/Add"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useContext } from "react"
import { UserContext } from "../App"

const NoteDetails = ({}) => {
	const { classIDassignmentID, noteID } = useParams()
	const classID = classIDassignmentID.split("-")[0]
	const assignmentID = classIDassignmentID.split("-")[1]
	const navigate = useNavigate()
	const [newKeyword, setNewKeyword] = useState("")
	const [newDefinition, setNewDefinition] = useState("")
	const [addingKeyword, setAddingKeyword] = useState(false)
	const [data, setData] = useState(demoResponse) // Initial data from demoResponse

	const userData = useContext(UserContext).userData;

    useEffect(() => {
        if (userData) {
            const populateNote = async () => {
                const uid = userData.uid;
                const body = {
                    uid: uid,
                    classId: classID,
                    assignmentId: assignmentID,
					noteId: noteID
                };
                // const response = await axios.get("http://localhost:8000/assignments/getAssignment", body);
                // console.log("Note Response: ", response.data);
                // setData(response.data);
            };
            populateNote();
        }
    }, [userData]);

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
								<input
									className="form-control keyword-input"
									type="text"
									placeholder="New Keyword"
									value={newKeyword}
									onChange={(e) => setNewKeyword(e.target.value)}
								/>
								<input
									className="form-control definition-input"
									type="text"
									placeholder="Definition"
									value={newDefinition}
									onChange={(e) => setNewDefinition(e.target.value)}
								/>
								<div className="keyword-confirm-buttons">
									<button className="btn" onClick={handleConfirmAddKeyword}>
										<CheckIcon />
									</button>
									<button className="btn" onClick={handleCancelAddKeyword}>
										<CloseIcon />
									</button>
								</div>
							</div>
						) : (
							<button className="keyword-add-container" onClick={() => handleAddKeyword()}>
								<button className="btn keyword-add-button">
									<AddIcon />
									Add Keyword
								</button>
							</button>
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
