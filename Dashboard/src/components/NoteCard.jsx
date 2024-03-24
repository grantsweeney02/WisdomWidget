import { Link, useNavigate } from "react-router-dom";
import "../styles/NoteCard.css";

const NoteCard = ({ classID, assignmentID, note }) => {
    const navigate = useNavigate();

    return (
        <Link
            to={`/${classID}-${assignmentID}/${note.noteId}`}
            className="card note-summary-card"
        >
            <div className="card-header note-card-header">{note.name}</div>
            <div className="card-body note-card-body">
                {/* TODO: cut off the summary with a ... after a certain number of characters */}
                <p className="card-text note-card-text">{note.summary}</p>
            </div>
        </Link>
    );
};

export default NoteCard;
