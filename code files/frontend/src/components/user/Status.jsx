import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatWindow from '../common/ChatWindow';
import FooterC from '../common/FooterC';

function Status() {
  const location = useLocation();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');
  const complaintId = location.state?.complaintId;
  const token = localStorage.getItem('token');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(
          `https://online-complaint-registration-5wif.onrender.com/api/complaints/${complaintId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComplaint(res.data);
      } catch (err) {
        setError('Could not load complaint details.');
      }
    };
    if (complaintId) fetchComplaint();
    else navigate('/home');
  }, [complaintId]);

  const steps = ['Pending', 'Assigned', 'In Progress', 'Resolved'];

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <span className="navbar-brand fw-bold">ComplaintPortal</span>
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/home')}>
            Back
          </button>
        </div>
      </nav>

      <div className="container py-4">
        {error && <div className="alert alert-danger">{error}</div>}

        {complaint && (
          <>
            <div className="card p-4 mb-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5 className="fw-bold mb-1">{complaint.title}</h5>
                  <span className="badge bg-light text-dark me-2">{complaint.category}</span>
                  <span className="badge bg-light text-dark">{complaint.department}</span>
                </div>
                <span className={`status-${complaint.status.toLowerCase().replace(' ', '')}`}>
                  {complaint.status}
                </span>
              </div>
              <p className="text-muted">{complaint.description}</p>

              {/* Status Timeline */}
              <div className="d-flex justify-content-between align-items-center mt-4 px-2">
                {steps.map((step, i) => {
                  const currentIndex = steps.indexOf(complaint.status);
                  const done = i <= currentIndex;
                  return (
                    <div key={step} className="text-center flex-fill">
                      <div className="mx-auto mb-1" style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: done ? '#1a73e8' : '#e2e8f0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {done && <span style={{ color: '#fff', fontSize: '14px' }}>✓</span>}
                      </div>
                      <small className={done ? 'text-primary fw-semibold' : 'text-muted'}>
                        {step}
                      </small>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chat */}
            <ChatWindow complaintId={complaint._id} />
          </>
        )}
      </div>
      <FooterC />
    </div>
  );
}

export default Status;