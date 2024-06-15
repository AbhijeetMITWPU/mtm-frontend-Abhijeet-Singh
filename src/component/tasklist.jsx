import React from 'react';
import TaskItem from './taskitem';

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  return (
    <div className="container mt-4 mb-5">
      <h2 style={{ color: 'red' }}>Tasks List</h2>
      <div className="list-group">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))
        ) : (
          <p className="text-muted">No tasks available. Add some tasks!</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
