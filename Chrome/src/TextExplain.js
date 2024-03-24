import React from "react";
import "./styles/bootstrap.min.css";

const TextExplain = ({ data, activeClassId, activeAssignmentId, uid }) => {
    const handleSaveNote = () => {
        requestData = {
            data,
            url: window.location.href,
            uid: uid,
            classId: activeClassId,
            assignmentId: activeAssignmentId,
        };
        // TODO: SAVE NOTE
        // call route to create note
        const response = fetch("http://localhost:5173/notes/createNote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });
    };

    return (
        <div>
            <h1 className="mb-4">Text Explanation</h1>
            <p className="lead"><strong>Phrase: </strong>{data.name}</p>
            <p><strong>Summary: </strong>{data.summary}</p>
            {/* <div>
                {Object.keys(data.keyValuePairs).map((key, index) => (
                    <div className="card-body" key={index}>
                        <h5 className="card-title">{key}</h5>
                        <p className="card-text">{data.keyValuePairs[key]}</p>
                    </div>
                ))}
            </div> */}
            {/* <button className="btn btn-primary" onClick={handleSaveNote}>
                Save Note
            </button> */}
        </div>
    );
};

export default TextExplain;
