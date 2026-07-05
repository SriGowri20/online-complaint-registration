import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function ChatWindow({ complaintId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const bottomRef = useRef(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `https://online-complaint-registration-5wif.onrender.com/api/messages/${complaintId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to load messages');
      }
    };
    if (complaintId) fetchMessages();
  }, [complaintId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post(
        'https://online-complaint-registration-5wif.onrender.com/api/messages',
        { complaintId, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, res.data]);
      setText('');
    } catch (err) {
      console.error('Failed to send message');
    }
  };

  return (
    <div className="card p-3" style={{ maxWidth: '500px' }}>
      <h6 className="fw-bold mb-3">Chat with Agent</h6>

      <div style={{ height: '280px', overflowY: 'auto', background: '#f8f9fa',
                    borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
        {messages.length === 0 && (
          <p className="text-muted text-center mt-4">No messages yet.</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 d-flex ${msg.senderRole === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
            <div style={{
              background: msg.senderRole === 'user' ? '#1a73e8' : '#e2e8f0',
              color: msg.senderRole === 'user' ? '#fff' : '#333',
              borderRadius: '12px', padding: '8px 14px',
              maxWidth: '75%', fontSize: '0.9rem'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="d-flex gap-2">
        <input
          className="form-control" placeholder="Type a message..."
          value={text} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="btn btn-primary px-3" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;