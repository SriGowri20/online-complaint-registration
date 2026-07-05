import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-4">
      <div className="card p-4" style={{ width: '100%', maxWidth: '440px' }}>
        <h4 className="fw-bold text-center mb-1">Create Account</h4>
        <p className="text-muted text-center mb-4">Register to file complaints</p>

        {error   && <div className="alert alert-danger  py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input type="text" name="name" className="form-control"
              placeholder="Ravi Kumar"
              value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input type="email" name="email" className="form-control"
              placeholder="you@example.com"
              value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <input type="tel" name="phone" className="form-control"
              placeholder="9876543210"
              value={form.phone} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" name="password" className="form-control"
              placeholder="Create a password"
              value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
            Register
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Already have an account?{' '}
          <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;