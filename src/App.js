import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from './component/taskform';
import Navbar from './component/Navbar';
import TaskList from './component/tasklist';
import TripDetails from './component/TripDetails';
import ImageSlider from './component/ImageSlider'; 
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    alert('Task added successfully!');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
    alert('Task deleted successfully!');
  };

  const addTrip = (trip) => {
    console.log('Adding new trip:', trip);
  };

  const updateTrip = (trip) => {
    console.log('Updating trip:', trip);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <ImageSlider />
        <div className="mt-4 mb-4">
          <TripDetails onAddTrip={addTrip} onUpdateTrip={updateTrip} />
        </div>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={handleDeleteTask} />
      </div>
    </div>
  );
};

export default App;
