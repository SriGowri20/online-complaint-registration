import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccordionAdmin from './AccordionAdmin';
import AgentInfo from './AgentInfo';
import UserInfo from './UserInfo';
import FooterC from '../common/FooterC';

function AdminHome() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalComplaints: 0, pending: 0, inProgress: 0, resolved: 0
  });
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState('complaints');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data.stats);
        setComplaints(res.data.complaints);
      } catch (err) {
        navigate('/login');
      }
    };
    fetchData();
  }, []);

  const assignAgent = async (complaintId, agentId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/assign`,
        { complaintId, agentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Agent assigned successfully!');
    } catch (err) {
      alert('Failed to assign agent.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <span className="navbar-brand fw-bold">ComplaintPortal — Admin</span>
          <button className="btn btn-light btn-sm text-primary fw-bold"
            onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="container py-4">

        {/* Stats Row */}
        <div className="row g-3 mb-4">
          {[
            { label: 'Total Complaints', value: stats.totalComplaints, color: '#1a73e8' },
            { label: 'Pending',          value: stats.pending,         color: '#f59e0b' },
            { label: 'In Progress',      value: stats.inProgress,      color: '#3b82f6' },
            { label: 'Resolved',         value: stats.resolved,        color: '#10b981' },
          ].map((s, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className="card p-3 text-center h-100">
                <h3 className="fw-bold mb-1" style={{ color: s.color }}>{s.value}</h3>
                <p className="text-muted small mb-0">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="d-flex gap-2 mb-4">
          {['complaints', 'agents', 'users'].map(tab => (
            <button
              key={tab}
              className={`btn btn-sm ${activeTab === tab ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Complaints Tab */}
        {activeTab === 'complaints' && (
          <div>
            <h6 className="fw-bold mb-3">All Complaints</h6>
            {complaints.length === 0 ? (
              <p className="text-muted">No complaints found.</p>
            ) : (
              complaints.map(c => (
                <div className="card p-3 mb-3" key={c._id}>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="fw-bold mb-1">{c.title}</h6>
                      <small className="text-muted">
                        {c.category} · {c.department} · by {c.userName}
                      </small>
                    </div>
                    <span className={`status-${c.status.toLowerCase().replace(' ', '')}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-muted small mt-2 mb-2">{c.description?.slice(0, 100)}...</p>
                  <AccordionAdmin complaint={c} onAssign={assignAgent} token={token} />
                </div>
              ))
            )}
          </div>
        )}

        {/* Agents Tab */}
        {activeTab === 'agents' && <AgentInfo token={token} />}

        {/* Users Tab */}
        {activeTab === 'users' && <UserInfo token={token} />}

      </div>
      <FooterC />
    </div>
  );
}

export default AdminHome;