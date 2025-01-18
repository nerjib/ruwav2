import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import { baseUrl, httpGet } from '../services/https';
import Layout from '../components/Layout'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  



const HomePage = () => {
    const [projects, setProjects] = React.useState([]);
    const [projectData, setProjectData] = useState([
        { status: 'Completed', count: 15 },
        { status: 'In Progress', count: 10 },
        { status: 'On Hold', count: 5 },
        { status: 'Not Started', count: 3 },
      ]);
  const [chatData, setChatData] = useState([
    { category: 'Handpump Borehole', count: 50 },
    { category: 'Solar Motorized Borehole', count: 30 },
    { category: 'VIP Latrines', count: 20 },
  ]);

    const getProjects = async () => {
        const res = await httpGet(`${baseUrl}/projects`)
        if ( res?.status) {
            setProjects(res.data);
        } else {
            console.log('Error fetching projects:', res);
        }
    }
    const projectCounts = {
        labels: projectData.map((data) => data.status),
        datasets: [
          {
            label: 'Project Status Counts',
            data: projectData.map((data) => data.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
      const chatCounts = {
        labels: chatData.map((data) => data.category),
        datasets: [
          {
            label: 'Chat Interactions',
            data: chatData.map((data) => data.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
    useEffect(() => {
        getProjects();
    }, [])

  return (
    <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Project Management Dashboard</h1>
      <p className="text-lg mb-4">
        This dashboard helps you track and manage all your projects in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example: Quick Stats (replace with actual data) */}
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Total Projects</h2>
          <p className="text-2xl font-bold">15</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Completed Projects</h2>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Ongoing Projects</h2>
          <p className="text-2xl font-bold">7</p>
        </div>
      </div>
      <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Project Analytics</h2>
      <div className="mb-4">
        <Bar data={projectCounts} />
      </div>

      <h2 className="text-2xl font-bold mb-4">Chat Analytics</h2>
      <div>
        <Bar data={chatCounts} />
      </div>
    </div>

      {/* Example: Recent Projects (replace with actual data) */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
        {/* List of recent projects (e.g., using ProjectList component) */}
      </div>
    </div>
    </Layout>
  );
};

export default HomePage;