import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectReports = () => {
  const { projectId } = useParams();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}/reports`); // Replace with your actual API endpoint
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [projectId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Project Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id} className="mb-2">
            <p>Date: {report.date}</p>
            <p>{report.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectReports;