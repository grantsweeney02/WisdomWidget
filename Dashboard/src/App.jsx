import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import dummyUser from "../dummyUser.json"
import NoteDetails from "./components/NoteDetails"
import ClassesSidebar from "./components/ClassesSidebar"
import AssignmentDetails from "./components/AssignmentDetails"

function App() {
	const loggedIn = true

	return (
		<>
			<BrowserRouter>
				<div className="container-fluid">
					<div className="row">
						{loggedIn && <ClassesSidebar />}
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/:assignmentID" element={<AssignmentDetails data={dummyUser} />} />
							<Route path="/:assignmentID/:noteID" element={<NoteDetails />} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		</>
	)
}

export default App
