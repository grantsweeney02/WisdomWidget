import React from "react"
import "./styles/bootstrap.min.css"

const TextSearch = ({ text, data }) => {
	return (
		<div>
			<h1 className="mb-4">Text Search</h1>
			<p className="lead">Search: {text}</p>
			{data.resources.map((item, index) => (
				<div key={index} className="note-card mb-3">
					<div className="note-card-body">
						<h5 className="note-card-title">{item.title}</h5>
						<a className="note-card-text" href={item.url} target="_blank" rel="noopener noreferrer">
							{item.url}
						</a>
					</div>
				</div>
			))}
		</div>
	)
}

export default TextSearch
