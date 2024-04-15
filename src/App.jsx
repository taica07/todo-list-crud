import { useState } from 'react';
// Custom components
import CustomForm from './components/CustomForm';
import TaskList from './components/TaskList';
import EditForm from './components/EditForm';
//custom hooks
import useLocalStorage from './hooks/useLocalStorage';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousFocus, setPreviousFocus] = useState(null);

  function addTask(task) {
    setTasks((prevState) => [...prevState, task]);
    console.log(task);
  }

  function deleteTask(id) {
    setTasks((prevState) => prevState.filter((t) => t.id !== id));
  }

  function toggleTask(id) {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  }
  function updateTask(task) {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );

    closeEditMode();
  }

  function closeEditMode() {
    setIsEditing(false);

    previousFocus.focus();
  }

  function enterEditMode(task) {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocus(document.activeElement);
  }

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>

      {isEditing && (
        <EditForm
          editedTask={editedTask}
          updateTask={updateTask}
          closeEditMode={closeEditMode}
        />
      )}

      <CustomForm addTask={addTask} />
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
      <ThemeSwitcher />
    </div>
  );
}

export default App;
