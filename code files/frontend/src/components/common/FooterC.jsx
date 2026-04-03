import React from 'react';

function FooterC() {
  return (
    <footer className="text-center py-3 mt-4" style={{ background: '#1a73e8', color: '#fff' }}>
      <p className="mb-0" style={{ fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} ComplaintPortal — All rights reserved.
      </p>
    </footer>
  );
}

export default FooterC;