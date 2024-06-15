import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    toast.success('Task added successfully!');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
    toast.success('Task deleted successfully!');
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
      <ToastContainer />
    </div>
  );
};

export default App;
