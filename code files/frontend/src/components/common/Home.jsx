import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterC from './FooterC';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <span className="navbar-brand fw-bold">ComplaintPortal</span>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-light" onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn-light text-primary fw-bold" onClick={() => navigate('/signup')}>Register</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container text-center py-5">
        <h1 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
          Online Complaint Registration
        </h1>
        <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
          Report issues to the right department. Track progress in real time.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-primary px-4 py-2" onClick={() => navigate('/signup')}>
            Register a Complaint
          </button>
          <button className="btn btn-outline-primary px-4 py-2" onClick={() => navigate('/login')}>
            Track My Complaint
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="container pb-5">
        <div className="row g-4">
          {[
            { title: 'Easy Registration', text: 'Register complaints in minutes with a simple form.' },
            { title: 'Real-time Tracking', text: 'Track the status of your complaint at any time.' },
            { title: 'Direct Communication', text: 'Chat with assigned agents directly on the platform.' },
          ].map((f, i) => (
            <div className="col-md-4" key={i}>
              <div className="card p-4 h-100 text-center">
                <h5 className="fw-bold mb-2">{f.title}</h5>
                <p className="text-muted">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterC />
    </div>
  );
}

export default Home;