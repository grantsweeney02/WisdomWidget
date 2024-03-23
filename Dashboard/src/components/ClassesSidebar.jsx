import { useNavigate, useParams } from "react-router-dom";
import dummyUser from "../../dummyUser.json"

import "../styles/ClassesSidebar.css"
import { useState } from "react";

const ClassesSidebar = ({}) => {
    const navigate = useNavigate();
    const [activeAssignment, setActiveAssignment] = useState(false)

    // fetch userdata from backend
    const response = dummyUser
    const classes = response.classes

	const handleAssignmentChange = (assignment) => {
        setActiveAssignment(assignment)
        navigate(`/${assignment.id}`);
	}

	const ClassAccordionItems = classes.map((classData, index) => {
		const AssignmentButtons = classData.assignments.map((assignmentData, index2) => {
			return (
				<button key={"" + assignmentData.id} type="button" className={"btn btn-primary assignment-button" + ((activeAssignment.id == assignmentData.id) ? " active" : "")} onClick={() => handleAssignmentChange(assignmentData)}>
					{assignmentData.name}
				</button>
			)
		})

		return (
			<div key={"" + classData.id} className="accordion-item">
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
					</div>
				</div>
			</div>
		)
	})

	return (
		<nav className="classes-sidebar col-2">
			<h2>Classes</h2>
			<div className="accordion" id="classesAccordion">
				{ClassAccordionItems}
			</div>
		</nav>
	)
}

export default ClassesSidebar
