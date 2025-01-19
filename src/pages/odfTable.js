import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../services/https';
import Layout from '../components/Layout'


const ODFPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 100; // Adjust as needed
  const [searchTitle, setSearchTitle] = useState('');
const [selectedStatus, setSelectedStatus] = useState('All'); 
const [statusOptions] = useState(['All', 'Completed', 'Ongoing', 'Pending', 'Abandoned']);
const [titleOptions] = useState(['HPBH','SMBH','FLBH', 'HPBH']);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${baseUrl}/odf`); // Replace with your actual API endpoint
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);



  // Calculate the index of the last project to be displayed
  const indexOfLastProject = currentPage * projectsPerPage;

  // Calculate the index of the first project to be displayed
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredProjects = projects?.filter((project) => {
    return (
        project?.title?.toLowerCase()?.includes(searchTitle?.toLowerCase()) && 
        (selectedStatus === 'All' || project.status === selectedStatus)
    );
});
// Get current projects to be displayed
const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  return (
    <Layout>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">ODF Status</h2>
      {/* <Link 
        to="/projects/new" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add New Project
      </Link> */}
      

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              LGA
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No of Communities
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No of Certified Communities
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {project.lga}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {project.no_of_communities}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {project.no_of_certified}
                </span>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/`}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  more
                </Link>
                {/* <Link
                  to={`/projects/${project.id}/edit`}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  Edit
                </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        {/* Pagination controls */}
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1} 
          className="inline-flex items-center px-4 py-2 bg-gray-300 border border-gray-300 rounded-md hover:bg-gray-400 mr-2"
        >
          Previous
        </button>
        {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }).map((_, index) => (
          <button 
            key={index + 1} 
            onClick={() => paginate(index + 1)} 
            className={`inline-flex items-center px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === Math.ceil(projects.length / projectsPerPage)} 
          className="inline-flex items-center px-4 py-2 bg-gray-300 border border-gray-300 rounded-md hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default ODFPage;