import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Adjust the path based on your project structure
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientRequest = ({ clientName, clientId, clientEmail, clientContact, clientAddress }) => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [description, setDescription] = useState('');
    const [workers, setWorkers] = useState([]);
    const [selectedWorkerId, setSelectedWorkerId] = useState(null);
    const [error, setError] = useState('');
    const [showWorkers, setShowWorkers] = useState(false);
    const navigate = useNavigate();

    // Fetch services from Firestore
    useEffect(() => {
        const fetchServices = async () => {
            const servicesCollection = collection(db, 'services');
            const servicesSnapshot = await getDocs(servicesCollection);
            const servicesList = servicesSnapshot.docs.map(doc => doc.data().name);
            setServices(servicesList);
        };

        fetchServices();
    }, []);

    // Search for workers based on selected service
    const handleSearch = async () => {
        if (!selectedService || description.trim() === '') {
            setError('Please select a service and provide a description.');
            return;
        }

        const workersQuery = query(collection(db, 'users'), where('role', '==', 'Worker'));
        const workersSnapshot = await getDocs(workersQuery);
        const filteredWorkers = workersSnapshot.docs.filter(doc => 
            doc.data().services.includes(selectedService)
        );

        setWorkers(filteredWorkers);
        setShowWorkers(filteredWorkers.length > 0); // Show workers only if found
        setError(filteredWorkers.length === 0 ? 'No workers yet to appoint.' : '');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!selectedWorkerId) {
          setError('Please select a worker.');
          return;
      }
  
      // Find the selected worker in the workers array
      const selectedWorker = workers.find(worker => worker.id === selectedWorkerId);
  
      if (!selectedWorker) {
          setError('Selected worker not found.');
          return;
      }

      const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
  
      // Prepare booking data
      const bookingData = {
          cname: storedUserData.name,
          cid: storedUserData.id,
          cmail: storedUserData.email,
          ccontact: storedUserData.contact,
          caddress: storedUserData.address,
          wname: selectedWorker.data().name,
          wid: selectedWorkerId,
          wcontact: selectedWorker.data().contact,
          wmail: selectedWorker.data().email,
          status: 'Pending',
          service: selectedService,
          description: description,
          meeting: [],
          wratingstatus: 0
      };
      console.log(clientName)
  
      try {
          // Store in the booking collection
          await addDoc(collection(db, 'booking'), bookingData);
          // Clear fields or redirect after successful submission
          setSelectedService('');
          setDescription('');
          setSelectedWorkerId(null);
          setWorkers([]);
          setShowWorkers(false);
          setError('');
          alert('Booking submitted successfully!');
      } catch (error) {
          setError('Error submitting booking. Please try again.');
          console.error("Error adding document: ", error);
      }
  };
  

    return (
        <div className="container mt-4">
            <button className="btn btn-primary" onClick={() => navigate('/client-service')}>Back</button>
            <h2>Request a Service</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="serviceDropdown" className="form-label">Select Service</label>
                            <select 
                                id="serviceDropdown"
                                className="form-select" 
                                value={selectedService} 
                                onChange={(e) => setSelectedService(e.target.value)}>
                                <option value="">Choose a service</option>
                                {services.map((service, index) => (
                                    <option key={index} value={service}>{service}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea 
                                id="description" 
                                className="form-control" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                maxLength={200} 
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </form>
                </div>
            </div>

            {showWorkers && (
                <>
                    <h4>Available Workers</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workers.map((worker) => (
                                <tr key={worker.id}>
                                    <td>{worker.data().name}</td>
                                    <td>{worker.data().address}</td>
                                    <td>
                                        <input 
                                            type="radio" 
                                            id={worker.id} 
                                            name="worker" 
                                            value={worker.id} 
                                            onChange={(e) => setSelectedWorkerId(e.target.value)} 
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-center">
                    <button type="submit" className="btn btn-success mt-4" onClick={handleSubmit}>Submit</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ClientRequest;
