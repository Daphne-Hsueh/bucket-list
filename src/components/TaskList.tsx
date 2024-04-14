import React from 'react'
import { Task } from "../models/models";
import "./styles.css"
import SingleTask from './SingleTask';

interface props {
  tasks: Array<Task>;
  setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
  setCompletedTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
  completedTasks: Array<Task>;
}

export const TaskList : React.FC <props> = ({tasks, setTasks ,completedTasks, setCompletedTasks}) => {
  return (
    <div className='container'>
      <div className='tasks'>
        <span className='tasks__heading'> Go BIG or go home</span>
        {tasks.map((task) => (
          <SingleTask key ={task.id} task={task} tasks={tasks}  setTasks={setTasks} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks}/>
        ))}
      </div>
      <div className=' tasks remove'>
        <span className='tasks__heading'> mission COMPLETE 🎉</span>
        {completedTasks.map((task) => (
          <SingleTask key ={task.id} task={task} tasks={tasks}  setTasks={setTasks} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks}/>
        ))}
      </div>
    </div>

  )
}
