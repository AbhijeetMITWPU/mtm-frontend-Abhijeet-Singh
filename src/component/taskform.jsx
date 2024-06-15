import React, { useState, useEffect } from 'react';

const TaskInput = ({ addTask, updateTask, editingTask }) => {
  const [taskText, setTaskText] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [textError, setTextError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTaskText(editingTask.text);
      setTaskDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'text') {
      setTaskText(value);
      validateText(value);
    } else if (name === 'description') {
      setTaskDescription(value);
      validateDescription(value);
    }
  };

  const validateText = (value) => {
    if (value.trim() === '') {
      setTextError('Task name cannot be empty.');
    } else if (value.length > 50) {
      setTextError('Task name cannot exceed 50 characters.');
    } else {
      setTextError('');
    }
  };

  const validateDescription = (value) => {
    if (value.trim() === '') {
      setDescriptionError('Task description cannot be empty.');
    } else if (value.length > 200) {
      setDescriptionError('Task description cannot exceed 200 characters.');
    } else {
      setDescriptionError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskText.trim() || !taskDescription.trim() || textError || descriptionError) {
      alert('Please fill in all fields correctly.');
      return;
    }

    if (editingTask) {
      // Perform update logic (replace with actual backend integration)
      const updatedTask = { ...editingTask, text: taskText, description: taskDescription };
      updateTask(updatedTask);
      alert('Task updated successfully!');
    } else {
      // Perform add task logic (replace with actual backend integration)
      const newTask = { text: taskText, description: taskDescription };
      addTask(newTask);
      alert('Task added successfully!');
    }

    // Clear form fields and reset errors
    setTaskText('');
    setTaskDescription('');
    setTextError('');
    setDescriptionError('');
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-4">{editingTask ? 'Edit Task' : 'Add New Task in Your Itinerary'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Task Name</label>
            <input
              type="text"
              id="text"
              name="text"
              value={taskText}
              onChange={handleChange}
              className={`form-control ${textError ? 'is-invalid' : ''}`}
              placeholder="Enter task name"
              required
            />
            <div className="invalid-feedback">{textError}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Task Description</label>
            <textarea
              id="description"
              name="description"
              value={taskDescription}
              onChange={handleChange}
              className={`form-control ${descriptionError ? 'is-invalid' : ''}`}
              placeholder="Enter task description"
              required
            />
            <div className="invalid-feedback">{descriptionError}</div>
          </div>
          <button type="submit" className="btn btn-primary">{editingTask ? 'Update Task' : 'Add Task'}</button>
        </form>
      </div>
    </div>
  );
};

export default TaskInput;
