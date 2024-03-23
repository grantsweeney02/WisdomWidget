import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import dummyUser from "../dummyUser.json"
import NoteDetails from "./components/NoteDetails"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard data={dummyUser} />} />
                <Route path="/notes/:noteID" element={<NoteDetails />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
