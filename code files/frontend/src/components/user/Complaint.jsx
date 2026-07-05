import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterC from '../common/FooterC';

function Complaint() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', category: '', department: '',
    description: '', urgency: 'Low'
  });
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const departments = ['Municipal Corporation', 'Electricity', 'Water Supply', 'Police', 'Roads'];
  const categories  = ['Water Leakage', 'Power Outage', 'Road Damage', 'Noise Complaint', 'Other'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      Object.keys(form).forEach(k => formData.append(k, form[k]));
      if (file) formData.append('attachment', file);

      await axios.post('http://localhost:5000/api/complaints', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Complaint submitted successfully! Redirecting...');
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      setError('Failed to submit complaint. Please try again.');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <span className="navbar-brand fw-bold">ComplaintPortal</span>
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/home')}>
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="container py-4">
        <div className="card p-4 mx-auto" style={{ maxWidth: '600px' }}>
          <h5 className="fw-bold mb-1">Lodge a Complaint</h5>
          <p className="text-muted small mb-4">Fill in the details of your issue</p>

          {error   && <div className="alert alert-danger  py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input type="text" name="title" className="form-control"
                placeholder="Brief title of the issue"
                value={form.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Department</label>
              <select name="department" className="form-select"
                value={form.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Category</label>
              <select name="category" className="form-select"
                value={form.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Urgency Level</label>
              <select name="urgency" className="form-select"
                value={form.urgency} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea name="description" className="form-control" rows="4"
                placeholder="Describe the issue in detail..."
                value={form.description} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Attach Image (optional)</label>
              <input type="file" className="form-control"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
      <FooterC />
    </div>
  );
}

export default Complaint;