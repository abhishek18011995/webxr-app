import './App.css'
import CubeContainer from './components/cube/cubecontainer.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard.jsx'
import XrHitCubeContainer from './components/xr-hit-cube/XrHitCubeContainer.jsx';
import XrPanel from './components/xr-overlay/panel/XrPanel.jsx';
import XrPanelContainer from './components/xr-overlay/panel/XrPanelContainer.jsx';
import XrFeatures from './components/xr-overlay/panel/XrFeatures.jsx';


// const navigate = useNavigate();
// const nextStep = () => {
//   navigate('/xrpanel');
// }

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
              <Route path="feature" element={<XrFeatures />} />
            </Route>
          </Routes>
        </Router>
      </section>
    </>
  )
}

export default App
