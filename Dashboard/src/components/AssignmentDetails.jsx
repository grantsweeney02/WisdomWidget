import Citations from "./Citations";
import NoteCard from "./NoteCard";
import URLRec from "./URLRec";
import dummyUser from "../../dummyUser.json";
import { useParams } from "react-router-dom";

import "../styles/AssignmentDetails.css"

const AssignmentDetails = ({}) => {
	const { assignmentID } = useParams()

    // fetch assignment info
    const response = dummyUser;
    const assignment = response.classes[0].assignments[assignmentID - 1];

    const getAllNoteUrls = (notes) => {
        const urls = [];
        notes.forEach((note) => {
            urls.push(note.url);
        });
        return urls;
    };

    return (
        <>
            {assignment && (
                <div className="col-10 assignment-detail">
                    <h1>{assignment.name}</h1>
                    {assignment.due ? (
                        <h4 className="due-date">Due Date: {assignment.due}</h4>
                    ) : null}
                    <h4 className="notes">Notes: </h4>
                    <div className="note-card-container">
                        {assignment.notes.map((note, index) => (
                            <NoteCard key={index} assignmentID={assignmentID} note={note} />
                        ))}
                    </div>
                    <Citations urls={getAllNoteUrls(assignment.notes)} />
                    <h4>More Resources: </h4>
                    {assignment.urlRecs.map((url, index) => (
                        <URLRec key={index} url={url} />
                    ))}
                </div>
            )}
        </>
    );
};

export default AssignmentDetails;
