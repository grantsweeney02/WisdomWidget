const URLRec = ({ url }) => {
    return (
        <a href={url} target="_blank" className="url-rec">
            <div className="note-summary-card url">
                <div className="note-card-body">{url}</div>
            </div>
        </a>
    );
};

export default URLRec;
