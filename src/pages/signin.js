import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../services/https';
import ruwaLogo from "../../src/assets/192.png";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
      });

      // Store token in local storage (or use a secure token storage solution)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userDetails', JSON.stringify(response.data)); 
      navigate('/'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
        <div className="mb-4 w-2/3 mx-auto border text-center px-5 card">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="text-center">
        <img src={ruwaLogo} alt="logo" width={100} height={100} className="mx-auto" />
        </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-left">
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
        <div className="mb-4 text-left">
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
      </div>
    </div>
  );
};

export default LoginPage;