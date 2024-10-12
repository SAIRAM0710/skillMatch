// src/components/ClientHome.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ServicesLogo from '../assets/SevicesLogo.jpg'; // Import services image
import WorkerLogo from '../assets/worker.jpg'; // Import worker image
import './ClientHome.css'; // Import CSS file for styles

const ClientHome = () => {
  const location = useLocation();
  const { name } = location.state || {}; // Get name from location state
  const navigate = useNavigate(); // Hook for navigation

  const handleViewServices = () => {
    navigate('/view-services'); // Navigate to ViewServices page
  };

  const handleViewWorker = () => {
    navigate('/view-worker'); // Navigate to ViewWorker page
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center greeting">Hello, {name}!</h1>
      <div className="d-flex justify-content-around mt-5" >
        {/* Available Services Card */}
        <div className="card" style={{ width: '15rem', height: '18rem', marginBottom: '30px' }}>
          <img src={ServicesLogo} className="card-img-top" alt="Services" style={{ width: '15rem', height: '8rem'}}/>
          <div className="card-body">
            <h5 className="card-title">Available Services</h5>
            <p className="card-text">Explore our services and find the one that fits your needs.</p>
            <button className="btn btn-primary" onClick={handleViewServices}>
              View
            </button>
          </div>
        </div>

        {/* Workers Card */}
        <div className="card" style={{ width: '15rem', height: '18rem', marginBottom: '30px' }}>
          <img src={WorkerLogo} className="card-img-top" alt="Workers" style={{ width: '14rem', height: '8rem'}} />
          <div className="card-body">
            <h5 className="card-title">Workers</h5>
            <p className="card-text">Browse through our skilled workers ready to help you.</p>
            <button className="btn btn-primary" onClick={handleViewWorker}>
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHome;
