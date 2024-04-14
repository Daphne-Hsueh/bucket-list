import React , { useRef }from 'react'
import "./styles.css";

interface Props {
  task: string
  setTask: React.Dispatch<React.SetStateAction<string>>
  handleAdd: (e: React.FormEvent) => void;
}

export const InputFeild : React.FC <Props> = ({task, setTask , handleAdd} : Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
     <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={task}
        ref={inputRef}
        onChange={(e) => setTask(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input_submit">
        GO
      </button>
    </form>
  )
}
