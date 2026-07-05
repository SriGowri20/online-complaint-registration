import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterC from '../common/FooterC';

function HomePage() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [name, setName] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/complaints/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComplaints(res.data.complaints);
        setName(res.data.name);
      } catch (err) {
        navigate('/login');
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <span className="navbar-brand fw-bold">ComplaintPortal</span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white">Hello, {name}</span>
            <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/complaint')}>
              New Complaint
            </button>
            <button className="btn btn-light btn-sm text-primary fw-bold" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <h5 className="fw-bold mb-4">My Complaints</h5>

        {complaints.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted mb-3">You haven't filed any complaints yet.</p>
            <button className="btn btn-primary" onClick={() => navigate('/complaint')}>
              File a Complaint
            </button>
          </div>
        ) : (
          <div className="row g-3">
            {complaints.map((c) => (
              <div className="col-md-6" key={c._id}>
                <div className="card p-3 h-100">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="fw-bold mb-0">{c.title}</h6>
                    <span className={`status-${c.status.toLowerCase().replace(' ', '')}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-muted small mb-2">{c.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-light text-dark">{c.category}</span>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => navigate('/status', { state: { complaintId: c._id } })}
                    >
                      Track
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <FooterC />
    </div>
  );
}

export default HomePage;