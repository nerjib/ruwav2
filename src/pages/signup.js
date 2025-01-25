import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../services/https';
import Swal from 'sweetalert2';
import Layout from '../components/Layout'

const RegisterPage = () => {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [phone_number, setPhone] = useState('');
  const [lga, setLGA] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userRole = JSON.parse(localStorage.getItem('userDetails'))?.user?.role;
    if(userRole !== 'super_admin'){
      Swal.fire('Oops...','You do not have the permission to perform this action');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/auth/register`, {
        full_name,
        email,
        password,
        role,
        phone_number,
        lga
      });

      console.log('User created successfully:', response.data);
      navigate('/users'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error creating user:', error);
      Swal.fire('Oops...',error.response?.data?.error || 'An error occurred. Please try again.');
      // Handle error (e.g., display error message to the user)
    }
  };
const lgaList= ['Birnin-Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba', 'Jema\'a', 'Kachia', 'Kaduna North', 'Kaduna South', 'Kagarko', 'Kajuru', 'Kaura', 'Kauru', 'Kubau', 'Kudan', 'Lere', 'Makarfi', 'Sabon Gari', 'Sanga', 'Soba', 'Zangon Kataf', 'Zaria']
  return (
    <Layout>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="wash">LG WASH Cordinator</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>

          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            LGA
          </label>
          <select
            id="role"
            value={lga}
            onChange={(e) => setLGA(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">....</option>
            {lgaList.map((lga, index) => (
              <option key={index} value={lga}>
                {lga}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default RegisterPage;