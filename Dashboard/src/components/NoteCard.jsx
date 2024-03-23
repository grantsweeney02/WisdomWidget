const NoteCard = ({ note }) => {
    const { name, url } = note;

    return (
        <>
            {Object.entries(note.keywords).map((entry, index) => (
                <div className="card">
                    <div className="card-header">{entry[0]}</div>
                    <div className="card-body">
                        <p className="card-text">{entry[1]}</p>
                        {/* <button className="btn btn-danger">Delete</button> */}
                    </div>
                </div>
            ))}
        </>
    );
};

export default NoteCard;
