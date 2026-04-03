import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatWindow from '../common/ChatWindow';
import FooterC from '../common/FooterC';

function AgentHome() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [selected, setSelected] = useState(null);
  const [agentName, setAgentName] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/complaints/assigned', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComplaints(res.data.complaints);
        setAgentName(res.data.name);
      } catch (err) {
        navigate('/login');
      }
    };
    fetchComplaints();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaints(complaints.map(c =>
        c._id === id ? { ...c, status } : c
      ));
      if (selected?._id === id) setSelected({ ...selected, status });
    } catch (err) {
      alert('Failed to update status.');
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
          <span className="navbar-brand fw-bold">ComplaintPortal — Agent</span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white">Hello, {agentName}</span>
            <button className="btn btn-light btn-sm text-primary fw-bold"
              onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <div className="row g-4">

          {/* Complaints List */}
          <div className="col-md-5">
            <h6 className="fw-bold mb-3">Assigned Complaints ({complaints.length})</h6>
            {complaints.length === 0 ? (
              <p className="text-muted">No complaints assigned yet.</p>
            ) : (
              complaints.map(c => (
                <div
                  key={c._id}
                  className={`card p-3 mb-3 ${selected?._id === c._id ? 'border-primary' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelected(c)}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="fw-bold mb-1">{c.title}</h6>
                      <small className="text-muted">{c.category} · {c.department}</small>
                    </div>
                    <span className={`status-${c.status.toLowerCase().replace(' ', '')}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-muted small mt-2 mb-0">{c.description?.slice(0, 80)}...</p>
                </div>
              ))
            )}
          </div>

          {/* Complaint Detail + Actions */}
          <div className="col-md-7">
            {selected ? (
              <>
                <div className="card p-4 mb-3">
                  <h5 className="fw-bold mb-1">{selected.title}</h5>
                  <div className="mb-2">
                    <span className="badge bg-light text-dark me-2">{selected.category}</span>
                    <span className="badge bg-light text-dark">{selected.department}</span>
                    <span className="ms-2 fw-semibold" style={{ color: '#f59e0b' }}>
                      {selected.urgency} urgency
                    </span>
                  </div>
                  <p className="text-muted">{selected.description}</p>

                  {/* Filed by */}
                  <p className="small text-muted mb-3">
                    Filed by: <strong>{selected.userName}</strong> · {selected.userEmail}
                  </p>

                  {/* Status Update Buttons */}
                  <div>
                    <p className="fw-semibold mb-2">Update Status:</p>
                    <div className="d-flex flex-wrap gap-2">
                      {['Assigned', 'In Progress', 'Resolved', 'Rejected'].map(s => (
                        <button
                          key={s}
                          className={`btn btn-sm ${selected.status === s
                            ? 'btn-primary' : 'btn-outline-secondary'}`}
                          onClick={() => updateStatus(selected._id, s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chat Window */}
                <ChatWindow complaintId={selected._id} />
              </>
            ) : (
              <div className="card p-5 text-center">
                <p className="text-muted">Select a complaint from the list to view details.</p>
              </div>
            )}
          </div>

        </div>
      </div>
      <FooterC />
    </div>
  );
}

export default AgentHome;