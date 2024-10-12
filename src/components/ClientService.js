import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ClientService = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const db = getFirestore();
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const userId = userData?.id;

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(collection(db, 'booking'), where('cid', '==', userId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setBookings(null);
      } else {
        const bookingData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingData);
      }
      setLoading(false);
    };
    fetchBookings();
  }, [db, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (bookings === null) {
    return <img src="norequest.jpeg" alt="No Requests" />;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary mb-3 mt-3"
          onClick={() => navigate('/client-request')}
        >
        Raise Request
        </button>
      </div>


      <table className="table table-bordered" style={{ padding: '20px' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#3700B3', color: 'white' }}>Worker Name</th>
            <th style={{ backgroundColor: '#3700B3', color: 'white' }}>Service</th>
            <th style={{ backgroundColor: '#3700B3', color: 'white' }}>Contact</th>
            <th style={{ backgroundColor: '#3700B3', color: 'white' }}>Email</th>
            <th style={{ backgroundColor: '#3700B3', color: 'white' }}>Status</th>
            <th style={{ backgroundColor: '#3700B3', color: 'white' }}>Meeting</th>
            <th style={{ backgroundColor: '#3700B3', color: 'white' }}>Rate</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td style={{ backgroundColor: '#f2e7fe', color: 'black' }}>{booking.wname}</td>
              <td style={{ backgroundColor: '#f2e7fe', color: 'black' }}>{booking.service}</td>
              <td style={{ backgroundColor: '#f2e7fe', color: 'black' }}>{booking.wcontact}</td>
              <td style={{ backgroundColor: '#f2e7fe', color: 'black' }}>{booking.wmail}</td>
              <td style={{ backgroundColor: '#f2e7fe', color: 'black' }}>{booking.status}</td>
              <td style={{ backgroundColor: '#f2e7fe', color: 'black' }}>
                <i
                  className="bi bi-calendar-date"
                  onClick={() => navigate('/client-meeting', { state: { meeting: booking.meeting } })}
                />
              </td>
              <td style={{ backgroundColor: '#f2e7fe', color: 'black' }}>
                {booking.status === 'Pending' ? (
                  'N/A'
                ) : ( booking.wratingstatus===0 ?
                  (<i
                    className="bi bi-star"
                    onClick={() => navigate('/rating', { state: { bookingId: booking.id, workerId: booking.wid } })}
                  />):(<i class="bi bi-star-fill" ></i>)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary mb-3 mt-3"
            onClick={() => navigate('/client-home')}
          >
            Back
          </button>
      </div>
    </div>
  );
};

export default ClientService;
