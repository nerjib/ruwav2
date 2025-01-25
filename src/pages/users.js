import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../services/https';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout'

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Adjust as needed
    const role = JSON.parse(localStorage.getItem('userDetails'))?.user?.role;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users`); // Replace with your actual API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Calculate the index of the last user to be displayed
  const indexOfLastUser = currentPage * usersPerPage;

  // Calculate the index of the first user to be displayed
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Get current users to be displayed
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {role === 'super_admin' &&
      <div className="mb-4">
        <button onClick={()=> navigate('/register')} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add User</button>
      </div>}
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.full_name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.email}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.role}
                </div>
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
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
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
          disabled={currentPage === Math.ceil(users.length / usersPerPage)} 
          className="inline-flex items-center px-4 py-2 bg-gray-300 border border-gray-300 rounded-md hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default UsersPage;