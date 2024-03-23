import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import dummyUser from "../dummyUser.json"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard data={dummyUser} />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
