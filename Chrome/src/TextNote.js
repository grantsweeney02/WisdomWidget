import React from "react";
import "./styles/bootstrap.min.css";

const TextNote = ({ text, data }) => {

    const handleNoteClick = (classId, assignmentId, noteId) => {
        chrome.tabs.create({
            url: `http://localhost:5173/${classId}-${assignmentId}/${noteId}`,
        });
    };

    return (
        <div>
            <h1 className="mb-4">Text Note</h1>
            <p className="lead">{data.name}</p>
            <p>{data.summary}</p>
            <div>
                {Object.keys(data.keyValuePairs).map((key, index) => (
                    <div key={index} className="card-body">
                        <h5 className="card-title">{key}</h5>
                        <p className="card-text">{data.keyValuePairs[key]}</p>
                    </div>
                ))}
            </div>
            <h4>Uploaded Note:</h4>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <p className="card-text">{data.summary}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            handleNoteClick(
                                activeClassId,
                                activeAssignmentId,
                                data.noteId
                            )
                        }
                    >
                        View in Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextNote;
