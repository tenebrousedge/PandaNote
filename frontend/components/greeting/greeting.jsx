import React from 'react';
import { Link } from 'react-router';

const createLinks = () => (
  <nav className="session-links">
    <Link className="login-link" to="/login">Login</Link>
    &nbsp;&nbsp;
    <Link className="signup-link" to="/signup">Sign Up</Link>
  </nav>
);

const welcomeMessage = (currentUser, logout) => (
  <div>
    <h2>Welcome, {currentUser.username}!</h2>
    <button onClick={logout}>Logout</button>
  </div>
);

const Greeting = ({ currentUser, logout }) => {
  return currentUser ? welcomeMessage(currentUser, logout) : createLinks()
};

export default Greeting;
