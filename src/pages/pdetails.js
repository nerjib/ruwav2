import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap
import { baseUrl } from '../services/https';
import Layout from '../components/Layout'

const ProjectDetailsPageAdmin = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [reports, setReports] = useState([]);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${baseUrl}/projects/${projectId}`);
        setProject(response.data[0]);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${baseUrl}/reports/${projectId}`);
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchReports();
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('report', selectedFile);
      formData.append('title', project?.title)

      const response = await axios.post(`${baseUrl}/reports/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Report uploaded successfully:', response.data);
      setShowUploadModal(false);
      // Optionally: Refresh the project details to display the uploaded report
      // fetchProject(); 
    } catch (error) {
      console.error('Error uploading report:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('latitude', lat);
      formData.append('longitude', long);

      const response = await axios.put(`${baseUrl}/project/gps/${projectId}`,
        {
          longitude: long,
          latitude: lat
        }
        , {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });

      console.log('Report uploaded successfully:', response.data);
      // setShowUploadModal(false);
      // Optionally: Refresh the project details to display the uploaded report
      // fetchProject(); 
    } catch (error) {
      console.error('Error uploading report:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <Layout>
    <div>
      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
      <p>Community: {project.community}</p>
      <p>Ward: {project.ward}</p>
      <p>LGA: {project.lga}</p>
      <p>Contractor: {project.contractor}</p>
      <p>Status: {project.status}</p>
      <p>longitude <input value={long ?? project.longitude} onChange={(e) => setLong(e.target.value)} /></p>
      <p>latitude <input value={lat ?? project.latitude} onChange={(e) => setLat(e.target.value)} /></p>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={() => handleUpdate()}
      >
        Update GPS
      </button>
      {/* Add more project details as needed */}

      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={() => setShowUploadModal(true)}
      >
        Upload Report
      </button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
           
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reports
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reports.map((project) => (
            <tr key={project.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {project.filename}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={project.file_url.substr(0, project.file_url.lastIndexOf(".")) + ".png"}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                  target='_blank'
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
          />
        </Modal.Body>
        <Modal.Footer>
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded" 
            onClick={() => setShowUploadModal(false)}
          >
            Close
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpload}
            disabled={!selectedFile} 
          >
            Upload
          </button>
        </Modal.Footer>
      </Modal>
    </div>
    </Layout>
  );
};

export default ProjectDetailsPageAdmin;