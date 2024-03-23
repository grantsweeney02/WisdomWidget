import "../styles/classessidebar.css"
import { useNavigate } from "react-router-dom";
import dummyUser from "../../dummyUser.json"

const ClassesSidebar = ({}) => {
    const navigate = useNavigate();

    // fetch userdata from backend
    const response = dummyUser
    const classes = response.classes

	const handleAssignmentChange = (assignment) => {
        navigate(`/${assignment.id}`);
	}

	const ClassAccordionItems = classes.map((classData, index) => {
		const AssignmentButtons = classData.assignments.map((assignmentData, index2) => {
			return (
				<button key={"" + index2} type="button" className="btn btn-primary" onClick={() => handleAssignmentChange(assignmentData)}>
					{assignmentData.name}
				</button>
			)
		})

		return (
			<div key={"" + index} className="accordion-item">
				<h2 className="accordion-header">
					<button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target={"#collapse-" + index}
						aria-expanded="false"
						aria-controls={"collapse-" + index}
					>
						{classData.name}
					</button>
				</h2>
				<div id={"collapse-" + index} className="accordion-collapse collapse" data-bs-parent="#classesAccordion">
					<div className="accordion-body">
						<div className="btn-group-vertical" role="group" aria-label={classData.name + " Assignment Buttons"}>
							{AssignmentButtons}
						</div>
					</div>
				</div>
			</div>
		)
	})

	return (
		<nav className="col-2">
			<h2>Classes</h2>
			<div className="accordion" id="classesAccordion">
				{ClassAccordionItems}
			</div>
		</nav>
	)
}

export default ClassesSidebar
