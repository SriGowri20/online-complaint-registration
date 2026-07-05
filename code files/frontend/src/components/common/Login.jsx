import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://online-complaint-registration-5wif.onrender.com/api/auth/login', form);
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      if (role === 'admin')  navigate('/admin');
      else if (role === 'agent') navigate('/agent');
      else navigate('/home');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: '100%', maxWidth: '420px' }}>
        <h4 className="fw-bold text-center mb-1">Welcome Back</h4>
        <p className="text-muted text-center mb-4">Login to your account</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email" name="email" className="form-control"
              placeholder="you@example.com"
              value={form.email} onChange={handleChange} required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password" name="password" className="form-control"
              placeholder="Enter password"
              value={form.password} onChange={handleChange} required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
            Login
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Don't have an account?{' '}
          <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;