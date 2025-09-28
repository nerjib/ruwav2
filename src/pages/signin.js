import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpPost } from '../services/https';
import ruwaLogo from "../../src/assets/192.png";
import { Form, Input, Button, Spin, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const response = await httpPost('/auth/login', values);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userDetails', JSON.stringify(response));
        navigate('/');
      } else {
        setError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <div style={{ width: 400, padding: '40px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src={ruwaLogo} alt="logo" style={{ height: '80px', marginBottom: '16px', display: 'block', margin: '0 auto' }} />
          <h2>RUWASSA Dashboard</h2>
        </div>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />} 
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
