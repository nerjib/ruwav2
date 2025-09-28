import React, { useState, useEffect } from 'react';
import { httpGet } from '../services/https';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Table, Button } from 'antd';

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const role = JSON.parse(localStorage.getItem('userDetails'))?.user?.role;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await httpGet('/users');
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { title: 'Username', dataIndex: 'full_name', key: 'full_name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
  ];

  return (
    <Layout>
      <div className="p-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 className="text-2xl font-bold">Users</h2>
          {role === 'super_admin' && (
            <Button type="primary" onClick={() => navigate('/register')}>
              Add User
            </Button>
          )}
        </div>
        <Table columns={columns} dataSource={users} loading={loading} rowKey="id" />
      </div>
    </Layout>
  );
};

export default UsersPage;
