const ClassesSidebar = ({ classes, setActiveClass }) => {
    return (
        <div>
            <h2>Classes</h2>
            <ul>
                {classes.map((c, index) => (
                    <button key={index} onClick={() => setActiveClass(c)}>
                        {c.name}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default ClassesSidebar;
