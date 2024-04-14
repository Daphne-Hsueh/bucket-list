import React, { useState } from 'react';
import './App.css';
import { InputFeild } from './components/InputFeild';
import { Task } from './models/models';
import { TaskList } from './components/TaskList';


const App: React.FC = () => {
  const [task, setTask] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [completedTasks, setCompletedTasks] = useState<Task[]>([])


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (task) {
      setTasks([...tasks, { id: Date.now(), task, isDone: false }]);
      setTask("");
    }
  };
  return (
    <div className="App">
     <span className='heading'> BUCKET LIST </span>
     <InputFeild task={task} setTask={setTask} handleAdd={handleAdd}/>
     <TaskList tasks={tasks} setTasks={setTasks} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} />
    </div>
  );
}

export default App;
