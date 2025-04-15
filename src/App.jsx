import './App.css'
import CubeContainer from './components/cube/cubecontainer.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard.jsx'
import XrHitCubeContainer from './components/xr-hit-cube/XrHitCubeContainer.jsx';
import XrPanel from './components/xr-overlay/panel/XrPanel.jsx';
import XrStep1 from './components/xr-overlay/panel/XrStep1.jsx';
import XrPanelContainer from './components/xr-overlay/panel/XrPanelContainer.jsx';

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
            <Route path="/xrpanel" element={<XrPanelContainer />} >
              <Route path="" element={<XrPanel />} />
              <Route path="step1" element={<XrStep1 />} />
              {/* <Route path="/step2" element={<XrHiXrStep1tCubeContainer />} /> */}
            </Route>
          </Routes>
        </Router>
      </section>
    </>
  )
}

export default App
