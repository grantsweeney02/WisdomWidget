import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import dummyUser from "../../dummyUser.json"
import { auth } from "../../firebaseConfig"
import LogoutIcon from "@mui/icons-material/Logout"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import CheckIcon from "@mui/icons-material/Check"
import "../styles/classessidebar.css"
import { useState, useContext, useEffect } from "react"
import { UserContext } from "../App"
import ClassAccordion from "./ClassAccordion"

const ClassesSidebar = ({}) => {
	const navigate = useNavigate()
	const [classes, setClasses] = useState([])
	const [activeAssignment, setActiveAssignment] = useState(false)
	const [isAddingClass, setIsAddingClass] = useState(false)
	const [newClassName, setNewClassName] = useState("")

	const userData = useContext(UserContext).userData
	const setUserData = useContext(UserContext).setUserData

	useEffect(() => {
		if (userData) {
			setClasses(userData.classes)
		}
	}, [userData])

	const handleAssignmentChange = (classID, assignment) => {
		setActiveAssignment(assignment)
		navigate(`/${classID}-${assignment.id}`)
	}

	const handleLogout = async () => {
		await auth.signOut()
		navigate("/")
	}

	const handleAddClass = () => {
		setIsAddingClass(true)
	}

	const handleCancelAddClass = () => {
		setIsAddingClass(false)
		setNewClassName("")
	}

	const handleConfirmAddClass = () => {
		axios
			.post("http://localhost:8000/classes/createClass", {
				uid: userData.uid,
				className: newClassName,
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
				} catch (error) {
					console.error("Error retrieving user data: ", error)
				}
			})
			.catch((error) => {
				console.error("Error adding assignment:", error)
			})
		setIsAddingClass(false)
		setNewClassName("")
	}

	const ClassAccordionItems = classes ? (
		classes.map((classData) => {
			return (
				<ClassAccordion
					key={classData.id}
					setClasses
					classData={classData}
					activeAssignment={activeAssignment}
					handleAssignmentChange={handleAssignmentChange}
				/>
			)
		})
	) : (
		<p>Loading...</p>
	)

	return (
		<nav className="classes-sidebar col-3">
			<h2>Classes</h2>
			<div className="accordion" id="classesAccordion">
				{ClassAccordionItems}
			</div>
			{isAddingClass ? (
				<div className="add-class-input">
					<input
						type="text"
						className="form-control"
						placeholder="Enter class name"
						value={newClassName}
						onChange={(e) => setNewClassName(e.target.value)}
					/>
					<div className="add-class-confirms">
						<button type="button" className="btn" onClick={() => handleConfirmAddClass()}>
							<CheckIcon />
						</button>
						<button type="button" className="btn" onClick={() => handleCancelAddClass()}>
							<CloseIcon />
						</button>
					</div>
				</div>
			) : (
				<button className="btn add-class-button" onClick={() => handleAddClass()}>
					<AddIcon style={{ marginInline: "0.125rem" }} />
					Add Class
				</button>
			)}
			<button type="button" className="btn btn-danger sidebar-logout-button" onClick={() => handleLogout()}>
				<LogoutIcon />
			</button>
		</nav>
	)
}

export default ClassesSidebar
