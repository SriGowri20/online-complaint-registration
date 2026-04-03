import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AgentInfo({ token }) {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/agents', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAgents(res.data);
      } catch (err) {
        console.error('Failed to fetch agents');
      }
    };
    fetchAgents();
  }, []);

  const deleteAgent = async (id) => {
    if (!window.confirm('Remove this agent?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/agents/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgents(agents.filter(a => a._id !== id));
    } catch (err) {
      alert('Failed to remove agent.');
    }
  };

  return (
    <div>
      <h6 className="fw-bold mb-3">All Agents ({agents.length})</h6>
      {agents.length === 0 ? (
        <p className="text-muted">No agents registered yet.</p>
      ) : (
        <div className="row g-3">
          {agents.map(a => (
            <div className="col-md-6" key={a._id}>
              <div className="card p-3 h-100">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-bold mb-1">{a.name}</h6>
                    <p className="text-muted small mb-1">{a.email}</p>
                    <p className="text-muted small mb-0">{a.phone}</p>
                  </div>
                  <div className="d-flex flex-column gap-2 align-items-end">
                    <span className="badge bg-success">Agent</span>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteAgent(a._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-top">
                  <small className="text-muted">
                    Assigned complaints: <strong>{a.assignedCount || 0}</strong>
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AgentInfo;