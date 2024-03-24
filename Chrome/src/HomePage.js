import React from "react";
import "./styles/bootstrap.min.css";

const HomePage = ({
    classes,
    activeClassId,
    setActiveClassId,
    activeAssignmentId,
    setActiveAssignmentId,
    notesForAssignment,
    handleGenerateNotes,
}) => {
    const handleNoteClick = (classId, assignmentId, noteId) => {
        chrome.tabs.create({
            url: `http://localhost:5173/${classId}-${assignmentId}/${noteId}`,
        });
    };

    return (
        <div>
            <h1> Home Page</h1>
            {/* dropdown to select class from */}
            <select
                onChange={(e) => {
                    setActiveClassId(e.target.value)
                    setActiveAssignmentId(null)
                }}
                className="form-select"
            >
                <option value="">Select Class</option>
                {classes.map((classObj) => (
                    <option key={classObj.id} value={classObj.id}>
                        {classObj.name}
                    </option>
                ))}
            </select>
            {/* dropdown to select assignment from only once a class is selected*/}
            {activeClassId && (
                <select
                    onChange={(e) => setActiveAssignmentId(e.target.value)}
                    className="form-select"
                >
                    <option value="">Select Assignment</option>
                    {classes
                        .find((classObj) => classObj.id === activeClassId)
                        .assignments.map((assignment) => (
                            <option key={assignment.id} value={assignment.id}>
                                {assignment.name}
                            </option>
                        ))}
                </select>
            )}
            {activeAssignmentId && (
                <div>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleGenerateNotes()}
                    >
                        Generate Notes
                    </button>
                    <h2>Notes</h2>
                    {notesForAssignment.map((note) => (
                        <div key={note.noteId} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{note.name}</h5>
                                <p className="card-text">{note.summary}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        handleNoteClick(
                                            activeClassId,
                                            activeAssignmentId,
                                            note.noteId
                                        )
                                    }
                                >
                                    View in Dashboard
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
