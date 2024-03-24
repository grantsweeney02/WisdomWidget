import React from "react";

const TextExplain = ({ data, activeClassId, activeAssignmentId, uid }) => {

    const handleSaveNote = () => {
        requestData = {
            data,
            url: window.location.href,
            uid: uid,
            classId: activeClassId,
            assignmentId: activeAssignmentId
        }
    }

    return (
        <div>
            <h1> Text Explain </h1>
            <p>{data.name}</p>
            <p>{data.summary}</p>
            {Object.keys(data.keyValuePairs).map((key, index) => (
                <div key={index}>
                    <h3>{key}</h3>
                    <p>{data.explanation[key]}</p>
                </div>
            ))}
            <button className="btn btn-primary">Save Note</button>
        </div>
    );
};

export default TextExplain;
