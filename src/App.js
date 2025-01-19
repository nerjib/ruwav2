import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import Sidebar from './components/sideBar';
import ProjectsPage from './pages/projects';
import ReportsPage from './pages/reports';
// import MapPage from './pages/MapPage';
import ProjectDetailsPage from './pages/projectsDetails';
import AddProjectPage from './pages/addNewProject';
import DailyMap from './pages/dailyMap';
import AllMap from './pages/allmaps';
import ODFMap from './pages/odfMap';
import AddOdf from './pages/addodfdata';
import ODFPage from './pages/odfTable';
import ProjectDetailsPageAdmin from './pages/pdetails';


function App() {
  return (
    <Router>
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/new" element={<AddProjectPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
            <Route path="/projects/admin/:projectId" element={<ProjectDetailsPageAdmin />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/map" element={<DailyMap />} />
            <Route path="/maps" element={<AllMap />} />
            <Route path="/odf" element={<ODFMap />} />
            <Route path="/odf/add" element={<AddOdf />} />
            <Route path="/odf/status" element={<ODFPage />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
