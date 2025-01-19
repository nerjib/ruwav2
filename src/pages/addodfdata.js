import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../services/https';
import Layout from '../components/Layout'


const AddOdf = () => {
  const [name, setName] = useState('');
  const [lga, setLga] = useState('');
  const [certified, setCertified] = useState(0); // Default status
  const [communities, SetCommunities] = useState(0);
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const formData ={
            lga,
            no_of_communities: communities,
            no_of_certified: certified
        }

      const response = await axios.post(`${baseUrl}/odf`, formData, {
        headers: {
        },
      });

      console.log('odf created successfully:', response.data);
      navigate('/odf'); // Redirect to projects page after successful creation
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  
  return (
    <Layout>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add New LGA</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            lga
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={lga}
            onChange={(e) => setLga(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            No of Communities
          </label>
          <input
            type='number'
            id="description"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={communities}
            onChange={(e) => SetCommunities(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            No of Certified Communities
          </label>
          <input
            type="number"
            id="description"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={certified}
            onChange={(e) => setCertified(e.target.value)}
          />
        </div>

       
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create ODF
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default AddOdf;