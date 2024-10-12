import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to detect current path
import { auth, db } from '../firebase'; // Firebase auth and Firestore import
import SMlogo from '../assets/SMlogo.png'; // Import your logo image
import Logout from './Logout'; // Import Logout component
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const [loading, setLoading] = useState(true); // Track if authentication is still being checked
  const [role, setRole] = useState(''); // Track user role
  const location = useLocation(); // Hook to get the current URL location

  useEffect(() => {
    // Listen for Firebase authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsLoggedIn(!!user); // Set login status based on whether a user is authenticated
      setLoading(false); // Set loading to false once authentication status is determined

      if (user) {
        // Fetch user role from Firestore
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role); // Set the role from Firestore
        }
      }
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // Render nothing (or a loader) while checking authentication status
  }

  // Check if it's the login page or signup page
  const isLoginPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '';
  const isSignupPage = location.pathname === '/signup';

  return (
    <header className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#23036A' }}>
      <div>
        <img src={SMlogo} alt="Skill Match Logo" style={{ height: '50px' }} />
      </div>
      <div className="d-flex align-items-center">
        {/* Show "Service" link only if the user is logged in and the role is "Client" */}
        {isLoggedIn && role === 'Client' && (
          <Link to="/client-service" className="text-light mr-3" style={{ textDecoration: 'none', marginRight: '30px' }}>
            <b>Service</b>
          </Link>
        )}

        {/* Show Sign Up button only if the user is NOT logged in and on the login page */}
        {!isLoggedIn && isLoginPage && (
          <Link to="/signup" className="btn btn-light">Sign Up</Link>
        )}

        {/* Show Login button only if the user is NOT logged in and on the signup page */}
        {!isLoggedIn && isSignupPage && (
          <Link to="/" className="btn btn-light">Login</Link>
        )}

        {/* Show Logout button only if the user is logged in */}
        {isLoggedIn && (
          <Logout />
        )}
      </div>
    </header>
  );
};

export default Header;
