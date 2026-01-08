import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { httpGet, httpPost, httpPut } from '../services/https';
import Layout from '../components/Layout';

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [reports, setReports] = useState([]);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [dragging, setDragging] = useState(false);
  const [modalFeedback, setModalFeedback] = useState('');

  const fetchProject = async () => {
    try {
      const response = await httpGet(`/projects/${projectId}`);
      setProject(response[0]);
      setLat(response[0]?.latitude || '');
      setLong(response[0]?.longitude || '');
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Failed to fetch project details.');
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await httpGet(`/reports/${projectId}`);
      if (response && Array.isArray(response)) {
        setReports(response);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchReports();
  }, [projectId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
        setSelectedFile(file);
        setModalFeedback('');
    } else {
        setModalFeedback('Please select a PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      const formData = new FormData();
      formData.append('report', selectedFile);
      formData.append('title', project?.title);

      await httpPost(`/reports/reports/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      closeUploadModal();
      fetchReports(); // Refresh reports list
      setFeedback('Report uploaded successfully!');
      setTimeout(() => setFeedback(''), 3000);
    } catch (error) {
      console.error('Error uploading report:', error);
      setModalFeedback('Error uploading report.');
    }
  };

  const handleUpdate = async () => {
    try {
      await httpPut(`/projects/project/gps/${projectId}`, {
        longitude: long,
        latitude: lat,
      });
      fetchProject(); // Refresh project details
      setFeedback('GPS coordinates updated successfully!');
      setTimeout(() => setFeedback(''), 3000);
    } catch (error) {
      console.error('Error updating GPS:', error);
      setFeedback('Error updating GPS coordinates.');
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setModalFeedback('');
      } else {
        setModalFeedback("Please drop a PDF file.");
      }
      e.dataTransfer.clearData();
    }
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setModalFeedback('');
  }

  if (loading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div>Error: {error}</div></Layout>;
  }

  if (!project) {
    return <Layout><div>Project not found.</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {feedback && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            {feedback}
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{project.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-semibold">Community:</span> {project.community}</div>
            <div><span className="font-semibold">Ward:</span> {project.ward}</div>
            <div><span className="font-semibold">LGA:</span> {project.lga}</div>
            <div><span className="font-semibold">Contractor:</span> {project.contractor}</div>
            <div>
              <span className="font-semibold">Status:</span>
              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {project.status}
              </span>
            </div>
            <div><span className="font-semibold">Longitude:</span> {project.longitude ?? 'N/A'}</div>
            <div><span className="font-semibold">Latitude:</span> {project.latitude ?? 'N/A'}</div>
          </div>
          <div className="mt-6" hidden>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowUploadModal(true)}
            >
              Upload Report
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6" hidden>
            <h3 className="text-xl font-bold mb-2">Update GPS Coordinates</h3>
            <div className="flex items-center gap-4">
                <input
                type="text"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="border p-2 rounded w-full"
                />
                <input
                type="text"
                placeholder="Longitude"
                value={long}
                onChange={(e) => setLong(e.target.value)}
                className="border p-2 rounded w-full"
                />
                <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdate}
                >
                Update
                </button>
            </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Reports</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Filename
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{report.filename}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href={report.file_url}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Report
                        </a>
                        <a
                          href={report.file_url?.replace('.pdf', '.png')}
                          className="text-green-600 hover:text-green-900"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Preview
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                      No reports available for this project.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Modal show={showUploadModal} onHide={closeUploadModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Upload Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalFeedback && <div className="text-red-500 text-sm mb-2">{modalFeedback}</div>}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            >
                {selectedFile ? (
                <div>
                    <p className="font-semibold">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                    <button
                    onClick={() => setSelectedFile(null)}
                    className="mt-2 text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                    Remove
                    </button>
                </div>
                ) : (
                <div>
                    <p className="text-gray-500">Drag & drop a PDF file here, or</p>
                    <label htmlFor="file-upload" className="cursor-pointer text-blue-500 hover:text-blue-700 font-semibold">
                    click to select a file
                    </label>
                    <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    />
                </div>
                )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={closeUploadModal}
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

export default ProjectDetailsPage;
