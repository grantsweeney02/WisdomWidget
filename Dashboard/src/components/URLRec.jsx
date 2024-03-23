const URLRec = ({ url }) => {
    return (
        <a href={url} target="_blank" className="url-rec">
            <div className="card url-card">
                <div className="card-body">{url}</div>
            </div>
        </a>
    );
};

export default URLRec;
