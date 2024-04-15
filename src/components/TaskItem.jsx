import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import styles from './TaskList.module.css';
import { useState } from 'react';

const TaskItem = ({ task, deleteTask, toggleTask, enterEditMode }) => {
  const [isChecked, setIsChecked] = useState(task.checked);

  function handleCheckboxChange(e) {
    setIsChecked(!isChecked);
    toggleTask(task.id);
  }

  return (
    <li className={styles.task}>
      <div className={styles['task-group']}>
        <input
          onChange={handleCheckboxChange}
          className={styles.checkbox}
          checked={isChecked}
          name={task.name}
          id={task.id}
          type="checkbox"
        />
        <label htmlFor={task.id}>
          {task.name}
          <p className={styles.checkmark}>
            <CheckIcon strokeWidth={2} width={24} height={24} />
          </p>
        </label>
      </div>
      <div className={styles['task-group']}>
        <button
          onClick={() => enterEditMode(task)}
          aria-label={`Update ${task.name} Task `}
          className="btn"
        >
          <PencilSquareIcon width={24} height={24} />
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          aria-label={`Delete ${task.name} Task `}
          className={`btn ${styles.delete}`}
        >
          <TrashIcon width={24} height={24} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
