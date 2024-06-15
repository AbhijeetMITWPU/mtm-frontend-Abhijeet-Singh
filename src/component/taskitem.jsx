import React, { useState } from 'react';


const TaskItem = ({ task, deleteTask, updateTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newDescription, setNewDescription] = useState(task.description);
  const [textError, setTextError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  const handleDelete = () => {
    deleteTask(task._id);
  };

  const handleUpdate = () => {
    if (!newText.trim() || !newDescription.trim()) {
      return;
    }
    const updatedTask = { ...task, text: newText, description: newDescription };
    updateTask(updatedTask);
    setShowModal(false);
  };

  const toggleDescription = () => setShowDescription(!showDescription);

  return (
    <>
      <div className="list-group-item d-flex flex-column justify-content-between align-items-start bg-light">
        <div className="d-flex justify-content-between align-items-center w-100">
          <span className="text-primary">{task.text}</span>
          <div>
            <button className="btn btn-danger btn-sm me-2" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
              Edit
            </button>
          </div>
        </div>
        <button className="btn btn-outline-info btn-sm mt-2" onClick={toggleDescription}>
          {showDescription ? 'Read Less' : 'Read More'}
        </button>
        {showDescription && (
          <div className="mt-2 p-2 bg-white rounded">
            <strong>Description:</strong>
            <p>{task.description}</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="newText" className="form-label">
                    Task Name
                  </label>
                  <input
                    type="text"
                    id="newText"
                    className={`form-control ${textError ? 'is-invalid' : ''}`}
                    value={newText}
                    onChange={(e) => {
                      setNewText(e.target.value);
                      if (e.target.value.trim() === '') {
                        setTextError('Task name cannot be empty.');
                      } else if (e.target.value.length > 50) {
                        setTextError('Task name cannot exceed 50 characters.');
                      } else {
                        setTextError('');
                      }
                    }}
                    placeholder="Enter new title"
                    required
                  />
                  <div className="invalid-feedback">{textError}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="newDescription" className="form-label">
                    Task Description
                  </label>
                  <textarea
                    id="newDescription"
                    className={`form-control ${descriptionError ? 'is-invalid' : ''}`}
                    value={newDescription}
                    onChange={(e) => {
                      setNewDescription(e.target.value);
                      if (e.target.value.trim() === '') {
                        setDescriptionError('Task description cannot be empty.');
                      } else if (e.target.value.length > 200) {
                        setDescriptionError('Task description cannot exceed 200 characters.');
                      } else {
                        setDescriptionError('');
                      }
                    }}
                    placeholder="Enter new description"
                    required
                  />
                  <div className="invalid-feedback">{descriptionError}</div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
