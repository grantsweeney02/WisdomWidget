import { Link, useNavigate } from "react-router-dom";
import "../styles/NoteCard.css";

const NoteCard = ({ assignmentID, note }) => {
    const navigate = useNavigate();

    return (
        <Link to={`/${assignmentID}/${note.id}`} className="card note-summary-card">
            <div className="card-header">{note.name}</div>
            <div className="card-body">
                {/* TODO: cut off the summary with a ... after a certain number of characters */}
                <p className="card-text">{note.summary}</p>
            </div>
        </Link>
    );
};

export default NoteCard;
