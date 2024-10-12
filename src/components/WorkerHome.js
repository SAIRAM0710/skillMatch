// src/components/WorkerHome.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Hook to access state passed via navigation

const WorkerHome = () => {
  const location = useLocation();
  const { name, role } = location.state || {}; // Destructure name and role from location state

  return (
    <div className="container mt-5">
      <h1 className="text-center">Hello, {name}! You are logged in as a {role}.</h1>
    </div>
  );
};

export default WorkerHome;
