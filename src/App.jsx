// import { useState } from 'react'
import './App.css'
import CubeContainer from './components/cube/cubecontainer.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard.jsx'
import XrHitCubeContainer from './components/xr-hit-cube/XrHitCubeContainer.jsx';

function App() {
  return (
    <>
    <h1>XR App</h1>
    <section className="container">
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cube" element={<CubeContainer />} />
        <Route path="/xrhitcube" element={<XrHitCubeContainer />} />
      </Routes>
    </Router>
    </section>
    </>
  )
}

export default App
