import React from "react";

const TextSearch = ({ text, data }) => {
    return (
        <div>
            <h1 className="mb-4">Text Search</h1>
            <p className="lead">Search: {text}</p>
            {data.map((item, index) => (
                <div key={index} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.url}
                            </a>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TextSearch;
