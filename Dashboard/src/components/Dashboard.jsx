import ClassesSidebar from "./ClassesSidebar";
import DashboardContent from "./DashboardContent";
import { useEffect, useState } from "react";

const Dashboard = ({ data }) => {
    const [activeAssignment, setActiveAssignment] = useState(null);

    return (
        <div>
            <ClassesSidebar
                classes={data.classes}
                setActiveAssignment={setActiveAssignment}
            />
            <DashboardContent assignment={activeAssignment}/>
        </div>
    );
};

export default Dashboard;