import Citations from "./Citations"
import NoteCard from "./NoteCard"
import URLRec from "./URLRec"
import dummyUser from "../../dummyUser.json"
import { useNavigate, useParams } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../App"
import axios from "axios"

import "../styles/AssignmentDetails.css"

const AssignmentDetails = ({}) => {
    const navigate = useNavigate()
	const { classIDassignmentID } = useParams()
	const classID = classIDassignmentID.split("-")[0]
	const assignmentID = classIDassignmentID.split("-")[1]

	const [assignment, setAssignment] = useState(null)
	const userData = useContext(UserContext).userData
    const setUserData = useContext(UserContext).setUserData

	const [showDeleteAssignmentModal, setShowDeleteAssignmentModal] = useState(false)

	useEffect(() => {
		if (userData) {
			const populateAssignment = async () => {
				const uid = userData.uid
				const body = {
					uid: uid,
					classId: classID,
					assignmentId: assignmentID,
				}
				const response = await axios.post("http://localhost:8000/assignments/getAssignment", body)
				setAssignment(response.data)
			}
			populateAssignment()
		}
	}, [userData, classIDassignmentID])

	const getAllNoteUrls = (notes) => {
		const urls = []
		notes.forEach((note) => {
			urls.push(note.url)
		})
		return urls
	}

	const handleDeleteAssignment = () => {
		axios
			.post("http://localhost:8000/assignments/deleteAssignment", {
				uid: userData.uid,
				classId: classID,
                assignmentId: assignmentID
			})
			.then(async (response) => {
				const request = {
					uid: userData.uid,
					email: userData.email,
					displayName: userData.displayName,
				}
				try {
					const response = await axios.post("http://localhost:8000/users/retrieveUserData", request)
					setUserData(response.data)
                    setShowDeleteAssignmentModal(false)
                    navigate("/")
				} catch (error) {
					console.error("Error retrieving user data: ", error)
				}
			})
			.catch((error) => {
				console.error("Error deleting assignment:", error)
			})
	}

	return (
		<>
			{assignment && (
				<div className="col-9 assignment-detail">
					<h1>{assignment.name}</h1>
					{assignment.due ? <h4 className="due-date">Due Date: {assignment.due}</h4> : null}
					<h4 className="notes">Notes: </h4>
					<div className="note-card-container">
						{assignment.notes.map((note, index) => (
							<NoteCard key={index} classID={classID} assignmentID={assignmentID} note={note} />
						))}
						{/* <div className="card note-add-card">
							<div className="card-body note-add-body">
								<p className="card-text note-card-text">
									<AddIcon />
									Add
								</p>
							</div>
						</div> */}
					</div>
					<Citations urls={getAllNoteUrls(assignment.notes)} />
					<h4>More Resources: </h4>
					{assignment.recUrls.map((url, index) => (
						<URLRec key={index} url={url} />
					))}
					<button className="btn delete-class-button" onClick={() => setShowDeleteAssignmentModal(true)}>
						<DeleteIcon />
						Delete Assignment
					</button>
					<div
						className={`modal fade ${showDeleteAssignmentModal ? "show" : ""}`}
						style={{ display: showDeleteAssignmentModal ? "block" : "none" }}
						tabIndex="-1"
						role="dialog"
						data-bs-backdrop="static"
					>
						<div className="modal-dialog modal-dialog-centered" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Delete Assignment?</h5>
								</div>
								<div className="modal-body">
									<p>Are you sure you want to delete this assignment?</p>
									<p>"{assignment.name}"</p>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn" data-dismiss="modal" onClick={() => setShowDeleteAssignmentModal(false)}>
										Close
									</button>
									<button type="button" className="btn" data-dismiss="modal" onClick={() => handleDeleteAssignment(false)}>
										Confirm
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						className={`modal-backdrop fade ${showDeleteAssignmentModal ? "show" : ""}`}
						style={{ display: showDeleteAssignmentModal ? "block" : "none" }}
					></div>
				</div>
			)}
		</>
	)
}

export default AssignmentDetails
