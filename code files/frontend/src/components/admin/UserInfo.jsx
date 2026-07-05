import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserInfo({ token }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm('Remove this user?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      alert('Failed to remove user.');
    }
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0">All Users ({users.length})</h6>
        <input
          type="text" className="form-control form-control-sm"
          style={{ maxWidth: '220px' }}
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">No users found.</p>
      ) : (
        <div className="row g-3">
          {filtered.map(u => (
            <div className="col-md-6" key={u._id}>
              <div className="card p-3 h-100">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-bold mb-1">{u.name}</h6>
                    <p className="text-muted small mb-1">{u.email}</p>
                    <p className="text-muted small mb-0">{u.phone}</p>
                  </div>
                  <div className="d-flex flex-column gap-2 align-items-end">
                    <span className="badge bg-primary">User</span>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteUser(u._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-top">
                  <small className="text-muted">
                    Complaints filed: <strong>{u.complaintCount || 0}</strong>
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

export default UserInfo;