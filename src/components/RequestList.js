// src/components/RequestList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RequestList.css'; // Import the CSS file

const RequestList = () => {
  const [requestList, setRequestList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequestList = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/list-request`);
        setRequestList(response.data.list);
      } catch (err) {
        console.error('Error fetching request list:', err);
        setError('Failed to fetch request list.');
      }
    };

    fetchRequestList();
  }, []);

  return (
    <div className="table-container">
      <h2>Request List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {requestList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Request ID</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {requestList.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.request_id}</td>
                <td>{request.status}</td>
                <td>{new Date(request.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No requests found.</p>
      )}
    </div>
  );
};

export default RequestList;
