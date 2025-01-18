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
            <Route path="/reports" element={<ReportsPage />} />
            {/* <Route path="/map" element={<MapPage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
