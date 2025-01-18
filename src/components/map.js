import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 9.0082, // Default latitude for Kaduna (approximate)
    longitude: 7.4989, // Default longitude for Kaduna (approximate)
    zoom: 8,
  });
  const [projects, setProjects] = useState();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects'); // Replace with your actual API endpoint
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  },);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="YOUR_MAPBOX_ACCESS_TOKEN" // Replace with your Mapbox access token
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {projects.map((project) => (
        <Marker
          key={project.id}
          latitude={project.location.latitude}
          longitude={project.location.longitude}
        >
          <button
            className="cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            {/* Add a marker icon here (e.g., a custom SVG) */}
          </button>
        </Marker>
      ))}

      {selectedProject && (
        <Popup
          latitude={selectedProject.location.latitude}
          longitude={selectedProject.location.longitude}
          onClose={() => setSelectedProject(null)}
        >
          <div>
            <h4>{selectedProject.name}</h4>
            <p>{selectedProject.description}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;