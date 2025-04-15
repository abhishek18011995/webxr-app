import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>      
      <button onClick={() => navigate('/cube')}>Go to Cube</button> 
      <button onClick={() => navigate('/xrhitcube')}>Go to XR Hit Cube</button> 
      <button onClick={() => navigate('/xrpanel')}>Go to XR Panel</button> 
    </div>
  );
}

export default Dashboard;