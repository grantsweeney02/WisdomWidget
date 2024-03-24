import { useNavigate, useParams } from "react-router-dom";
import dummyUser from "../../dummyUser.json";
import { auth } from "../../firebaseConfig";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import "../styles/classessidebar.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";

const ClassesSidebar = ({}) => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [activeAssignment, setActiveAssignment] = useState(false);
    const [isAddingClass, setIsAddingClass] = useState(false);
    const [newClassName, setNewClassName] = useState("");

    const userData = useContext(UserContext).userData;

    useEffect(() => {
        if (userData) {
            setClasses(userData.classes);
        }
    }, [userData]);

    const handleAssignmentChange = (classID, assignment) => {
        setActiveAssignment(assignment);
        navigate(`/${classID}-${assignment.id}`);
    };

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/");
    };

    const handleAddClass = () => {
        setIsAddingClass(true);
    };

    const handleCancelAddClass = () => {
        setIsAddingClass(false);
        setNewClassName("");
    };

    const handleConfirmAddClass = () => {
        setIsAddingClass(false);
        setNewClassName("");
    };

    const ClassAccordionItems = classes.map((classData, index) => {
        const AssignmentButtons = classData.assignments.map(
            (assignmentData, index2) => {
                return (
                    <button
                        key={"" + assignmentData.id}
                        type="button"
                        className={
                            "btn btn-primary assignment-button" +
                            (activeAssignment.id == assignmentData.id
                                ? " active"
                                : "")
                        }
                        onClick={() =>
                            handleAssignmentChange(classData.id, assignmentData)
                        }
                    >
                        {assignmentData.name}
                    </button>
                );
            }
        );

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
                <div
                    id={"collapse-" + classData.id}
                    className="accordion-collapse collapse"
                    data-bs-parent="#classesAccordion"
                >
                    <div className="accordion-body">
                        <div
                            className="btn-group-vertical assignment-buttons"
                            role="group"
                            aria-label={classData.name + " Assignment Buttons"}
                        >
                            {AssignmentButtons}
                        </div>
                    </div>
                </div>
            </div>
        );
    });

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
                        <button
                            type="button"
                            className="btn"
                            onClick={() => handleConfirmAddClass()}
                        >
                            <CheckIcon />
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => handleCancelAddClass()}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    className="btn add-class-button"
                    onClick={() => handleAddClass()}
                >
                    <AddIcon style={{ marginInline: "0.125rem" }} />
                    Add Class
                </button>
            )}
            <button
                type="button"
                className="btn btn-danger sidebar-logout-button"
                onClick={() => handleLogout()}
            >
                <LogoutIcon />
            </button>
        </nav>
    );
};

export default ClassesSidebar;
