import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // adjust based on your Firebase config

const WorkerHistory = () => {
  const navigate = useNavigate();
  const [completedServices, setCompletedServices] = useState([]);

  const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
  const userId = storedUserData.id;

  useEffect(() => {
    const fetchCompletedServices = async () => {
      const bookingRef = collection(db, 'booking');
      const q = query(bookingRef, where('wid', '==', userId), where('status', '==', 'Complete'));

      const querySnapshot = await getDocs(q);
      const services = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          name: data.cname,
          service: data.service,
          description: data.description,
          lastMeeting: data.meeting.length > 0 ? data.meeting[data.meeting.length - 1] : 'N/A'
        };
      });

      setCompletedServices(services);
    };

    fetchCompletedServices();
  }, [userId]);

  return (
    <div className="container mt-4">
      {/* Back Button */}
      <i 
        className="bi bi-arrow-left-circle-fill" 
        style={{ fontSize: '2rem', cursor: 'pointer',top: '10px', left: '10px' }} 
        onClick={() => navigate('/worker-home')}
      ></i>

      {/* Heading */}
      <h2 className="text-center my-4" style={{ fontWeight: 'bold', color: '#3700B3' }}>Completed Service</h2>

      {/* Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ backgroundColor: '#3700B3', color: 'white' }}>Name</th>
            <th style={{ backgroundColor: '#3700B3', color: 'white' }}>Service</th>
            <th style={{ backgroundColor: '#3700B3', color: 'white' }}>Description</th>
            <th style={{ backgroundColor: '#3700B3', color: 'white' }}>Last Meeting</th>
          </tr>
        </thead>
        <tbody>
          {completedServices.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center" style={{ backgroundColor: '#f2e7fe', color: 'black' }}>
                No completed services found</td>
            </tr>
          ) : (
            completedServices.map((service, index) => (
              <tr key={index}>
                <td style={{ backgroundColor: '#f2e7fe', color: 'black' }}>{service.name}</td>
                <td style={{ backgroundColor: '#f2e7fe', color: 'black' }}>{service.service}</td>
                <td style={{ backgroundColor: '#f2e7fe', color: 'black' }}>{service.description}</td>
                <td style={{ backgroundColor: '#f2e7fe', color: 'black' }}>{service.lastMeeting}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerHistory;
