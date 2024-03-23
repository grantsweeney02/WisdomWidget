const URLRec = ({ url }) => {
    return (
        <a href={url} target="_blank" className="url-rec">
            <div class="card">
                <div class="card-body">{url}</div>
            </div>
        </a>
    );
};

export default URLRec;
