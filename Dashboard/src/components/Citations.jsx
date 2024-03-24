const Citations = ({ urls }) => {
	return (
		<>
			{urls && urls.length > 0 && (
				<div>
					<h4>Citations: </h4>
					{urls.map((url, index) => (
						<p key={index}>{url}</p>
					))}
				</div>
			)}
		</>
	)
}

export default Citations
