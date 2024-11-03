import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap icons

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);
  const db = getFirestore();
  const navigate = useNavigate();

  // Retrieve user ID from session storage
  const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
  const userId = storedUserData.id;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData.reviews && userData.reviews.length > 0) {
            setReviews(userData.reviews);
          }
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [db, userId]);

  // Array of colors for card backgrounds
  const cardColors = ['#FFCCCC', '#CCFFCC', '#CCCCFF', '#FFFFCC', '#FFCCFF'];

  return (
    <div className="container mt-5">
      {/* Back Arrow Icon */}
      <i 
        className="bi bi-arrow-left-circle-fill" 
        style={{ fontSize: '2rem', cursor: 'pointer',top: '10px', left: '10px' }} 
        onClick={() => navigate('/worker-home')}
      ></i>

      <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#3700B3' }}>Your Reviews</h2>

      <div className="row">
        {reviews.length > 0 ? (
          reviews.map((review, index) => {
            // Split the review string by "*-*"
            const [service, rating, reviewText] = review.split('*-*');

            // Generate stars based on rating
            const stars = Array.from({ length: rating }, (_, i) => (
              <i key={i} className="bi bi-star-fill text-warning"></i>
            ));

            return (
              <div key={index} className="col-md-4 mb-3">
                <div className="card" style={{ backgroundColor: cardColors[index % cardColors.length] }}>
                  <div className="card-body">
                    <h5 className="card-title">Service: {service}</h5>
                    <h5 className="card-text">
                      Rating: {stars}
                    </h5>
                    <h5 className="card-text">Review: {reviewText}</h5>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewReviews;
