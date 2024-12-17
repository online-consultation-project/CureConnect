import React from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const history = useNavigate();

  const handleGoHome = () => {
    history.push('/'); // Redirect to homepage or any other page
  };

  return (
    <div>
      <h2>Appointment Confirmed</h2>
      <p>Your appointment has been successfully booked!</p>
      <button onClick={handleGoHome}>Go to Homepage</button>
    </div>
  );
};

export default Confirmation;
