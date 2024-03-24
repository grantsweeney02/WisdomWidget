import React from "react"
import { useState } from "react"
import cheerio from "cheerio"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import "./styles/bootstrap.min.css"
import { Grid } from "react-loader-spinner"

const HomePage = ({ classes, activeClassId, setActiveClassId, activeAssignmentId, setActiveAssignmentId, notesForAssignment, uid }) => {
	const [noteGenerating, setNoteGenerating] = useState(false)
	const [newNoteGenerated, setNewNoteGenerated] = useState(false)
	const [newNote, setNewNote] = useState({})
	const [url, setUrl] = useState("")
	const [source, setSource] = useState("")

	const handleNoteClick = (classId, assignmentId, noteId) => {
		chrome.tabs.create({
			url: `http://localhost:5173/${classId}-${assignmentId}/${noteId}`,
		})
	}

	function removeTagsFromDocument(htmlDocument) {
		const $ = cheerio.load(htmlDocument)

		$("script").remove()
		$("nav").remove()
		$("img").remove()

		let text = $.text().replace(/\s\s+/g, " ").trim()
		text = text.replace(/[\r\n]+/g, " ")
		text = text.replace(/"/g, '\\"')
		text = text.replace(/<!--[\s\S]*?-->/g, "")
		text = text.replace(/<iframe[\s\S]*?<\/iframe>/g, "")
		text = text.replace(/<img[\s\S]*?\/>/g, "")
		text = text.replace(/<style[\s\S]*?<\/style>/g, "")

        console.log(text)
		return text
	}

	const handleGenerateNotes = async () => {
		setNoteGenerating(true)
		console.log("Generating notes for assignment with id: ", activeAssignmentId)
		await chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
			await chrome.tabs.sendMessage(tabs[0].id, { action: "getPageInfo" }, async (response) => {
				if (chrome.runtime.lastError) {
					console.error(chrome.runtime.lastError.message)
					return
				}
                console.info(response)
				setUrl(response.url)
				setSource(response.source)
				const cleanHTML = removeTagsFromDocument(response.source)
                console.log(cleanHTML)
				const response2 = await fetch("http://localhost:8000/services/scan", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						text: cleanHTML,
					}),
				})
				setNoteGenerating(false)
				setNewNoteGenerated(true)
				const newRequest = await response2.json()
				setNewNote(newRequest)
				console.info(newRequest)
				const response3 = await fetch("http://localhost:8000/notes/createNote", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: newRequest.name,
						summary: newRequest.summary,
						keyValuePairs: newRequest.keyValuePairs,
						classId: activeClassId,
						assignmentId: activeAssignmentId,
						uid: uid,
						url: window.location.href,
					}),
				})
				console.info(response3)
			})
		})
	}

	return (
		<div>
			<h1>Home Page</h1>
			{/* dropdown to select class from */}
			<select
				onChange={(e) => {
					setActiveClassId(e.target.value)
					setActiveAssignmentId(null)
				}}
				className="form-select"
			>
				<option value="">Select Class</option>
				{classes &&
					classes.map((classObj) => (
						<option key={classObj.id} value={classObj.id}>
							{classObj.name}
						</option>
					))}
			</select>
			{/* dropdown to select assignment from only once a class is selected*/}
			{activeClassId && (
				<select onChange={(e) => setActiveAssignmentId(e.target.value)} className="form-select">
					<option value="">Select Assignment</option>
					{classes
						.find((classObj) => classObj.id === activeClassId)
						.assignments.map((assignment) => (
							<option key={assignment.id} value={assignment.id}>
								{assignment.name}
							</option>
						))}
				</select>
			)}
			{activeAssignmentId && (
				<div>
					<button className="generate-notes-button" onClick={() => handleGenerateNotes()}>
						Generate Notes
					</button>
					{noteGenerating && (
						<div className="loader-container">
							<Grid
								visible={true}
								height="40"
								width="40"
								color="#EEEEEE"
								ariaLabel="grid-loading"
								radius="12.5"
								wrapperStyle={{}}
								wrapperClass="grid-wrapper"
							/>
						</div>
					)}
					{newNoteGenerated && newNote && (
						<div>
							<h2 className="generated-note">Generated Note</h2>
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">{newNote.name}</h5>
									<p className="card-text">{newNote.summary}</p>
									<button className="btn btn-primary" onClick={() => handleNoteClick(activeClassId, activeAssignmentId, newNote.noteId)}>
										View in Dashboard
									</button>
								</div>
							</div>
						</div>
					)}
					<h2 className="notes">Notes</h2>
					{notesForAssignment.map((note) => (
						<div key={note.noteId} className="note-card">
							<div className="note-card-body">
								<h5 className="note-card-title">{note.name}</h5>
								<p className="note-card-text">{note.summary}</p>
								<div className="note-card-footer">
									<button className="view-dashboard-button" onClick={() => handleNoteClick(activeClassId, activeAssignmentId, note.id)}>
										View in Dashboard
										<OpenInNewIcon fontSize="small" />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default HomePage
