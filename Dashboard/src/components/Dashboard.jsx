import ClassesSidebar from "./ClassesSidebar";
import { useEffect, useState } from "react";

const Dashboard = ({ data }) => {
    const [activeClass, setActiveClass] = useState(data.classes[0]);
    const [activeAssignment, setActiveAssignment] = useState(null);

    return (
        <div>
            <ClassesSidebar
                classes={data.classes}
                setActiveClass={setActiveClass}
            />
            <h1>{activeClass.name}</h1>
            <DashboardContent assignment={activeAssignment}/>
        </div>
    );
};

export default Dashboard;
