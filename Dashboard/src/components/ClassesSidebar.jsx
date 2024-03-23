import "../styles/classessidebar.css"

const ClassesSidebar = ({ classes, setActiveClass }) => {
	return (
		<>
			<h2>Classes</h2>
			<ul>
				{classes.map((c, index) => (
					<button className="btn" key={index} onClick={() => setActiveClass(c)}>
						{c.name}
					</button>
				))}
			</ul>
		</>
	)
}

export default ClassesSidebar
