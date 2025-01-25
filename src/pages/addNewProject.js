import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../services/https';
import Swal from 'sweetalert2';

const AddProjectPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Started'); // Default status
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const role = JSON.parse(localStorage.getItem('userDetails'))?.user?.role;
    if(role !== 'super_admin'){
      Swal.fire('Oops...','You do not have the permission to perform this action');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('status', status);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);

      if (excelFile) {
        formData.append('excelFile', excelFile); 
      }

      const response = await axios.post(`${baseUrl}/projects`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Project created successfully:', response.data);
      navigate('/projects'); // Redirect to projects page after successful creation
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  const handleExcelFileChange = (event) => {
    setExcelFile(event.target.files[0]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            {/* Add other status options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
            Latitude
          </label>
          <input
            type="text"
            id="latitude"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
            Longitude
          </label>
          <input
            type="text"
            id="longitude"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="excelFile" className="block text-sm font-medium text-gray-700">
            Upload Excel File (Optional)
          </label>
          <input
            type="file"
            id="excelFile"
            accept=".xls, .xlsx"
            onChange={handleExcelFileChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default AddProjectPage;