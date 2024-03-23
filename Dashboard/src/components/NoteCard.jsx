import "../styles/NoteCard.css";

const NoteCard = ({ note }) => {
    const { name, url } = note;

    const handleViewNote = (noteID) => {
        console.log(noteID);
    };

    return (
        <div className="card note-summary-card" onClick={() => handleViewNote(note.id)}>
            <div className="card-header">{note.name}</div>
            <div className="card-body">
                {/* TODO: cut off the summary with a ... after a certain number of characters */}
                <p className="card-text">{note.summary}</p>
            </div>
        </div>
    );
};

export default NoteCard;
