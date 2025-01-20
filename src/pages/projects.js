import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../services/https';
import Layout from '../components/Layout'


const ProjectsPage = () => {
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
        const response = await axios.get(`${baseUrl}/projects`); // Replace with your actual API endpoint
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
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {/* <Link 
        to="/projects/new" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add New Project
      </Link> */}
      <div className="mb-4">
        <label htmlFor="searchTitle" className="block text-sm font-medium text-gray-700">
            Search by Title
        </label>
        <select
            id="status"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
            {titleOptions.map((title) => (
            <option key={title} value={title}>
                {title}
            </option>
            ))}
        </select>
        {/* <input
            type="text"
            id="searchTitle"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
        /> */}
        </div>

        <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
        </label>
        <select
            id="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
            {statusOptions.map((status) => (
            <option key={status} value={status}>
                {status}
            </option>
            ))}
        </select>
        </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              FACILITY
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              LOT
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Community
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ward
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              LGA
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              contractor
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              %
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentProjects.map((project) => (
            <tr key={project.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {project.title === 'HPBH' 
                  ? 'Handpump Borehole'
                    :project.title === 'SMBH'
                    ? 'Solar Motorized Borehole'
                    :project.title === 'VIP'
                    ? 'VIP Laterines'
                    :project.title === 'FLBH'
                    ? 'Forcelift Borehole':
                    project.title   }
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {project.lot}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {project.community}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {project.ward}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {project.lga}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {project.contractor}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {project.coverage}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {project.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  View
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

export default ProjectsPage;