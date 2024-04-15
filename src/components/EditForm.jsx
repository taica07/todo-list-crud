import React from 'react';
import { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
  const [updateTaskName, setUpdateTaskName] = useState(editedTask.name);

  useEffect(() => {
    const closeModalIfEscaped = (e) => {
      e.key === 'Escape' && closeEditMode();
    };

    window.addEventListener('keydown', closeModalIfEscaped);

    return () => {
      window.removeEventListener('keydown', closeModalIfEscaped);
    };
  }, [closeEditMode]);

  function handleFormSubmit(e) {
    e.preventDefault();
    updateTask({ ...editedTask, name: updateTaskName });
  }

  return (
    <div
      role="dialog"
      aria-labelledby="editTask"
      onClick={(e) => {
        e.target === e.currentTarget && closeEditMode();
      }}
    >
      <form className="todo" onSubmit={handleFormSubmit}>
        <div className="wrapper">
          <input
            required
            autoFocus
            maxLength={50}
            placeholder="Update Task"
            value={updateTaskName}
            type="text"
            id="editTask"
            className="input"
            onInput={(e) => setUpdateTaskName(e.target.value)}
          />
          <label htmlFor="editTask" className="label">
            Enter Task
          </label>
        </div>
        <button
          type="submit"
          className="btn"
          aria-label={`Confirm edited task to now read ${updateTaskName}`}
        >
          <CheckIcon strokeWidth={2} height={24} width={24} />
        </button>
      </form>
    </div>
  );
};

export default EditForm;
