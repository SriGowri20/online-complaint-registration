import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AccordionAdmin({ complaint, onAssign, token }) {
  const [open, setOpen] = useState(false);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get('https://online-complaint-registration-5wif.onrender.com/api/admin/agents', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAgents(res.data);
      } catch (err) {
        console.error('Failed to fetch agents');
      }
    };
    if (open) fetchAgents();
  }, [open]);

  return (
    <div>
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Hide' : 'Assign Agent'}
      </button>

      {open && (
        <div className="mt-3 p-3 bg-light rounded">
          <p className="fw-semibold mb-2">Select an agent to assign:</p>
          {agents.length === 0 ? (
            <p className="text-muted small">No agents available.</p>
          ) : (
            <div className="d-flex gap-2 align-items-center">
              <select
                className="form-select form-select-sm"
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
              >
                <option value="">Choose agent...</option>
                {agents.map(a => (
                  <option key={a._id} value={a._id}>
                    {a.name} — {a.email}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary btn-sm"
                disabled={!selectedAgent}
                onClick={() => {
                  onAssign(complaint._id, selectedAgent);
                  setOpen(false);
                }}
              >
                Assign
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AccordionAdmin;