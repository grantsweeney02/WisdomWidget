import ClassesSidebar from "./ClassesSidebar"
import DashboardContent from "./DashboardContent"
import { useEffect, useState } from "react"

const Dashboard = ({ data }) => {
	const [activeAssignment, setActiveAssignment] = useState(null)

	return (
		<div className="container-fluid">
			<div className="row">
				<ClassesSidebar classes={data.classes} setActiveAssignment={setActiveAssignment} />
				<DashboardContent assignment={activeAssignment} />
			</div>
		</div>
	)
}

export default Dashboard
