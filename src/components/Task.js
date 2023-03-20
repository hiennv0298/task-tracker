
const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`}
            // using condition to style the div
            onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} {' '}
                <span style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(task.id)} >DELETE</span>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task;