import React from "react";

const TextSearch = ({ text, data }) => {
    return (
        <div>
            <h1> Text Search </h1>
            <p>Search: {text}</p>
            {data.map((item, index) => (
                <div key={index}>
                    <h3>{item.title}</h3>
                    <p>{item.url}</p>
                </div>
            ))}
        </div>
    );
};

export default TextSearch;
