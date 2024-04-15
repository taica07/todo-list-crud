import React from 'react';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

const CustomForm = ({ addTask }) => {
  const [task, setTask] = useState('');

  function handleFormSubmit(e) {
    e.preventDefault();
    addTask({
      name: task,
      checked: false,
      id: Date.now(),
    });

    setTask('');
    console.log(task);
  }

  return (
    <form className="todo" onSubmit={handleFormSubmit}>
      <div className="wrapper">
        <input
          required
          autoFocus
          maxLength={50}
          placeholder="Enter Task"
          value={task}
          type="text"
          id="task"
          className="input"
          onInput={(e) => setTask(e.target.value)}
        />
        <label htmlFor="task" className="label">
          Enter Task
        </label>
      </div>
      <button type="submit" className="btn" aria-label="Add Task">
        <PlusIcon className="h-6 w-6 text-blue-500" />
      </button>
    </form>
  );
};

export default CustomForm;
