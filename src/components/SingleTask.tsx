import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { MdDone } from "react-icons/md";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Task } from "../models/models";
import "./styles.css";

type Props = {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
  completedTasks: Task[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
};

const SingleTask = ({
  task,
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.task);
  const inputRef = useRef<HTMLInputElement>(null);
  const [confetti, setConfetti] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(1);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, task: editTask } : task))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setCompletedTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDone = (id: number) => {
    const doneTask = tasks.find((task) => task.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    if (doneTask) {
      setCompletedTasks((prevTasks) => [...prevTasks, doneTask]);
    } else {
      setConfetti(true);
      const fadeOut = setTimeout(() => {
        setOpacity(0);
      }, 2000);

      const remove = setTimeout(() => {
        setConfetti(false);
        setOpacity(1);
      }, 4000);

      return () => {
        clearTimeout(fadeOut);
        clearTimeout(remove);
      };
    }
  };

  return (
    <>
      {confetti && (
        <div style={{ transition: "opacity 2s", opacity: opacity }}>
          <Confetti />
        </div>
      )}
      <form className="tasks__single" onSubmit={(e) => handleEdit(e, task.id)}>
        {edit ? (
          <input
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            className="tasks__single--text"
            ref={inputRef}
          />
        ) : task.isDone ? (
          <s className="tasks__single--text">{task.task}</s>
        ) : (
          <span className="tasks__single--text">{task.task}</span>
        )}

        <div>
          <span
            className="icon"
            onClick={() => {
              if (!edit && !task.isDone) {
                setEdit(!edit);
              }
            }}
          >
            <AiFillEdit />
          </span>
          <span className="icon" onClick={() => handleDelete(task.id)}>
            <AiFillDelete />
          </span>
          <span className="icon" onClick={() => handleDone(task.id)}>
            <MdDone />
          </span>
        </div>
      </form>
    </>
  );
};

export default SingleTask;
