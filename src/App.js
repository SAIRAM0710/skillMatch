// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import Signup from './components/Signup'; // Import Signup
import ClientHome from './components/ClientHome'; // Import ClientHome
import WorkerHome from './components/WorkerHome'; // Import WorkerHome
import ViewWorker from './components/ViewWorker'; // Import ViewWorker
import ViewServices from './components/ViewServices'; // Import ViewServices
import ClientService from './components/ClientService';
import ClientRequest from './components/ClientRequest';
import "bootstrap/dist/css/bootstrap.css";
import ClientMeeting from './components/ClientMeeting';
import Rating from './components/Rating';
import 'bootstrap-icons/font/bootstrap-icons.css';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/client-home" element={<ClientHome />} />
        <Route path="/worker-home" element={<WorkerHome />} />
        <Route path="/view-worker" element={<ViewWorker />} />
        <Route path="/view-services" element={<ViewServices />} />
        <Route path="/client-service" element={<ClientService />} />
        <Route path="/client-request" element={<ClientRequest />} />
        <Route path="/client-meeting" element={<ClientMeeting />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
