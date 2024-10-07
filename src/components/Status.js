// src/components/Status.js
import React, { useState } from 'react';
import axios from 'axios';

const Status = () => {
  const [requestId, setRequestId] = useState('');
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState('');

  const handleStatusCheck = async () => {
    if (!requestId) {
      setError('Please enter a Request ID.');
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/file-upload-status` , {
        params: { requestId }, // Pass requestId in query parameters
      });
      setStatusData(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch status. Please ensure the Request ID is correct.');
      setStatusData(null);
    }
  };

  return (
    <div>
      <h2>Check Processing Status</h2>
      <input
        type="text"
        placeholder="Enter Request ID"
        value={requestId}
        onChange={(e) => setRequestId(e.target.value)}
      />
      <button onClick={handleStatusCheck}>Check Status</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {statusData && (
        <div>
          <h3>Request Status: {statusData.status}</h3>
        </div>
      )}
    </div>
  );
};

export default Status;
