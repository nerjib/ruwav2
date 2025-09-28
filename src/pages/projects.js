import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { httpGet, httpPost, httpPut } from '../services/https';
import Layout from '../components/Layout';
import { Table, Input, Select, Button, Modal, message } from 'antd';
import Swal from 'sweetalert2';

const { Option } = Select;

const ProjectsPage = () => {
  const role = JSON.parse(localStorage.getItem('userDetails'))?.user?.role;
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState('All');
  const [selectedRole, setSelectedRole] = useState('lga_supervisor');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await httpGet('/projects');
        setProjects(response);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await httpGet('/users');
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchProjects();
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Facility',
      dataIndex: 'title',
      key: 'title',
      render: (title) => {
        switch (title) {
          case 'HPBH':
            return 'Handpump Borehole';
          case 'SMBH':
            return 'Solar Motorized Borehole';
          case 'VIP':
            return 'VIP Latrines';
          case 'FLBH':
            return 'Forcelift Borehole';
          default:
            return title;
        }
      },
    },
    { title: 'LOT', dataIndex: 'lot', key: 'lot' },
    { title: 'Community', dataIndex: 'community', key: 'community' },
    { title: 'Ward', dataIndex: 'ward', key: 'ward' },
    { title: 'LGA', dataIndex: 'lga', key: 'lga' },
    { title: 'Contractor', dataIndex: 'contractor', key: 'contractor' },
    { title: 'Coverage', dataIndex: 'coverage', key: 'coverage' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Phase', dataIndex: 'phase', key: 'status' },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Link to={`/projects/${record.id}`}>View</Link>
      ),
    },
  ];

  const filteredProjects = projects?.filter((project) => {
    return (
      project?.title?.toLowerCase()?.includes(searchTitle?.toLowerCase()) &&
      (selectedStatus === 'All' || project.status?.toLowerCase() === selectedStatus.toLowerCase()) &&
      (selectedPhase === 'All' || project.phase === selectedPhase)
    );
  });

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const showAssignModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!selectedUser) {
      message.error('Please select a user');
      return;
    }
    try {
      await httpPut('/projects/assign', { projectIds: selectedRowKeys, userId: selectedUser, role: selectedRole });
      Swal.fire('Done','Projects assigned successfully', 'success');
      setSelectedRowKeys([]);
    } catch (error) {
      message.error('Failed to assign projects');
    }
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <div className="p-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 className="text-2xl font-bold">Projects</h2>
          <div>
            {role === 'super_admin' && (
              <Button type="primary" style={{ marginRight: 8 }}>
                <Link to="/projects/new">Add New Project</Link>
              </Button>
            )}
            <Button type="primary" onClick={showAssignModal} disabled={!hasSelected}>
              Assign
            </Button>
          </div>
        </div>
        <div className="flex mb-4 space-x-4">
          <Input
            placeholder="Search by Title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            style={{ width: 200 }}
          />
          <Select
            defaultValue="All"
            style={{ width: 120 }}
            onChange={(value) => setSelectedStatus(value)}
          >
            <Option value="All">All Statuses</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Ongoing">Ongoing</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Abandoned">Abandoned</Option>
          </Select>
          <Select
            defaultValue="All"
            style={{ width: 120 }}
            onChange={(value) => setSelectedPhase(value)}
          >
            <Option value="All">All Phases</Option>
            <Option value="SURWASH">SURWASH</Option>
          </Select>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredProjects}
          loading={loading}
          rowKey="id"
        />
        <Modal
          title="Assign Projects"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Select
            showSearch
            style={{ width: '100%', marginBottom: 16 }}
            placeholder="Select a user"
            onChange={(value) => setSelectedUser(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {users.map(user => (
              <Option key={user.id} value={user.id}>{user.full_name}</Option>
            ))}
          </Select>
          <Select
            defaultValue="lga_supervisor"
            style={{ width: '100%' }}
            onChange={(value) => setSelectedRole(value)}
          >
            <Option value="lga_supervisor">LGA Supervisor</Option>
            <Option value="state_supervisor">State Supervisor</Option>
          </Select>
        </Modal>
      </div>
    </Layout>
  );
};

export default ProjectsPage;
