import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { httpGet } from '../services/https';
import Layout from '../components/Layout';
import { Table, Input, Select } from 'antd';

const { Option } = Select;

const ReportsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await httpGet('/reports/reports');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const columns = [
    { title: 'Facility', dataIndex: 'title', key: 'title' },
    { title: 'Community', dataIndex: 'community', key: 'community' },
    { title: 'Ward', dataIndex: 'ward', key: 'ward' },
    { title: 'LGA', dataIndex: 'lga', key: 'lga' },
    { title: 'Contractor', dataIndex: 'contractor', key: 'contractor' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <a href={record.file_url.substr(0, record.file_url.lastIndexOf('.')) + ".png"} target='_blank' rel="noopener noreferrer">View</a>
      ),
    },
  ];

  const filteredProjects = projects?.filter((project) => {
    return project?.title?.toLowerCase()?.includes(searchTitle?.toLowerCase());
  });

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Reports</h2>
        <div className="mb-4">
          <Input
            placeholder="Search by Title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            style={{ width: 200 }}
          />
        </div>
        <Table columns={columns} dataSource={filteredProjects} loading={loading} rowKey="id" />
      </div>
    </Layout>
  );
};

export default ReportsPage;
