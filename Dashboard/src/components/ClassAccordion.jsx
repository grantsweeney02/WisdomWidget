import { useState, useContext } from "react"
import axios from "axios"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import CheckIcon from "@mui/icons-material/Check"
import "../styles/ClassAccordion.css"
import { UserContext } from "../App"

const ClassAccordion = ({ classData, activeAssignment, handleAssignmentChange }) => {
	const [isAddingAssignment, setIsAddingAssignment] = useState(false)
	const [newAssignmentName, setNewAssignmentName] = useState("")
	const userData = useContext(UserContext).userData

	const handleAddAssignment = () => {
		setIsAddingAssignment(true)
	}

	const handleCancelAddAssignment = () => {
		setIsAddingAssignment(false)
		setNewAssignmentName("")
	}

	const handleConfirmAddAssignment = () => {
		axios
			.post("http://localhost:8000/assignments/createAssignment", {
				uid: userData.uid,
				classId: classData.id,
				name: newAssignmentName,
			})
			.then((response) => {
				console.log(response.data)
			})
			.catch((error) => {
				console.error("Error adding assignment:", error)
			})
		setIsAddingAssignment(false)
		setNewAssignmentName("")
	}

	const AssignmentButtons = classData.assignments.map((assignmentData) => {
		return (
			<button
				key={assignmentData.id}
				type="button"
				className={"btn btn-primary assignment-button" + (activeAssignment.id == assignmentData.id ? " active" : "")}
				onClick={() => handleAssignmentChange(classData.id, assignmentData)}
			>
				{assignmentData.name}
			</button>
		)
	})

	return (
		<div key={classData.id} className="accordion-item">
			<h2 className="accordion-header">
				<button
					className="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target={"#collapse-" + classData.id}
					aria-expanded="false"
					aria-controls={"collapse-" + classData.id}
				>
					{classData.name}
				</button>
			</h2>
			<div id={"collapse-" + classData.id} className="accordion-collapse collapse" data-bs-parent="#classesAccordion">
				<div className="accordion-body">
					<div className="btn-group-vertical assignment-buttons" role="group" aria-label={classData.name + " Assignment Buttons"}>
						{AssignmentButtons}
					</div>
					{isAddingAssignment ? (
						<div className="add-assignment-input">
							<input
								type="text"
								className="form-control"
								placeholder="Enter assignment name"
								value={newAssignmentName}
								onChange={(e) => setNewAssignmentName(e.target.value)}
							/>
							<div className="add-assignment-confirms">
								<button type="button" className="btn" onClick={() => handleConfirmAddAssignment()}>
									<CheckIcon />
								</button>
								<button type="button" className="btn" onClick={() => handleCancelAddAssignment()}>
									<CloseIcon />
								</button>
							</div>
						</div>
					) : (
						<button className="btn add-assignment-button" onClick={() => handleAddAssignment()}>
							<AddIcon style={{ marginInline: "0.125rem" }} />
							Add Assignment
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default ClassAccordion
