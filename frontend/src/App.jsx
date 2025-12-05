import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import { CheckCircle, Circle, Trash2, Plus, Edit3, Loader2 } from 'lucide-react'; 

// set base URL
const API_BASE_URL = 'https://todo-app-production-a911.up.railway.app/tasks'; 

// Components

// Input field for editing task title
const EditableTitle = ({ taskId, initialTitle, completed, onUpdate, isEditing, setIsEditing }) => {
  // Task title state 
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef(null);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  // Focus on title edit
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    // Only save if the title has actually changed and is not empty
    if (title.trim() && title !== initialTitle) {
      onUpdate(taskId, title.trim());
    } else {
      // Revert to original title if cancelled or empty
      setTitle(initialTitle); 
    }
    // Always exit editing mode after blur
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.blur();
    }
    if (e.key === 'Escape') {
      setTitle(initialTitle);
      setIsEditing(false);
    }
  };

  const titleClass = completed
    ? 'text-gray-500 line-through transition-all'
    : 'text-gray-900 font-medium transition-all';

  return (
    <>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-sm sm:text-base p-1 border-b border-indigo-500 focus:outline-none focus:border-indigo-700 w-full min-w-0"
        />
      ) : (
        <p className={`truncate text-sm sm:text-base ${titleClass}`}> {title} </p>
      )}
    </>
  );
};


// Task Component
const TaskItem = ({ task, onToggleComplete, onDelete, onEditTitle }) => {
  const [isEditing, setIsEditing] = useState(false); // State to manage title editing

  const itemClass = task.completed
    ? 'bg-green-50 border-l-4 border-green-400'
    : 'bg-white hover:bg-gray-50 border-l-4 border-indigo-400';

  return (
    <div className={`p-4 mb-3 rounded-lg shadow-sm flex items-center justify-between ${itemClass} transition-all duration-300`}>
      
      {/* Task Title (Editable) */}
      <div className="flex items-center space-x-3 flex-1 min-w-0 pr-4">
        {/* Completion Icon/Button - Uses task.id */}
        <button
          onClick={() => onToggleComplete(task.id, !task.completed)}
          className="p-1 rounded-full text-indigo-500 hover:text-indigo-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          aria-label={task.completed ? "Mark as Incomplete" : "Mark as Complete"}
        >
          {task.completed ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
        </button>

        <EditableTitle 
          taskId={task.id}
          initialTitle={task.title}
          completed={task.completed}
          onUpdate={onEditTitle}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>

      {/* Buttons */}
      <div className="flex space-x-2 ml-4 shrink-0">
        
        {/* Editing button*/}
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-100 transition duration-150 disabled:opacity-50"
          aria-label="Edit Task"
          disabled={task.completed || isEditing}
          title="Edit Task Title"
        >
          <Edit3 className="w-5 h-5" />
        </button>

        {/* Mark as complete button */}
        {!task.completed && (
          <button
            onClick={() => onToggleComplete(task.id, true)}
            className="hidden sm:inline-block px-3 py-1 text-sm font-semibold text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Complete
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100 transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label="Delete Task"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Form for creating new tasks
const AddTaskForm = ({ onCreateTask, loading }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onCreateTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-6">
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Enter new task title"
        className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white p-3 rounded-xl shadow-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50 flex items-center justify-center"
        disabled={loading || !newTaskTitle.trim()}
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
      </button>
    </form>
  );
};





// Main Application Component
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API CALLS 
  // To display all tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setTasks(response.data.rows); 
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  // To create a task
  const createTask = async (title) => {
    setLoading(true);
    try {
      const response = await axios.post(API_BASE_URL, { title });
      setTasks(prevTasks => [...prevTasks, response.data]); 
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };
  

  // To delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${taskId}`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task.");
    }
  };


  // To mark as complete
  const toggleComplete = async (taskId, completedStatus) => {
    // CORRECTED: Find task by task.id
    console.log(`ACTION ON: TaskID: ${taskId}, Completed: ${completedStatus}`) // for test
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (!taskToUpdate) return;

    // For instant UI updating
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, completed: completedStatus } : task
    ));

    try {
      console.log(`API TRYING TO HIT: ${API_BASE_URL}/${taskId}` )  // for test
      await axios.put(`${API_BASE_URL}/${taskId}`, {status: completedStatus});
    } catch (err) {
      console.error("Error toggling task status:", err);
      setError("Failed to update task status.");
      // undo ui changes if API call fails
      setTasks(prevTasks => prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: taskToUpdate.completed } : task
      ));
    }
  };


  // To edit a task
  const editTaskTitle = async (taskId, newTitle) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    console.log("TASK TO UPDATE: ", taskToUpdate)  // for test
    console.log("taskId:", taskId) // for test
    console.log("newTitle:", newTitle) // for test
    const originalTitle = taskToUpdate ? taskToUpdate.title : '';

    // for updating ui instantly
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, title: newTitle } : task
    ));

    try {
      console.log(`API TRYING TO HIT: ${API_BASE_URL}`) // for test
      await axios.put(`${API_BASE_URL}`, { title: newTitle, taskId: taskId });
    } catch (err) {
      console.error("Error editing task title:", err);
      setError("Failed to edit task title.");
      // undo ui changes if API call fails
      setTasks(prevTasks => prevTasks.map(task => 
        task.id === taskId ? { ...task, title: originalTitle } : task
      ));
    }
  };


  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-6 sm:p-8 mt-12">
        
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">TODO APP</h1>
        <p className="text-gray-500 mb-6 border-b pb-4">
          {completedCount} of {totalCount} tasks completed.
        </p>

        {/* Add Task Form */}
        <AddTaskForm onCreateTask={createTask} loading={loading} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-6 text-indigo-500 flex justify-center items-center">
             <Loader2 className="w-6 h-6 animate-spin mr-2" />
             Loading tasks...
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {!loading && tasks.length > 0 ? (
            tasks
              .sort((a, b) => a.completed - b.completed) // for sorting
              .map(task => (
                <TaskItem
                  key={task.id} 
                  task={task}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTask}
                  onEditTitle={editTaskTitle}
                />
              ))
          ) : !loading && (
            <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-xl">
              <p className="font-semibold">No tasks found.</p>
              <p className="text-sm">Add your first task above!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t text-center text-sm text-gray-400">
          <div className="mt-2">
            <div ><span>If any error occurs, try refreshing the page.</span></div>
            <div>Made by <a href="https://www.github.com/abythomas300"><span className='text-blue-300'>Aby Thomas</span></a></div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;