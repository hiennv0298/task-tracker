import { useState, useEffect } from 'react'
import  TaskList  from './components/TaskList'
import  AddTask  from './components/AddTask'

const App = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className='container'>

      <AddTask onAdd={addTask} />
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} onDelete={deleteTask} />
      ) : (
        'No tasks to show'
      )}
    </div>
  )
}

export default App